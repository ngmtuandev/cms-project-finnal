import { create } from "zustand";

interface FilterRecordState {
  page: string | number;
  size: string | number;
  startDate: any;
  endDate: any;
  storeCode: any;
  machineCode: any;
  typeResult: any;
  typeTransaction: any;
  setPage: (page: any) => void;
  setStoreCode: (storeCode: string | undefined | null) => void;
  setStartDate: (startDate: any) => void;
  setEndDate: (endDate: any) => void;
  setMachineCode: (machineCode: any) => void;
  setTypeResult: (typeResult: any) => void;
  setTypeTransaction: (typeTransaction: any) => void;
}

export const useFilterRecordStore = create<FilterRecordState>((set) => ({
  page: 0,
  size: 6,
  storeCode: undefined,
  startDate: undefined,
  endDate: undefined,
  machineCode: undefined,
  typeResult: undefined,
  typeTransaction: "ERROR",
  setPage: (page: number | string) => set(() => ({ page: +page })),
  setStoreCode: (storeCode: string | undefined | null) =>
    set(() => ({ storeCode })),
  setStartDate: (startDate: any) => set(() => ({ startDate })),
  setEndDate: (endDate: any) => set(() => ({ endDate })),
  setMachineCode: (machineCode: any) => set(() => ({ machineCode })),
  setTypeTransaction: (typeTransaction: any) =>
    set(() => ({ typeTransaction })),
  setTypeResult: (typeResult: any) =>
    set(() => ({
      typeResult,
    })),
}));
