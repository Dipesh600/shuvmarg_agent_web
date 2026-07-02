"use client";

import { useState } from "react";
import { Bell, CreditCard, Megaphone, Smartphone, Mail } from "lucide-react";
import { motion } from "framer-motion";

interface NotificationOption {
  id: string;
  title: string;
  description: string;
  push: boolean;
}

interface NotificationCategory {
  id: string;
  title: string;
  description: string;
  icon: React.ElementType;
  options: NotificationOption[];
}

export default function NotificationSettings() {
  const [categories, setCategories] = useState<NotificationCategory[]>([
    {
      id: "bookings",
      title: "Bookings & Travel",
      description: "Alerts related to the tickets you sell and customer trips.",
      icon: Bell,
      options: [
        {
          id: "new_ticket",
          title: "New Ticket Sales",
          description: "Receive a confirmation when a ticket is successfully booked.",
          push: true,
        },
        {
          id: "cancellations",
          title: "Cancellations & Refunds",
          description: "Alerts when a customer's trip is canceled or a refund is processed.",
          push: true,
        },
        {
          id: "trip_updates",
          title: "Trip Updates",
          description: "Delay or breakdown alerts for buses where you have booked passengers.",
          push: true,
        },
      ],
    },
    {
      id: "finance",
      title: "Finance & Rewards",
      description: "Alerts related to your earnings and Shuv Marg status.",
      icon: CreditCard,
      options: [
        {
          id: "commission_payouts",
          title: "Commission Payouts",
          description: "Notifications when a withdrawal to your bank/wallet is completed or failed.",
          push: true,
        },
        {
          id: "tier_updates",
          title: "Tier Updates & Milestones",
          description: "Alerts when you level up (e.g., Bronze to Silver) or unlock a new reward.",
          push: true,
        },
      ],
    },
    {
      id: "updates",
      title: "Shuv Marg Updates",
      description: "General announcements from the platform.",
      icon: Megaphone,
      options: [
        {
          id: "operator_promotions",
          title: "Operator Promotions",
          description: "Alerts when an operator offers extra commission for specific routes.",
          push: true,
        },
        {
          id: "platform_maintenance",
          title: "Platform Maintenance",
          description: "Updates regarding system downtime or new features.",
          push: true,
        },
      ],
    },
  ]);

  const toggleOption = (categoryId: string, optionId: string, channel: "push") => {
    setCategories((prevCategories) =>
      prevCategories.map((category) => {
        if (category.id !== categoryId) return category;
        return {
          ...category,
          options: category.options.map((option) => {
            if (option.id !== optionId) return option;
            return {
              ...option,
              [channel]: !option[channel],
            };
          }),
        };
      })
    );
  };

  return (
    <div className="bg-white rounded-[24px] border border-neutral-100 shadow-sm overflow-hidden flex flex-col">
      {/* Header */}
      <div className="px-6 py-5 md:px-8 md:py-6 border-b border-neutral-100">
        <h2 className="text-[20px] font-bold text-neutral-900">Notification Settings</h2>
        <p className="text-[13px] text-neutral-500 font-medium mt-1">
          Control what you are notified about and how you receive these alerts.
        </p>
      </div>

      {/* Content */}
      <div className="p-6 md:p-8 space-y-8">
        {categories.map((category) => {
          const Icon = category.icon;
          return (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              key={category.id}
              className="bg-white rounded-2xl border border-neutral-100 overflow-hidden"
            >
              {/* Category Header */}
              <div className="bg-neutral-50/50 px-6 py-4 border-b border-neutral-100 flex items-center gap-4">
                <div className="w-10 h-10 bg-white rounded-full border border-neutral-200 flex items-center justify-center text-neutral-600 shadow-sm">
                  <Icon className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-[16px] font-bold text-neutral-900">{category.title}</h3>
                  <p className="text-[13px] text-neutral-500">{category.description}</p>
                </div>
              </div>

              {/* Options List */}
              <div className="divide-y divide-neutral-100">
                {category.options.map((option) => (
                  <div key={option.id} className="p-6 flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <div className="flex-1">
                      <h4 className="text-[14px] font-bold text-neutral-900">{option.title}</h4>
                      <p className="text-[13px] text-neutral-500 mt-1">{option.description}</p>
                    </div>

                    <div className="flex items-center gap-6">
                      {/* Push Toggle */}
                      <div className="flex flex-col items-end gap-2">
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            className="sr-only peer"
                            checked={option.push}
                            onChange={() => toggleOption(category.id, option.id, "push")}
                          />
                          <div className="w-10 h-6 bg-neutral-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-neutral-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#7A1D1B]"></div>
                        </label>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
