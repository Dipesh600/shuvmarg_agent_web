"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { verifyOtpForReset, resendOtpForReset } from "./password-reset.api";

type PasswordResetOtpFormProps = {
  phone: string;
  onNext: (otp: string) => void;
  onChangeNumber: () => void;
};

export function PasswordResetOtpForm({ phone, onNext, onChangeNumber }: PasswordResetOtpFormProps) {
  const [otp, setOtp] = useState("");
  const [otpError, setOtpError] = useState("");
  const [resendTimer, setResendTimer] = useState(60);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (resendTimer <= 0) return;
    const t = setTimeout(() => setResendTimer((s) => s - 1), 1000);
    return () => clearTimeout(t);
  }, [resendTimer]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setOtpError("");
    if (otp.length !== 6) return;

    setIsLoading(true);
    try {
      await verifyOtpForReset(phone, otp);
      onNext(otp);
    } catch (err: unknown) {
      const errorMsg = err instanceof Error ? err.message : "Invalid or expired code. Please try again.";
      setOtpError(errorMsg);
    } finally {
      setIsLoading(false);
    }
  };

  const handleResend = async () => {
    if (resendTimer > 0 || isLoading) return;
    setOtpError("");
    setIsLoading(true);
    try {
      await resendOtpForReset(phone);
      setOtp("");
      setResendTimer(60);
    } catch (err: unknown) {
      const errorMsg = err instanceof Error ? err.message : "Failed to resend code. Try again.";
      setOtpError(errorMsg);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.form
      key="otp-form"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      transition={{ duration: 0.2 }}
      onSubmit={handleSubmit}
      className="space-y-6 w-full"
    >
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <label className="text-[13px] font-semibold text-neutral-800">
            6-Digit Reset Code
          </label>
          <button
            type="button"
            onClick={onChangeNumber}
            className="text-[#7A1D1B] text-[13px] hover:underline font-medium"
          >
            Change Number
          </button>
        </div>
        <div
          className="relative flex items-center h-[52px] rounded-xl overflow-hidden transition-all duration-200 bg-white"
          style={{
            border: otpError ? "1.5px solid #D32F2F" : "1.5px solid #e5e7eb",
            boxShadow: otpError ? "0 0 0 3px rgba(211,47,47,0.08)" : "0 1px 2px rgba(0,0,0,0.04)",
          }}
        >
          <input
            id="forgot-password-otp"
            type="text"
            inputMode="numeric"
            placeholder="• • • • • •"
            value={otp}
            onChange={(e) => {
              setOtp(e.target.value.replace(/\D/g, "").slice(0, 6));
              setOtpError("");
            }}
            className="w-full h-full px-4 text-center tracking-[0.5em] outline-none text-[18px] text-neutral-900 bg-transparent placeholder:text-neutral-300 placeholder:tracking-normal font-semibold"
            autoFocus
            autoComplete="one-time-code"
          />
        </div>
        {otpError && (
          <p className="text-[12px] mt-1 text-center" style={{ color: "#D32F2F" }}>{otpError}</p>
        )}
      </div>

      <button
        id="forgot-password-verify-btn"
        type="submit"
        disabled={isLoading || otp.length !== 6}
        className="w-full h-[52px] rounded-xl text-white font-semibold text-[16px] transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[#9A2622]"
        style={{ background: "#7A1D1B" }}
      >
        {isLoading ? (
          <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
        ) : (
          "Verify Code"
        )}
      </button>

      <p className="text-[14px] text-neutral-500 text-center mt-4">
        Didn&apos;t receive the code?{" "}
        {resendTimer > 0 ? (
          <span className="text-neutral-400 font-semibold">Resend in {resendTimer}s</span>
        ) : (
          <button
            type="button"
            onClick={handleResend}
            disabled={isLoading}
            className="text-neutral-900 font-semibold hover:underline disabled:opacity-50"
          >
            Resend Code
          </button>
        )}
      </p>
    </motion.form>
  );
}
