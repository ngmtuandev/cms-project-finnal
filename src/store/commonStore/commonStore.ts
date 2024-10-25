import { create } from "zustand";

export const useCommonStore = create<any>((set) => ({
  isLoading: false,
  isOpenMenuMobile: false,
  idRoleUser: undefined,
  setIsLoading: (isLoading: boolean) => set(() => ({ isLoading })),
  setIsOpenMenuMobile: (isOpenMenuMobile: boolean) =>
    set(() => ({ isOpenMenuMobile })),
  setIdRoleUser: (idRoleUser: string) => set(() => ({ idRoleUser })),
}));
