// Zustand 테스트

import { create } from "zustand";

type bear = {
  bears: number;
  increasePopulation: (s: number) => void;
  removeAllBears: () => void;
  updateBears: (n: number) => void;
};

export const useStore = create<bear>((set) => ({
  bears: 0,
  increasePopulation: () => set((state) => ({ bears: state.bears + 1 })),
  removeAllBears: () => set({ bears: 0 }),
  updateBears: (newBears) => set({ bears: newBears }),
}));
