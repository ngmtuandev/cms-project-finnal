import { create } from "zustand";

interface FilterRecordState {
  typeTransaction: string | undefined;
  typeResult: string | number | undefined;
  startDate2: any;
  endDate2: any;
  setTypeTransaction: (typeTransaction: string | undefined) => void;
  setTypeResult: (typeResult: string | undefined | number) => void;
  setStartDate2: (startDate: any) => void;
  setEndDate2: (endDate: any) => void;
}

export const useDashboardRecordTransferStore = create<FilterRecordState>(
  (set) => ({
    typeTransaction: "TRANSFER",
    typeResult: undefined,
    startDate2: undefined,
    endDate2: undefined,
    setTypeTransaction: (typeTransaction: string | undefined) =>
      set(() => ({ typeTransaction })),
    setStartDate2: (startDate: any) => set(() => ({ startDate2: startDate })),
    setEndDate2: (endDate: any) => set(() => ({ endDate2: endDate })),
    setTypeResult: (typeResult: any) =>
      set(() => ({
        typeResult,
      })),
  })
);
