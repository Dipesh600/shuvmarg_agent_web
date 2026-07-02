"use client";

import { Users, Clock, ShieldCheck, Search } from "lucide-react";

interface CustomerEmptyStateProps {
  activeTab: string;
  searchQuery?: string;
  onClearSearch?: () => void;
}

export default function CustomerEmptyState({ activeTab, searchQuery = "", onClearSearch }: CustomerEmptyStateProps) {
  const emptyStates: Record<string, { icon: React.ReactNode; title: string; description: string; action: string }> = {
    All: {
      icon: <Users className="w-12 h-12 text-neutral-300 mb-4" strokeWidth={1.5} />,
      title: "No Customers Yet",
      description: "You haven't booked any trips for customers yet.",
      action: "Book a Trip"
    },
    Recent: {
      icon: <Clock className="w-12 h-12 text-neutral-300 mb-4" strokeWidth={1.5} />,
      title: "No Recent Customers",
      description: "You haven't had any new customer bookings recently.",
      action: "View All Customers"
    },
    Frequent: {
      icon: <ShieldCheck className="w-12 h-12 text-neutral-300 mb-4" strokeWidth={1.5} />,
      title: "No Frequent Customers",
      description: "You don't have any repeat customers yet. They will appear here once they book multiple trips.",
      action: "View All Customers"
    }
  };

  if (searchQuery.trim() !== "") {
    return (
      <tr>
        <td colSpan={7} className="px-6 py-24">
          <div className="flex flex-col items-center justify-center text-center max-w-sm mx-auto animate-in fade-in zoom-in duration-500">
            <div className="w-20 h-20 bg-neutral-50 rounded-full flex items-center justify-center mb-6">
              <Search className="w-10 h-10 text-neutral-300" strokeWidth={1.5} />
            </div>
            <h3 className="text-[18px] font-black text-neutral-900 mb-2">No results found</h3>
            <p className="text-[15px] font-medium text-neutral-500 mb-8 leading-relaxed">
              We couldn't find any customers matching "{searchQuery}". Try checking for typos or using different keywords.
            </p>
            {onClearSearch && (
              <button 
                onClick={onClearSearch}
                className="h-12 px-8 bg-white border border-neutral-200 rounded-xl text-[15px] font-bold text-neutral-900 hover:bg-neutral-50 hover:border-neutral-300 transition-all shadow-sm flex items-center gap-2 group"
              >
                Clear Search
              </button>
            )}
          </div>
        </td>
      </tr>
    );
  }

  const currentEmptyState = emptyStates[activeTab] || emptyStates["All"];

  return (
    <tr>
      <td colSpan={7} className="px-6 py-24">
        <div className="flex flex-col items-center justify-center text-center max-w-sm mx-auto animate-in fade-in zoom-in duration-500">
          <div className="w-20 h-20 bg-neutral-50 rounded-full flex items-center justify-center mb-6">
            {currentEmptyState.icon}
          </div>
          <h3 className="text-[18px] font-black text-neutral-900 mb-2">{currentEmptyState.title}</h3>
          <p className="text-[15px] font-medium text-neutral-500 mb-8 leading-relaxed">
            {currentEmptyState.description}
          </p>
          <button className="h-12 px-8 bg-white border border-neutral-200 rounded-xl text-[15px] font-bold text-neutral-900 hover:bg-neutral-50 hover:border-neutral-300 transition-all shadow-sm flex items-center gap-2 group">
            {currentEmptyState.action}
          </button>
        </div>
      </td>
    </tr>
  );
}
