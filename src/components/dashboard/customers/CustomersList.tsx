"use client";

import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import CustomerEmptyState from "./CustomerEmptyState";

interface Customer {
  id: string;
  name: string;
  phone: string;
  avatar: string;
  lastRoute: string;
  totalTrips: number;
  totalSpend: string;
  commissionEarned: string;
  lastActive: string;
}

interface CustomersListProps {
  customers: Customer[];
  searchQuery: string;
  activeTab: string;
  onClearSearch: () => void;
}

export default function CustomersList({ customers, searchQuery, activeTab, onClearSearch }: CustomersListProps) {
  const router = useRouter();

  return (
    <div className="w-full bg-white border border-neutral-200 rounded-xl overflow-x-auto">
      <table className="w-full text-left border-collapse min-w-[800px]">
        <thead>
          <tr className="border-b border-neutral-200 bg-neutral-50/50">
            <th className="px-6 py-4 text-[12px] font-bold text-neutral-500 uppercase tracking-wider">Customer</th>
            <th className="px-6 py-4 text-[12px] font-bold text-neutral-500 uppercase tracking-wider">Last Route</th>
            <th className="px-6 py-4 text-[12px] font-bold text-neutral-500 uppercase tracking-wider">Total Trips</th>
            <th className="px-6 py-4 text-[12px] font-bold text-neutral-500 uppercase tracking-wider">Total Spend</th>
            <th className="px-6 py-4 text-[12px] font-bold text-neutral-500 uppercase tracking-wider">Commission</th>
            <th className="px-6 py-4 text-[12px] font-bold text-neutral-500 uppercase tracking-wider">Last Booking</th>
            <th className="px-6 py-4 text-[12px] font-bold text-neutral-500 uppercase tracking-wider text-right">Book</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-neutral-100">
          {customers.length > 0 ? (
            customers.map((customer, idx) => (
              <tr 
                key={idx} 
                onClick={() => router.push(`/dashboard/customers/${customer.id}`)}
                className="hover:bg-neutral-50 transition-colors group cursor-pointer"
              >
                <td className="px-6 py-4 h-[72px]">
                  <div className="flex items-center gap-3">
                    <div className="relative w-10 h-10 rounded-full bg-neutral-100 overflow-hidden border border-neutral-200/50 shrink-0">
                      <img src={customer.avatar} alt={customer.name} className="w-full h-full object-cover" />
                    </div>
                    <div>
                      <div className="text-[14px] font-bold text-neutral-900 leading-tight mb-0.5">{customer.name}</div>
                      <div className="text-[13px] font-medium text-neutral-500">{customer.phone}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 h-[72px] text-[14px] font-medium text-neutral-700">{customer.lastRoute}</td>
                <td className="px-6 py-4 h-[72px] text-[14px] font-bold text-neutral-900">{customer.totalTrips}</td>
                <td className="px-6 py-4 h-[72px] text-[14px] font-bold text-neutral-900">{customer.totalSpend}</td>
                <td className="px-6 py-4 h-[72px] text-[14px] font-bold text-[#7A1D1B]">{customer.commissionEarned}</td>
                <td className="px-6 py-4 h-[72px] text-[14px] font-medium text-neutral-600">{customer.lastActive}</td>
                <td className="px-6 py-4 h-[72px] text-right">
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      router.push('/dashboard/bookings');
                    }}
                    className="p-2 text-[#7A1D1B] hover:bg-[#7A1D1B]/10 rounded-lg transition-colors inline-flex items-center justify-center ml-auto"
                    title="Book New Trip"
                  >
                    <Plus className="w-5 h-5" />
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <CustomerEmptyState activeTab={activeTab} searchQuery={searchQuery} onClearSearch={onClearSearch} />
          )}
        </tbody>
      </table>
    </div>
  );
}
