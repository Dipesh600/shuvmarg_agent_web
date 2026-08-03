/**
 * src/features/auth/password-reset/password-reset.validation.ts
 *
 * Pure validation utilities for Agent Portal password reset flow.
 */

export function normalizePhone(rawPhone: string): string {
  const digits = rawPhone.replace(/\D/g, "");
  if (digits.length === 13 && digits.startsWith("977")) {
    return digits.slice(3);
  }
  return digits.slice(-10);
}

export function validatePhone(phone: string): { valid: boolean; error?: string } {
  const clean = normalizePhone(phone);
  if (clean.length < 10) {
    return { valid: false, error: "Please enter a valid 10-digit mobile number." };
  }
  return { valid: true };
}

export function validatePassword(password: string): { valid: boolean; error?: string } {
  if (password.length < 6) {
    return { valid: false, error: "Password must be at least 6 characters." };
  }
  return { valid: true };
}

export function validatePasswordReset(
  password: string,
  confirmPassword: string
): { valid: boolean; error?: string } {
  const passCheck = validatePassword(password);
  if (!passCheck.valid) {
    return passCheck;
  }
  if (password !== confirmPassword) {
    return { valid: false, error: "Passwords do not match." };
  }
  return { valid: true };
}
