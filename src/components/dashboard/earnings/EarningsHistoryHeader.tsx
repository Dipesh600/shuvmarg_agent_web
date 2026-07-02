"use client";

import { Search, Filter, Download } from "lucide-react";

interface EarningsHistoryHeaderProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
}

export default function EarningsHistoryHeader({ searchTerm, setSearchTerm }: EarningsHistoryHeaderProps) {
  return (
    <div className="p-5 md:p-6 border-b border-neutral-100">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-[18px] font-bold text-neutral-900">Earnings History</h2>
          <p className="text-[13px] text-neutral-500 font-medium mt-0.5">
            Your commission from completed bookings.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <div className="relative">
            <Search className="w-4 h-4 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="h-10 pl-9 pr-4 w-full md:w-[200px] bg-neutral-50 border border-neutral-200 rounded-xl text-[13px] focus:outline-none focus:ring-2 focus:ring-[#7A1D1B]/20 focus:border-[#7A1D1B] transition-all"
            />
          </div>
          <button className="h-10 px-3 bg-neutral-50 border border-neutral-200 text-neutral-600 rounded-xl text-[13px] font-medium hover:bg-neutral-100 transition-colors flex items-center gap-2">
            <Filter className="w-4 h-4" />
            <span className="hidden md:inline">Filter</span>
          </button>
          <button className="h-10 px-3 bg-neutral-50 border border-neutral-200 text-neutral-600 rounded-xl text-[13px] font-medium hover:bg-neutral-100 transition-colors flex items-center gap-2">
            <Download className="w-4 h-4" />
            <span className="hidden md:inline">Export</span>
          </button>
        </div>
      </div>
    </div>
  );
}
