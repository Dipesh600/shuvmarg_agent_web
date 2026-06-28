"use client";

import { useEffect, useState } from "react";
import { useGlobalStore } from "@/lib/store";

export default function DashboardPage() {
  const { agentProfile } = useGlobalStore();
  const [greeting, setGreeting] = useState("Good Day");

  useEffect(() => {
    const getNepalGreeting = () => {
      try {
        const formatter = new Intl.DateTimeFormat('en-US', {
          timeZone: 'Asia/Kathmandu',
          hour: 'numeric',
          hour12: false
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

  // Use the first name for a friendlier greeting
  const displayName = agentProfile?.name?.split(" ")[0] || "Partner";

  return (
    <div>
      {/* Dynamic Greeting Section */}
      <div className="mb-6 md:mb-8">
        <h1 className="text-[24px] md:text-[28px] font-black tracking-tight text-neutral-900 leading-none">
          {greeting}, <span className="text-[#D96B62]">{displayName}</span>
        </h1>
        <p className="text-[14px] text-neutral-500 mt-1.5 font-medium">
          Here is what's happening with your business today.
        </p>
      </div>

    </div>
  );
}
