import { create } from "zustand";

interface overallRecordState {
  page: number | string;
  size: number | string;
  setPage: (page: string | number) => void;
}

export const usePaginationStore = create<overallRecordState>((set) => ({
  page: 0,
  size: 2,
  setPage: (page: number | string) => set(() => ({ page })),
}));
