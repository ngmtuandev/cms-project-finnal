import { create } from "zustand";

interface FilterRecordState {
  page: string | number;
  size: string | number;
  startDate: any;
  endDate: any;
  storeCode: any;
  setPage: (page: any) => void;
  setStoreCode: (storeCode: string | undefined | null) => void;
  setStartDate: (startDate: any) => void;
  setEndDate: (endDate: any) => void;
}

export const useFilterRecordStore = create<FilterRecordState>((set) => ({
  page: 1,
  size: 10,
  storeCode: undefined,
  startDate: undefined,
  endDate: undefined,
  setPage: (page: number | string) => set(() => ({ page })),
  setStoreCode: (storeCode: string | undefined | null) =>
    set(() => ({ storeCode })),
  setStartDate: (startDate: any) => set(() => ({ startDate })),
  setEndDate: (endDate: any) => set(() => ({ endDate })),
}));
