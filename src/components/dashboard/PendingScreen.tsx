"use client";

import { Clock } from "lucide-react";
import { logout } from "@/lib/auth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { getApplicationStatus } from "@/lib/agentApi";

interface PendingScreenProps {
  submittedAt: string | null;
}

export function PendingScreen({ submittedAt }: PendingScreenProps) {
  const router = useRouter();

  const handleLogout = async () => {
    await logout();
    router.replace("/login");
  };

  useEffect(() => {
    // Poll every 5 seconds to check if status changed
    const interval = setInterval(async () => {
      try {
        const data = await getApplicationStatus();
        if (data && data.applicationStatus !== "PENDING" && data.applicationStatus !== "DRAFT") {
          // If status is no longer pending/draft (e.g. APPROVED, REJECTED, MORE_INFO)
          // Hard reload the page so the layout fetches the new state
          window.location.href = "/dashboard";
        }
      } catch (err) {
        // Ignore errors during polling
      }
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const formattedDate = submittedAt
    ? new Date(submittedAt).toLocaleDateString("en-NP", {
        day: "numeric",
        month: "long",
        year: "numeric",
      })
    : null;

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

        {/* Card */}
        <div className="bg-white rounded-2xl shadow-[0_8px_24px_rgba(0,0,0,0.08)] p-8 text-center">
          {/* Icon */}
          <div className="w-16 h-16 rounded-full bg-amber-50 flex items-center justify-center mx-auto mb-6">
            <Clock className="w-7 h-7 text-amber-500" strokeWidth={1.5} />
          </div>

          <h1 className="text-[22px] font-bold text-neutral-900 mb-2">
            Application Under Review
          </h1>
          <p className="text-neutral-500 text-[15px] leading-relaxed mb-6">
            Your application has been submitted and is being reviewed by our team.
            We'll notify you within <strong className="text-neutral-700">2–3 business days</strong>.
          </p>

          {formattedDate && (
            <div className="bg-neutral-50 rounded-xl px-4 py-3 mb-6 text-left">
              <p className="text-[12px] text-neutral-400 font-medium uppercase tracking-wide mb-1">
                Submitted On
              </p>
              <p className="text-[15px] font-semibold text-neutral-800">{formattedDate}</p>
            </div>
          )}

          {/* Status steps */}
          <div className="text-left space-y-3 mb-8">
            {[
              { label: "Application submitted", done: true },
              { label: "Document review in progress", done: false, active: true },
              { label: "Verification & approval", done: false },
              { label: "Account activated", done: false },
            ].map((step, i) => (
              <div key={i} className="flex items-center gap-3">
                <div
                  className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 ${
                    step.done
                      ? "bg-green-500"
                      : step.active
                      ? "bg-amber-400"
                      : "bg-neutral-200"
                  }`}
                >
                  {step.done && (
                    <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  )}
                  {step.active && <div className="w-2 h-2 bg-white rounded-full" />}
                </div>
                <p className={`text-[14px] ${step.done ? "text-neutral-900 font-medium" : step.active ? "text-amber-700 font-medium" : "text-neutral-400"}`}>
                  {step.label}
                </p>
              </div>
            ))}
          </div>

          <button
            onClick={handleLogout}
            className="w-full h-[44px] rounded-xl border border-neutral-200 text-neutral-600 text-[14px] font-medium hover:bg-neutral-50 transition-colors"
          >
            Sign Out
          </button>
        </div>

        <p className="text-center text-[13px] text-neutral-400 mt-6">
          Questions? Email us at{" "}
          <a href="mailto:support@shuvmarg.com" className="text-[#7A1D1B] hover:underline">
            support@shuvmarg.com
          </a>
        </p>
      </div>
    </div>
  );
}
