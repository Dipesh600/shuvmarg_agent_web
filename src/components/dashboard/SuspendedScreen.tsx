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
        {/* Standard Logo */}
        <div className="flex justify-center mb-10">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-[#7A1D1B]/5 border border-[#7A1D1B]/10">
              <span className="material-symbols-rounded text-[18px] text-[#7A1D1B]">directions_bus</span>
            </div>
            <span className="font-black text-[22px] tracking-tighter flex items-baseline">
              <span className="text-[#111111]" style={{ fontFamily: 'var(--font-manrope)' }}>Shuv</span>
              <span className="text-[#D96B62]" style={{ fontFamily: 'var(--font-display)' }}>marg</span>
              <span className="text-neutral-500 font-medium text-[13px] ml-2 tracking-normal bg-neutral-100 px-2 py-0.5 rounded-md">Partner</span>
            </span>
          </div>
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
