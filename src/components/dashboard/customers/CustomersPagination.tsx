"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";

interface CustomersPaginationProps {
  // Add props if we need real pagination state, but for now we just keep the design matching the monolithic version
}

export default function CustomersPagination({}: CustomersPaginationProps) {
  return (
    <div className="flex items-center justify-between mt-6">
      <div className="text-[13px] font-medium text-neutral-500">
        Showing 1 to 5 of 1,240 customers
      </div>
      <div className="flex items-center gap-1">
        <button className="w-8 h-8 flex items-center justify-center rounded-lg text-neutral-400 hover:text-neutral-900 hover:bg-neutral-100 transition-colors disabled:opacity-50">
          <ChevronLeft className="w-4 h-4" />
        </button>
        <button className="w-8 h-8 flex items-center justify-center rounded-lg bg-[#7A1D1B] text-white text-[13px] font-bold shadow-sm">
          1
        </button>
        <button className="w-8 h-8 flex items-center justify-center rounded-lg text-neutral-600 hover:bg-neutral-100 text-[13px] font-bold transition-colors">
          2
        </button>
        <button className="w-8 h-8 flex items-center justify-center rounded-lg text-neutral-600 hover:bg-neutral-100 text-[13px] font-bold transition-colors">
          3
        </button>
        <div className="w-8 h-8 flex items-center justify-center text-neutral-400 text-[13px] font-bold">
          ...
        </div>
        <button className="w-8 h-8 flex items-center justify-center rounded-lg text-neutral-600 hover:bg-neutral-100 text-[13px] font-bold transition-colors">
          12
        </button>
        <button className="w-8 h-8 flex items-center justify-center rounded-lg text-neutral-600 hover:bg-neutral-900 hover:bg-neutral-100 transition-colors">
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
