import { create } from "zustand";

interface FilterRecordState {
  isActive: boolean;
  setIsActive: (isActive: boolean) => void;
}

export const useConditionSolutionStore = create<FilterRecordState>((set) => ({
  isActive: true,
  setIsActive: (isActive: boolean) => set(() => ({ isActive })),
}));
