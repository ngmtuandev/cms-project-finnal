import { create } from "zustand";

interface overallRecordState {
  startDate: any;
  endDate: any;
  teacherId: any;
  setTeacherId: (teacherId: any) => void;
  setStartDate: (startDate: any) => void;
  setEndDate: (endDate: any) => void;
}

export const useHistoryOfTeacherStore = create<overallRecordState>((set) => ({
  teacherId: undefined,
  startDate: undefined,
  endDate: undefined,
  setTeacherId: (teacherId: string | undefined) => set(() => ({ teacherId })),
  setStartDate: (startDate: any) => set(() => ({ startDate })),
  setEndDate: (endDate: any) => set(() => ({ endDate })),
}));
