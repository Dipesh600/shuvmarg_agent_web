/**
 * src/features/auth/login/login.validation.ts
 *
 * Pure validation and normalization functions for Agent Login.
 */

export function normalizePhone(phone: string): string {
  const digits = phone.replace(/\D/g, "");
  if (digits.length === 13 && digits.startsWith("977")) {
    return digits.slice(3);
  }
  return digits.slice(-10);
}

export function validateLoginInput(phone: string, password: string): { valid: boolean; error?: string } {
  const cleanPhone = normalizePhone(phone);
  if (cleanPhone.length < 10) {
    return { valid: false, error: "Please enter a valid 10-digit mobile number." };
  }
  if (!password || password.length < 6) {
    return { valid: false, error: "Password must be at least 6 characters." };
  }
  return { valid: true };
}
