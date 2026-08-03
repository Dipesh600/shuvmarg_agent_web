"use client";

import React from "react";
import Link from "next/link";
import { MoveLeft } from "lucide-react";

type LoginLayoutProps = {
  children: React.ReactNode;
  onBack: () => void;
};

const NM = '"Neue Machina", system-ui, -apple-system, sans-serif';

export function LoginLayout({ children, onBack }: LoginLayoutProps) {
  return (
    <div className="min-h-[100svh] w-full flex items-center justify-center bg-[#FFFCF8] p-2 sm:p-4 lg:p-6">
      <div className="w-full max-w-[1600px] h-[calc(100svh-1rem)] sm:h-[calc(100svh-2rem)] lg:h-[calc(100svh-3rem)] min-h-[600px] bg-neutral-900 rounded-[24px] lg:rounded-[32px] overflow-hidden shadow-[0_24px_64px_rgba(0,0,0,0.16)] flex flex-col lg:flex-row relative">
        {/* Background Video */}
        <video
          src="/video.mp4"
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover z-0 opacity-40 hidden lg:block"
        />
        <div className="absolute inset-0 z-0 bg-gradient-to-t from-black/80 via-black/20 to-black/40 pointer-events-none hidden lg:block" />

        {/* ─── LEFT SIDE (Desktop) ─── */}
        <div className="hidden lg:flex w-1/2 relative flex-col justify-between p-12 z-10">
          <div className="relative z-10">
            <button
              onClick={onBack}
              className="inline-flex items-center gap-2 text-white/80 hover:text-white transition-colors bg-white/10 px-4 py-2 rounded-full backdrop-blur-sm border border-white/10"
            >
              <MoveLeft className="w-[18px] h-[18px]" strokeWidth={2.5} />
              <span className="text-[14px] font-medium tracking-wide">Back</span>
            </button>
          </div>

          <div className="relative z-10 max-w-lg mt-auto pb-16">
            <h1
              className="text-[48px] leading-[1.1] text-white mb-6"
              style={{ fontFamily: NM, fontWeight: 800, letterSpacing: "-0.02em" }}
            >
              Welcome Back.<br />
              <span style={{ color: "#D96B62" }}>Let&apos;s Move Nepal.</span>
            </h1>
            <p className="text-[16px] leading-[1.6] text-white/80 font-medium">
              Access Nepal&apos;s largest transit network. Book tickets instantly, manage your agency, and earn high commissions securely.
            </p>
          </div>

          <div className="relative z-10 w-full border-t border-white/20 pt-8 mt-auto">
            <div className="grid grid-cols-3 gap-6 mb-12">
              <div className="border-r border-white/20 pr-6">
                <h3 className="text-white text-[24px] font-bold mb-1" style={{ fontFamily: NM }}>500+</h3>
                <p className="text-white/60 text-[13px]">Routes Available</p>
              </div>
              <div className="border-r border-white/20 px-6">
                <h3 className="text-white text-[24px] font-bold mb-1" style={{ fontFamily: NM }}>10K+</h3>
                <p className="text-white/60 text-[13px]">Agents</p>
              </div>
              <div className="pl-6">
                <h3 className="text-white text-[24px] font-bold mb-1" style={{ fontFamily: NM }}>Instant</h3>
                <p className="text-white/60 text-[13px]">Commission Payouts</p>
              </div>
            </div>
            <p className="text-white/40 text-[12px]">
              Powered by Shuv Marg · &copy; 2026 Shuv Marg
            </p>
          </div>
        </div>

        {/* ─── RIGHT SIDE: FORM PANEL ─── */}
        <div className="w-full lg:w-1/2 flex-1 flex flex-col relative overflow-y-auto z-10 bg-white lg:rounded-bl-[100px] lg:shadow-[-24px_0_48px_rgba(0,0,0,0.15)]">
          {/* Mobile back button */}
          <div className="lg:hidden absolute top-6 left-6 z-10">
            <button
              onClick={onBack}
              className="inline-flex items-center gap-2 text-neutral-600 hover:text-neutral-900 transition-colors"
            >
              <MoveLeft className="w-5 h-5" strokeWidth={2.5} />
              <span className="text-[14px] font-medium">Back</span>
            </button>
          </div>

          {/* Logo */}
          <div className="absolute top-6 right-6 lg:right-8 z-10">
            <Link href="/" className="inline-flex items-center gap-2">
              <span className="font-black text-[20px] lg:text-[22px] tracking-tighter">
                <span className="text-[#111111]">Shuv</span><span className="text-[#D96B62]">marg</span>
                <span className="text-neutral-400 font-normal text-[13px] ml-1">Partner</span>
              </span>
            </Link>
          </div>

          <div className="flex-1 flex flex-col justify-center items-center p-6 sm:p-12 md:p-16 lg:p-20 w-full max-w-[560px] mx-auto mt-12 lg:mt-0">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
