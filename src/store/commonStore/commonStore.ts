import { create } from "zustand";

export const useCommonStore = create<any>((set) => ({
  isLoading: false,
  isOpenMenuMobile: false,
  idRoleUser: undefined,
  idProblemError: undefined,
  flag: false,
  setIsLoading: (isLoading: boolean) => set(() => ({ isLoading })),
  setIsOpenMenuMobile: (isOpenMenuMobile: boolean) =>
    set(() => ({ isOpenMenuMobile })),
  setIdRoleUser: (idRoleUser: string) => set(() => ({ idRoleUser })),
  setIdProblemError: (idProblemError: string) =>
    set(() => ({ idProblemError })),
  setFlag: (flag: boolean) => set(() => ({ flag })),
}));
