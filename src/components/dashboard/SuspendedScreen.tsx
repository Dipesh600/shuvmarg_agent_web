"use client";

import { ShieldAlert } from "lucide-react";
import { logout } from "@/lib/auth";
import { useRouter } from "next/navigation";

export function SuspendedScreen() {
  const router = useRouter();

  const handleLogout = async () => {
    await logout();
    router.replace("/login");
  };

  return (
    <div className="min-h-screen bg-[#FAF7F2] flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-10">
          <span className="font-black text-[22px] tracking-tighter">
            <span className="text-[#111111]">Shuv</span>
            <span className="text-[#7A1D1B]">marg</span>
            <span className="text-neutral-400 font-normal text-[13px] ml-1">Partner</span>
          </span>
        </div>

        <div className="bg-white rounded-2xl shadow-[0_8px_24px_rgba(0,0,0,0.08)] p-8 text-center">
          <div className="w-16 h-16 rounded-full bg-neutral-100 flex items-center justify-center mx-auto mb-6">
            <ShieldAlert className="w-7 h-7 text-neutral-500" strokeWidth={1.5} />
          </div>

          <h1 className="text-[22px] font-bold text-neutral-900 mb-2">Account Suspended</h1>
          <p className="text-neutral-500 text-[15px] leading-relaxed mb-8">
            Your account has been temporarily suspended. Please contact our support team to understand the reason and next steps.
          </p>

          <a
            href="mailto:support@shuvmarg.com?subject=Account%20Suspension%20Inquiry"
            className="flex items-center justify-center w-full h-[48px] rounded-xl bg-neutral-900 text-white font-semibold text-[15px] hover:bg-neutral-800 transition-colors mb-3"
          >
            Contact Support
          </a>

          <button
            onClick={handleLogout}
            className="w-full h-[44px] rounded-xl border border-neutral-200 text-neutral-600 text-[14px] font-medium hover:bg-neutral-50 transition-colors"
          >
            Sign Out
          </button>
        </div>
      </div>
    </div>
  );
}
