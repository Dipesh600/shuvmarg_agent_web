"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useOnboardingStore, useGlobalStore } from "@/lib/store";
import { isLoggedIn, logout } from "@/lib/auth";

const dashboardNavItems = [
  { label: "Overview", href: "/dashboard", icon: "dashboard" },
  { label: "Bookings", href: "/dashboard/bookings", icon: "confirmation_number" },
  { label: "Customers", href: "/dashboard/customers", icon: "group" },
  { label: "Earnings", href: "/dashboard/earnings", icon: "account_balance_wallet" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [windowWidth, setWindowWidth] = useState(typeof window !== "undefined" ? window.innerWidth : 1200);
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
  const [avatarMenuOpen, setAvatarMenuOpen] = useState(false);

  const pathname = usePathname();
  const router = useRouter();
  const { onboardingStep, onboardingTitle } = useOnboardingStore();
  const { agentProfile } = useGlobalStore();

  const isDashboard = pathname?.startsWith("/dashboard");
  const isOnboarding = pathname === "/onboarding";
  const isFullWidth = isDashboard || isOnboarding;

  useEffect(() => {
    setIsUserLoggedIn(isLoggedIn());
    const handleAuthChange = () => setIsUserLoggedIn(isLoggedIn());
    window.addEventListener("auth-change", handleAuthChange);
    return () => window.removeEventListener("auth-change", handleAuthChange);
  }, [pathname]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  // Close mobile/avatar menu on route change
  useEffect(() => { 
    setMobileMenuOpen(false);
    setAvatarMenuOpen(false);
  }, [pathname]);

  // Lock body scroll when mobile menu open
  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileMenuOpen]);

  // Hide Navbar completely on auth pages and the dashboard
  if (
    pathname === "/register" ||
    pathname === "/login" ||
    pathname === "/forgot-password" ||
    pathname?.startsWith("/dashboard")
  ) {
    return null;
  }

  return (
    <>
      <div className="fixed inset-x-0 top-0 z-[100] pointer-events-none flex justify-center">
        <div
          className={`pointer-events-auto flex items-center justify-center h-[64px] backdrop-blur-md transition-all duration-[450ms] ease-[cubic-bezier(0.2,0.8,0.2,1)] ${
            isFullWidth || scrolled 
              ? "rounded-none translate-y-0 border-b border-neutral-200" 
              : "rounded-full translate-y-4 border-b border-transparent"
          }`}
          style={{
            width: isFullWidth || scrolled ? "100%" : "calc(100% - 32px)",
            maxWidth: isFullWidth || scrolled ? "100%" : "950px",
            backgroundColor: isFullWidth
              ? "#FFFFFF"
              : "rgba(235,235,235,0.95)",
            boxShadow: isFullWidth
              ? "0 1px 0 rgba(0,0,0,0.06)"
              : scrolled ? "0 2px 16px rgba(0,0,0,0.08)" : "0 8px 32px rgba(0,0,0,0.04)"
          }}
        >
          <div
            className="flex items-center justify-between max-w-full px-4 sm:px-6 lg:px-8 transition-all duration-[450ms] ease-[cubic-bezier(0.2,0.8,0.2,1)]"
            style={{ width: isFullWidth || scrolled ? 1050 : 950 }}
          >
            {/* ── Left: Logo ───────────────────────── */}
            <div className="flex items-center gap-4 lg:gap-6 min-w-0 flex-1">
              <Link href="/" className="flex items-center gap-2 flex-shrink-0">
                <span className="font-black text-[18px] sm:text-[22px] tracking-tighter flex items-baseline">
                  <span className="text-[#111111]" style={{ fontFamily: 'var(--font-manrope)' }}>Shuv</span><span className="text-[#D96B62]" style={{ fontFamily: 'var(--font-display)' }}>marg</span>
                  <span className="text-neutral-400 font-normal text-xs sm:text-sm ml-1 hidden sm:inline" style={{ fontFamily: 'var(--font-sans)' }}>
                    Partner
                  </span>
                </span>
              </Link>

              {/* Onboarding step indicator (md+) */}
              <AnimatePresence>
                {isOnboarding && (
                  <motion.div
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -8 }}
                    className="hidden md:flex items-center gap-2 pl-4 border-l border-neutral-200"
                  >
                    <span
                      className="w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold"
                      style={{ background: "#FFF4F3", color: "#7A1D1B", border: "1px solid rgba(122,29,27,0.2)" }}
                    >
                      {onboardingStep + 1}
                    </span>
                    <span className="text-sm font-semibold text-neutral-700 truncate max-w-[180px]">
                      {onboardingTitle}
                    </span>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Dashboard nav items — desktop only */}
              <AnimatePresence>
                {isDashboard && (
                  <motion.nav
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2, delay: 0.05 }}
                    className="hidden lg:flex items-center gap-0.5"
                  >
                    {dashboardNavItems.map((item) => {
                      const active = pathname === item.href;
                      return (
                        <Link
                          key={item.href}
                          href={item.href}
                          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[13px] font-medium transition-all ${active
                            ? "bg-[rgba(122,29,27,0.08)] text-maroon"
                            : "text-neutral-600 hover:bg-neutral-100 hover:text-neutral-900"
                            }`}
                        >
                          <span className="material-symbols-rounded mr-1.5 text-[18px]">{item.icon}</span>
                          {item.label}
                        </Link>
                      );
                    })}
                  </motion.nav>
                )}
              </AnimatePresence>
            </div>

            {/* ── Right: CTAs ──────────────────────── */}
            <div className="flex items-center gap-2 flex-shrink-0">
              <AnimatePresence mode="popLayout">

                {/* Landing state */}
                {!isDashboard && !isOnboarding && (
                  <motion.div
                    key="landing-cta"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex items-center  gap-2"
                  >
                    {isUserLoggedIn ? (
                      <Link
                        href="/dashboard"
                        className={`h-[42px] px-4 sm:px-6 rounded-xl text-[15px] font-bold transition-all flex items-center gap-1.5 ${
                          scrolled
                            ? "bg-transparent text-neutral-800 hover:bg-neutral-100"
                            : "bg-[#7A1D1B] text-white hover:bg-[#9A2622]"
                        }`}
                      >
                        Dashboard
                      </Link>
                    ) : (
                      <>
                        {/* Sign in — visible on all sizes */}
                        <Link
                          href="/login"
                          className="h-[42px] px-3 sm:px-5 rounded-lg text-[15px] font-bold text-neutral-700 hover:bg-neutral-100 transition-colors flex items-center"
                        >
                          Sign in
                        </Link>
                        {/* Become a Partner — truncated label on xs */}
                        <Link
                          href="/register"
                          className="h-[42px] px-4 sm:px-6 rounded-xl text-[15px] font-bold text-white transition-all flex items-center gap-1.5"
                          style={{ background: "#7A1D1B" }}
                        >
                          <span className="hidden sm:inline">Get started</span>
                          <span className="sm:hidden">Start</span>
                        </Link>
                      </>
                    )}
                  </motion.div>
                )}

                {/* Onboarding state */}
                {isOnboarding && (
                  <motion.div
                    key="onboarding-cta"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                  >
                    <Link
                      href="/"
                      className="h-9 px-4 rounded-lg text-[13px] font-medium text-neutral-600 hover:bg-neutral-100 transition-colors flex items-center"
                    >
                      Exit Setup
                    </Link>
                  </motion.div>
                )}

                {/* Dashboard state */}
                {isDashboard && (
                  <motion.div
                    key="dashboard-cta"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex items-center gap-2"
                  >
                    {/* Operator name / Stats — sm+ only */}
                    <div className="hidden sm:flex items-center gap-4 mr-2">
                      <div className="flex flex-col items-end">
                        <span className="text-[13px] font-bold text-neutral-900 leading-tight">{agentProfile?.name || "Shuvmarg Partner"}</span>
                        <span className="text-[11px] font-medium text-neutral-500 leading-tight">ID: {agentProfile?.id || "N/A"}</span>
                      </div>
                    </div>
                    {/* Avatar Menu */}
                    <div className="relative">
                      <div 
                        className="w-8 h-8 rounded-full bg-maroon flex items-center justify-center cursor-pointer hover:bg-maroon-dark transition-colors flex-shrink-0 overflow-hidden relative"
                        onClick={() => setAvatarMenuOpen(!avatarMenuOpen)}
                      >
                        {agentProfile?.avatar ? (
                          <img src={agentProfile.avatar} alt={agentProfile.name || "Avatar"} className="w-full h-full object-cover" />
                        ) : (
                          <span className="text-white text-[11px] font-bold">{agentProfile?.initials || "ST"}</span>
                        )}
                      </div>
                      
                      <AnimatePresence>
                        {avatarMenuOpen && (
                          <motion.div
                            initial={{ opacity: 0, y: 4 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 4 }}
                            transition={{ duration: 0.15 }}
                            className="absolute right-0 top-full mt-2 w-48 bg-white border border-neutral-200 rounded-xl shadow-lg overflow-hidden z-50"
                          >
                            <div className="p-1">
                              <button
                                onClick={async () => {
                                  setAvatarMenuOpen(false);
                                  await logout();
                                  router.push("/login");
                                }}
                                className="w-full flex items-center gap-2 px-3 py-2 text-left text-[13px] font-medium text-neutral-700 hover:text-[#D32F2F] hover:bg-[#FFF4F3] rounded-lg transition-colors"
                              >
                                <span className="material-symbols-rounded text-[18px]">logout</span>
                                Sign out
                              </button>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                    {/* Hamburger — below lg */}
                    <button
                      className="lg:hidden w-8 h-8 rounded-lg flex items-center justify-center hover:bg-neutral-100 transition-colors"
                      onClick={() => setMobileMenuOpen((v) => !v)}
                      aria-label="Toggle navigation"
                    >
                      <span className="material-symbols-rounded text-neutral-700 text-[20px]">
                        {mobileMenuOpen ? "close" : "menu"}
                      </span>
                    </button>
                  </motion.div>
                )}

              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* Dashboard mobile nav drawer */}
        <AnimatePresence>
          {isDashboard && mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.18 }}
              className="absolute inset-x-3 top-[72px] bg-white border border-neutral-200 rounded-xl overflow-hidden pointer-events-auto shadow-lg lg:hidden"
            >
              {dashboardNavItems.map((item) => {
                const active = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`flex items-center gap-3 px-4 py-3.5 text-[14px] font-medium border-b border-neutral-100 last:border-0 transition-colors ${active
                      ? "text-maroon bg-[rgba(122,29,27,0.04)]"
                      : "text-neutral-700 hover:bg-neutral-50"
                      }`}
                  >
                    <span className="material-symbols-rounded text-[20px]">{item.icon}</span>
                    {item.label}
                  </Link>
                );
              })}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}
