"use client";

import { Building2, CheckCircle2, Clock, ArrowUpRight } from "lucide-react";

// Mock Data
const mockPayouts = [
  {
    id: "PAY-904",
    date: "2026-06-28T14:30:00",
    amount: 5000,
    status: "PROCESSING",
    bankName: "Nabil Bank",
    accountEnding: "4021",
  },
  {
    id: "PAY-903",
    date: "2026-06-21T09:00:00",
    amount: 12500,
    status: "COMPLETED",
    bankName: "Nabil Bank",
    accountEnding: "4021",
  },
  {
    id: "PAY-902",
    date: "2026-06-14T09:00:00",
    amount: 8400,
    status: "COMPLETED",
    bankName: "Nabil Bank",
    accountEnding: "4021",
  },
  {
    id: "PAY-901",
    date: "2026-06-07T09:00:00",
    amount: 10200,
    status: "COMPLETED",
    bankName: "Nabil Bank",
    accountEnding: "4021",
  },
];

export default function RecentPayouts() {
  return (
    <div className="flex flex-col gap-6">
      {/* Recent Payouts Card */}
      <div className="bg-white rounded-[24px] border border-neutral-100 overflow-hidden shadow-sm">
        <div className="p-5 md:p-6 border-b border-neutral-100 flex items-center justify-between">
          <div>
            <h2 className="text-[18px] font-bold text-neutral-900">Recent Payouts</h2>
            <p className="text-[13px] text-neutral-500 font-medium mt-0.5">
              Your recent settlement history
            </p>
          </div>
        </div>

        <div className="divide-y divide-neutral-100">
          {mockPayouts.map((payout) => (
            <div key={payout.id} className="p-5 hover:bg-neutral-50/50 transition-colors">
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-3">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                      payout.status === "COMPLETED"
                        ? "bg-neutral-100"
                        : "bg-amber-50"
                    }`}
                  >
                    {payout.status === "COMPLETED" ? (
                      <CheckCircle2 className="w-5 h-5 text-neutral-500" />
                    ) : (
                      <Clock className="w-5 h-5 text-amber-600" />
                    )}
                  </div>
                  <div>
                    <div className="text-[15px] font-bold text-neutral-900">
                      NPR {payout.amount.toLocaleString()}
                    </div>
                    <div className="text-[13px] text-neutral-500 font-medium mt-0.5 flex items-center gap-1.5">
                      <span>{new Date(payout.date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}</span>
                      <span className="w-1 h-1 rounded-full bg-neutral-300" />
                      <span>{payout.bankName}</span>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col items-end gap-2">
                  <span
                    className={`px-2 py-0.5 rounded text-[11px] font-bold tracking-wide uppercase ${
                      payout.status === "COMPLETED"
                        ? "bg-neutral-100 text-neutral-600"
                        : "bg-amber-100 text-amber-700"
                    }`}
                  >
                    {payout.status}
                  </span>
                  <div className="text-[12px] font-mono text-neutral-400 font-medium">
                    {payout.id}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="p-4 border-t border-neutral-100 bg-neutral-50/50">
          <button className="w-full text-center text-[13px] font-bold text-[#7A1D1B] hover:text-[#9A2622] transition-colors">
            View All Payouts
          </button>
        </div>
      </div>

      {/* Linked Bank Account Card */}
      <div className="bg-white rounded-[24px] border border-neutral-100 overflow-hidden shadow-sm p-5 md:p-6">
        <h2 className="text-[16px] font-bold text-neutral-900 mb-4">Payout Account</h2>
        <div className="flex items-center gap-4 p-4 rounded-xl border border-neutral-200 bg-neutral-50">
          <div className="w-12 h-12 rounded-full bg-white border border-neutral-200 flex items-center justify-center flex-shrink-0 shadow-sm">
            <Building2 className="w-5 h-5 text-neutral-600" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-[14px] font-bold text-neutral-900 truncate">
              Nabil Bank Limited
            </div>
            <div className="text-[13px] text-neutral-500 font-medium flex items-center gap-2 mt-0.5">
              <span>•••• 4021</span>
              <span className="w-1 h-1 rounded-full bg-neutral-300" />
              <span className="text-green-600 font-semibold">Active</span>
            </div>
          </div>
          <button className="p-2 hover:bg-neutral-200 rounded-lg text-neutral-500 transition-colors">
            <ArrowUpRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
