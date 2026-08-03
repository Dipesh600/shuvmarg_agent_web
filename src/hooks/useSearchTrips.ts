"use client";

import { useState, useCallback } from "react";
import { SearchParams, SearchResponse, TripResult } from "@/types/search";

import { API_URL } from "@/lib/config";

interface UseSearchTripsReturn {
  results: TripResult[];
  total: number;
  isLoading: boolean;
  error: string | null;
  search: (params: SearchParams) => Promise<void>;
  reset: () => void;
}

export function useSearchTrips(): UseSearchTripsReturn {
  const [results, setResults] = useState<TripResult[]>([]);
  const [total, setTotal] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const search = useCallback(async (params: SearchParams) => {
    setIsLoading(true);
    setError(null);
    setResults([]);

    try {
      const response = await fetch(`${API_URL}/public/searchTrips?page=1&limit=50`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          from: params.from,
          to: params.to,
          date: params.date,
        }),
      });

      if (!response.ok) {
        throw new Error(`Request failed with status ${response.status}`);
      }

      const data: SearchResponse = await response.json();

      if (data.success) {
        setResults(data.data ?? []);
        setTotal(data.total ?? data.results ?? 0);
      } else {
        setResults([]);
        setTotal(0);
        setError(data.message || "No trips found.");
      }
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Something went wrong.";
      setError(message);
      setResults([]);
      setTotal(0);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const reset = useCallback(() => {
    setResults([]);
    setTotal(0);
    setError(null);
    setIsLoading(false);
  }, []);

  return { results, total, isLoading, error, search, reset };
}
