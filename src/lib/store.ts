import { useSyncExternalStore } from "react";

let state = {
  onboardingStep: 0,
  onboardingTitle: "Operator Profile",
  agentProfile: null as {
    // Identity
    name: string | null;
    id: string | null;
    initials: string | null;
    avatar?: string | null;
    agentType: string | null;
    // Personal
    district: string | null;
    municipality: string | null;
    placeName: string | null;
    // Business
    businessName: string | null;
    shopAddress: string | null;
    operationType: string | null;
    claimedMonthlyVolume: string | null;
    currentOperators: string | null;
    // Identification
    citizenshipNumber: string | null;
    nationalIdNumber: string | null;
    panNumber: string | null;
    // Documents
    documents: Array<{ type: string; fileKey: string; previewUrl?: string; uploadedAt: string; verified: boolean }>;
    // Dates
    submittedAt: string | null;
    approvedAt: string | null;
  } | null,
};
let listeners = new Set<() => void>();

export const store = {
  getState: () => state,
  setState: (newState: Partial<typeof state>) => {
    state = { ...state, ...newState };
    listeners.forEach(l => l());
  },
  subscribe: (l: () => void) => {
    listeners.add(l);
    return () => listeners.delete(l);
  }
};

export function useOnboardingStore() {
  return useSyncExternalStore(store.subscribe, store.getState, store.getState);
}

export function useGlobalStore() {
  return useSyncExternalStore(store.subscribe, store.getState, store.getState);
}
