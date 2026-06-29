"use client";

import Link from "next/link";
import { MoveRight } from "lucide-react";
import { motion } from "framer-motion";

export default function NotFound() {
  return (
    <section className="relative w-full min-h-[100svh] flex items-center justify-center overflow-hidden bg-[#FAF8F5]">
      {/* 
        Video Layer 
        The video file itself has baked-in white bars on the left/right. 
        We use scale-[1.15] to zoom in slightly and push those baked-in bars off the screen.
      */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <video
          src="/404_not_found.mp4"
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover scale-[1.33]"
        />
      </div>

      {/* Content Layer */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-12 flex justify-end">
        <div className="w-full md:w-[45%] md:mr-16 lg:mr-24 flex flex-col items-center md:items-start text-center md:text-left mt-20 md:mt-0">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-8xl md:text-[140px] font-bold text-[#7A1D1B] leading-none tracking-tighter"
          >
            404
          </motion.h1>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mt-4 text-2xl md:text-3xl font-semibold text-[#444444]"
          >
            Page Not Found
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-4 text-[#666666] text-lg max-w-sm text-center md:text-left"
          >
            Looks like this page took a different route.
            Let's get you back on track.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-8"
          >
            <Link
              href="/dashboard"
              className="inline-flex items-center gap-2 bg-[#7A1D1B] text-white px-8 py-4 rounded-xl font-semibold hover:bg-[#5C1414] transition-colors shadow-lg shadow-[#7A1D1B]/20"
            >
              Go to Dashboard
              <MoveRight className="w-5 h-5" />
            </Link>
          </motion.div>
        </div>
      </div>

      {/* Bottom gradient — blends video smoothly into the footer below */}
      <div
        className="absolute bottom-0 inset-x-0 z-10 pointer-events-none"
        style={{
          height: "20%",
          background: "linear-gradient(to bottom, transparent, #FDFAF6)",
        }}
      />
    </section>
  );
}
