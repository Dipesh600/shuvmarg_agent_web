import { useState } from "react";
import { MoreHorizontal, Download, Ban, Eye, Edit } from "lucide-react";
import BookingDetailsSlideOver from "./BookingDetailsSlideOver";

// Dummy Data for Bookings
const MOCK_BOOKINGS = [
  {
    id: "B-8492",
    passenger: "Aarav Sharma",
    phone: "+977 9841234567",
    route: "Kathmandu → Pokhara",
    date: "Oct 24, 2024",
    time: "07:00 AM",
    seat: "A1, A2",
    status: "Confirmed",
    amount: "NPR 1,600",
  },
  {
    id: "B-8491",
    passenger: "Sneha Shrestha",
    phone: "+977 9801234567",
    route: "Kathmandu → Chitwan",
    date: "Oct 24, 2024",
    time: "08:30 AM",
    seat: "B4",
    status: "Pending",
    amount: "NPR 900",
  },
  {
    id: "B-8488",
    passenger: "Prashant Thapa",
    phone: "+977 9811234567",
    route: "Pokhara → Butwal",
    date: "Oct 23, 2024",
    time: "09:00 PM",
    seat: "C1",
    status: "Cancelled",
    amount: "NPR 1,200",
  },
  {
    id: "B-8485",
    passenger: "Nisha Gurung",
    phone: "+977 9851234567",
    route: "Kathmandu → Dharan",
    date: "Oct 23, 2024",
    time: "06:00 PM",
    seat: "D3, D4, D5",
    status: "Confirmed",
    amount: "NPR 4,500",
  },
];

