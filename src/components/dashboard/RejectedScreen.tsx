"use client";

import { XCircle } from "lucide-react";
import { logout } from "@/lib/auth";
import { useRouter } from "next/navigation";

interface RejectedScreenProps {
  rejectionReason: string | null;
  isPermanentlyRejected: boolean;
  canReapply: boolean;
  reapplyAvailableAt: string | null;
  onReapply: () => void;
}

export function RejectedScreen({
  rejectionReason,
  isPermanentlyRejected,
  canReapply,
  reapplyAvailableAt,
  onReapply,
}: RejectedScreenProps) {
  const router = useRouter();

  const handleLogout = async () => {
    await logout();
    router.replace("/login");
  };

  const reapplyDate = reapplyAvailableAt
    ? new Date(reapplyAvailableAt).toLocaleString("en-NP", {
        day: "numeric",
        month: "long",
        hour: "2-digit",
        minute: "2-digit",
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
          <div className="w-16 h-16 rounded-full bg-red-50 flex items-center justify-center mx-auto mb-6">
            <XCircle className="w-7 h-7 text-red-500" strokeWidth={1.5} />
          </div>

          <h1 className="text-[22px] font-bold text-neutral-900 mb-2">
            {isPermanentlyRejected ? "Application Rejected" : "Application Not Approved"}
          </h1>

          <p className="text-neutral-500 text-[15px] leading-relaxed mb-6">
            {isPermanentlyRejected
              ? "Your application has been permanently rejected. Please contact our support team for assistance."
              : "Your application was not approved at this time. Please review the reason below and reapply."}
          </p>

          {rejectionReason && (
            <div className="bg-red-50 border border-red-100 rounded-xl px-4 py-4 mb-6 text-left">
              <p className="text-[12px] text-red-400 font-medium uppercase tracking-wide mb-1">
                Reason
              </p>
              <p className="text-[14px] text-red-800 leading-relaxed">{rejectionReason}</p>
            </div>
          )}

          {!isPermanentlyRejected && (
            <div className="space-y-3 mb-6">
              {canReapply ? (
                <button
                  onClick={onReapply}
                  className="w-full h-[48px] rounded-xl text-white font-semibold text-[15px] transition-all hover:bg-[#9A2622]"
                  style={{ background: "#7A1D1B" }}
                >
                  Reapply Now
                </button>
              ) : (
                <div className="bg-neutral-50 rounded-xl px-4 py-3 text-center">
                  <p className="text-[13px] text-neutral-500">
                    You can reapply on{" "}
                    <span className="font-semibold text-neutral-700">{reapplyDate}</span>
                  </p>
                </div>
              )}
            </div>
          )}

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
