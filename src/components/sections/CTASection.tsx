"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { MoveRight } from "lucide-react";
const NM = '"Neue Machina", system-ui, -apple-system, sans-serif';

export default function CTASection() {
  return (
    <section className="relative py-24 overflow-hidden bg-gradient-to-br from-[#F5F9FF] via-white to-[#FEFBF5]">


      <div className="max-w-[1000px] mx-auto px-6 text-center relative z-10 flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-8 inline-block px-4 py-1.5 rounded-full border border-[#7A1D1B]/20 bg-[#7A1D1B]/5 text-[#7A1D1B] text-sm font-medium"
        >
          Signup free! Earn up to NPR 20,000/month*
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-4xl md:text-6xl font-bold text-[#111111] mb-6 tracking-tight leading-[1.1]"
          style={{ fontFamily: NM }}
        >
          <span className="relative inline-block whitespace-nowrap z-10 mr-2 md:mr-4">
            <span className="relative z-10 px-2 md:px-4">Let&apos;s</span>
            <span className="absolute inset-0 bg-[#F8DEAE] rounded-full z-0 transform -rotate-2 scale-105"></span>
          </span>
          get started
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-lg md:text-xl text-[#666666] max-w-2xl mx-auto mb-12"
        >
          Join the platform that rewards you more for every booking.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="relative inline-block mb-16"
        >
          {/* Decorative lines around button */}
          <div className="absolute -top-6 -left-6 opacity-60">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M20 4L4 20" stroke="black" strokeWidth="1.5" strokeLinecap="round" />
              <path d="M22 10L10 22" stroke="black" strokeWidth="1.5" strokeLinecap="round" />
              <path d="M14 2L2 14" stroke="black" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </div>
          <div className="absolute -bottom-6 -right-6 opacity-60">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M4 4L20 20" stroke="black" strokeWidth="1.5" strokeLinecap="round" />
              <path d="M2 10L14 22" stroke="black" strokeWidth="1.5" strokeLinecap="round" />
              <path d="M10 2L22 14" stroke="black" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </div>

          <Link
            href="/register"
            className="relative z-10 inline-flex items-center justify-center h-14 px-10 bg-[#D96B62] hover:bg-[#B83D35] text-white text-lg font-medium rounded-2xl transition-all shadow-[0_8px_24px_rgba(217,107,98,0.3)] hover:shadow-[0_12px_32px_rgba(217,107,98,0.4)] hover:-translate-y-0.5"
          >
            Sign Up for free
            <MoveRight className="ml-2 w-5 h-5" strokeWidth={2.5} />
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="text-xs text-[#888888] max-w-4xl mx-auto text-left leading-relaxed"
        >
          <span className="font-semibold block mb-1">*Disclaimer</span>
          Shuv Marg is an online bus ticketing platform for travel agents. It does not operate bus services on its own. In order to provide a comprehensive choice of bus operators, departure times and prices to the customer, it has tied up with many bus operators. Shuv Marg&apos;s advice to agents is to choose bus operators they are aware of and whose services they are comfortable with.
        </motion.div>
      </div>
    </section>
  );
}
