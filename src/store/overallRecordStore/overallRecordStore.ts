import { create } from "zustand";

interface overallRecordState {
  startDate: any;
  endDate: any;
  typeTransaction: string | undefined;
  setTypeTransaction: (typeTransaction: string | undefined) => void;
  setStartDate: (startDate: any) => void;
  setEndDate: (endDate: any) => void;
}

export const useOverallRecordStore = create<overallRecordState>((set) => ({
  typeTransaction: undefined,
  startDate: undefined,
  endDate: undefined,
  setTypeTransaction: (typeTransaction: string | undefined) =>
    set(() => ({ typeTransaction })),
  setStartDate: (startDate: any) => set(() => ({ startDate })),
  setEndDate: (endDate: any) => set(() => ({ endDate })),
}));
