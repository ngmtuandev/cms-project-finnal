import { create } from "zustand";

export const useCommonStore = create((set) => ({
  isLoading: false,
  setIsLoading: (isLoading: boolean) => set(() => ({ isLoading })),
}));
