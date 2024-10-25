import { create } from "zustand";

interface FilterRecordState {
  typeTransaction: string | undefined;
  typeResult: string | number | undefined;
  startDate: any;
  endDate: any;
  setTypeTransaction: (typeTransaction: string | undefined) => void;
  setTypeResult: (typeResult: string | undefined | number) => void;
  setStartDate: (startDate: any) => void;
  setEndDate: (endDate: any) => void;
}

export const useDashboardRecordStore = create<FilterRecordState>((set) => ({
  typeTransaction: "Error",
  typeResult: undefined,
  startDate: undefined,
  endDate: undefined,
  setTypeTransaction: (typeTransaction: string | undefined) =>
    set(() => ({ typeTransaction })),
  setStartDate: (startDate: any) => set(() => ({ startDate })),
  setEndDate: (endDate: any) => set(() => ({ endDate })),
  setTypeResult: (typeResult: any) =>
    set(() => ({
      typeResult,
    })),
}));
