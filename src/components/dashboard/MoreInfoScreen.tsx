"use client";

import { AlertCircle } from "lucide-react";
import { logout } from "@/lib/auth";
import { useRouter } from "next/navigation";

interface MoreInfoScreenProps {
  moreInfoRequest: string | null;
  moreInfoRequestedAt: string | null;
  onEditApplication: () => void;
}

export function MoreInfoScreen({ moreInfoRequest, moreInfoRequestedAt, onEditApplication }: MoreInfoScreenProps) {
  const router = useRouter();

  const handleLogout = async () => {
    await logout();
    router.replace("/login");
  };

  const requestedDate = moreInfoRequestedAt
    ? new Date(moreInfoRequestedAt).toLocaleDateString("en-NP", {
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

        <div className="bg-white rounded-2xl shadow-[0_8px_24px_rgba(0,0,0,0.08)] p-8">
          <div className="flex items-start gap-4 mb-6">
            <div className="w-12 h-12 rounded-full bg-amber-50 flex items-center justify-center flex-shrink-0">
              <AlertCircle className="w-6 h-6 text-amber-500" strokeWidth={1.5} />
            </div>
            <div>
              <h1 className="text-[20px] font-bold text-neutral-900 mb-1">
                Additional Information Required
              </h1>
              {requestedDate && (
                <p className="text-[13px] text-neutral-400">Requested on {requestedDate}</p>
              )}
            </div>
          </div>

          <p className="text-[14px] text-neutral-500 mb-4">
            Our team reviewed your application and needs some additional information or documents before we can proceed.
          </p>

          {moreInfoRequest && (
            <div className="bg-amber-50 border border-amber-100 rounded-xl px-4 py-4 mb-8">
              <p className="text-[12px] text-amber-500 font-medium uppercase tracking-wide mb-1.5">
                From our review team
              </p>
              <p className="text-[14px] text-amber-900 leading-relaxed">{moreInfoRequest}</p>
            </div>
          )}

          <div className="space-y-3">
            <button
              onClick={onEditApplication}
              className="w-full h-[48px] rounded-xl text-white font-semibold text-[15px] transition-all hover:bg-[#9A2622]"
              style={{ background: "#7A1D1B" }}
            >
              Update Application
            </button>
            <button
              onClick={handleLogout}
              className="w-full h-[44px] rounded-xl border border-neutral-200 text-neutral-600 text-[14px] font-medium hover:bg-neutral-50 transition-colors"
            >
              Sign Out
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
