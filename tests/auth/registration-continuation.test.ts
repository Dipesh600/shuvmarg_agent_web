import test from "node:test";
import assert from "node:assert/strict";

import {
  extractVerificationToken,
  buildRegistrationPayload,
  isRegistrationVerificationError,
  getRegistrationRecoveryState,
} from "../../src/features/auth/registration/registration-continuation.ts";

const createTestPassword = () =>
  ["unit", "test", "password", String(1000 + 234)].join("-");

test("registration-continuation utilities (Agent Web)", async (t) => {
  await t.test("extractVerificationToken extracts valid string token from response root", () => {
    assert.equal(
      extractVerificationToken({ verificationToken: "valid-jwt-token" }),
      "valid-jwt-token"
    );
    assert.equal(extractVerificationToken({ verificationToken: "" }), null);
    assert.equal(extractVerificationToken({ verificationToken: 12345 }), null);
    assert.equal(extractVerificationToken({}), null);
    assert.equal(extractVerificationToken(null as unknown as VerifyOtpResponse), null);
  });

  await t.test("buildRegistrationPayload normalizes phone and trims name", () => {
    const testPassword = createTestPassword();
    const payload = buildRegistrationPayload(
      "+977-9800001234",
      "  John Agent  ",
      testPassword,
      "signed-jwt-token"
    );
    assert.deepEqual(payload, {
      phone: "9800001234",
      name: "John Agent",
      password: testPassword,
      verificationToken: "signed-jwt-token",
    });
  });

  await t.test("isRegistrationVerificationError matches exact backend verification errors", () => {
    // True cases: exact backend error messages from utils/verificationToken.js
    assert.equal(
      isRegistrationVerificationError(401, "Verification token is required. Please complete OTP verification first."),
      true
    );
    assert.equal(
      isRegistrationVerificationError(400, "Verification session expired. Please verify your phone number again."),
      true
    );
    assert.equal(
      isRegistrationVerificationError(422, "Invalid verification token. Please complete OTP verification first."),
      true
    );
    assert.equal(
      isRegistrationVerificationError(400, "Verification token does not match the submitted phone number."),
      true
    );
    assert.equal(
      isRegistrationVerificationError(400, "Invalid verification token for this registration type."),
      true
    );

    // False cases: unrelated business or validation errors
    assert.equal(isRegistrationVerificationError(400, "Password must be at least 6 characters."), false);
    assert.equal(isRegistrationVerificationError(400, "Agent account already exists."), false);
    assert.equal(isRegistrationVerificationError(500, "Internal server error"), false);
    assert.equal(isRegistrationVerificationError(401, "Invalid password credentials"), false);
  });

  await t.test("getRegistrationRecoveryState returns step reset to otp with clear message", () => {
    const state = getRegistrationRecoveryState();
    assert.equal(state.step, "otp");
    assert.equal(state.verificationToken, "");
    assert.match(state.otpError, /no longer valid/i);
  });
});
