import { create } from "zustand";

interface problemState {
  problemId: string | any;
  problem: any;
  setProblemId: (problemId: string) => void;
  setProblem: (problem: any) => void;
}

export const useProblemStore = create<problemState>((set) => ({
  problemId: undefined,
  problem: undefined,
  setProblemId: (problemId: any) => set(() => ({ problemId })),
  setProblem: (problem: any) => set(() => ({ problem })),
}));
