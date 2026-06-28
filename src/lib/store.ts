import { useSyncExternalStore } from "react";

let state = {
  onboardingStep: 0,
  onboardingTitle: "Operator Profile",
  agentProfile: null as { name: string | null; id: string | null; initials: string | null } | null,
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
