import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useCommonStore = create(
  persist(
    (set) => ({
      isLoading: false,
      isOpenMenuMobile: false,
      idRoleUser: undefined,
      idProblemError: undefined,
      flag: false,
      isLoggedIn: false, // Trạng thái đăng nhập
      userToken: undefined, // Token của người dùng

      setIsLoading: (isLoading: boolean) => set(() => ({ isLoading })),
      setIsOpenMenuMobile: (isOpenMenuMobile: boolean) =>
        set(() => ({ isOpenMenuMobile })),
      setIdRoleUser: (idRoleUser: string) => set(() => ({ idRoleUser })),
      setIdProblemError: (idProblemError: string) =>
        set(() => ({ idProblemError })),
      setFlag: (flag: boolean) => set(() => ({ flag })),
      setIsLoggedIn: (isLoggedIn: boolean) => set(() => ({ isLoggedIn })),
      setUserToken: (userToken: string | undefined) =>
        set(() => ({ userToken })),
    }),
    {
      name: "common-store", // Tên key trong localStorage
      partialize: (state: any) => ({
        isLoggedIn: state.isLoggedIn,
        userToken: state.userToken,
      }), // Chỉ lưu những state cần thiết
    }
  )
);
