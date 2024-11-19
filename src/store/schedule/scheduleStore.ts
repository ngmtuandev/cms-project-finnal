import { create } from "zustand";

interface ScheduleState {
  teacherId: any | undefined;
  startDate: any;
  endDate: any;
  setTeacherId: (teacherId: any | undefined) => void;
  setStartDate: (startDate: any) => void;
  setEndDate: (endDate: any) => void;
}

export const useScheduleStore = create<ScheduleState>((set) => ({
  teacherId: "",
  startDate: undefined,
  endDate: undefined,
  setStartDate: (startDate: any) => set(() => ({ startDate })),
  setEndDate: (endDate: any) => set(() => ({ endDate })),
  setTeacherId: (teacherId: any) =>
    set(() => ({
      teacherId,
    })),
}));
