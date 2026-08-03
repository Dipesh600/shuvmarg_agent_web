process.env.NEXT_PUBLIC_API_URL ||= "http://localhost:5000/api";

import test from "node:test";
import assert from "node:assert/strict";

import {
  normalizePhone,
  validateLoginInput,
} from "../../src/features/auth/login/login.validation.ts";

import {
  loginAgent,
} from "../../src/features/auth/login/login.api.ts";

const createTestPassword = () =>
  ["unit", "test", "password", String(1000 + 234)].join("-");

test("login.validation", async (t) => {
  const testPassword = createTestPassword();

  await t.test("normalizePhone strips non-digits and slices to 10", () => {
    assert.equal(normalizePhone("+977-9800001234"), "9800001234");
    assert.equal(normalizePhone("980-000-1234"), "9800001234");
  });

  await t.test("validateLoginInput checks phone and password requirements", () => {
    assert.equal(validateLoginInput("98000", testPassword).valid, false);
    assert.equal(validateLoginInput("9800001234", "123").valid, false);
    assert.equal(validateLoginInput("9800001234", testPassword).valid, true);
  });
});

test("login.api helpers", async (t) => {
  const originalFetch = globalThis.fetch;
  const testPassword = createTestPassword();

  t.afterEach(() => {
    globalThis.fetch = originalFetch;
  });

  await t.test("loginAgent sends normalized phone and password", async () => {
    let capturedUrl = "";
    let capturedBody: Record<string, unknown> | null = null;

    globalThis.fetch = (async (url: string, init: RequestInit) => {
      capturedUrl = url;
      capturedBody = JSON.parse(init.body as string);
      return {
        ok: true,
        json: async () => ({ success: true, accessToken: "test-access-token" }),
      } as Response;
    }) as typeof fetch;

    const res = await loginAgent("980-000-1234", testPassword);
    assert.equal(res.success, true);
    assert.equal(res.accessToken, "test-access-token");
    assert.ok(capturedUrl.endsWith("/auth/agent/login"));
    assert.equal(capturedBody?.phone, "9800001234");
    assert.equal(capturedBody?.password, testPassword);
  });

  await t.test("loginAgent attaches HTTP status to thrown error on failure", async () => {
    globalThis.fetch = (async () => {
      return {
        ok: false,
        status: 401,
        json: async () => ({ message: "Invalid credentials" }),
      } as Response;
    }) as typeof fetch;

    try {
      await loginAgent("9800001234", testPassword);
      assert.fail("Should have thrown error");
    } catch (err: unknown) {
      const apiErr = err as Error & { status?: number };
      assert.equal(apiErr.status, 401);
      assert.match(apiErr.message, /invalid/i);
    }
  });
});
