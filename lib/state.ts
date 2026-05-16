"use client";

import { create } from "zustand";
import type { ScreenId } from "./flows";

type PrototypeState = {
  walletBalance: number;
  loyaltyPoints: number;
  currentScreen: ScreenId;
  currentSheet: ScreenId | null;
  transactionDone: boolean;
  aiTemplate: string | null;
  recordTransaction: () => void;
  navigate: (screen: ScreenId) => void;
  openSheet: (sheet: ScreenId) => void;
  replaceSheet: (sheet: ScreenId) => void;
  closeSheet: () => void;
  setAiTemplate: (tpl: string | null) => void;
};

export const usePrototype = create<PrototypeState>((set) => ({
  walletBalance: 1530.25,
  loyaltyPoints: 5430,
  currentScreen: "home",
  currentSheet: null,
  transactionDone: false,
  aiTemplate: null,

  recordTransaction: () =>
    set((s) =>
      s.transactionDone
        ? {}
        : {
            walletBalance: +(s.walletBalance - 50).toFixed(2),
            loyaltyPoints: s.loyaltyPoints + 102,
            transactionDone: true,
          }
    ),

  navigate: (screen) => set({ currentScreen: screen, currentSheet: null, aiTemplate: null }),
  openSheet: (sheet) => set({ currentSheet: sheet }),
  replaceSheet: (sheet) => set({ currentSheet: sheet }),
  closeSheet: () => set({ currentSheet: null }),
  setAiTemplate: (tpl) => set({ aiTemplate: tpl }),
}));
