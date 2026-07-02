"use client";

import { useState, useMemo } from "react";
import BookingHero from "@/components/dashboard/bookings/BookingHero";
import BookingsTable from "@/components/dashboard/bookings/BookingsTable";
import FilterSidebar from "@/components/dashboard/bookings/FilterSidebar";
import SearchResultsHeader from "@/components/dashboard/bookings/SearchResultsHeader";
import BusResultCard from "@/components/dashboard/bookings/BusResultCard";
import BusResultCardSkeleton from "@/components/dashboard/bookings/BusResultCardSkeleton";
import { useSearchTrips } from "@/hooks/useSearchTrips";
import {
  SearchParams,
  SearchFilters,
  SortOption,
  DEFAULT_FILTERS,
  applyFilters,
  applySort,
} from "@/types/search";
import { BusFront } from "lucide-react";

export default function BookingsPage() {
  const [activeTab, setActiveTab] = useState("Today");
  const [isSearching, setIsSearching] = useState(false);
  const [searchParams, setSearchParams] = useState<SearchParams | null>(null);
  const [filters, setFilters] = useState<SearchFilters>(DEFAULT_FILTERS);
  const [sortBy, setSortBy] = useState<SortOption>("Recommended");

  const { results, total, isLoading, error, search, reset } = useSearchTrips();

  const tabs = ["Today", "Active", "Completed", "Cancelled", "Refunds"];
  const mockCounts: Record<string, number> = {
    Today: 24, Active: 12, Completed: 156, Cancelled: 8, Refunds: 2,
  };

  // ── Derived: filtered + sorted results ────────────────────────────────────
  const displayedResults = useMemo(() => {
    const filtered = applyFilters(results, filters);
    return applySort(filtered, sortBy);
  }, [results, filters, sortBy]);

  // ── Handlers ───────────────────────────────────────────────────────────────
  const handleSearch = (params: SearchParams) => {
    setSearchParams(params);
    setFilters(DEFAULT_FILTERS);
    setSortBy("Recommended");
    setIsSearching(true);
    search(params);
  };

  const handleBack = () => {
    setIsSearching(false);
    setSearchParams(null);
    setFilters(DEFAULT_FILTERS);
    setSortBy("Recommended");
    reset();
  };

  return (
    <div className="flex-1 overflow-y-auto bg-neutral-50/50">
      <div className="max-w-[1440px] mx-auto p-8 flex flex-col gap-8">

        {/* 1. Search Journey Area */}
        <div className="relative z-30">
          <BookingHero onSearch={handleSearch} />
        </div>

        {/* 2. Workspace Area */}
        <div className="relative z-20 px-2 md:px-0">

          {isSearching ? (
            // ── SEARCH RESULTS WORKSPACE ──
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

              {/* Left: Filters */}
              <div className="hidden lg:block lg:col-span-3">
                <FilterSidebar
                  results={results}
                  filters={filters}
                  onFiltersChange={setFilters}
                />
              </div>

              {/* Right: Results */}
              <div className="lg:col-span-9 flex flex-col">
                <SearchResultsHeader
                  onBack={handleBack}
                  count={displayedResults.length}
                  total={total}
                  fromLabel={searchParams?.fromLabel}
                  toLabel={searchParams?.toLabel}
                  sortBy={sortBy}
                  onSortChange={setSortBy}
                />

                {/* Loading skeletons */}
                {isLoading && (
                  <div className="flex flex-col gap-4 pb-12">
                    {[1, 2, 3].map((i) => (
                      <BusResultCardSkeleton key={i} />
                    ))}
                  </div>
                )}

                {/* Error state */}
                {!isLoading && error && (
                  <div className="flex flex-col items-center justify-center py-20 gap-4">
                    <div className="w-16 h-16 rounded-full bg-red-50 flex items-center justify-center">
                      <BusFront className="w-8 h-8 text-red-300" />
                    </div>
                    <div className="text-center">
                      <h3 className="text-[18px] font-bold text-neutral-900 mb-1">
                        Could not load results
                      </h3>
                      <p className="text-[14px] text-neutral-500 max-w-sm">{error}</p>
                    </div>
                  </div>
                )}

                {/* Empty state */}
                {!isLoading && !error && displayedResults.length === 0 && (
                  <div className="flex flex-col items-center justify-center py-20 gap-4">
                    <div className="w-16 h-16 rounded-full bg-[#7A1D1B]/5 flex items-center justify-center">
                      <BusFront className="w-8 h-8 text-[#7A1D1B]/30" />
                    </div>
                    <div className="text-center">
                      <h3 className="text-[18px] font-bold text-neutral-900 mb-1">
                        No buses found
                      </h3>
                      <p className="text-[14px] text-neutral-500 max-w-sm">
                        {results.length > 0
                          ? "Try adjusting your filters."
                          : `No trips available for ${searchParams?.fromLabel} → ${searchParams?.toLabel} on this date.`}
                      </p>
                    </div>
                  </div>
                )}

                {/* Results list */}
                {!isLoading && !error && displayedResults.length > 0 && (
                  <div className="flex flex-col gap-4 pb-12">
                    {displayedResults.map((trip) => (
                      <BusResultCard key={trip._id} trip={trip} />
                    ))}
                  </div>
                )}
              </div>
            </div>

          ) : (
            // ── BOOKINGS MANAGEMENT WORKSPACE ──
            <div className="animate-in fade-in duration-500">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
                <h2 className="text-[24px] md:text-[28px] font-black text-neutral-900 mb-4 sm:mb-0">
                  Bookings
                </h2>
              </div>

              <div className="bg-white rounded-[24px] shadow-sm border border-neutral-100 overflow-hidden min-h-[500px]">
                {/* Tabs */}
                <div className="flex items-center px-6 pt-5 border-b border-neutral-100 overflow-x-auto hide-scrollbar">
                  <div className="flex items-center gap-8">
                    {tabs.map((tab) => {
                      const isActive = activeTab === tab;
                      return (
                        <button
                          key={tab}
                          onClick={() => setActiveTab(tab)}
                          className={`relative pb-4 text-[14px] font-bold transition-colors whitespace-nowrap ${
                            isActive
                              ? "text-[#7A1D1B]"
                              : "text-neutral-500 hover:text-neutral-900"
                          }`}
                        >
                          {tab}
                          <span
                            className={`ml-2 text-[11px] px-2 py-0.5 rounded-full font-semibold ${
                              isActive
                                ? "bg-[#7A1D1B]/10 text-[#7A1D1B]"
                                : "bg-neutral-100 text-neutral-600"
                            }`}
                          >
                            {mockCounts[tab]}
                          </span>
                          {isActive && (
                            <div className="absolute bottom-[-1px] left-0 w-full h-[3px] bg-[#7A1D1B] rounded-t-full" />
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Table */}
                <div className="p-6">
                  <BookingsTable activeTab={activeTab} />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
