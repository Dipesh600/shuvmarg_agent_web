"use client";

import { Clock } from "lucide-react";
import { logout } from "@/lib/auth";
import { useRouter } from "next/navigation";

interface PendingScreenProps {
  submittedAt: string | null;
}

export function PendingScreen({ submittedAt }: PendingScreenProps) {
  const router = useRouter();

  const handleLogout = async () => {
    await logout();
    router.replace("/login");
  };

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
        {/* Logo */}
        <div className="text-center mb-10">
          <span className="font-black text-[22px] tracking-tighter">
            <span className="text-[#111111]">Shuv</span>
            <span className="text-[#7A1D1B]">marg</span>
            <span className="text-neutral-400 font-normal text-[13px] ml-1">Partner</span>
          </span>
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
