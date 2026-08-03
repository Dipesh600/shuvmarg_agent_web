"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export function PasswordResetSuccess() {
  return (
    <motion.div
      key="success-card"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="space-y-6 w-full text-center py-4"
    >
      <div className="w-16 h-16 bg-green-50 border border-green-200 rounded-full flex items-center justify-center mx-auto text-green-600">
        <span className="material-symbols-rounded text-[32px]">check_circle</span>
      </div>

      <div className="space-y-2">
        <h3 className="text-[20px] font-bold text-neutral-900">Password Reset Complete</h3>
        <p className="text-[14px] text-neutral-500 max-w-sm mx-auto">
          Your password has been successfully updated. You can now sign in with your new password.
        </p>
      </div>

      <div className="pt-4">
        <Link
          href="/login?reset=success"
          className="inline-flex items-center justify-center w-full h-[52px] rounded-xl text-white font-semibold text-[16px] transition-all hover:bg-[#9A2622]"
          style={{ background: "#7A1D1B" }}
        >
          Sign In Now
        </Link>
      </div>
    </motion.div>
  );
}
