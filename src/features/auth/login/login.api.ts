/**
 * src/features/auth/login/login.api.ts
 *
 * API client helper methods for Agent Login.
 */

const API = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

function cleanPhone(rawPhone: string): string {
  const digits = rawPhone.replace(/\D/g, "");
  if (digits.length === 13 && digits.startsWith("977")) {
    return digits.slice(3);
  }
  return digits.slice(-10);
}

export type LoginResponse = {
  success?: boolean;
  message?: string;
  accessToken?: string;
  forcePasswordChange?: boolean;
  tempToken?: string;
  user?: unknown;
};

export type ApiError = Error & {
  status?: number;
};

export async function loginAgent(phone: string, password: string): Promise<LoginResponse> {
  const normalized = cleanPhone(phone);
  const res = await fetch(`${API}/auth/agent/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ phone: normalized, password }),
  });
  const data = await res.json();
  if (!res.ok) {
    const error: ApiError = new Error(data.message || "Login failed. Please try again.");
    error.status = res.status;
    throw error;
  }
  return data;
}
