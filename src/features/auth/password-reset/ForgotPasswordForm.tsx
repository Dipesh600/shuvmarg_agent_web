"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { requestPasswordReset } from "./password-reset.api";
import { validatePhone } from "./password-reset.validation";

type ForgotPasswordFormProps = {
  initialPhone?: string;
  onNext: (phone: string) => void;
};

export function ForgotPasswordForm({ initialPhone = "", onNext }: ForgotPasswordFormProps) {
  const [phone, setPhone] = useState(initialPhone);
  const [phoneError, setPhoneError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setPhoneError("");

    const validation = validatePhone(phone);
    if (!validation.valid) {
      setPhoneError(validation.error || "Invalid mobile number");
      return;
    }

    setIsLoading(true);
    try {
      await requestPasswordReset(phone);
      onNext(phone.replace(/\D/g, "").slice(0, 10));
    } catch (err: unknown) {
      const errorMsg = err instanceof Error ? err.message : "Failed to send reset code. Please try again.";
      setPhoneError(errorMsg);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.form
      key="phone-form"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      transition={{ duration: 0.2 }}
      onSubmit={handleSubmit}
      className="space-y-6 w-full"
    >
      <div className="space-y-2">
        <label className="text-[13px] font-semibold text-neutral-800">
          Registered Mobile Number
        </label>
        <div
          className="relative flex items-center h-[52px] rounded-xl overflow-hidden transition-all duration-200 bg-white"
          style={{
            border: phoneError ? "1.5px solid #D32F2F" : "1.5px solid #e5e7eb",
            boxShadow: phoneError ? "0 0 0 3px rgba(211,47,47,0.08)" : "0 1px 2px rgba(0,0,0,0.04)",
          }}
        >
          <div className="h-full px-4 flex items-center justify-center border-r border-neutral-200 bg-neutral-50">
            <span className="text-neutral-600 text-[15px] font-medium">+977</span>
          </div>
          <input
            id="forgot-password-phone"
            type="tel"
            placeholder="Enter Mobile Number"
            value={phone}
            onChange={(e) => {
              setPhone(e.target.value.replace(/\D/g, "").slice(0, 10));
              setPhoneError("");
            }}
            className="flex-1 h-full px-4 outline-none text-[15px] text-neutral-900 bg-transparent placeholder:text-neutral-400"
            autoFocus
            autoComplete="tel"
          />
        </div>
        {phoneError && (
          <p className="text-[12px] mt-1" style={{ color: "#D32F2F" }}>{phoneError}</p>
        )}
      </div>

      <button
        id="forgot-password-send-btn"
        type="submit"
        disabled={isLoading || phone.length < 10}
        className="w-full h-[52px] rounded-xl text-white font-semibold text-[16px] transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[#9A2622]"
        style={{ background: "#7A1D1B" }}
      >
        {isLoading ? (
          <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
        ) : (
          "Send Reset Code"
        )}
      </button>

      <p className="text-[14px] text-neutral-500 text-center">
        Remember your password?{" "}
        <Link href="/login" className="text-[#7A1D1B] font-semibold hover:underline">
          Back to Sign In
        </Link>
      </p>
    </motion.form>
  );
}