export default function BookingHistoryTable() {
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [selectedBookingId, setSelectedBookingId] = useState<string | null>(null);

  const openDetails = (id: string) => {
    setSelectedBookingId(id);
    setActiveMenu(null);
  };

  return (
    <div className="bg-white border border-neutral-200 rounded-[16px] shadow-sm overflow-hidden">
      {/* Table Header Controls */}
      <div className="p-4 md:p-6 border-b border-neutral-100 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-[18px] font-bold text-neutral-900">Recent Bookings</h2>
          <p className="text-neutral-500 text-[14px]">Manage your passenger reservations</p>
        </div>
        
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <input 
            type="text" 
            placeholder="Search ID, Name..." 
            className="h-[40px] px-4 bg-neutral-50 border border-neutral-200 rounded-[8px] text-[14px] focus:outline-none focus:border-[#7A1D1B] w-full sm:w-[250px]"
          />
          <button className="h-[40px] px-4 border border-neutral-200 rounded-[8px] text-[14px] font-semibold text-neutral-700 hover:bg-neutral-50 whitespace-nowrap">
            Filter
          </button>
        </div>
      </div>

      {/* Desktop Table View */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-neutral-50 border-b border-neutral-200">
              <th className="py-3 px-6 text-[12px] font-semibold text-neutral-500 uppercase tracking-wider">Booking ID</th>
              <th className="py-3 px-6 text-[12px] font-semibold text-neutral-500 uppercase tracking-wider">Passenger</th>
              <th className="py-3 px-6 text-[12px] font-semibold text-neutral-500 uppercase tracking-wider">Route & Time</th>
              <th className="py-3 px-6 text-[12px] font-semibold text-neutral-500 uppercase tracking-wider">Seat</th>
              <th className="py-3 px-6 text-[12px] font-semibold text-neutral-500 uppercase tracking-wider">Amount</th>
              <th className="py-3 px-6 text-[12px] font-semibold text-neutral-500 uppercase tracking-wider">Status</th>
              <th className="py-3 px-6 text-[12px] font-semibold text-neutral-500 uppercase tracking-wider text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-100">
            {MOCK_BOOKINGS.map((booking) => (
              <tr key={booking.id} className="hover:bg-neutral-50/50 transition-colors group">
                <td className="py-4 px-6 text-[14px] font-medium text-neutral-900">{booking.id}</td>
                <td className="py-4 px-6">
                  <div className="text-[14px] font-medium text-neutral-900">{booking.passenger}</div>
                  <div className="text-[12px] text-neutral-500">{booking.phone}</div>
                </td>
                <td className="py-4 px-6">
                  <div className="text-[14px] font-medium text-neutral-900">{booking.route}</div>
                  <div className="text-[12px] text-neutral-500">{booking.date} • {booking.time}</div>
                </td>
                <td className="py-4 px-6 text-[14px] text-neutral-700">{booking.seat}</td>
                <td className="py-4 px-6 text-[14px] font-medium text-neutral-900">{booking.amount}</td>
                <td className="py-4 px-6">
                  <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-[12px] font-medium ${
                    booking.status === 'Confirmed' ? 'bg-green-100 text-green-700' :
                    booking.status === 'Pending' ? 'bg-amber-100 text-amber-700' :
                    'bg-red-100 text-red-700'
                  }`}>
                    {booking.status}
                  </span>
                </td>
                <td className="py-4 px-6 text-right relative">
                  <button 
                    onClick={() => setActiveMenu(activeMenu === booking.id ? null : booking.id)}
                    className="p-2 text-neutral-400 hover:text-neutral-700 hover:bg-neutral-100 rounded-full transition-colors"
                  >
                    <MoreHorizontal className="w-5 h-5" />
                  </button>

                  {/* Dropdown Menu */}
                  {activeMenu === booking.id && (
                    <div className="absolute right-6 top-12 w-48 bg-white border border-neutral-100 rounded-[12px] shadow-[0_8px_24px_rgba(0,0,0,0.12)] z-10 py-1 overflow-hidden">
                      <button 
                        onClick={() => openDetails(booking.id)}
                        className="w-full px-4 py-2 text-left text-[14px] text-neutral-700 hover:bg-neutral-50 flex items-center gap-2"
                      >
                        <Eye className="w-4 h-4 text-neutral-400" /> View Details
                      </button>
                      <button className="w-full px-4 py-2 text-left text-[14px] text-neutral-700 hover:bg-neutral-50 flex items-center gap-2">
                        <Download className="w-4 h-4 text-neutral-400" /> Download Ticket
                      </button>
                      <button className="w-full px-4 py-2 text-left text-[14px] text-neutral-700 hover:bg-neutral-50 flex items-center gap-2">
                        <Edit className="w-4 h-4 text-neutral-400" /> Modify Seat
                      </button>
                      <div className="h-px bg-neutral-100 my-1"></div>
                      <button className="w-full px-4 py-2 text-left text-[14px] text-red-600 hover:bg-red-50 flex items-center gap-2">
                        <Ban className="w-4 h-4 text-red-500" /> Cancel Booking
                      </button>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Card View */}
      <div className="md:hidden divide-y divide-neutral-100">
        {MOCK_BOOKINGS.map((booking) => (
          <div key={booking.id} className="p-4">
            <div className="flex justify-between items-start mb-3">
              <div>
                <span className="text-[12px] text-neutral-500 block mb-1">Booking {booking.id}</span>
                <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-medium ${
                    booking.status === 'Confirmed' ? 'bg-green-100 text-green-700' :
                    booking.status === 'Pending' ? 'bg-amber-100 text-amber-700' :
                    'bg-red-100 text-red-700'
                  }`}>
                    {booking.status}
                </span>
              </div>
              <div className="text-right">
                <div className="text-[14px] font-bold text-neutral-900">{booking.amount}</div>
              </div>
            </div>
            
            <div className="mb-3">
              <div className="text-[14px] font-medium text-neutral-900">{booking.passenger}</div>
              <div className="text-[12px] text-neutral-500">{booking.route} • {booking.date}</div>
            </div>
            
            <div className="flex gap-2">
              <button 
                onClick={() => openDetails(booking.id)}
                className="flex-1 h-[36px] border border-neutral-200 rounded-[8px] text-[13px] font-semibold text-neutral-700 flex items-center justify-center"
              >
                Details
              </button>
              <button className="w-[36px] h-[36px] border border-neutral-200 rounded-[8px] flex items-center justify-center text-neutral-600 relative">
                <MoreHorizontal className="w-4 h-4" onClick={() => setActiveMenu(activeMenu === booking.id ? null : booking.id)} />
                {/* Simplified Mobile Dropdown for demo */}
                {activeMenu === booking.id && (
                  <div className="absolute right-0 bottom-10 w-48 bg-white border border-neutral-100 rounded-[12px] shadow-[0_8px_24px_rgba(0,0,0,0.12)] z-10 py-1 overflow-hidden">
                    <div className="w-full px-4 py-2 text-left text-[14px] text-red-600 hover:bg-red-50 flex items-center gap-2">
                      <Ban className="w-4 h-4 text-red-500" /> Cancel Booking
                    </div>
                  </div>
                )}
              </button>
            </div>
          </div>
        ))}
      </div>
      
      {/* Slide-over */}
      <BookingDetailsSlideOver 
        isOpen={!!selectedBookingId} 
        onClose={() => setSelectedBookingId(null)}
        bookingId={selectedBookingId}
      />
    </div>
  );
}
