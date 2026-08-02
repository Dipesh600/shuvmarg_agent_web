/**
 * lib/agentApi.ts
 *
 * API layer for agent application lifecycle calls.
 * All calls use authFetch for automatic token refresh.
 */

import { authFetch, getAccessToken, clearTokens } from "./auth";

const API = process.env.NEXT_PUBLIC_API_URL!;

export interface ApplicationStatusData {
  hasApplication: boolean;
  agentId: string | null;
  userName: string | null;
  applicationStatus: "DRAFT" | "PENDING" | "MORE_INFO" | "APPROVED" | "REJECTED" | "SUSPENDED" | null;
  agentType: string | null;
  submittedAt: string | null;
  approvedAt: string | null;
  personal: {
    district: string | null;
    municipality: string | null;
    placeName: string | null;
  };
  business: {
    businessName: string | null;
    shopAddress: string | null;
    operationType: string | null;
    claimedMonthlyVolume: string | null;
    currentOperators: string | null;
    referralSource: string | null;
  };
  identification: {
    citizenshipNumber: string | null;
    nationalIdNumber: string | null;
    panNumber: string | null;
  };
  documents: Array<{
    type: string;
    previewUrl?: string;
    fileKey?: string;
    uploadedAt: string;
    verified: boolean;
  }>;
  consents: {
    termsAcceptedAt: string | null;
    whatsappConsent: boolean;
  };
  rejectionReason: string | null;
  moreInfoRequest: string | null;
  moreInfoRequestedAt: string | null;
  isPermanentlyRejected: boolean;
  canReapply: boolean;
  reapplyAvailableAt: string | null;
}

/** Fetch application status (works in any auth state — DRAFT, PENDING, etc.) */
export async function getApplicationStatus(): Promise<ApplicationStatusData | null> {
  try {
    const res = await authFetch(`${API}/agent/application/status`);
    if (!res.ok) return null;
    const json = await res.json();
    return json.data as ApplicationStatusData;
  } catch {
    return null;
  }
}

/** Save partial draft (any step) */
export async function saveApplicationDraft(fields: Record<string, unknown>): Promise<{ success: boolean; message?: string }> {
  const res = await authFetch(`${API}/agent/application/save`, {
    method: "POST",
    body: JSON.stringify(fields),
  });
  return res.json();
}

/** Upload a single document file — multipart */
export async function uploadDocument(
  documentType: string,
  file: File,
  onProgress?: (pct: number) => void
): Promise<{ success: boolean; message?: string; data?: { documentType: string; previewUrl: string } }> {
  // We use XMLHttpRequest here to support upload progress callbacks
  return new Promise((resolve) => {
    const token = getAccessToken();
    const formData = new FormData();
    formData.append("file", file);
    formData.append("documentType", documentType);

    const xhr = new XMLHttpRequest();
    xhr.open("POST", `${API}/agent/application/document`);
    if (token) xhr.setRequestHeader("Authorization", `Bearer ${token}`);

    if (onProgress) {
      xhr.upload.addEventListener("progress", (e) => {
        if (e.lengthComputable) onProgress(Math.round((e.loaded / e.total) * 100));
      });
    }

    xhr.onload = () => {
      try {
        resolve(JSON.parse(xhr.responseText));
      } catch {
        resolve({ success: false, message: "Upload failed." });
      }
    };
    xhr.onerror = () => resolve({ success: false, message: "Network error during upload." });
    xhr.send(formData);
  });
}

/** Submit application for review (DRAFT → PENDING) */
export async function submitApplication(
  termsAccepted: boolean,
  whatsappConsent: boolean
): Promise<{ success: boolean; message?: string; errors?: string[] }> {
  const res = await authFetch(`${API}/agent/application/submit`, {
    method: "POST",
    body: JSON.stringify({ termsAccepted, whatsappConsent }),
  });
  return res.json();
}
