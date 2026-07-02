"use client";

import { useState } from "react";
import EarningsHistoryHeader from "./EarningsHistoryHeader";
import EarningsHistoryList from "./EarningsHistoryList";

// Mock Data
const mockEarnings = [
  {
    id: "EARN-1042",
    date: "2026-06-30T10:24:00",
    bookingId: "B-8X92M",
    passenger: "Aarav Sharma",
    route: "Kathmandu → Pokhara",
    amount: 150,
  },
  {
    id: "EARN-1041",
    date: "2026-06-29T15:45:00",
    bookingId: "B-2K44P",
    passenger: "Sita Thapa",
    route: "Kathmandu → Chitwan",
    amount: 120,
  },
  {
    id: "EARN-1040",
    date: "2026-06-28T09:15:00",
    bookingId: "B-9L11R",
    passenger: "Rabin Shrestha",
    route: "Pokhara → Butwal",
    amount: 180,
  },
  {
    id: "EARN-1039",
    date: "2026-06-28T08:30:00",
    bookingId: "B-7C33V",
    passenger: "Nisha Magar",
    route: "Kathmandu → Pokhara",
    amount: 150,
  },
  {
    id: "EARN-1038",
    date: "2026-06-27T18:20:00",
    bookingId: "B-5M88Q",
    passenger: "Bishal Gurung",
    route: "Kathmandu → Dharan",
    amount: 200,
  },
];

export default function EarningsHistoryTable() {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredEarnings = mockEarnings.filter(
    (earn) =>
      earn.passenger.toLowerCase().includes(searchTerm.toLowerCase()) ||
      earn.bookingId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      earn.route.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="bg-white rounded-[24px] border border-neutral-100 overflow-hidden shadow-sm flex flex-col h-full">
      <EarningsHistoryHeader 
        searchTerm={searchTerm} 
        setSearchTerm={setSearchTerm} 
      />
      <EarningsHistoryList 
        earnings={filteredEarnings} 
        searchTerm={searchTerm} 
      />
    </div>
  );
}
