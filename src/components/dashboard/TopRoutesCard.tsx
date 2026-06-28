"use client";

import { ArrowUpRight } from "lucide-react";

const topRoutes = [
  {
    id: 1,
    from: "Kathmandu",
    to: "Pokhara",
    operator: "Greenline Travels",
    bookings: 128,
    trend: "+12.5%",
    isPositive: true,
  },
  {
    id: 2,
    from: "Kathmandu",
    to: "Chitwan",
    operator: "Tourist Bus Sewa",
    bookings: 96,
    trend: "+8.2%",
    isPositive: true,
  },
  {
    id: 3,
    from: "Pokhara",
    to: "Butwal",
    operator: "Himalayan Express",
    bookings: 72,
    trend: "-3.1%",
    isPositive: false,
  },
];

export default function TopRoutesCard() {
  return (
    <div className="bg-white rounded-2xl p-5 shadow-[0_2px_12px_rgba(0,0,0,0.04)] border border-neutral-100 w-full h-full flex flex-col min-h-[336px]">
      {/* Header */}
      <div className="flex items-center justify-between mb-5">
        <h3 className="text-[17px] font-display font-semibold text-neutral-900 tracking-tight">
          Top Routes
        </h3>
        <button className="w-8 h-8 rounded-full border border-neutral-200 flex items-center justify-center hover:bg-neutral-50 transition-colors">
          <ArrowUpRight className="w-4 h-4 text-neutral-600" strokeWidth={2.5} />
        </button>
      </div>

      {/* Stacked Cards List */}
      <div className="flex-1 flex flex-col relative isolation-auto">
        {topRoutes.map((route, index) => {
          // Dynamic styles for the stacked effect
          const isFirst = index === 0;
          const isSecond = index === 1;
          const isThird = index === 2;

          let cardClasses = "";
          let titleColor = "";
          let subtitleColor = "";
          let trendColor = "";
          let iconBg = "";
          let iconText = "";

          if (isFirst) {
            cardClasses = "bg-neutral-900 z-10 pt-5 pb-9 px-5 rounded-3xl";
            titleColor = "text-white";
            subtitleColor = "text-neutral-400";
            trendColor = route.isPositive ? "text-green-400" : "text-red-400";
            iconBg = "bg-white/10";
            iconText = "text-white";
          } else if (isSecond) {
            // Using a bright brand accent color
            cardClasses = "bg-[#D96B62] z-20 pt-5 pb-9 px-5 rounded-3xl -mt-5 border-[6px] border-white";
            titleColor = "text-white";
            subtitleColor = "text-white/80";
            trendColor = "text-white";
            iconBg = "bg-black/10";
            iconText = "text-white";
          } else if (isThird) {
            cardClasses = "bg-neutral-50 z-30 pt-5 pb-5 px-5 rounded-3xl -mt-5 border-[6px] border-white";
            titleColor = "text-neutral-900";
            subtitleColor = "text-neutral-500";
            trendColor = route.isPositive ? "text-green-600" : "text-red-600";
            iconBg = "bg-white";
            iconText = "text-neutral-900 shadow-sm";
          }

          return (
            <div key={route.id} className={`w-full flex items-center relative ${cardClasses}`}>
              <div className="flex items-center gap-3.5 w-full">
                {/* Initial Icon */}
                <div className={`w-11 h-11 rounded-full flex items-center justify-center font-display font-bold text-[18px] flex-shrink-0 ${iconBg} ${iconText}`}>
                  {route.to.charAt(0)}
                </div>

                {/* Route Info */}
                <div className="flex-1 min-w-0 flex flex-col justify-center">
                  <span className={`text-[15px] font-bold tracking-tight truncate leading-tight ${titleColor}`}>
                    {route.from} <span className="opacity-50 text-[12px] align-middle mx-0.5">→</span> {route.to}
                  </span>
                  <span className={`text-[12px] font-medium truncate mt-0.5 ${subtitleColor}`}>
                    {route.operator}
                  </span>
                </div>

                {/* Stats */}
                <div className="flex flex-col items-end justify-center flex-shrink-0">
                  <span className={`text-[14px] font-bold leading-tight ${trendColor}`}>
                    {route.trend}
                  </span>
                  <span className={`text-[11px] font-medium mt-0.5 ${subtitleColor}`}>
                    {route.bookings} bkgs
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
