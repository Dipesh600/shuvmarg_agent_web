"use client";

import { Search, Filter, ArrowUpDown } from "lucide-react";

interface BookingsHeaderProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  showEmptyState: boolean;
  onToggleEmptyState: () => void;
}

export default function BookingsHeader({
  searchQuery,
  onSearchChange,
  showEmptyState,
  onToggleEmptyState,
}: BookingsHeaderProps) {
  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
      <div className="relative w-full sm:w-[320px]">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
        <input
          type="text"
          placeholder="Search by ID, passenger, or route..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full pl-9 pr-4 h-10 bg-white border border-neutral-200 rounded-xl text-[14px] outline-none focus:border-[#7A1D1B] transition-colors placeholder:text-neutral-400 text-neutral-900 font-medium"
        />
      </div>
      <div className="flex items-center gap-3 w-full sm:w-auto">
        {/* Debug Toggle for Presentation */}
        <button
          onClick={onToggleEmptyState}
          className="hidden sm:flex items-center justify-center h-10 px-4 bg-neutral-100 text-neutral-500 rounded-xl text-[12px] font-bold uppercase tracking-wider hover:bg-neutral-200 transition-colors mr-2"
        >
          Toggle Empty
        </button>
        <button className="flex-1 sm:flex-none flex items-center justify-center gap-2 h-10 px-4 bg-white border border-neutral-200 rounded-xl text-[14px] font-semibold text-neutral-700 hover:bg-neutral-50 transition-colors">
          <Filter className="w-4 h-4" />
          Filter
        </button>
        <button className="flex-1 sm:flex-none flex items-center justify-center gap-2 h-10 px-4 bg-white border border-neutral-200 rounded-xl text-[14px] font-semibold text-neutral-700 hover:bg-neutral-50 transition-colors">
          <ArrowUpDown className="w-4 h-4" />
          Sort
        </button>
      </div>
    </div>
  );
}
