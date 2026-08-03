"use client";

import { Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import { saveTokens } from "@/lib/auth";
import { LoginLayout } from "@/features/auth/login/LoginLayout";
import { LoginForm } from "@/features/auth/login/LoginForm";
import { LoginResponse } from "@/features/auth/login/login.api";

function LoginContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const isResetSuccess = searchParams.get("reset") === "success";
  const successMsg = isResetSuccess ? "Password reset successful. Please sign in with your new password." : "";

  const handleLoginSuccess = (data: LoginResponse) => {
    // Admin set a temporary password — redirect to force-change flow
    if (data.forcePasswordChange) {
      sessionStorage.setItem("agent_temp_token", data.tempToken || "");
      router.push("/change-password");
      return;
    }

    // Normal successful login — save tokens and go to dashboard
    if (data.accessToken) {
      saveTokens(data.accessToken);
    }
    router.push("/dashboard");
  };

  return (
    <LoginLayout onBack={() => router.back()}>
      <LoginForm successMsg={successMsg} onSuccess={handleLoginSuccess} />
    </LoginLayout>
  );
}

export default function Page() {
  return (
    <Suspense>
      <LoginContent />
    </Suspense>
  );
}
