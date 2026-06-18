import { create } from "zustand";

interface SecurityStore {
  result: any;
  events: any[];
  setResult: (result: any) => void;
  addEvent: (event: any) => void;
  clearEvents: () => void;
}

export const useSecurityStore = create<SecurityStore>((set) => ({
  result: null,
  events: [],
  setResult: (result) => set({ result }),
  addEvent: (event) =>
    set((state) => ({
      events: [...state.events, event]
    })),
  clearEvents: () => set({ events: [] })
}));