import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface IAuthResponse {
  user: {
    id: string;
    email: string;
    name: string;
    createdAt: string;
    updatedAt: string;
  } | null;
  token: string;
}

interface AuthState {
  user: IAuthResponse["user"];
  isAuthenticated: boolean;
  token: string | null;
  setAuth: (payload: IAuthResponse) => void;
  clearAuth: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      token: null,
      setAuth: (payload) => {
        localStorage.setItem("token", payload.token);
        set({ user: payload.user, token: payload.token, isAuthenticated: true });
      },
      clearAuth: () => {
        localStorage.removeItem("token");
        set({ user: null, token: null, isAuthenticated: false });
      },
    }),
    {
      name: "auth-storage",
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
        token: state.token,
      }),
    },
  ),
);
