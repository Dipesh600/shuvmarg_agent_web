"use client";

import { useState } from "react";
import { 
  Building2, 
  CreditCard, 
  Bell, 
  ShieldCheck, 
} from "lucide-react";
import PayoutAccounts from "./PayoutAccounts";
import AgentProfile from "./AgentProfile";
import NotificationSettings from "./NotificationSettings";
import SecuritySettings from "./SecuritySettings";
import { useGlobalStore } from "@/lib/store";

const TABS = [
  { id: "profile", label: "Profile", icon: Building2 },
  { id: "payout", label: "Payout Accounts", icon: CreditCard },
  { id: "notifications", label: "Notifications", icon: Bell },
  { id: "security", label: "Security & Access", icon: ShieldCheck },
];

export default function SettingsLayout() {
  const [activeTab, setActiveTab] = useState("profile");
  const { agentProfile } = useGlobalStore();

  return (
    <div className="max-w-6xl mx-auto w-full flex flex-col md:flex-row gap-6 lg:gap-8">
      {/* Settings Sidebar */}
      <aside className="w-full md:w-64 lg:w-72 shrink-0">
        <div className="bg-white rounded-[24px] border border-neutral-100 p-2 md:p-3 shadow-sm sticky top-24">
          <h2 className="px-4 py-3 text-[18px] font-bold text-neutral-900 mb-2">Settings</h2>
          <nav className="flex flex-col gap-1">
            {TABS.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all text-left ${
                    isActive 
                      ? "bg-neutral-100 text-neutral-900 font-semibold" 
                      : "text-neutral-500 hover:bg-neutral-50 hover:text-neutral-700 font-medium"
                  }`}
                >
                  <Icon className={`w-5 h-5 ${isActive ? "text-[#D96B62]" : "text-neutral-400"}`} />
                  <span className="text-[14px]">{tab.label}</span>
                </button>
              );
            })}
          </nav>
        </div>
      </aside>

      {/* Settings Content Area */}
      <main className="flex-1 min-w-0">
        {activeTab === "profile" && <AgentProfile />}
        
        {activeTab === "payout" && <PayoutAccounts />}
        
        {activeTab === "notifications" && <NotificationSettings />}
        
        {activeTab === "security" && <SecuritySettings />}
      </main>
    </div>
  );
}
