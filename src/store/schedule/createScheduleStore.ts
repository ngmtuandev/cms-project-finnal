import { create } from "zustand";

interface ScheduleState {
  startDate: any;
  endDate: any;
  setStartDate: (startDate: any) => void;
  setEndDate: (endDate: any) => void;
}

export const useCreateScheduleStore = create<ScheduleState>((set) => ({
  startDate: undefined,
  endDate: undefined,
  setStartDate: (startDate: any) => set(() => ({ startDate })),
  setEndDate: (endDate: any) => set(() => ({ endDate })),
}));
