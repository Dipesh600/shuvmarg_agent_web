/**
 * src/features/auth/password-reset/password-reset.api.ts
 *
 * Network API client methods for Agent Portal password reset flow.
 */

import { API_URL } from "../../../lib/config.ts";

function cleanPhone(rawPhone: string): string {
  const digits = rawPhone.replace(/\D/g, "");
  if (digits.length === 13 && digits.startsWith("977")) {
    return digits.slice(3);
  }
  return digits.slice(-10);
}

export type ApiResponse = {
  success?: boolean;
  message?: string;
  data?: unknown;
};

export type ApiError = Error & {
  status?: number;
};

export async function requestPasswordReset(phone: string): Promise<ApiResponse> {
  const normalized = cleanPhone(phone);
  const res = await fetch(`${API_URL}/auth/agent/requestPasswordReset`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ phone: normalized }),
  });
  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.message || "Failed to send reset code. Please try again.");
  }
  return data;
}

export async function verifyOtpForReset(phone: string, otp: string): Promise<ApiResponse> {
  const normalized = cleanPhone(phone);
  const cleanOtp = otp.replace(/\D/g, "").slice(0, 6);
  const res = await fetch(`${API_URL}/auth/agent/verifyOtpForReset`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ phone: normalized, otp: cleanOtp }),
  });
  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.message || "Invalid or expired code. Please try again.");
  }
  return data;
}

export async function resendOtpForReset(phone: string): Promise<ApiResponse> {
  const normalized = cleanPhone(phone);
  const res = await fetch(`${API_URL}/auth/agent/resendOtpForReset`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ phone: normalized }),
  });
  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.message || "Failed to resend. Please try again.");
  }
  return data;
}

export async function resetPassword(
  phone: string,
  otp: string,
  newPassword: string
): Promise<ApiResponse> {
  const normalized = cleanPhone(phone);
  const cleanOtp = otp.replace(/\D/g, "").slice(0, 6);
  const res = await fetch(`${API_URL}/auth/agent/resetPassword`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ phone: normalized, otp: cleanOtp, newPassword }),
  });
  const data = await res.json();
  if (!res.ok) {
    const error: ApiError = new Error(data.message || "Failed to reset password. Please try again.");
    error.status = res.status;
    throw error;
  }
  return data;
}
