"use client";

import { useEffect, useState } from "react";
import { useGlobalStore } from "@/lib/store";
import TopRoutesCard from "@/components/dashboard/TopRoutesCard";
import KPICards from "@/components/dashboard/KPICards";
import PremiumDatePicker from "@/components/dashboard/PremiumDatePicker";
import RecentCustomers from "@/components/dashboard/RecentCustomers";
import RecentBookingsCard from "@/components/dashboard/RecentBookingsCard";
import { Search } from "lucide-react";

export default function DashboardPage() {
  const { agentProfile } = useGlobalStore();
  const [greeting, setGreeting] = useState("Good Day");
  const [selectedDate, setSelectedDate] = useState(new Date());

  useEffect(() => {
    const getNepalGreeting = () => {
      try {
        const formatter = new Intl.DateTimeFormat("en-US", {
          timeZone: "Asia/Kathmandu",
          hour: "numeric",
          hour12: false,
        });
        const hour = parseInt(formatter.format(new Date()), 10);
        if (hour < 12) return "Good Morning";
        if (hour < 17) return "Good Afternoon";
        return "Good Evening";
      } catch (e) {
        return "Good Day";
      }
    };
    setGreeting(getNepalGreeting());
  }, []);

  const displayName = agentProfile?.name?.split(" ")[0] || "Partner";

  return (
    <div className="relative w-full">
      {/* Mobile Colored Header Background */}
      <div className="md:hidden absolute -top-20 -left-4 -right-4 h-[400px] bg-[#7A1D1B] overflow-hidden z-0">
        {/* Soft intersecting filled circles pattern */}
        <div className="absolute -top-[150px] -left-[100px] w-[500px] h-[500px] rounded-full bg-white/5"></div>
        <div className="absolute top-[20%] -right-[150px] w-[400px] h-[400px] rounded-full bg-white/5"></div>
        <div className="absolute -bottom-[100px] left-[10%] w-[300px] h-[300px] rounded-full bg-white/5"></div>
      </div>

      {/* Dynamic Greeting Section */}
      <div className="relative z-20 pt-4 md:pt-0 mb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="w-full md:w-auto">
          <h1 className="text-[28px] md:text-[28px] font-black tracking-tight text-white md:text-neutral-900 leading-none">
            {greeting}, <span className="text-[#EBC77F] md:text-[#D96B62]">{displayName}</span>
          </h1>
          <div className="md:hidden mt-2 flex flex-col gap-6">
            <PremiumDatePicker 
              selectedDate={selectedDate} 
              onDateChange={setSelectedDate} 
              variant="mobile"
            />
            {/* Mobile Search Bar */}
            <div className="relative w-full">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none z-10">
                <Search className="w-5 h-5 text-neutral-500" strokeWidth={1.5} />
              </div>
              <input
                type="text"
                placeholder="Search buses, bookings, passengers..."
                className="w-full h-14 bg-white/90 backdrop-blur-xl border border-white/40 text-neutral-800 placeholder:text-neutral-500 rounded-full pl-12 pr-4 text-[15px] outline-none shadow-sm focus:bg-white focus:ring-2 focus:ring-black/5 transition-all"
              />
            </div>
          </div>
        </div>

        <div className="hidden md:block self-end sm:self-auto">
          <PremiumDatePicker 
            selectedDate={selectedDate} 
            onDateChange={setSelectedDate} 
            variant="desktop"
          />
        </div>
      </div>

      {/* Overlapping Content Container for Mobile */}
      <div className="relative z-10 md:bg-transparent -mx-4 sm:-mx-6 md:mx-0 px-4 sm:px-6 md:px-0 pt-8 md:pt-0 pb-20 md:pb-0 bg-[#FAF7F2] rounded-t-[32px] md:rounded-none">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-7 xl:col-span-8">
            <KPICards />
          </div>
          
          {/* Desktop Only: Top Routes beside KPIs */}
          <div className="hidden lg:block lg:col-span-5 xl:col-span-4">
            <TopRoutesCard />
          </div>
          
          {/* Mobile Only: Horizontal Customers Scroll */}
          <div className="lg:hidden">
            <RecentCustomers />
          </div>
        </div>

        {/* Desktop Only: Horizontal Customers Scroll */}
        <div className="hidden lg:block">
          <RecentCustomers />
        </div>

        {/* Recent Bookings Full Width Table */}
        <div className="w-full">
          <RecentBookingsCard />
        </div>

        {/* Mobile Only: Top Routes below Recent Bookings */}
        <div className="lg:hidden mt-6">
          <TopRoutesCard />
        </div>
      </div>
    </div>
  );
}
