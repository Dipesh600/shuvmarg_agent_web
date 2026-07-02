import { useState } from "react";
import { Search, MapPin, Calendar, Users } from "lucide-react";

export default function BookingSearchForm() {
  return (
    <div className="bg-[#F8F1E3] rounded-[16px] shadow-[0_4px_12px_rgba(0,0,0,0.08)] p-6 md:p-8 w-full max-w-[1200px] mx-auto border border-neutral-100">
      <div className="mb-6">
        <h2 className="text-[20px] font-bold text-neutral-900">New Booking</h2>
        <p className="text-neutral-500 text-[14px]">Search for available buses and book seats for passengers.</p>
      </div>

      <form className="flex flex-col md:flex-row gap-4" onSubmit={(e) => e.preventDefault()}>
        {/* From Field */}
        <div className="flex-1 relative">
          <label className="block text-[12px] font-semibold text-neutral-600 mb-1 uppercase tracking-wider">From</label>
          <div className="relative">
            <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" />
            <input 
              type="text" 
              placeholder="Origin City" 
              className="w-full h-[48px] pl-11 pr-4 bg-white border border-neutral-200 rounded-[12px] focus:outline-none focus:border-[#7A1D1B] focus:ring-1 focus:ring-[#7A1D1B] text-[16px] text-neutral-900 transition-all placeholder:text-neutral-400"
            />
          </div>
        </div>

        {/* To Field */}
        <div className="flex-1 relative">
          <label className="block text-[12px] font-semibold text-neutral-600 mb-1 uppercase tracking-wider">To</label>
          <div className="relative">
            <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" />
            <input 
              type="text" 
              placeholder="Destination City" 
              className="w-full h-[48px] pl-11 pr-4 bg-white border border-neutral-200 rounded-[12px] focus:outline-none focus:border-[#7A1D1B] focus:ring-1 focus:ring-[#7A1D1B] text-[16px] text-neutral-900 transition-all placeholder:text-neutral-400"
            />
          </div>
        </div>

        {/* Date Field */}
        <div className="flex-1 relative">
          <label className="block text-[12px] font-semibold text-neutral-600 mb-1 uppercase tracking-wider">Date</label>
          <div className="relative">
            <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" />
            <input 
              type="date" 
              className="w-full h-[48px] pl-11 pr-4 bg-white border border-neutral-200 rounded-[12px] focus:outline-none focus:border-[#7A1D1B] focus:ring-1 focus:ring-[#7A1D1B] text-[16px] text-neutral-900 transition-all text-neutral-500"
            />
          </div>
        </div>

        {/* Search Button */}
        <div className="flex items-end">
          <button 
            type="submit"
            className="w-full md:w-auto h-[48px] px-8 bg-[#7A1D1B] text-white rounded-[12px] font-semibold text-[16px] hover:bg-[#5C1414] transition-colors flex items-center justify-center gap-2 shadow-sm"
          >
            <Search className="w-5 h-5" />
            Search Buses
          </button>
        </div>
      </form>

      {/* Placeholder for Search Results area */}
      <div className="mt-8 pt-8 border-t border-neutral-200/50 flex flex-col items-center justify-center py-12">
        <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mb-4 shadow-sm border border-neutral-100">
          <Search className="w-6 h-6 text-neutral-300" />
        </div>
        <h3 className="text-neutral-900 font-semibold text-[18px] mb-1">Find the perfect trip</h3>
        <p className="text-neutral-500 text-[14px]">Enter route details above to see available buses.</p>
      </div>
    </div>
  );
}
