import React from "react";

const recentBookings = [
  { id: "B-89012", passenger: "Aarav Sharma", route: "KTM → PKR", date: "Today, 10:30 AM", status: "Confirmed", amount: "NPR 1,250" },
  { id: "B-89013", passenger: "Sanjay Thapa", route: "PKR → KTM", date: "Today, 11:15 AM", status: "Confirmed", amount: "NPR 1,500" },
  { id: "B-89014", passenger: "Priya Gurung", route: "KTM → CTW", date: "Today, 02:00 PM", status: "Pending", amount: "NPR 900" },
  { id: "B-89015", passenger: "Bikash Nepal", route: "CTW → KTM", date: "Yesterday, 04:30 PM", status: "Confirmed", amount: "NPR 900" },
  { id: "B-89016", passenger: "Sunita Rai", route: "KTM → BTL", date: "Yesterday, 06:00 PM", status: "Cancelled", amount: "NPR 1,100" },
];

export default function RecentBookingsCard() {
  return (
    <div className="bg-white rounded-2xl shadow-[0_2px_12px_rgba(0,0,0,0.04)] border border-neutral-100 w-full overflow-hidden mt-6">
      <div className="p-5 border-b border-neutral-100 flex items-center justify-between bg-white">
        <h3 className="text-[17px] font-display font-semibold text-neutral-900 tracking-tight">Recent Bookings</h3>
        <button className="text-sm font-medium text-[#7A1D1B] hover:underline">View All</button>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse whitespace-nowrap">
          <thead>
            <tr className="border-b border-neutral-100 bg-[#FAF7F2]/50">
              <th className="font-semibold text-neutral-500 text-[13px] px-5 py-4">Booking ID</th>
              <th className="font-semibold text-neutral-500 text-[13px] px-5 py-4">Passenger</th>
              <th className="font-semibold text-neutral-500 text-[13px] px-5 py-4">Route</th>
              <th className="font-semibold text-neutral-500 text-[13px] px-5 py-4">Date</th>
              <th className="font-semibold text-neutral-500 text-[13px] px-5 py-4">Amount</th>
              <th className="font-semibold text-neutral-500 text-[13px] px-5 py-4 text-right">Status</th>
            </tr>
          </thead>
          <tbody>
            {recentBookings.map((booking) => (
              <tr key={booking.id} className="border-b border-neutral-50 hover:bg-neutral-50/50 transition-colors h-[56px]">
                <td className="px-5 py-2 text-[14px] font-medium text-neutral-900">{booking.id}</td>
                <td className="px-5 py-2 text-[14px] text-neutral-700">{booking.passenger}</td>
                <td className="px-5 py-2 text-[14px] text-neutral-600">{booking.route}</td>
                <td className="px-5 py-2 text-[14px] text-neutral-500">{booking.date}</td>
                <td className="px-5 py-2 text-[14px] font-medium text-neutral-900">{booking.amount}</td>
                <td className="px-5 py-2 text-right">
                  <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-[12px] font-medium ${
                    booking.status === "Confirmed" ? "bg-green-50 text-green-700 border border-green-200" :
                    booking.status === "Pending" ? "bg-amber-50 text-amber-700 border border-amber-200" :
                    "bg-red-50 text-red-700 border border-red-200"
                  }`}>
                    {booking.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
