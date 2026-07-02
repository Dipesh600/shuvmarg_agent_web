"use client";

import { useState } from "react";
import { CalendarX, Activity, CheckCircle2, XCircle, Banknote } from "lucide-react";
import BookingsHeader from "./table/BookingsHeader";
import BookingsList, { Booking } from "./table/BookingsList";
import BookingsEmptyState from "./table/BookingsEmptyState";
import BookingsPagination from "./table/BookingsPagination";

// Mock data generation
const generateMockData = (status: string, showEmpty: boolean): Booking[] => {
  if (showEmpty) return [];
  const count = status === "Today" ? 24 : status === "Active" ? 12 : status === "Completed" ? 156 : status === "Refunds" ? 2 : 8;
  return Array.from({ length: Math.min(count, 10) }).map((_, i) => ({
    id: `BKG-${Math.floor(Math.random() * 10000).toString().padStart(4, "0")}`,
    passenger: ["Aarav Sharma", "Sita Gurung", "Ram Thapa", "Maya Rai", "Kiran Chhetri"][Math.floor(Math.random() * 5)],
    route: ["Kathmandu → Pokhara", "Pokhara → Chitwan", "Kathmandu → Butwal", "Dharan → Kathmandu"][Math.floor(Math.random() * 4)],
    date: new Date(Date.now() + (Math.random() * 10 - 5) * 86400000).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
    amount: `NPR ${Math.floor(Math.random() * 1500 + 800)}`,
    status: status === "Today" ? "Pending" : status === "Refunds" ? "Refund" : status,
  }));
};

export default function BookingsTable({ activeTab }: { activeTab: string }) {
  const [searchQuery, setSearchQuery] = useState("");
  // Toggle this to false later to restore data
  const [showEmptyState, setShowEmptyState] = useState(true); 
  const bookings = generateMockData(activeTab, showEmptyState);

  const filteredBookings = bookings.filter(booking => {
    if (!searchQuery.trim()) return true;
    const query = searchQuery.toLowerCase();
    return (
      booking.id.toLowerCase().includes(query) ||
      booking.passenger.toLowerCase().includes(query) ||
      booking.route.toLowerCase().includes(query)
    );
  });

  const emptyStates: Record<string, { icon: React.ReactNode; title: string; description: string; action: string }> = {
    Today: {
      icon: <CalendarX className="w-12 h-12 text-neutral-300 mb-4" strokeWidth={1.5} />,
      title: "No Bookings Today",
      description: "You don't have any new bookings scheduled for today.",
      action: "Create Booking"
    },
    Active: {
      icon: <Activity className="w-12 h-12 text-neutral-300 mb-4" strokeWidth={1.5} />,
      title: "No Active Bookings",
      description: "There are currently no active bookings in your schedule.",
      action: "View All Routes"
    },
    Completed: {
      icon: <CheckCircle2 className="w-12 h-12 text-neutral-300 mb-4" strokeWidth={1.5} />,
      title: "No Completed Bookings",
      description: "You haven't completed any bookings yet.",
      action: "View Active Bookings"
    },
    Refunds: {
      icon: <Banknote className="w-12 h-12 text-neutral-300 mb-4" strokeWidth={1.5} />,
      title: "No Refund Requests",
      description: "You don't have any pending refund requests at the moment.",
      action: "View All Bookings"
    },
    Cancelled: {
      icon: <XCircle className="w-12 h-12 text-neutral-300 mb-4" strokeWidth={1.5} />,
      title: "No Cancelled Bookings",
      description: "Good news! You don't have any cancelled bookings.",
      action: "View Active Bookings"
    }
  };

  const currentEmptyState = emptyStates[activeTab] || emptyStates["Today"];
  const isSearchEmpty = searchQuery.trim() !== "" && filteredBookings.length === 0;

  return (
    <div className="w-full flex flex-col">
      <BookingsHeader
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        showEmptyState={showEmptyState}
        onToggleEmptyState={() => setShowEmptyState(!showEmptyState)}
      />

      <BookingsList
        bookings={filteredBookings}
        emptyStateNode={
          <BookingsEmptyState
            currentEmptyState={currentEmptyState}
            isSearchEmpty={isSearchEmpty}
            searchQuery={searchQuery}
            onClearSearch={() => setSearchQuery("")}
          />
        }
      />
      
      <BookingsPagination totalItems={filteredBookings.length} />
    </div>
  );
}
