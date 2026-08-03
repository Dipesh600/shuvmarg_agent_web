"use client";

import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";

import { PasswordResetLayout } from "@/features/auth/password-reset/PasswordResetLayout";
import { ForgotPasswordForm } from "@/features/auth/password-reset/ForgotPasswordForm";
import { PasswordResetOtpForm } from "@/features/auth/password-reset/PasswordResetOtpForm";
import { NewPasswordForm } from "@/features/auth/password-reset/NewPasswordForm";
import { PasswordResetSuccess } from "@/features/auth/password-reset/PasswordResetSuccess";

type Step = "phone" | "otp" | "password" | "success";

export default function ForgotPasswordPage() {
  const router = useRouter();
  const [step, setStep] = useState<Step>("phone");
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");

  const clearSensitiveState = () => {
    setPhone("");
    setOtp("");
  };

  const handlePhoneNext = (verifiedPhone: string) => {
    setPhone(verifiedPhone);
    setStep("otp");
  };

  const handleOtpNext = (verifiedOtp: string) => {
    setOtp(verifiedOtp);
    setStep("password");
  };

  const handleChangeNumber = () => {
    setOtp("");
    setStep("phone");
  };

  const handlePasswordSuccess = () => {
    clearSensitiveState();
    setStep("success");
  };

  const handleSessionExpired = () => {
    setOtp("");
    setStep("otp");
  };

  const handleBack = () => {
    if (step === "otp") {
      setOtp("");
      setStep("phone");
    } else if (step === "password") {
      setOtp("");
      setStep("otp");
    } else if (step === "success") {
      clearSensitiveState();
      router.push("/login");
    } else {
      clearSensitiveState();
      router.back();
    }
  };

  return (
    <PasswordResetLayout onBack={handleBack}>
      {/* Header */}
      <div className="w-full mb-10">
        <h2 className="text-[28px] md:text-[32px] font-bold text-neutral-900 mb-2">
          {step === "phone" && "Forgot Password?"}
          {step === "otp" && "Verify Phone"}
          {step === "password" && "Reset Password"}
          {step === "success" && "Success"}
        </h2>
        <p className="text-[15px] text-neutral-500">
          {step === "phone" && "Enter your registered mobile number and we\u2019ll send a reset code."}
          {step === "otp" && (
            <>Enter the 6-digit code sent to <strong className="text-neutral-900">+977-{phone}</strong></>
          )}
          {step === "password" && "Create a new, secure password for your agent account."}
          {step === "success" && "Your password has been reset successfully."}
        </p>
      </div>

      <div className="w-full relative">
        <AnimatePresence mode="wait">
          {step === "phone" && (
            <ForgotPasswordForm initialPhone={phone} onNext={handlePhoneNext} />
          )}
          {step === "otp" && (
            <PasswordResetOtpForm
              phone={phone}
              onNext={handleOtpNext}
              onChangeNumber={handleChangeNumber}
            />
          )}
          {step === "password" && (
            <NewPasswordForm
              phone={phone}
              otp={otp}
              onSuccess={handlePasswordSuccess}
              onSessionExpired={handleSessionExpired}
            />
          )}
          {step === "success" && <PasswordResetSuccess />}
        </AnimatePresence>
      </div>
    </PasswordResetLayout>
  );
}
