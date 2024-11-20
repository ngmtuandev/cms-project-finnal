import { create } from "zustand";

interface overallRecordState {
  startDate: any;
  endDate: any;
  labId: any;
  setLabId: (labId: any) => void;
  setStartDate: (startDate: any) => void;
  setEndDate: (endDate: any) => void;
}

export const useHistoryOfLabStore = create<overallRecordState>((set) => ({
  labId: undefined,
  startDate: undefined,
  endDate: undefined,
  setLabId: (labId: string | undefined) => set(() => ({ labId })),
  setStartDate: (startDate: any) => set(() => ({ startDate })),
  setEndDate: (endDate: any) => set(() => ({ endDate })),
}));
