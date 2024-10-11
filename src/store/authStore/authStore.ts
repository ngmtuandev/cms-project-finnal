import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface AuthState {
  token: string | null;
  login: (token: string) => void;
  logout: () => void;
  infoCurrent: any;
  setInfoCurrent: (infoCurrent: any) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      token: null,
      login: (token: string) => set({ token }),
      logout: () => set({ token: null }),
      infoCurrent: null,
      setInfoCurrent: (infoCurrent: any) => set({ infoCurrent }),
    }),
    {
      name: "auth-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
