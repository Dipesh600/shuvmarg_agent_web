"use client";

import { useState } from "react";
import { TrendingUp, TrendingDown, Wallet, Clock, Ticket, Banknote } from "lucide-react";

const kpiData = [
  {
    id: 1,
    title: "Today's Sales",
    value: "42",
    unit: "Total Tickets Sold",
    change: "12.5%",
    changeType: "positive",
    period: "vs yesterday",
    icon: Ticket,
  },
  {
    id: 2,
    title: "Today's Earnings",
    value: "NPR 35,400",
    change: "8.2%",
    changeType: "positive",
    period: "vs yesterday",
    icon: Banknote,
  },
  {
    id: 3,
    title: "Wallet Balance",
    value: "NPR 145,000",
    change: "2.4%",
    changeType: "positive",
    period: "vs last week",
    icon: Wallet,
  },
  {
    id: 4,
    title: "Pending Settlement",
    value: "NPR 12,500",
    change: "4.1%",
    changeType: "negative",
    period: "vs last week",
    icon: Clock,
  },
];

export default function KPICards() {
  const [hoveredId, setHoveredId] = useState(1);

  return (
    <>
      <style dangerouslySetInnerHTML={{
        __html: `
        @keyframes liquid-wave {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-liquid-wave {
          animation: liquid-wave 4s linear infinite;
        }
      `}} />

      <div
        className="grid grid-cols-1 sm:grid-cols-2 gap-4"
        onMouseLeave={() => setHoveredId(1)}
      >
        {kpiData.map((kpi) => {
          const Icon = kpi.icon;
          const isPositive = kpi.changeType === "positive";
          const isActive = hoveredId === kpi.id;

          return (
            <div
              key={kpi.id}
              onMouseEnter={() => setHoveredId(kpi.id)}
              className="relative overflow-hidden rounded-2xl p-5 flex flex-col justify-between shadow-[0_2px_12px_rgba(0,0,0,0.04)] border border-neutral-100 bg-white cursor-default group h-[160px]"
            >
              {/* Liquid Wave Fill Animation */}
              <div
                className="absolute left-0 w-[200%] z-0 pointer-events-none"
                style={{
                  bottom: isActive ? '-5%' : '-110%',
                  height: '150%',
                  transition: 'bottom 0.7s cubic-bezier(0.4, 0, 0.2, 1)'
                }}
              >
                <svg
                  className="absolute top-0 left-0 w-full h-[30px] text-[#7A1D1B] fill-current animate-liquid-wave"
                  viewBox="0 0 1200 120"
                  preserveAspectRatio="none"
                >
                  <path d="M0,42.01 C200,84.02 400,0 600,42.01 C800,84.02 1000,0 1200,42.01 L1200,120 L0,120 Z" />
                </svg>
                <div className="absolute top-[29px] bottom-0 left-0 right-0 bg-[#7A1D1B]" />
              </div>

              {/* Dynamic KPI Texture (Oversized Icon) */}
              <div
                className={`absolute -right-8 -bottom-8 transition-all duration-700 ease-[cubic-bezier(0.4,0,0.2,1)] z-0 pointer-events-none ${isActive ? "opacity-[0.12] scale-100 rotate-[-12deg]" : "opacity-0 scale-50 rotate-0"
                  }`}
              >
                <Icon className="w-40 h-40 text-white" strokeWidth={1} />
              </div>

              {/* Top row: icon + title */}
              <div className="flex items-center gap-2.5 mb-5 relative z-10">
                <div
                  className={`w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 transition-colors duration-500 ${isActive ? "bg-white/20" : "bg-neutral-100"
                    }`}
                >
                  <Icon
                    className={`w-3.5 h-3.5 transition-colors duration-500 ${isActive ? "text-white" : "text-neutral-500"}`}
                    strokeWidth={2.5}
                  />
                </div>
                <p
                  className={`text-[13px] font-semibold transition-colors duration-500 ${isActive ? "text-white/95" : "text-neutral-600"
                    }`}
                >
                  {kpi.title}
                </p>
              </div>

              {/* Value */}
              <div className="mb-5 relative z-10 mt-auto flex items-baseline gap-1.5">
                <span
                  className={`text-[28px] md:text-[32px] font-sans font-bold leading-none tracking-tight transition-colors duration-500 ${isActive ? "text-white" : "text-neutral-900"
                    }`}
                >
                  {kpi.value}
                </span>
                {kpi.unit && (
                  <span className={`text-[14px] font-semibold transition-colors duration-500 ${isActive ? "text-white/80" : "text-neutral-500"}`}>
                    {kpi.unit}
                  </span>
                )}
              </div>

              {/* Bottom row: change badge + period */}
              <div className="flex items-center gap-2 relative z-10">
                <span
                  className={`inline-flex items-center gap-1 text-[11px] font-bold px-2 py-0.5 rounded-full transition-colors duration-500 bg-white ${isPositive ? "text-green-600" : "text-red-600"
                    }`}
                >
                  {isPositive ? (
                    <TrendingUp className="w-3 h-3" strokeWidth={3} />
                  ) : (
                    <TrendingDown className="w-3 h-3" strokeWidth={3} />
                  )}
                  {kpi.change}
                </span>
                <span className="text-[12px] font-medium text-white/80 transition-colors duration-500">
                  {kpi.period}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}
