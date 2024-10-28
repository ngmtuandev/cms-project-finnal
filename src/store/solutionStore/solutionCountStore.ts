import { create } from "zustand";

interface SolutionCountStore {
  solutionRequestCount: number;
  setSolutionCount: (solutionRequestCount: number) => void;
}

export const useSolutionCountStore = create<SolutionCountStore>((set) => ({
  solutionRequestCount: 0,
  setSolutionCount: (solutionRequestCount: number) =>
    set(() => ({ solutionRequestCount })),
}));
