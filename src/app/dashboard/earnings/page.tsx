"use client";

import { useState } from "react";
import EarningsHistoryTable from "@/components/dashboard/earnings/EarningsHistoryTable";
import RecentPayouts from "@/components/dashboard/earnings/RecentPayouts";
import EarningsKPICards from "@/components/dashboard/earnings/EarningsKPICards";
import { Landmark } from "lucide-react";

export default function EarningsPage() {
  const [requestingPayout, setRequestingPayout] = useState(false);

  return (
    <div className="relative w-full">
      {/* Mobile Colored Header Background */}
      <div className="md:hidden absolute -top-20 -left-4 -right-4 h-[400px] bg-[#7A1D1B] overflow-hidden z-0">
        <div className="absolute -top-[150px] -left-[100px] w-[500px] h-[500px] rounded-full bg-white/5"></div>
        <div className="absolute top-[20%] -right-[150px] w-[400px] h-[400px] rounded-full bg-white/5"></div>
        <div className="absolute -bottom-[100px] left-[10%] w-[300px] h-[300px] rounded-full bg-white/5"></div>
      </div>

      {/* Header Section */}
      <div className="relative z-20 pt-4 md:pt-0 mb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="w-full md:w-auto">
          <h1 className="text-[28px] md:text-[28px] font-black tracking-tight text-white md:text-neutral-900 leading-none">
            Earnings
          </h1>
          <p className="text-white/80 md:text-neutral-500 text-[14px] mt-1 font-medium">
            Track your commission and manage payouts.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button 
            className="h-10 px-4 bg-white md:bg-[#7A1D1B] text-[#7A1D1B] md:text-white rounded-xl text-[14px] font-semibold hover:bg-neutral-50 md:hover:bg-[#9A2622] transition-colors shadow-sm flex items-center justify-center gap-2"
            onClick={() => setRequestingPayout(true)}
          >
            <Landmark className="w-4 h-4" />
            Request Payout
          </button>
        </div>
      </div>

      {/* KPI Cards Row */}
      <EarningsKPICards />

      {/* Main Content Area */}
      <div className="relative z-20 grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <EarningsHistoryTable />
        </div>
        <div className="lg:col-span-1">
          <RecentPayouts />
        </div>
      </div>
    </div>
  );
}
