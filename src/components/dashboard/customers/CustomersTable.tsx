"use client";

import { useState } from "react";
import CustomersHeader from "./CustomersHeader";
import CustomersList from "./CustomersList";
import CustomersPagination from "./CustomersPagination";

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

const mockCustomers: Customer[] = [
  {
    id: "CUS-8923",
    name: "Aayush Sharma",
    phone: "+977 9841234567",
    avatar: "https://api.dicebear.com/7.x/notionists/svg?seed=Aayush&backgroundColor=fde7e6",
    lastRoute: "Kathmandu → Pokhara",
    totalTrips: 12,
    totalSpend: "NPR 15,600",
    commissionEarned: "NPR 1,560",
    lastActive: "Today, 10:30 AM",
  },
  {
    id: "CUS-8924",
    name: "Sita Maharjan",
    phone: "+977 9812345678",
    avatar: "https://api.dicebear.com/7.x/notionists/svg?seed=Sita&backgroundColor=fff0d6",
    lastRoute: "Pokhara → Chitwan",
    totalTrips: 5,
    totalSpend: "NPR 6,250",
    commissionEarned: "NPR 625",
    lastActive: "Yesterday",
  },
  {
    id: "CUS-8925",
    name: "Rajesh Hamal",
    phone: "+977 9851098765",
    avatar: "https://api.dicebear.com/7.x/notionists/svg?seed=Rajesh&backgroundColor=e0f2fe",
    lastRoute: "Kathmandu → Butwal",
    totalTrips: 24,
    totalSpend: "NPR 32,400",
    commissionEarned: "NPR 3,240",
    lastActive: "2 days ago",
  },
  {
    id: "CUS-8926",
    name: "Nita Dhungana",
    phone: "+977 9801234567",
    avatar: "https://api.dicebear.com/7.x/notionists/svg?seed=Nita&backgroundColor=dcfce7",
    lastRoute: "Chitwan → Kathmandu",
    totalTrips: 8,
    totalSpend: "NPR 9,800",
    commissionEarned: "NPR 980",
    lastActive: "Oct 15, 2023",
  },
  {
    id: "CUS-8927",
    name: "Bikash Thapa",
    phone: "+977 9849876543",
    avatar: "https://api.dicebear.com/7.x/notionists/svg?seed=Bikash&backgroundColor=f3e8ff",
    lastRoute: "Kathmandu → Dharan",
    totalTrips: 2,
    totalSpend: "NPR 3,400",
    commissionEarned: "NPR 340",
    lastActive: "Oct 12, 2023",
  },
];

export default function CustomersTable({ activeTab = "All" }: { activeTab?: string }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [showEmptyState, setShowEmptyState] = useState(false);

  const filteredCustomers = showEmptyState 
    ? [] 
    : mockCustomers.filter((customer) => {
        if (searchQuery.trim() === "") return true;
        
        const query = searchQuery.toLowerCase();
        return (
          customer.name.toLowerCase().includes(query) ||
          customer.phone.includes(query) ||
          customer.id.toLowerCase().includes(query)
        );
      });

  return (
    <div className="flex flex-col h-full bg-neutral-50/30 rounded-[24px]">

      <CustomersHeader 
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        showEmptyState={showEmptyState}
        setShowEmptyState={setShowEmptyState}
      />

      <CustomersList 
        customers={filteredCustomers}
        searchQuery={searchQuery}
        activeTab={activeTab}
        onClearSearch={() => setSearchQuery("")}
      />

      {filteredCustomers.length > 0 && (
        <CustomersPagination />
      )}
    </div>
  );
}
