import { create } from "zustand";

export const useCommonStore = create<any>((set) => ({
  isLoading: false,
  isOpenMenuMobile: false,
  setIsLoading: (isLoading: boolean) => set(() => ({ isLoading })),
  setIsOpenMenuMobile: (isOpenMenuMobile: boolean) =>
    set(() => ({ isOpenMenuMobile })),
}));
