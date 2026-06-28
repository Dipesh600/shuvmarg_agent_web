"use client";

import { useEffect, useState } from "react";
import { useGlobalStore } from "@/lib/store";
import TopRoutesCard from "@/components/dashboard/TopRoutesCard";
import KPICards from "@/components/dashboard/KPICards";
import PremiumDatePicker from "@/components/dashboard/PremiumDatePicker";

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
    <div>
      {/* Dynamic Greeting Section */}
      <div className="mb-6 md:mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-[24px] md:text-[28px] font-black tracking-tight text-neutral-900 leading-none">
            {greeting}, <span className="text-[#D96B62]">{displayName}</span>
          </h1>
          <p className="text-[14px] text-neutral-500 mt-1.5 font-medium">
            Here is what&apos;s happening with your business today.
          </p>
        </div>

        <PremiumDatePicker 
          selectedDate={selectedDate} 
          onDateChange={setSelectedDate} 
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-7 xl:col-span-7">
          <KPICards />
        </div>
        <div className="lg:col-span-5 xl:col-span-5">
          <TopRoutesCard />
        </div>
      </div>
    </div>
  );
}
