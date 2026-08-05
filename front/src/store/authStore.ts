import { create } from "zustand";
import { persist } from "zustand/middleware";

// El token JWT ya NO vive aquí: ahora viaja en una cookie HttpOnly
// (manejada por el navegador). El store solo guarda info no sensible
// del usuario para el render de la UI (menú, roles, etc.).
export interface AuthUser {
  id: number;
  email: string;
  role: string;
  createdAt: string;
  updatedAt: string;
}

interface AuthState {
  user: AuthUser | null;
  isAuthenticated: boolean;
  setAuth: (user: AuthUser) => void;
  clearAuth: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      setAuth: (user) => set({ user, isAuthenticated: true }),
      clearAuth: () => {
        // Limpia también el token viejo que pudo quedar en localStorage
        // de sesiones anteriores (antes de la migración a cookies).
        localStorage.removeItem("token");
        set({ user: null, isAuthenticated: false });
      },
    }),
    {
      name: "auth-storage",
      // Solo persistimos el usuario; nunca el token.
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
      }),
      // Migración del storage: si el estado guardado aún trae un `token`
      // (de la versión anterior), se descarta al rehidratar.
      version: 2,
      migrate: (persistedState) => {
        // Si el estado guardado aún trae un `token` (versión anterior), se
        // descarta al rehidratar: la sesión ahora vive solo en la cookie.
        const rest = { ...(persistedState as Record<string, unknown>) };
        delete rest.token;
        return rest as unknown as AuthState;
      },
    },
  ),
);
