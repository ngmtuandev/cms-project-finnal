import { create } from "zustand";

interface CreateRecordState {
  solution: any;
  result: any;
  machine: any;
  money: any;
  typeTransaction: any;
  isSuccess: boolean;
  setIsSuccess: (isSuccess: boolean) => void;
  setTypeTransaction: (typeTransaction: any) => void;
  setMoney: (money: any) => void;
  setMachine: (machine: any) => void;
  setResult: (result: any) => void;
  setSolution: (solution: any) => void;
}

export const useCreateRecordStore = create<CreateRecordState>((set) => ({
  solution: 1,
  result: 10,
  machine: undefined,
  money: undefined,
  typeTransaction: undefined,
  isSuccess: true,
  setTypeTransaction: (typeTransaction: number | string) =>
    set(() => ({ typeTransaction })),
  setMoney: (money: any) => set(() => ({ money })),
  setMachine: (machine: any) => set(() => ({ machine })),
  setResult: (result: any) => set(() => ({ result })),
  setSolution: (solution: any) => set(() => ({ solution })),
  setIsSuccess: (isSuccess: boolean) => set(() => ({ isSuccess })),
}));
