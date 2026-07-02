"use client";

import React, { useState } from "react";
import { Search, ChevronDown, MessageCircle, HelpCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface FAQItem {
  id: string;
  category: string;
  question: string;
  answer: string;
}

const faqs: FAQItem[] = [
  {
    id: "1",
    category: "Booking",
    question: "How do I book a seat on behalf of a passenger?",
    answer: "You can book a seat by navigating to the Bookings page and selecting an active trip. Click on an available seat from the seat map, enter the passenger's details, and complete the checkout process. The passenger will receive an SMS confirmation with their ticket."
  },
  {
    id: "2",
    category: "Booking",
    question: "Can I modify a booking after it's confirmed?",
    answer: "Yes, you can modify a booking up to 2 hours before departure. Go to the Bookings list, select the booking, and choose 'Modify Booking' from the actions. You can change the passenger details or select a different seat, subject to availability."
  },
  {
    id: "3",
    category: "Refunds",
    question: "What is the cancellation and refund policy?",
    answer: "If a passenger cancels a ticket 24 hours before departure, they are eligible for a 90% refund. Cancellations made between 12-24 hours receive a 50% refund. Cancellations made within 12 hours of departure are non-refundable. Refunds are processed to the original payment method within 3-5 business days."
  },
  {
    id: "4",
    category: "Refunds",
    question: "How do I process a refund?",
    answer: "As an operator, you can process refunds directly from the Booking details page. Click 'Cancel & Refund', review the calculated refund amount based on our policy, and confirm. The system will automatically handle the refund transfer."
  },
  {
    id: "5",
    category: "Payments",
    question: "When are commissions paid out?",
    answer: "Commissions are accumulated in your Earnings wallet and paid out on a weekly basis. You can request an early payout at any time if your balance exceeds NPR 5,000. Check the Earnings tab for a detailed breakdown."
  },
  {
    id: "6",
    category: "General",
    question: "How do I add a new bus or route?",
    answer: "Currently, adding a new bus or route requires verification by our support team. Please contact the Shuv Marg Partner Support team with your vehicle registration details and route permit to get it added to your account."
  },
  {
    id: "7",
    category: "Payments",
    question: "Are there any hidden fees for using the platform?",
    answer: "No, Shuv Marg is completely transparent. We charge a flat commission rate on successful bookings. There are no setup fees, monthly subscriptions, or hidden charges."
  }
];

const categories = ["All", "Booking", "Refunds", "Payments", "General"];

export default function FAQPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [openItems, setOpenItems] = useState<Record<string, boolean>>({});

  const toggleItem = (id: string) => {
    setOpenItems(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const filteredFaqs = faqs.filter(faq => {
    const matchesSearch = faq.question.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = activeCategory === "All" || faq.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="flex-1 w-full max-w-[1000px] mx-auto p-4 md:p-6 lg:p-8 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-24 lg:pb-8">
      {/* Header Section */}
      <div className="flex flex-col items-center justify-center text-center mb-10 pt-4">
        <div className="w-16 h-16 bg-[#D96B62]/10 rounded-full flex items-center justify-center mb-4">
          <HelpCircle className="w-8 h-8 text-[#D96B62]" />
        </div>
        <h1 className="text-[28px] md:text-[32px] font-bold text-neutral-900 mb-3">
          How can we help you?
        </h1>
        <p className="text-[15px] text-neutral-500 max-w-lg mb-8">
          Find answers to common questions about managing your bookings, refunds, payments, and platform features.
        </p>

        {/* Search Bar */}
        <div className="relative w-full max-w-xl group">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <Search className="w-5 h-5 text-neutral-400 group-focus-within:text-[#7A1D1B] transition-colors" />
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search for articles or topics..."
            className="w-full h-14 bg-white shadow-sm hover:shadow-md focus:shadow-md focus:ring-2 focus:ring-[#D96B62]/20 border border-neutral-200 focus:border-[#D96B62] rounded-2xl pl-12 pr-4 text-[15px] outline-none transition-all"
          />
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex flex-col lg:flex-row gap-8 items-start">
        {/* Sidebar / Tabs */}
        <div className="w-full lg:w-64 shrink-0 flex overflow-x-auto lg:flex-col gap-2 pb-2 lg:pb-0 [&::-webkit-scrollbar]:hidden">
          {categories.map(category => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`
                px-5 py-3 rounded-xl text-[14px] font-semibold text-left whitespace-nowrap transition-all
                ${activeCategory === category 
                  ? 'bg-white text-[#7A1D1B] shadow-sm border border-neutral-200/60' 
                  : 'text-neutral-500 hover:text-neutral-800 hover:bg-neutral-100/50 border border-transparent'}
              `}
            >
              {category}
            </button>
          ))}
        </div>

        {/* FAQ List */}
        <div className="flex-1 w-full bg-white rounded-[24px] border border-neutral-200/60 shadow-sm overflow-hidden">
          {filteredFaqs.length > 0 ? (
            <div className="divide-y divide-neutral-100">
              {filteredFaqs.map(faq => (
                <div key={faq.id} className="p-1">
                  <button
                    onClick={() => toggleItem(faq.id)}
                    className="w-full px-5 py-4 flex items-center justify-between text-left hover:bg-neutral-50 rounded-xl transition-colors group"
                  >
                    <span className="text-[15px] font-bold text-neutral-900 group-hover:text-[#7A1D1B] transition-colors pr-6">
                      {faq.question}
                    </span>
                    <ChevronDown 
                      className={`w-5 h-5 text-neutral-400 shrink-0 transition-transform duration-300 ${openItems[faq.id] ? 'rotate-180' : ''}`} 
                    />
                  </button>
                  <AnimatePresence>
                    {openItems[faq.id] && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="overflow-hidden"
                      >
                        <div className="px-5 pb-5 pt-1 text-[14px] text-neutral-600 leading-relaxed border-l-2 border-[#D96B62] ml-5">
                          {faq.answer}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>
          ) : (
            <div className="px-6 py-16 flex flex-col items-center justify-center text-center">
              <div className="w-16 h-16 rounded-full bg-neutral-100 flex items-center justify-center mb-4">
                <Search className="w-8 h-8 text-neutral-400" />
              </div>
              <h3 className="text-[16px] font-bold text-neutral-900 mb-2">No matching questions found</h3>
              <p className="text-[14px] text-neutral-500 max-w-sm">
                We couldn't find any FAQs matching "{searchQuery}". Try using different keywords or contact support.
              </p>
              <button 
                onClick={() => setSearchQuery("")}
                className="mt-6 px-6 py-2.5 bg-neutral-100 hover:bg-neutral-200 text-neutral-700 text-[14px] font-semibold rounded-full transition-colors"
              >
                Clear Search
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Support CTA */}
      <div className="mt-12 bg-gradient-to-br from-[#7A1D1B] to-[#D96B62] rounded-[24px] p-8 md:p-10 flex flex-col md:flex-row items-center justify-between text-white overflow-hidden relative shadow-lg">
        {/* Background Graphic */}
        <div className="absolute -top-24 -right-24 w-64 h-64 bg-white/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-black/10 rounded-full blur-3xl pointer-events-none"></div>
        
        <div className="relative z-10 text-center md:text-left mb-6 md:mb-0">
          <h3 className="text-[20px] md:text-[24px] font-bold mb-2">Still need help?</h3>
          <p className="text-[14px] md:text-[15px] text-white/80 max-w-md">
            Our support team is available 24/7 to help you resolve any issues or answer your questions.
          </p>
        </div>
        
        <button className="relative z-10 px-8 py-3.5 bg-white hover:bg-neutral-50 text-[#7A1D1B] text-[15px] font-bold rounded-xl shadow-sm hover:shadow transition-all flex items-center gap-2 shrink-0">
          <MessageCircle className="w-5 h-5" />
          Contact Support
        </button>
      </div>
    </div>
  );
}
