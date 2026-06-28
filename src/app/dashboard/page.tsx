"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { LogOut, LayoutDashboard } from "lucide-react";
import { authFetch } from "@/lib/auth";
import { logout } from "@/lib/auth";

export default function DashboardPage() {
  const router = useRouter();
  const [userName, setUserName] = useState("");

  useEffect(() => {
    // Fetch user profile to get name
    authFetch(`${process.env.NEXT_PUBLIC_API_URL}/user/profile`)
      .then((r) => r.json())
      .then((d) => { if (d?.data?.name) setUserName(d.data.name); })
      .catch(() => {});
  }, []);

  const handleLogout = async () => {
    await logout();
    router.replace("/login");
  };

  return (
    <div className="min-h-screen bg-[#FAF7F2]">
      {/* Navbar */}
      <div className="bg-white border-b border-neutral-200 sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-6 py-3 flex items-center justify-between">
          <span className="font-black text-[20px] tracking-tighter">
            <span className="text-[#111111]">Shuv</span>
            <span className="text-[#7A1D1B]">marg</span>
            <span className="text-neutral-400 font-normal text-[12px] ml-1">Partner</span>
          </span>
          <div className="flex items-center gap-4">
            {userName && (
              <span className="text-[14px] text-neutral-600">
                Hello, <span className="font-semibold text-neutral-900">{userName}</span>
              </span>
            )}
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 text-[13px] text-neutral-500 hover:text-neutral-800 transition-colors"
            >
              <LogOut className="w-4 h-4" />
              Sign out
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 rounded-xl bg-[#7A1D1B]/10 flex items-center justify-center">
            <LayoutDashboard className="w-5 h-5 text-[#7A1D1B]" />
          </div>
          <div>
            <h1 className="text-[22px] font-bold text-neutral-900">Dashboard</h1>
            <p className="text-[13px] text-neutral-500">Your agent overview</p>
          </div>
        </div>

        {/* Placeholder — full dashboard to be built */}
        <div className="bg-white rounded-2xl border border-neutral-200 p-12 text-center">
          <p className="text-neutral-400 text-[15px]">
            Dashboard content coming soon.
          </p>
        </div>
      </div>
    </div>
  );
}
