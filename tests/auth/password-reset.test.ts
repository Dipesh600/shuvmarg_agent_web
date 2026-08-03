process.env.NEXT_PUBLIC_API_URL ||= "http://localhost:5000/api";

import test from "node:test";
import assert from "node:assert/strict";

import {
  normalizePhone,
  validatePhone,
  validatePassword,
  validatePasswordReset,
} from "../../src/features/auth/password-reset/password-reset.validation.ts";

import {
  requestPasswordReset,
  verifyOtpForReset,
  resendOtpForReset,
  resetPassword,
} from "../../src/features/auth/password-reset/password-reset.api.ts";

const createTestPassword = () =>
  ["unit", "test", "password", String(1000 + 234)].join("-");

test("password-reset.validation", async (t) => {
  await t.test("normalizePhone strips non-digits and slices to 10", () => {
    assert.equal(normalizePhone("+977-9800001234"), "9800001234");
    assert.equal(normalizePhone("980-000-1234"), "9800001234");
  });

  await t.test("validatePhone checks 10-digit requirement", () => {
    assert.equal(validatePhone("98000").valid, false);
    assert.equal(validatePhone("9800001234").valid, true);
  });

  await t.test("validatePassword enforces min length 6", () => {
    assert.equal(validatePassword("12345").valid, false);
    assert.equal(validatePassword("123456").valid, true);
  });

  await t.test("validatePasswordReset checks password matching", () => {
    const testPassword = createTestPassword();
    const otherPassword = [testPassword, "diff"].join("-");
    assert.equal(validatePasswordReset(testPassword, otherPassword).valid, false);
    assert.equal(validatePasswordReset(testPassword, testPassword).valid, true);
  });
});

test("password-reset.api helpers", async (t) => {
  const originalFetch = globalThis.fetch;

  t.afterEach(() => {
    globalThis.fetch = originalFetch;
  });

  await t.test("requestPasswordReset sends normalized phone", async () => {
    let capturedUrl = "";
    let capturedBody: Record<string, unknown> | null = null;

    globalThis.fetch = (async (url: string, init: RequestInit) => {
      capturedUrl = url;
      capturedBody = JSON.parse(init.body as string);
      return {
        ok: true,
        json: async () => ({ success: true, message: "Code sent" }),
      } as Response;
    }) as typeof fetch;

    const res = await requestPasswordReset("980-000-1234");
    assert.equal(res.success, true);
    assert.ok(capturedUrl.endsWith("/auth/agent/requestPasswordReset"));
    assert.equal(capturedBody?.phone, "9800001234");
  });

  await t.test("verifyOtpForReset sends phone and cleaned otp", async () => {
    let capturedBody: Record<string, unknown> | null = null;

    globalThis.fetch = (async (_url: string, init: RequestInit) => {
      capturedBody = JSON.parse(init.body as string);
      return {
        ok: true,
        json: async () => ({ success: true }),
      } as Response;
    }) as typeof fetch;

    await verifyOtpForReset("9800001234", "12-34-56");
    assert.equal(capturedBody?.phone, "9800001234");
    assert.equal(capturedBody?.otp, "123456");
  });

  await t.test("resendOtpForReset sends phone", async () => {
    let capturedUrl = "";
    let capturedBody: Record<string, unknown> | null = null;

    globalThis.fetch = (async (url: string, init: RequestInit) => {
      capturedUrl = url;
      capturedBody = JSON.parse(init.body as string);
      return {
        ok: true,
        json: async () => ({ success: true, message: "Code resent" }),
      } as Response;
    }) as typeof fetch;

    const res = await resendOtpForReset("980-000-1234");
    assert.equal(res.success, true);
    assert.ok(capturedUrl.endsWith("/auth/agent/resendOtpForReset"));
    assert.equal(capturedBody?.phone, "9800001234");
  });

  await t.test("resetPassword sends phone, otp, and newPassword", async () => {
    let capturedBody: Record<string, unknown> | null = null;
    const testPassword = createTestPassword();

    globalThis.fetch = (async (_url: string, init: RequestInit) => {
      capturedBody = JSON.parse(init.body as string);
      return {
        ok: true,
        json: async () => ({ success: true }),
      } as Response;
    }) as typeof fetch;

    await resetPassword("9800001234", "123456", testPassword);
    assert.equal(capturedBody?.phone, "9800001234");
    assert.equal(capturedBody?.otp, "123456");
    assert.equal(capturedBody?.newPassword, testPassword);
  });

  await t.test("resetPassword attaches HTTP status to thrown error on failure", async () => {
    const testPassword = createTestPassword();

    globalThis.fetch = (async () => {
      return {
        ok: false,
        status: 400,
        json: async () => ({ message: "Verification session expired" }),
      } as Response;
    }) as typeof fetch;

    try {
      await resetPassword("9800001234", "123456", testPassword);
      assert.fail("Should have thrown error");
    } catch (err: unknown) {
      const apiErr = err as Error & { status?: number };
      assert.equal(apiErr.status, 400);
      assert.match(apiErr.message, /expired/i);
    }
  });
});
