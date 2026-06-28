"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { isLoggedIn, logout } from "@/lib/auth";
import { getApplicationStatus, ApplicationStatusData } from "@/lib/agentApi";
import { store } from "@/lib/store";

// ── Status screen components ───────────────────────────────────────────────────
import { PendingScreen } from "@/components/dashboard/PendingScreen";
import { RejectedScreen } from "@/components/dashboard/RejectedScreen";
import { SuspendedScreen } from "@/components/dashboard/SuspendedScreen";
import { MoreInfoScreen } from "@/components/dashboard/MoreInfoScreen";
import WorkspaceLayout from "@/components/layout/WorkspaceLayout";
interface DashboardLayoutProps {
  children: React.ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const router = useRouter();
  const [status, setStatus] = useState<ApplicationStatusData | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchStatus = useCallback(async () => {
    if (!isLoggedIn()) {
      router.replace("/login");
      return;
    }

    const data = await getApplicationStatus();
    if (!data) {
      // Could not fetch — treat as unauthenticated
      await logout();
      router.replace("/login");
      return;
    }

    // Set global store with name and agent ID for the navbar
    if (data) {
      store.setState({
        agentProfile: {
          name: data.userName || data.business?.businessName || "Agent",
          id: data.agentId || "Draft",
          initials: (data.userName || data.business?.businessName || "Agent").substring(0, 2).toUpperCase()
        }
      });
    }

    setStatus(data);
    setLoading(false);
  }, [router]);

  useEffect(() => {
    fetchStatus();
  }, [fetchStatus]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FAF7F2]">
        <div className="flex flex-col items-center gap-4">
          <div className="w-8 h-8 border-2 border-[#7A1D1B]/20 border-t-[#7A1D1B] rounded-full animate-spin" />
          <p className="text-neutral-500 text-sm">Loading your account…</p>
        </div>
      </div>
    );
  }

  // ── DRAFT: redirect to setup ──────────────────────────────────────────────
  if (!status?.applicationStatus || status.applicationStatus === "DRAFT") {
    if (typeof window !== "undefined") {
      const path = window.location.pathname;
      if (!path.startsWith("/dashboard/setup")) {
        router.replace("/dashboard/setup");
        return null;
      }
    }
    // Inside setup — render children normally
    return <>{children}</>;
  }

  // ── MORE_INFO: admin requested changes ────────────────────────────────────
  if (status.applicationStatus === "MORE_INFO") {
    return (
      <MoreInfoScreen
        moreInfoRequest={status.moreInfoRequest}
        moreInfoRequestedAt={status.moreInfoRequestedAt}
        onEditApplication={() => router.push("/dashboard/setup")}
      />
    );
  }

  // ── PENDING: submitted, under review ─────────────────────────────────────
  if (status.applicationStatus === "PENDING") {
    return <PendingScreen submittedAt={status.submittedAt} />;
  }

  // ── REJECTED ──────────────────────────────────────────────────────────────
  if (status.applicationStatus === "REJECTED") {
    return (
      <RejectedScreen
        rejectionReason={status.rejectionReason}
        isPermanentlyRejected={status.isPermanentlyRejected}
        canReapply={status.canReapply}
        reapplyAvailableAt={status.reapplyAvailableAt}
        onReapply={() => router.push("/dashboard/setup")}
      />
    );
  }

  // ── SUSPENDED ─────────────────────────────────────────────────────────────
  if (status.applicationStatus === "SUSPENDED") {
    return <SuspendedScreen />;
  }

  // ── APPROVED: render the actual dashboard ─────────────────────────────────
  return <WorkspaceLayout>{children}</WorkspaceLayout>;
}
