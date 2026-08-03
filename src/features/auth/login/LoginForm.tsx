"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Lock, Eye, EyeOff } from "lucide-react";

import { loginAgent, LoginResponse } from "./login.api";
import { validateLoginInput, normalizePhone } from "./login.validation";

type LoginFormProps = {
  successMsg?: string;
  onSuccess: (data: LoginResponse) => void;
};

const NM = '"Neue Machina", system-ui, -apple-system, sans-serif';

export function LoginForm({ successMsg, onSuccess }: LoginFormProps) {
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const validation = validateLoginInput(phone, password);
    if (!validation.valid) {
      setError(validation.error || "Please enter valid login credentials.");
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      const data = await loginAgent(phone, password);
      onSuccess(data);
    } catch (err: unknown) {
      const errorMsg = err instanceof Error ? err.message : "Login failed. Please try again.";
      setError(errorMsg);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full">
      {/* Header */}
      <div className="w-full mb-10">
        <h2
          className="text-[36px] md:text-[42px] text-neutral-900 mb-3 leading-[1.15] tracking-tight"
          style={{ fontFamily: NM, fontWeight: 400 }}
        >
          Welcome to the Agent<br />Portal
        </h2>
        <p className="text-[16px] text-neutral-400">
          Manage bookings and track your earnings
        </p>
      </div>

      <div className="w-full relative">
        <motion.form
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          onSubmit={handleSubmit}
          className="space-y-6 w-full"
        >
          {/* Phone Input */}
          <div className="space-y-2">
            <label className="text-[14px] font-medium text-neutral-900">
              Mobile Number
            </label>
            <div className="relative flex items-center h-[52px] rounded-2xl border border-neutral-200 overflow-hidden transition-all duration-200 bg-white focus-within:border-[#7A1D1B] focus-within:ring-4 focus-within:ring-[#7A1D1B]/10">
              <div className="h-full px-4 flex items-center justify-center border-r border-neutral-200 bg-white">
                <span className="text-neutral-500 text-[15px]">+977</span>
              </div>
              <input
                type="tel"
                placeholder="Enter Mobile Number"
                value={phone}
                onChange={(e) => {
                  setPhone(normalizePhone(e.target.value));
                  setError("");
                }}
                className="flex-1 h-full px-4 outline-none text-[15px] text-neutral-900 bg-transparent placeholder:text-neutral-400"
                autoFocus
                autoComplete="tel"
              />
            </div>
          </div>

          {/* Password Input */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-[14px] font-medium text-neutral-900">
                Password
              </label>
              <Link
                href="/forgot-password"
                className="text-[#7A1D1B] text-[14px] hover:underline font-medium"
              >
                Forgot Password?
              </Link>
            </div>
            <div className="relative flex items-center h-[52px] rounded-2xl border border-neutral-200 hover:border-neutral-300 focus-within:border-[#7A1D1B] focus-within:ring-4 focus-within:ring-[#7A1D1B]/10 overflow-hidden transition-all duration-200 bg-white px-4">
              <Lock className="w-5 h-5 text-neutral-400 mr-3" strokeWidth={2} />
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setError("");
                }}
                className="flex-1 h-full outline-none text-[15px] text-neutral-900 bg-transparent placeholder:text-neutral-400 pr-10"
                autoComplete="current-password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 text-neutral-400 hover:text-neutral-600 focus:outline-none flex items-center justify-center"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? (
                  <EyeOff className="w-5 h-5" strokeWidth={2} />
                ) : (
                  <Eye className="w-5 h-5" strokeWidth={2} />
                )}
              </button>
            </div>
          </div>

          {/* Password reset success */}
          {successMsg && (
            <div className="flex items-start gap-2 p-3 rounded-xl bg-green-50 border border-green-100">
              <span className="material-symbols-rounded text-[18px] text-green-600 flex-shrink-0 mt-0.5">
                check_circle
              </span>
              <p className="text-[13px] text-green-700 font-medium leading-snug">
                {successMsg}
              </p>
            </div>
          )}

          {/* Server error */}
          {error && (
            <div className="flex items-start gap-2 p-3 rounded-xl bg-red-50 border border-red-100">
              <span className="material-symbols-rounded text-[18px] text-red-500 flex-shrink-0 mt-0.5">
                error
              </span>
              <p className="text-[13px] text-red-600 font-medium leading-snug">
                {error}
              </p>
            </div>
          )}

          <button
            type="submit"
            disabled={isLoading || phone.length < 10 || password.length < 6}
            className="w-full h-[52px] rounded-2xl text-white font-medium text-[16px] transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[#9A2622]"
            style={{ background: "#7A1D1B" }}
          >
            {isLoading ? (
              <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              "Sign In"
            )}
          </button>

          <div className="relative py-4 flex items-center">
            <div className="flex-grow border-t border-neutral-200" />
            <span className="flex-shrink-0 mx-4 text-neutral-400 text-[14px] bg-white">
              New to Shuv Marg?
            </span>
            <div className="flex-grow border-t border-neutral-200" />
          </div>

          <p className="text-[16px] text-center">
            <Link href="/register" className="text-[#7A1D1B] font-medium hover:underline">
              Create an agent account
            </Link>
          </p>
        </motion.form>
      </div>
    </div>
  );
}
