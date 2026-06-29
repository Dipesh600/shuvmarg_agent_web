import React from "react";

const mockCustomers = [
  { id: 1, name: "Aarav", img: "https://api.dicebear.com/7.x/notionists/svg?seed=Aarav&backgroundColor=fde7e6" },
  { id: 2, name: "Sanjay", img: "https://api.dicebear.com/7.x/notionists/svg?seed=Sanjay&backgroundColor=fff0d6" },
  { id: 3, name: "Priya", img: "https://api.dicebear.com/7.x/notionists/svg?seed=Priya&backgroundColor=e0f2fe" },
  { id: 4, name: "Bikash", img: "https://api.dicebear.com/7.x/notionists/svg?seed=Bikash&backgroundColor=dcfce7" },
  { id: 5, name: "Ramesh", img: "https://api.dicebear.com/7.x/notionists/svg?seed=Ramesh&backgroundColor=f3e8ff" },
  { id: 6, name: "Sunita", img: "https://api.dicebear.com/7.x/notionists/svg?seed=Sunita&backgroundColor=f8c9c7" },
  { id: 7, name: "Suresh", img: "https://api.dicebear.com/7.x/notionists/svg?seed=Suresh&backgroundColor=ffedd5" },
  { id: 8, name: "Pramod", img: "https://api.dicebear.com/7.x/notionists/svg?seed=Pramod&backgroundColor=f8f1e3" },
];

export default function RecentCustomers() {
  return (
    <div className="mt-8">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-[16px] font-bold text-neutral-900">Recent Passengers</h2>
        <button className="text-sm font-medium text-[#7A1D1B] hover:underline">
          View All
        </button>
      </div>

      {/* Horizontal scrolling container */}
      <div className="flex items-center gap-5 overflow-x-auto pb-4 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
        {mockCustomers.map((customer) => (
          <div
            key={customer.id}
            className="flex flex-col items-center gap-2 min-w-[72px] cursor-pointer group shrink-0"
          >
            {/* Avatar */}
            <div className="relative w-14 h-14 rounded-full shadow-sm border-2 border-white group-hover:scale-105 transition-transform duration-200 overflow-hidden bg-neutral-100">
              <img 
                src={customer.img} 
                alt={customer.name} 
                className="w-full h-full object-cover"
              />
            </div>
            {/* Name */}
            <span className="text-sm font-medium text-neutral-700 group-hover:text-[#7A1D1B] transition-colors truncate max-w-full">
              {customer.name}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
