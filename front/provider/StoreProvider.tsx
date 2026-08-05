"use client";

import apiClient from "@/src/shared/services/apiClient";
import type { AxiosResponse } from "axios";
import { useAuthStore } from "@/src/store/authStore";
import { useRouter } from "next/navigation";
import { ReactNode, useEffect, useSyncExternalStore } from "react";
import { SWRConfig } from "swr";

const fetcher = (url: string) =>
  apiClient.get<unknown>(url).then((res: AxiosResponse<unknown>) => res.data);

export const SWRProvider = ({ children }: { children: ReactNode }) => {
  const router = useRouter();
  const clearAuth = useAuthStore((s) => s.clearAuth);

  // Detecta si estamos en el cliente sin disparar `set-state-in-effect`.
  // Es el patrón canónico de React: durante el SSR devuelve `false`
  // (snapshot de servidor) y en el cliente `true` (snapshot de navegador).
  const isClient = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );

  // 401 inesperado en mitad de la sesión (token expirado, cookie borrada,
  // etc.): limpiamos el store local y volvemos al login.
  // La protección de rutas al entrar la hace el middleware de Next (server-side).
  useEffect(() => {
    const handleUnauthorized = () => {
      clearAuth();
      router.replace("/auth");
    };

    window.addEventListener("app:unauthorized", handleUnauthorized);
    return () =>
      window.removeEventListener("app:unauthorized", handleUnauthorized);
  }, [router, clearAuth]);

  if (!isClient) {
    return null;
  }

  return (
    <SWRConfig
      value={{
        fetcher: fetcher,
      }}
    >
      {children}
    </SWRConfig>
  );
};
