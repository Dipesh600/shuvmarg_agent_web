"use client";

import { useState, useRef, useEffect } from "react";
import { Calendar as CalendarIcon, ChevronDown, ChevronLeft, ChevronRight } from "lucide-react";

export default function PremiumDatePicker({
  selectedDate,
  onDateChange,
  variant = "desktop",
  customTrigger,
}: {
  selectedDate: Date;
  onDateChange: (date: Date) => void;
  variant?: "desktop" | "mobile";
  customTrigger?: React.ReactNode;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(new Date(selectedDate.getFullYear(), selectedDate.getMonth(), 1));
  const popoverRef = useRef<HTMLDivElement>(null);

  // Formatting the display date
  const formattedDate = new Intl.DateTimeFormat("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(selectedDate);
  const weekday = new Intl.DateTimeFormat("en-US", {
    weekday: "long",
  }).format(selectedDate);
  const displayStr = `${formattedDate}, ${weekday}`;

  // Close popover when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (popoverRef.current && !popoverRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Sync current month with selected date if it changes externally
  useEffect(() => {
    setCurrentMonth(new Date(selectedDate.getFullYear(), selectedDate.getMonth(), 1));
  }, [selectedDate]);

  // Calendar logic
  const daysInMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 0).getDate();
  const firstDayOfMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1).getDay();
  
  const days = [];
  for (let i = 0; i < firstDayOfMonth; i++) {
    days.push(null); // empty slots
  }
  for (let i = 1; i <= daysInMonth; i++) {
    days.push(new Date(currentMonth.getFullYear(), currentMonth.getMonth(), i));
  }

  const prevMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1));
  };

  const nextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));
  };

  const isSameDay = (d1: Date, d2: Date) => {
    return d1.getDate() === d2.getDate() &&
           d1.getMonth() === d2.getMonth() &&
           d1.getFullYear() === d2.getFullYear();
  };

  return (
    <div className="relative self-start sm:self-auto" ref={popoverRef}>
      {/* Trigger Button */}
      {customTrigger ? (
        <div onClick={() => setIsOpen(!isOpen)} className="cursor-pointer">
          {customTrigger}
        </div>
      ) : variant === "mobile" ? (
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-1.5 text-white/90 hover:text-white transition-colors group"
        >
          <span className="text-[14px] font-medium font-sans">
            {displayStr}
          </span>
          <ChevronDown
            className={`w-4 h-4 opacity-70 group-hover:opacity-100 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
            strokeWidth={2.5}
          />
        </button>
      ) : (
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-2 px-4 py-2.5 bg-white/40 backdrop-blur-md border border-white/60 rounded-2xl shadow-[0_2px_8px_rgba(0,0,0,0.04),inset_0_1px_0_rgba(255,255,255,0.8)] hover:bg-white/60 transition-all group"
        >
          <CalendarIcon
            className="w-4 h-4 text-neutral-500 group-hover:text-neutral-700 transition-colors"
            strokeWidth={2.5}
          />
          <span className="text-[14px] font-semibold text-neutral-700 font-display tracking-wide">
            {displayStr}
          </span>
          <ChevronDown
            className={`w-4 h-4 text-neutral-400 group-hover:text-neutral-600 transition-transform duration-200 ml-1 ${isOpen ? "rotate-180" : ""}`}
            strokeWidth={2.5}
          />
        </button>
      )}

      {/* Popover Calendar */}
      {isOpen && (
        <div className="absolute left-0 sm:left-auto sm:right-0 top-[calc(100%+8px)] w-[320px] bg-white border border-neutral-100 rounded-[24px] shadow-[0_16px_40px_rgba(0,0,0,0.12)] z-50 overflow-hidden transform origin-top-left sm:origin-top-right">
          <div className="p-5">
            {/* Calendar Header */}
            <div className="flex items-center justify-between mb-5">
              <span className="text-[15px] font-bold text-neutral-900 font-display tracking-tight">
                {new Intl.DateTimeFormat("en-US", { month: "long", year: "numeric" }).format(currentMonth)}
              </span>
              <div className="flex items-center gap-1">
                <button onClick={prevMonth} className="p-1.5 hover:bg-neutral-100 rounded-lg transition-colors">
                  <ChevronLeft className="w-4 h-4 text-neutral-600" />
                </button>
                <button onClick={nextMonth} className="p-1.5 hover:bg-neutral-100 rounded-lg transition-colors">
                  <ChevronRight className="w-4 h-4 text-neutral-600" />
                </button>
              </div>
            </div>

            {/* Days of Week */}
            <div className="grid grid-cols-7 gap-1 mb-3">
              {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map((day) => (
                <div key={day} className="text-center text-[12px] font-bold text-neutral-400 font-sans uppercase tracking-wider">
                  {day}
                </div>
              ))}
            </div>

            {/* Calendar Grid */}
            <div className="grid grid-cols-7 gap-1">
              {days.map((date, i) => {
                if (!date) return <div key={`empty-${i}`} className="h-9" />;
                
                const isSelected = isSameDay(date, selectedDate);
                const isToday = isSameDay(date, new Date());

                return (
                  <button
                    key={date.toISOString()}
                    onClick={() => {
                      onDateChange(date);
                      setIsOpen(false);
                    }}
                    className={`h-9 w-full rounded-2xl flex items-center justify-center text-[14px] font-semibold transition-all font-display ${
                      isSelected 
                        ? "bg-[#D96B62] text-white shadow-md shadow-[#D96B62]/20" 
                        : isToday
                        ? "bg-neutral-100 text-[#D96B62] hover:bg-neutral-200"
                        : "text-neutral-700 hover:bg-neutral-100 hover:text-neutral-900"
                    }`}
                  >
                    {date.getDate()}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
