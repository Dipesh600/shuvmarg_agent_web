"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useGlobalStore } from "@/lib/store";
import { logout } from "@/lib/auth";
import { 
  LayoutDashboard, 
  Ticket, 
  Users, 
  Wallet, 
  CreditCard, 
  Settings, 
  LogOut, 
  Search,
  Bell,
  HelpCircle,
  Plus
} from "lucide-react";

const navItems = [
  { label: "Overview", href: "/dashboard", icon: LayoutDashboard },
  { label: "Bookings", href: "/dashboard/bookings", icon: Ticket },
  { label: "Customers", href: "/dashboard/customers", icon: Users },
  { label: "Commissions", href: "/dashboard/commissions", icon: Wallet },
  { label: "Wallet", href: "/dashboard/wallet", icon: CreditCard },
];

export default function WorkspaceNav() {
  const pathname = usePathname();
  const router = useRouter();
  const { agentProfile } = useGlobalStore();
  const [avatarMenuOpen, setAvatarMenuOpen] = useState(false);

  return (
    <>
      {/* 
        TOP BAR (Desktop & Tablet)
      */}
      <header className="hidden md:flex fixed top-0 left-0 right-0 h-20 bg-transparent z-50 items-center px-4 lg:px-6 justify-between pointer-events-none">
        {/* Logo */}
        <div className="flex items-center gap-2 flex-shrink-0 w-60 pl-2 pointer-events-auto">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-[#7A1D1B]/5 border border-[#7A1D1B]/10">
              <span className="material-symbols-rounded text-[18px] text-[#7A1D1B]">directions_bus</span>
            </div>
            <span className="font-black text-[22px] tracking-tighter flex items-baseline">
              <span className="text-[#111111]" style={{ fontFamily: 'var(--font-manrope)' }}>Shuv</span>
              <span className="text-[#D96B62]" style={{ fontFamily: 'var(--font-display)' }}>marg</span>
            </span>
          </Link>
        </div>

        {/* Search */}
        <div className="flex-1 max-w-2xl mx-8 pointer-events-auto">
          <div className="relative group">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Search className="w-[18px] h-[18px] text-neutral-400 group-focus-within:text-[#7A1D1B] transition-colors" />
            </div>
            <input 
              type="text" 
              placeholder="Search..." 
              className="w-full h-11 bg-neutral-100/80 hover:bg-neutral-200/50 focus:bg-white focus:shadow-sm focus:ring-1 focus:ring-neutral-200 border-none rounded-full pl-11 pr-4 text-[14px] outline-none transition-all"
            />
          </div>
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-3 pr-2 pointer-events-auto">
          <button className="w-10 h-10 rounded-full hover:bg-neutral-100/50 flex items-center justify-center text-neutral-500 transition-colors">
            <HelpCircle className="w-[20px] h-[20px]" />
          </button>
          <button className="w-10 h-10 rounded-full hover:bg-neutral-100 flex items-center justify-center text-neutral-500 transition-colors relative">
            <Bell className="w-[20px] h-[20px]" />
            <span className="absolute top-[10px] right-[10px] w-2 h-2 bg-[#D96B62] rounded-full border-2 border-white box-content"></span>
          </button>
          
          {/* Profile Dropdown */}
          <div className="relative ml-2">
            <div 
              className="w-9 h-9 rounded-full bg-[#7A1D1B] cursor-pointer flex items-center justify-center flex-shrink-0 shadow-sm transition-transform hover:scale-105"
              onClick={() => setAvatarMenuOpen(!avatarMenuOpen)}
            >
              <span className="text-white text-[12px] font-bold">{agentProfile?.initials || "ST"}</span>
            </div>
            
            <AnimatePresence>
              {avatarMenuOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 8, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 8, scale: 0.95 }}
                  transition={{ duration: 0.15 }}
                  className="absolute top-full mt-2 right-0 w-56 bg-white border border-neutral-200 rounded-xl shadow-xl overflow-hidden z-50"
                >
                  <div className="p-1">
                    <div className="px-3 py-3 border-b border-neutral-100 mb-1">
                      <p className="text-[14px] font-bold text-neutral-900 truncate">{agentProfile?.name || "Partner"}</p>
                      <p className="text-[12px] text-neutral-500 truncate">ID: {agentProfile?.id || "N/A"}</p>
                    </div>
                    
                    <Link
                      href="/dashboard/settings"
                      onClick={() => setAvatarMenuOpen(false)}
                      className="w-full flex items-center gap-3 px-3 py-2.5 text-left text-[13px] font-medium text-neutral-700 hover:text-neutral-900 hover:bg-neutral-100 rounded-lg transition-colors"
                    >
                      <Settings className="w-[18px] h-[18px]" strokeWidth={2} />
                      Settings
                    </Link>
                    <button
                      onClick={async () => {
                        setAvatarMenuOpen(false);
                        await logout();
                        router.push("/login");
                      }}
                      className="w-full flex items-center gap-3 px-3 py-2.5 text-left text-[13px] font-medium text-[#D32F2F] hover:bg-[#FFF4F3] rounded-lg transition-colors mt-1"
                    >
                      <LogOut className="w-[18px] h-[18px]" strokeWidth={2} />
                      Sign out
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </header>

      {/* 
        SIDEBAR (Desktop & Tablet) 
      */}
      <aside
        className="
          hidden md:flex flex-col fixed left-0 z-40
          bg-[#D96B62] rounded-tr-[40px] shadow-[4px_0_24px_rgba(217,107,98,0.15)]
          
          /* Tablet: Navigation Rail */
          md:top-[80px] md:bottom-0 md:w-20 md:py-6 md:items-center
          
          /* Desktop: Full Sidebar */
          lg:w-64 lg:px-4 lg:items-stretch lg:py-6
        "
      >
        {/* Primary CTA (Upload equivalent) */}
        <div className="mb-8 hidden lg:block px-2">
          <button className="w-full h-[48px] bg-white text-[#D96B62] rounded-full font-bold text-[14px] shadow-sm flex items-center justify-center gap-2 transition-transform hover:scale-[1.02] hover:shadow-md">
            <Plus className="w-[18px] h-[18px]" strokeWidth={2.5} />
            New Booking
          </button>
        </div>
        <div className="mb-8 lg:hidden">
           <button className="w-12 h-12 bg-white text-[#D96B62] rounded-full shadow-sm flex items-center justify-center transition-transform hover:scale-[1.05] hover:shadow-md">
            <Plus className="w-6 h-6" strokeWidth={2.5} />
          </button>
        </div>

        {/* Navigation Links */}
        <div className="flex flex-col gap-2 w-full flex-1">
          {navItems.map((item) => {
            const active = pathname === item.href || (item.href !== "/dashboard" && pathname?.startsWith(item.href));
            const Icon = item.icon;
            
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`
                  group flex items-center transition-all relative
                  
                  /* Tablet styles */
                  md:w-12 md:h-12 md:justify-center md:rounded-full
                  
                  /* Desktop styles */
                  lg:w-full lg:h-[48px] lg:px-4 lg:gap-3 lg:justify-start lg:rounded-full
                  
                  ${active 
                    ? "bg-white text-[#D96B62] font-semibold shadow-sm" 
                    : "text-white/80 hover:text-white hover:bg-white/20 font-medium"
                  }
                `}
              >
                <Icon className={`transition-colors w-[20px] h-[20px]`} strokeWidth={active ? 2.5 : 2} />
                
                {/* Desktop Label */}
                <span className="hidden lg:block text-[14px]">
                  {item.label}
                </span>
                
                {/* Tablet Tooltip (Hover) */}
                <div className="hidden md:block lg:hidden absolute left-14 bg-neutral-800 shadow-md text-white text-[12px] font-semibold px-2.5 py-1.5 rounded-md opacity-0 pointer-events-none group-hover:opacity-100 transition-all duration-200 delay-75 whitespace-nowrap z-50">
                  {item.label}
                </div>
              </Link>
            );
          })}
        </div>
      </aside>

      {/* 
        MOBILE BOTTOM NAV 
      */}
      <nav className="md:hidden fixed bottom-6 left-4 right-4 h-16 bg-[#D96B62] rounded-2xl shadow-[0_8px_32px_rgba(217,107,98,0.3)] z-50 flex flex-row items-center justify-around px-2">
         {navItems.map((item) => {
            const active = pathname === item.href || (item.href !== "/dashboard" && pathname?.startsWith(item.href));
            const Icon = item.icon;
            
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`
                  flex flex-col items-center justify-center gap-1 w-[4.5rem] h-12 rounded-xl transition-all
                  ${active ? "text-white" : "text-white/60 hover:text-white/80"}
                `}
              >
                <div className={`flex items-center justify-center px-4 py-1 rounded-full transition-colors ${active ? 'bg-white/20 shadow-sm' : 'bg-transparent'}`}>
                  <Icon className="w-[20px] h-[20px]" strokeWidth={active ? 2.5 : 2} />
                </div>
                <span className={`text-[10px] leading-none tracking-tight ${active ? 'font-bold' : 'font-medium'}`}>
                  {item.label}
                </span>
              </Link>
            );
          })}
      </nav>

      {/* 
        MOBILE TOP BAR 
      */}
      <header className="md:hidden fixed top-0 left-0 right-0 h-16 bg-white/90 backdrop-blur-md z-50 flex items-center justify-between px-4 shadow-[0_2px_12px_rgba(0,0,0,0.02)]">
         <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-[#7A1D1B]/5 border border-[#7A1D1B]/10">
              <span className="material-symbols-rounded text-[18px] text-[#7A1D1B]">directions_bus</span>
            </div>
            <span className="font-black text-[20px] tracking-tighter flex items-baseline">
              <span className="text-[#111111]" style={{ fontFamily: 'var(--font-manrope)' }}>Shuv</span>
              <span className="text-[#D96B62]" style={{ fontFamily: 'var(--font-display)' }}>marg</span>
            </span>
          </Link>
          
          <div className="flex items-center gap-3">
            {/* Mobile Search Icon */}
            <button className="w-8 h-8 rounded-full flex items-center justify-center text-neutral-500 hover:bg-neutral-100 transition-colors">
              <Search className="w-[18px] h-[18px]" strokeWidth={2} />
            </button>
            
            <div className="relative">
              <div 
                className="w-8 h-8 rounded-full bg-[#7A1D1B] cursor-pointer flex items-center justify-center shadow-sm"
                onClick={() => setAvatarMenuOpen(!avatarMenuOpen)}
              >
                <span className="text-white text-[10px] font-bold">{agentProfile?.initials || "ST"}</span>
              </div>
              
              <AnimatePresence>
                  {avatarMenuOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 8, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 8, scale: 0.95 }}
                      transition={{ duration: 0.15 }}
                      className="absolute top-full mt-2 right-0 w-48 bg-white border border-neutral-200 rounded-xl shadow-xl overflow-hidden z-50"
                    >
                      <div className="p-1">
                        <div className="px-3 py-2 border-b border-neutral-100 mb-1">
                          <p className="text-[13px] font-bold text-neutral-900 truncate">{agentProfile?.name || "Partner"}</p>
                          <p className="text-[11px] text-neutral-500 truncate">ID: {agentProfile?.id || "N/A"}</p>
                        </div>
                        
                        <Link
                          href="/dashboard/settings"
                          onClick={() => setAvatarMenuOpen(false)}
                          className="w-full flex items-center gap-2 px-3 py-2 text-left text-[13px] font-medium text-neutral-700 hover:bg-neutral-100 rounded-lg transition-colors"
                        >
                          <Settings className="w-[16px] h-[16px]" strokeWidth={2} />
                          Settings
                        </Link>
                        <button
                          onClick={async () => {
                            setAvatarMenuOpen(false);
                            await logout();
                            router.push("/login");
                          }}
                          className="w-full flex items-center gap-2 px-3 py-2 text-left text-[13px] font-medium text-[#D32F2F] hover:bg-[#FFF4F3] rounded-lg transition-colors mt-1"
                        >
                          <LogOut className="w-[16px] h-[16px]" strokeWidth={2} />
                          Sign out
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
            </div>
          </div>
      </header>
    </>
  );
}
