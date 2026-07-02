"use client";

import { ArrowDownLeft, Calendar } from "lucide-react";

interface Earning {
  id: string;
  date: string;
  bookingId: string;
  passenger: string;
  route: string;
  amount: number;
}

interface EarningsHistoryListProps {
  earnings: Earning[];
  searchTerm: string;
}

export default function EarningsHistoryList({ earnings, searchTerm }: EarningsHistoryListProps) {
  return (
    <div className="flex-1 overflow-auto">
      <div className="w-full min-w-[600px] lg:min-w-0">
        {/* Table Header */}
        <div className="grid grid-cols-12 gap-2 md:gap-3 px-3 md:px-4 py-3 bg-neutral-50/50 border-b border-neutral-100 text-[12px] font-bold text-neutral-500 uppercase tracking-wider">
          <div className="col-span-3">Date & Time</div>
          <div className="col-span-2">Booking ID</div>
          <div className="col-span-3">Passenger</div>
          <div className="col-span-2">Route</div>
          <div className="col-span-2 text-right">Commission</div>
        </div>

        {/* Table Body */}
        <div className="divide-y divide-neutral-100">
          {earnings.length > 0 ? (
            earnings.map((earn) => (
              <div
                key={earn.id}
                className="grid grid-cols-12 gap-2 md:gap-3 px-3 md:px-4 py-4 items-center hover:bg-neutral-50/50 transition-colors"
              >
                {/* Date & Time */}
                <div className="col-span-3 flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-green-50 flex items-center justify-center flex-shrink-0">
                    <ArrowDownLeft className="w-4 h-4 text-green-600" />
                  </div>
                  <div>
                    <div className="text-[14px] font-semibold text-neutral-900">
                      {new Date(earn.date).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </div>
                    <div className="text-[12px] text-neutral-500 font-medium">
                      {new Date(earn.date).toLocaleTimeString("en-US", {
                        hour: "numeric",
                        minute: "2-digit",
                        hour12: true,
                      })}
                    </div>
                  </div>
                </div>

                {/* Booking ID */}
                <div className="col-span-2">
                  <div className="inline-flex items-center px-2 py-1 rounded-md bg-neutral-100 text-neutral-700 text-[12px] font-mono font-medium tracking-wide">
                    {earn.bookingId}
                  </div>
                </div>

                {/* Passenger */}
                <div className="col-span-3">
                  <div className="text-[14px] font-semibold text-neutral-900 break-words">
                    {earn.passenger}
                  </div>
                </div>

                {/* Route */}
                <div className="col-span-2">
                  <div className="text-[13px] font-medium text-neutral-600 break-words">
                    {earn.route}
                  </div>
                </div>

                {/* Commission */}
                <div className="col-span-2 text-right">
                  <div className="text-[14px] font-bold text-green-600">
                    +{earn.amount}
                  </div>
                  <div className="text-[11px] text-neutral-500 font-medium">NPR</div>
                </div>
              </div>
            ))
          ) : (
            <div className="px-6 py-12 text-center">
              <div className="w-12 h-12 rounded-full bg-neutral-100 flex items-center justify-center mx-auto mb-3">
                <Calendar className="w-5 h-5 text-neutral-400" />
              </div>
              <h3 className="text-[15px] font-bold text-neutral-900 mb-1">
                No earnings found
              </h3>
              <p className="text-[13px] text-neutral-500">
                {searchTerm
                  ? "Try adjusting your search filters."
                  : "You haven't earned any commissions yet."}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
