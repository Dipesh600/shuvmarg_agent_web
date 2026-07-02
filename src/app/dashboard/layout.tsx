"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter, usePathname } from "next/navigation";
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
  const pathname = usePathname();
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

    // Cache full profile in global store — fetched once, read everywhere
    if (data) {
      const displayName = data.userName || data.business?.businessName || "Agent";
      store.setState({
        agentProfile: {
          // Identity
          name: displayName,
          id: data.agentId,
          initials: displayName.substring(0, 2).toUpperCase(),
          avatar: `https://api.dicebear.com/9.x/notionists/svg?seed=${encodeURIComponent(displayName)}&backgroundColor=F8F1E3`,
          agentType: data.agentType,
          // Personal
          district: data.personal?.district,
          municipality: data.personal?.municipality,
          placeName: data.personal?.placeName,
          // Business
          businessName: data.business?.businessName,
          shopAddress: data.business?.shopAddress,
          operationType: data.business?.operationType,
          claimedMonthlyVolume: data.business?.claimedMonthlyVolume,
          currentOperators: data.business?.currentOperators,
          // Identification
          citizenshipNumber: data.identification?.citizenshipNumber,
          nationalIdNumber: data.identification?.nationalIdNumber,
          panNumber: data.identification?.panNumber,
          // Documents — store fileKey for proxy URL generation (never expose previewUrl directly)
          documents: (data.documents || []).map((d: { type: string; fileKey: string; uploadedAt: string; verified: boolean }) => ({
            type: d.type,
            fileKey: d.fileKey,
            uploadedAt: d.uploadedAt,
            verified: d.verified,
          })),
          // Dates
          submittedAt: data.submittedAt,
          approvedAt: data.approvedAt,
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
    if (!pathname.startsWith("/dashboard/setup")) {
      router.replace("/dashboard/setup");
      return null;
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
