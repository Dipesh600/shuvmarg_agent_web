"use client";

import { useState } from "react";
import { Search, Calendar } from "lucide-react";
import PremiumDatePicker from "@/components/dashboard/PremiumDatePicker";
import StopAutocomplete, { Stop } from "./StopAutocomplete";
import { SearchParams } from "@/types/search";

interface BookingHeroProps {
  onSearch?: (params: SearchParams) => void;
}

export default function BookingHero({ onSearch }: BookingHeroProps) {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [fromStop, setFromStop] = useState<Stop | null>(null);
  const [toStop,   setToStop]   = useState<Stop | null>(null);

  // Generate next 7 days for the horizontal date chip scroller
  const next7Days = Array.from({ length: 7 }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() + i);
    return d;
  });

  return (
    <div className="relative w-full">
      {/* ── Background ─────────────────────────────────────────────────── */}
      <div className="absolute inset-0 z-0 bg-[#F8F1E3] rounded-[24px] overflow-hidden">
        <div className="absolute inset-0 flex">
          {/* Left — burgundy */}
          <div className="relative w-full md:w-[60%] h-full bg-[#7A1D1B]">
            <div
              className="absolute inset-0 opacity-[0.03]"
              style={{
                backgroundImage: "radial-gradient(circle at 2px 2px, white 1px, transparent 0)",
                backgroundSize: "24px 24px",
              }}
            />
          </div>

          {/* Right — cream */}
          <div className="hidden md:block relative w-[40%] h-full bg-[#F5F0E8]">
            <div
              className="absolute inset-0 opacity-[0.06]"
              style={{
                backgroundImage: "radial-gradient(circle at 2px 2px, #7A1D1B 1px, transparent 0)",
                backgroundSize: "16px 16px",
              }}
            />
            <div className="absolute -top-[100px] -right-[100px] w-[300px] h-[300px] rounded-full border-[40px] border-[#7A1D1B]/10" />
            <div className="absolute -bottom-[50px] -left-[50px] w-[200px] h-[200px] rounded-full border-[20px] border-[#7A1D1B]/5" />
          </div>

          {/* Wave divider */}
          <div
            className="hidden md:block absolute left-[60%] top-0 h-full w-[200px] z-0 pointer-events-none"
            style={{ transform: "translateX(-1px)" }}
          >
            <svg className="w-full h-full text-[#7A1D1B] fill-current" viewBox="0 0 200 1000" preserveAspectRatio="none">
              <path d="M0,0 C150,0 200,350 80,550 C-40,750 120,1000 0,1000 Z" />
            </svg>
          </div>
        </div>
      </div>

      {/* ── Content ────────────────────────────────────────────────────── */}
      <div className="relative z-10 p-6 md:px-10 md:py-8 flex flex-col md:flex-row gap-6 items-start">
        <div className="w-full mt-2 md:mt-4">
          {/* Headline */}
          <h1 className="text-white text-[32px] md:text-[40px] font-black leading-tight mb-6">
            Maximize Bookings.{" "}
            <br />
            <span className="text-white/90 text-[20px] md:text-[24px] mt-2 font-semibold block">
              Fill every seat, drive more revenue today.
            </span>
          </h1>

          {/* ── Search Bar ─────────────────────────────────────────────── */}
          <div className="bg-white rounded-[20px] p-2 shadow-[0_8px_30px_rgba(0,0,0,0.08)] border border-neutral-200 flex flex-col w-full mt-2 relative z-20">
            <div className="flex flex-col md:flex-row items-stretch w-full">

              {/* From */}
              <StopAutocomplete
                label="From"
                placeholder="Leaving from"
                value={fromStop}
                onChange={setFromStop}
                excludeStop={toStop}
                hasBorderRight
              />

              {/* To */}
              <StopAutocomplete
                label="To"
                placeholder="Going to"
                value={toStop}
                onChange={setToStop}
                excludeStop={fromStop}
                hasBorderRight
              />

              {/* Date */}
              <div className="flex-[1.6] w-full relative px-4 py-2 flex items-center justify-between gap-4">
                {/* Date Trigger */}
                <div className="flex-shrink-0">
                  <label className="block text-[11px] font-bold text-neutral-500 uppercase tracking-widest mb-1.5">
                    Date
                  </label>
                  <div className="relative z-50">
                    <PremiumDatePicker
                      selectedDate={selectedDate}
                      onDateChange={setSelectedDate}
                      variant="desktop"
                      customTrigger={
                        <button className="flex items-center gap-2 text-[15px] font-semibold text-neutral-900 hover:text-[#7A1D1B] transition-colors">
                          <Calendar className="w-4 h-4 text-[#7A1D1B]" />
                          {selectedDate.toLocaleDateString("en-US", { day: "numeric", month: "short" })}
                        </button>
                      }
                    />
                  </div>
                </div>

                {/* Date chips */}
                <div className="relative w-[174px] ml-auto">
                  <div className="w-full h-full overflow-x-auto hide-scrollbar flex items-center gap-1.5 snap-x py-1">
                    {next7Days.map((date, idx) => {
                      const isSelected = selectedDate.toDateString() === date.toDateString();
                      const dayName = date.toLocaleDateString("en-US", { weekday: "short" });
                      const dayNum  = date.getDate();

                      return (
                        <button
                          key={idx}
                          onClick={() => setSelectedDate(date)}
                          className={`snap-start flex-shrink-0 flex flex-col items-center justify-center w-[54px] h-[48px] rounded-xl transition-all border ${
                            isSelected
                              ? "bg-[#7A1D1B] border-[#7A1D1B] text-white shadow-md shadow-[#7A1D1B]/20"
                              : "bg-white border-neutral-200 text-neutral-600 hover:border-neutral-300 hover:bg-neutral-50"
                          }`}
                        >
                          <span className={`text-[10px] font-bold uppercase tracking-wider leading-none ${isSelected ? "text-white/90" : "text-neutral-500"}`}>
                            {dayName}
                          </span>
                          <span className={`text-[15px] font-black leading-none mt-1 ${isSelected ? "text-white" : "text-neutral-900"}`}>
                            {dayNum}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Search Button */}
              <div className="pl-2 pr-1 md:w-auto w-full mt-3 md:mt-0 flex items-center">
                <button
                  onClick={() => {
                    if (!fromStop || !toStop) return;
                    onSearch?.({
                      from: fromStop.name,
                      to: toStop.name,
                      date: selectedDate.toISOString().split("T")[0],
                      fromLabel: fromStop.name,
                      toLabel: toStop.name,
                    });
                  }}
                  disabled={!fromStop || !toStop}
                  className="w-full md:w-[130px] h-[56px] bg-[#7A1D1B] rounded-xl text-[15px] font-bold text-white shadow-md shadow-[#7A1D1B]/20 hover:bg-[#6A1817] hover:shadow-lg transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Search className="w-[18px] h-[18px]" />
                  Search
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
