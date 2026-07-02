"use client";

import { MoreHorizontal } from "lucide-react";

export interface Booking {
  id: string;
  passenger: string;
  route: string;
  date: string;
  amount: string;
  status: string;
}

interface BookingsListProps {
  bookings: Booking[];
  emptyStateNode: React.ReactNode;
}

export default function BookingsList({
  bookings,
  emptyStateNode,
}: BookingsListProps) {
  return (
    <div className="w-full overflow-x-auto bg-white border border-neutral-200 rounded-xl">
      <table className="w-full min-w-[800px] text-left border-collapse">
        <thead>
          <tr className="border-b border-neutral-200 bg-neutral-50/50">
            <th className="px-6 py-4 text-[12px] font-bold text-neutral-500 uppercase tracking-wider">
              Booking ID
            </th>
            <th className="px-6 py-4 text-[12px] font-bold text-neutral-500 uppercase tracking-wider">
              Passenger
            </th>
            <th className="px-6 py-4 text-[12px] font-bold text-neutral-500 uppercase tracking-wider">
              Route
            </th>
            <th className="px-6 py-4 text-[12px] font-bold text-neutral-500 uppercase tracking-wider">
              Date
            </th>
            <th className="px-6 py-4 text-[12px] font-bold text-neutral-500 uppercase tracking-wider">
              Amount
            </th>
            <th className="px-6 py-4 text-[12px] font-bold text-neutral-500 uppercase tracking-wider">
              Status
            </th>
            <th className="px-6 py-4 text-[12px] font-bold text-neutral-500 uppercase tracking-wider text-right">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-neutral-100">
          {bookings.length > 0 ? (
            bookings.map((booking, idx) => (
              <tr key={idx} className="hover:bg-neutral-50 transition-colors group">
                <td className="px-6 py-4 h-[56px] text-[14px] font-bold text-neutral-900">
                  {booking.id}
                </td>
                <td className="px-6 py-4 h-[56px] text-[14px] font-medium text-neutral-700">
                  {booking.passenger}
                </td>
                <td className="px-6 py-4 h-[56px] text-[14px] font-medium text-neutral-700">
                  {booking.route}
                </td>
                <td className="px-6 py-4 h-[56px] text-[14px] font-medium text-neutral-600">
                  {booking.date}
                </td>
                <td className="px-6 py-4 h-[56px] text-[14px] font-bold text-neutral-900">
                  {booking.amount}
                </td>
                <td className="px-6 py-4 h-[56px]">
                  <span
                    className={`inline-flex items-center px-2.5 py-1 rounded-full text-[12px] font-bold
                    ${
                      booking.status === "Completed"
                        ? "bg-green-100 text-green-700"
                        : booking.status === "Active"
                        ? "bg-blue-100 text-blue-700"
                        : booking.status === "Cancelled"
                        ? "bg-red-100 text-red-700"
                        : booking.status === "Refund"
                        ? "bg-purple-100 text-purple-700"
                        : "bg-amber-100 text-amber-700"
                    }
                  `}
                  >
                    {booking.status}
                  </span>
                </td>
                <td className="px-6 py-4 h-[56px] text-right relative">
                  <button className="p-2 text-neutral-400 hover:text-neutral-900 rounded-lg hover:bg-neutral-100 transition-colors opacity-0 group-hover:opacity-100 peer">
                    <MoreHorizontal className="w-4 h-4" />
                  </button>
                  {/* Popover Menu (Mock) */}
                  <div className="absolute right-10 top-10 w-48 bg-white rounded-xl shadow-[0_8px_30px_rgba(0,0,0,0.12)] border border-neutral-100 hidden peer-hover:block hover:block z-50 overflow-hidden text-left">
                    <div className="py-1">
                      <button className="w-full text-left px-4 py-2.5 text-[13px] font-semibold text-neutral-700 hover:bg-neutral-50 transition-colors">
                        View Booking
                      </button>
                      <button className="w-full text-left px-4 py-2.5 text-[13px] font-semibold text-neutral-700 hover:bg-neutral-50 transition-colors">
                        Print Ticket
                      </button>
                      <button className="w-full text-left px-4 py-2.5 text-[13px] font-semibold text-neutral-700 hover:bg-neutral-50 transition-colors">
                        Duplicate Booking
                      </button>
                      <div className="h-[1px] w-full bg-neutral-100 my-1"></div>
                      <button className="w-full text-left px-4 py-2.5 text-[13px] font-semibold text-red-600 hover:bg-red-50 transition-colors">
                        Cancel Ticket
                      </button>
                    </div>
                  </div>
                </td>
              </tr>
            ))
          ) : (
            emptyStateNode
          )}
        </tbody>
      </table>
    </div>
  );
}
