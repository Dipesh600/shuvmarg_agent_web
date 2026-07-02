"use client";

import { useState } from "react";
import CustomersTable from "@/components/dashboard/customers/CustomersTable";

export default function CustomersPage() {
  const [activeTab, setActiveTab] = useState("All");
  const tabs = ["All", "Recent", "Frequent"];
  const mockCounts: Record<string, number> = {
    All: 1240, Recent: 145, Frequent: 312,
  };

  return (
    <div className="flex-1 overflow-y-auto bg-neutral-50/50">
      <div className="max-w-[1440px] mx-auto p-8 flex flex-col gap-8">
        
        {/* Header Section */}
        <div className="flex justify-between items-center mb-2">
          <div>
            <h1 className="text-[28px] font-black text-neutral-900 mb-1">
              Customers
            </h1>
            <p className="text-[14px] text-neutral-500 font-medium">
              Manage your passenger profiles, history, and segments.
            </p>
          </div>
        </div>

        {/* Workspace Area */}
        <div className="bg-white rounded-[24px] shadow-sm border border-neutral-100 overflow-hidden min-h-[500px]">
          {/* Tabs */}
          <div className="flex items-center px-6 pt-5 border-b border-neutral-100 overflow-x-auto hide-scrollbar">
            <div className="flex items-center gap-8">
              {tabs.map((tab) => {
                const isActive = activeTab === tab;
                return (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`relative pb-4 text-[14px] font-bold transition-colors whitespace-nowrap ${
                      isActive
                        ? "text-[#7A1D1B]"
                        : "text-neutral-500 hover:text-neutral-900"
                    }`}
                  >
                    {tab}
                    <span
                      className={`ml-2 text-[11px] px-2 py-0.5 rounded-full font-semibold ${
                        isActive
                          ? "bg-[#7A1D1B]/10 text-[#7A1D1B]"
                          : "bg-neutral-100 text-neutral-600"
                      }`}
                    >
                      {mockCounts[tab]}
                    </span>
                    {isActive && (
                      <div className="absolute bottom-[-1px] left-0 w-full h-[3px] bg-[#7A1D1B] rounded-t-full" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Table */}
          <div className="p-6">
            <CustomersTable activeTab={activeTab} />
          </div>
        </div>

      </div>
    </div>
  );
}
