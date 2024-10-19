import { create } from "zustand";

interface recordByResultState {
  startDate: any;
  endDate: any;
  setStartDate: (startDate: any) => void;
  setEndDate: (endDate: any) => void;
}

export const useRecordByResultStore = create<recordByResultState>((set) => ({
  startDate: undefined,
  endDate: undefined,
  setStartDate: (startDate: any) => set(() => ({ startDate })),
  setEndDate: (endDate: any) => set(() => ({ endDate })),
}));
