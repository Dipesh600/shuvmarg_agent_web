"use client";

import { useState } from "react";
import { ArrowLeft, ChevronDown, Check } from "lucide-react";
import { SortOption } from "@/types/search";

interface SearchResultsHeaderProps {
  onBack: () => void;
  count: number;
  total: number;
  fromLabel?: string;
  toLabel?: string;
  sortBy: SortOption;
  onSortChange: (s: SortOption) => void;
}

const SORT_OPTIONS: SortOption[] = ["Recommended", "Ratings", "Departure Time", "Price"];

export default function SearchResultsHeader({
  onBack,
  count,
  total,
  fromLabel,
  toLabel,
  sortBy,
  onSortChange,
}: SearchResultsHeaderProps) {
  const [open, setOpen] = useState(false);

  const routeLabel =
    fromLabel && toLabel ? `${fromLabel} → ${toLabel}` : "Available Buses";

  const subtitle =
    count === total
      ? `${count} ${count === 1 ? "bus" : "buses"} found`
      : `Showing ${count} of ${total} buses`;

  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
      <div className="flex items-center gap-4">
        <button
          onClick={onBack}
          className="w-10 h-10 flex items-center justify-center rounded-full bg-white border border-neutral-200 text-neutral-600 hover:bg-neutral-50 hover:text-neutral-900 transition-colors shadow-sm shrink-0"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div>
          <h2 className="text-[22px] md:text-[26px] font-black text-neutral-900 leading-tight">
            {routeLabel}
          </h2>
          <p className="text-[13px] font-medium text-neutral-500">{subtitle}</p>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <span className="text-[14px] font-medium text-neutral-500 hidden sm:block">Sort by:</span>
        <div className="relative">
          <button
            onClick={() => setOpen(!open)}
            className="h-10 px-4 bg-white border border-neutral-200 rounded-xl text-[14px] font-bold text-neutral-900 hover:bg-neutral-50 transition-colors shadow-sm flex items-center gap-2"
          >
            {sortBy}
            <ChevronDown
              className={`w-4 h-4 text-neutral-500 transition-transform ${open ? "rotate-180" : ""}`}
            />
          </button>

          {open && (
            <div className="absolute top-full right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-neutral-100 overflow-hidden z-50 animate-in fade-in slide-in-from-top-2 duration-200">
              {SORT_OPTIONS.map((option) => (
                <button
                  key={option}
                  onClick={() => {
                    onSortChange(option);
                    setOpen(false);
                  }}
                  className={`w-full px-4 py-3 text-left text-[14px] font-medium transition-colors flex items-center justify-between ${
                    sortBy === option
                      ? "text-[#7A1D1B] bg-[#7A1D1B]/5"
                      : "text-neutral-700 hover:bg-neutral-50"
                  }`}
                >
                  {option}
                  {sortBy === option && <Check className="w-4 h-4" strokeWidth={3} />}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
