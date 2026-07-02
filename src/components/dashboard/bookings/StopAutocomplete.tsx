"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { X } from "lucide-react";
import CacheService from "@/lib/CacheService";

// ─── Types ───────────────────────────────────────────────────────────────────
export interface Stop {
  id: string;
  name: string;
  code: string;
  type: string;
}

interface StopAutocompleteProps {
  label: string;
  placeholder: string;
  value: Stop | null;
  onChange: (stop: Stop | null) => void;
  /** Pass the other field's selected stop to prevent identical From/To. */
  excludeStop?: Stop | null;
  /** Visually separate this field from its neighbour (right border). */
  hasBorderRight?: boolean;
}

// ─── Cache key ────────────────────────────────────────────────────────────────
const POPULAR_CACHE_KEY = "popular-stops-v2";

// ─── Module-level cache for popular stops ────────────────────────────────────
// This is shared across all instances (From & To) on the same page so the
// API call happens exactly once per 24-hour window.
let popularStopsPromise: Promise<Stop[]> | null = null;

async function fetchAndCachePopularStops(onFreshData: (data: Stop[]) => void): Promise<void> {
  // 1. Try localStorage first (fast render)
  const cached = CacheService.get<Stop[]>(POPULAR_CACHE_KEY);
  if (cached) {
    onFreshData(cached);
  }

  // 2. Deduplicate: if another instance already started fetching, piggyback
  if (popularStopsPromise) {
    popularStopsPromise.then((data) => {
      // If we didn't have cache, or if we want to ensure latest is applied
      if (data && data.length > 0) onFreshData(data);
    });
    return;
  }

  // 3. Fetch from backend (Stale-While-Revalidate)
  popularStopsPromise = (async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/public/stops/popular?limit=8`
      );
      const json = await res.json();
      if (json.success && Array.isArray(json.data)) {
        CacheService.set<Stop[]>(POPULAR_CACHE_KEY, json.data, CacheService.TTL.POPULAR_STOPS);
        onFreshData(json.data as Stop[]);
        return json.data as Stop[];
      }
    } catch (err) {
      console.warn("[StopAutocomplete] popular stops fetch failed:", err);
    }
    return [];
  })().finally(() => {
    // Allow re-fetch if it fails next time or for the next instance after some time
    setTimeout(() => { popularStopsPromise = null; }, 5000); // Debounce network calls by 5s
  });
}

/** Fire-and-forget: tell the backend a stop was selected. */
function reportSelection(stopId: string): void {
  // Do not await — this must never block the UI
  fetch(`${process.env.NEXT_PUBLIC_API_URL}/public/stops/select`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ stopId }),
  }).catch(() => {
    // Popularity tracking is non-critical — swallow all errors silently
  });
}

// ─── Component ───────────────────────────────────────────────────────────────
export default function StopAutocomplete({
  label,
  placeholder,
  value,
  onChange,
  excludeStop,
  hasBorderRight = false,
}: StopAutocompleteProps) {
  const [query, setQuery]             = useState("");
  const [isOpen, setIsOpen]           = useState(false);
  const [results, setResults]         = useState<Stop[]>([]);
  const [popularStops, setPopularStops] = useState<Stop[]>([]);
  const [isLoading, setIsLoading]     = useState(false);
  // True while debounce is pending — suppresses the "no results" flash
  const [isPending, setIsPending]     = useState(false);
  const [sameStopError, setSameStopError] = useState(false);

  const inputRef     = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const abortRef     = useRef<AbortController | null>(null);
  const debounceRef  = useRef<ReturnType<typeof setTimeout> | null>(null);

  // ─── Load popular stops from cache / API on mount ────────────────────────
  useEffect(() => {
    fetchAndCachePopularStops(setPopularStops);
  }, []);

  // Close dropdown on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  // Cleanup debounce and abort on unmount
  useEffect(() => {
    return () => {
      debounceRef.current && clearTimeout(debounceRef.current);
      abortRef.current?.abort();
    };
  }, []);

  // ─── Debounced API search ─────────────────────────────────────────────────
  const search = useCallback(
    async (q: string) => {
      if (abortRef.current) abortRef.current.abort();
      abortRef.current = new AbortController();

      setIsLoading(true);
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/public/stops/search?q=${encodeURIComponent(q)}&limit=8`,
          { signal: abortRef.current.signal }
        );
        const json = await res.json();
        if (json.success) {
          setResults(
            (json.data as Stop[]).filter((s) => s.id !== excludeStop?.id)
          );
        }
      } catch (err: unknown) {
        if ((err as Error).name !== "AbortError") {
          console.error("[StopAutocomplete] search error:", err);
        }
      } finally {
        setIsLoading(false);
      }
    },
    [excludeStop]
  );

  // ─── Input change handler ─────────────────────────────────────────────────
  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const q = e.target.value;
    setQuery(q);
    setSameStopError(false);

    if (q.length < 2) {
      setResults([]);
      setIsLoading(false);
      setIsPending(false);
      debounceRef.current && clearTimeout(debounceRef.current);
      abortRef.current?.abort();
      return;
    }

    // Mark pending immediately — prevents "No stops found" from flashing
    // during the debounce window before the fetch starts.
    setIsPending(true);
    setIsLoading(true);

    debounceRef.current && clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      setIsPending(false);
      search(q);
    }, 300);
  };

  const handleFocus = () => {
    if (value) setQuery("");
    setIsOpen(true);
  };

  const handleSelect = (stop: Stop) => {
    if (excludeStop && stop.name.toLowerCase() === excludeStop.name.toLowerCase()) {
      setSameStopError(true);
      return;
    }
    onChange(stop);
    setQuery("");
    setIsOpen(false);
    setSameStopError(false);

    // Fire-and-forget: record this selection for popularity ranking
    reportSelection(stop.id);
  };

  const handleClear = (e: React.MouseEvent) => {
    e.stopPropagation();
    onChange(null);
    setQuery("");
    setResults([]);
    setIsOpen(true);
    setSameStopError(false);
    setTimeout(() => inputRef.current?.focus(), 50);
  };

  // What the input actually shows
  const inputDisplayValue = isOpen ? query : (value?.name ?? query);

  // Which list to show in the dropdown
  const displayList =
    query.length >= 2
      ? results
      : popularStops.filter((s) => s.name !== excludeStop?.name);

  const showPopularLabel = query.length < 2;
  const showNoResults    = !isLoading && !isPending && query.length >= 2 && displayList.length === 0;

  return (
    <div
      ref={containerRef}
      className={`relative flex-1 w-full ${hasBorderRight ? "md:border-r border-neutral-200" : ""}`}
    >
      {/* ── Input Field ────────────────────────────────────────────────────── */}
      <div
        className={`px-4 py-2 rounded-xl transition-colors cursor-text hover:bg-neutral-50 ${
          sameStopError ? "ring-1 ring-inset ring-red-400" : ""
        } ${isOpen ? "bg-neutral-50" : ""}`}
        onClick={() => inputRef.current?.focus()}
      >
        <label className="block text-[11px] font-bold text-neutral-500 uppercase tracking-widest mb-1.5 pointer-events-none">
          {label}
        </label>

        <div className="flex items-center gap-2.5">
          <input
            ref={inputRef}
            type="text"
            value={inputDisplayValue}
            placeholder={placeholder}
            onChange={handleInput}
            onFocus={handleFocus}
            autoComplete="off"
            className="w-full bg-transparent text-[15px] font-semibold text-neutral-900 outline-none placeholder:font-medium placeholder:text-neutral-400 min-w-0"
          />
          {value && !isOpen && (
            <button
              onClick={handleClear}
              className="flex-shrink-0 text-neutral-300 hover:text-neutral-600 transition-colors"
              tabIndex={-1}
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Hint: user typed but didn't select from dropdown */}
        {isOpen && query.length >= 1 && !value && !sameStopError && (
          <p className="text-[11px] font-semibold text-amber-500 mt-1">
            Select a stop from the list below.
          </p>
        )}

        {sameStopError && (
          <p className="text-[11px] font-semibold text-red-500 mt-1">
            Origin and destination cannot be the same.
          </p>
        )}
      </div>

      {/* ── Dropdown ───────────────────────────────────────────────────────── */}
      {isOpen && (
        <div className="absolute top-full left-0 mt-2 w-full min-w-[260px] bg-white border border-neutral-200 rounded-[16px] shadow-[0_12px_40px_rgba(0,0,0,0.12)] z-50 overflow-hidden">

          {/* Section label */}
          {showPopularLabel && (
            <div className="px-4 pt-3 pb-1.5">
              <span className="text-[10px] font-black text-neutral-400 uppercase tracking-widest">
                Popular Stops
              </span>
            </div>
          )}

          {/* Loading */}
          {isLoading && (
            <div className="px-4 py-4 flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-[#7A1D1B]/30 animate-pulse" />
              <span className="text-[13px] font-medium text-neutral-400">Searching stops…</span>
            </div>
          )}

          {/* No results */}
          {showNoResults && (
            <div className="px-4 py-6 text-center">
              <p className="text-[14px] font-bold text-neutral-700">No stops found</p>
              <p className="text-[12px] text-neutral-400 mt-1 leading-relaxed">
                Try a different spelling or city name.
              </p>
            </div>
          )}

          {/* Results list */}
          {!isLoading && displayList.length > 0 && (
            <ul className="py-1.5">
              {displayList.map((stop) => (
                <li key={stop.id}>
                  <button
                    onMouseDown={(e) => e.preventDefault()}
                    onClick={() => handleSelect(stop)}
                    className="w-full text-left px-4 py-2.5 hover:bg-[#7A1D1B]/[0.04] transition-colors flex items-center justify-between group/item"
                  >
                    <span className="text-[15px] font-semibold text-neutral-900 group-hover/item:text-[#7A1D1B] transition-colors">
                      {stop.name}
                    </span>
                    {stop.code && (
                      <span className="text-[11px] font-bold text-neutral-400 ml-3 flex-shrink-0 group-hover/item:text-[#7A1D1B]/60 transition-colors">
                        {stop.code}
                      </span>
                    )}
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}
