"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { resetPassword, ApiError } from "./password-reset.api";
import { validatePasswordReset } from "./password-reset.validation";

type NewPasswordFormProps = {
  phone: string;
  otp: string;
  onSuccess: () => void;
  onSessionExpired: (errorMessage: string) => void;
};

export function NewPasswordForm({ phone, otp, onSuccess, onSessionExpired }: NewPasswordFormProps) {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [resetError, setResetError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setResetError("");

    const validation = validatePasswordReset(password, confirmPassword);
    if (!validation.valid) {
      setResetError(validation.error || "Invalid password");
      return;
    }

    setIsLoading(true);
    try {
      await resetPassword(phone, otp, password);
      onSuccess();
    } catch (err: unknown) {
      const apiErr = err as ApiError;
      const errorMsg = apiErr.message || "Failed to reset password. Please try again.";

      // If OTP expired or is invalid at the backend check during reset, trigger recovery callback
      if (apiErr.status === 400 && errorMsg.toLowerCase().includes("otp")) {
        onSessionExpired(errorMsg);
        return;
      }
      setResetError(errorMsg);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.form
      key="password-form"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      transition={{ duration: 0.2 }}
      onSubmit={handleSubmit}
      className="space-y-5 w-full"
    >
      <div className="space-y-2">
        <label className="text-[13px] font-semibold text-neutral-800">New Password</label>
        <div className="relative flex items-center h-[52px] rounded-xl border border-neutral-200 shadow-[0_1px_2px_rgba(0,0,0,0.04)] hover:border-neutral-300 focus-within:border-[#7A1D1B] focus-within:ring-4 focus-within:ring-[#7A1D1B]/10 overflow-hidden transition-all duration-200 bg-white px-4">
          <span className="material-symbols-rounded text-neutral-400 mr-3 text-[20px]">lock</span>
          <input
            id="forgot-password-new"
            type={showPassword ? "text" : "password"}
            placeholder="Minimum 6 characters"
            value={password}
            onChange={(e) => { setPassword(e.target.value); setResetError(""); }}
            className="flex-1 h-full outline-none text-[15px] text-neutral-900 bg-transparent placeholder:text-neutral-400 pr-10"
            autoFocus
            autoComplete="new-password"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-4 text-neutral-400 hover:text-neutral-600 focus:outline-none flex items-center justify-center"
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            <span className="material-symbols-rounded text-[20px]">
              {showPassword ? "visibility_off" : "visibility"}
            </span>
          </button>
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-[13px] font-semibold text-neutral-800">Confirm New Password</label>
        <div className={`relative flex items-center h-[52px] rounded-xl border shadow-[0_1px_2px_rgba(0,0,0,0.04)] overflow-hidden transition-all duration-200 bg-white px-4 ${
          confirmPassword && password !== confirmPassword
            ? "border-red-500 focus-within:border-red-500 focus-within:ring-4 focus-within:ring-red-500/10"
            : "border-neutral-200 hover:border-neutral-300 focus-within:border-[#7A1D1B] focus-within:ring-4 focus-within:ring-[#7A1D1B]/10"
        }`}>
          <span className="material-symbols-rounded text-neutral-400 mr-3 text-[20px]">lock_reset</span>
          <input
            id="forgot-password-confirm"
            type={showConfirmPassword ? "text" : "password"}
            placeholder="Repeat your password"
            value={confirmPassword}
            onChange={(e) => { setConfirmPassword(e.target.value); setResetError(""); }}
            className="flex-1 h-full outline-none text-[15px] text-neutral-900 bg-transparent placeholder:text-neutral-400 pr-10"
            autoComplete="new-password"
          />
          <button
            type="button"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            className="absolute right-4 text-neutral-400 hover:text-neutral-600 focus:outline-none flex items-center justify-center"
            aria-label={showConfirmPassword ? "Hide password" : "Show password"}
          >
            <span className="material-symbols-rounded text-[20px]">
              {showConfirmPassword ? "visibility_off" : "visibility"}
            </span>
          </button>
        </div>
        {confirmPassword && password !== confirmPassword && (
          <p className="text-[12px] text-red-500 mt-1">Passwords do not match.</p>
        )}
      </div>

      {resetError && (
        <div className="flex items-start gap-2 p-3 rounded-xl bg-red-50 border border-red-100">
          <span className="material-symbols-rounded text-[18px] text-red-500 flex-shrink-0 mt-0.5">error</span>
          <p className="text-[13px] text-red-600 font-medium leading-snug">{resetError}</p>
        </div>
      )}

      <div className="pt-2">
        <button
          id="forgot-password-reset-btn"
          type="submit"
          disabled={isLoading || password.length < 6 || password !== confirmPassword}
          className="w-full h-[52px] rounded-xl text-white font-semibold text-[16px] transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[#9A2622]"
          style={{ background: "#7A1D1B" }}
        >
          {isLoading ? (
            <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
          ) : (
            "Reset Password"
          )}
        </button>
      </div>
    </motion.form>
  );
}
