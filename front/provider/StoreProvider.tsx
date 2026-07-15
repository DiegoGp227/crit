"use client";

import apiClient from "@/src/shared/services/apiClient";
import type { AxiosResponse } from "axios";
import { store } from "@/store/store";
import { StoreProvider } from "easy-peasy";
import { useRouter, usePathname } from "next/navigation";
import { ReactNode, useEffect, useState } from "react";
import { SWRConfig } from "swr";

const fetcher = (url: string) =>
  apiClient.get<unknown>(url).then((res: AxiosResponse<unknown>) => res.data);

const isTokenExpired = (token: string): boolean => {
  try {
    const payload = JSON.parse(atob(token.split(".")[1]));
    return payload.exp * 1000 < Date.now();
  } catch {
    return true;
  }
};

const PUBLIC_ROUTES = ["/auth"];

export const SWRProvider = ({ children }: { children: ReactNode }) => {
  const [isClient, setIsClient] = useState(false);
  const [authChecked, setAuthChecked] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!isClient) return;

    if (PUBLIC_ROUTES.includes(pathname)) {
      setAuthChecked(true);
      return;
    }

    const token = localStorage.getItem("token");
    if (!token || isTokenExpired(token)) {
      localStorage.removeItem("token");
      router.replace("/auth");
    } else {
      setAuthChecked(true);
    }
  }, [isClient, pathname, router]);

  useEffect(() => {
    const handleUnauthorized = () => {
      store.dispatch.auth.clearAuth();
      router.replace("/auth");
    };

    window.addEventListener("app:unauthorized", handleUnauthorized);
    return () =>
      window.removeEventListener("app:unauthorized", handleUnauthorized);
  }, [router]);

  if (!isClient || !authChecked) {
    return null;
  }
  return (
    <StoreProvider store={store}>
      <SWRConfig
        value={{
          fetcher: fetcher,
          onError: (error: { status: number }) => {
            if (error.status !== 403 && error.status !== 404) {
              // We can send the error to Sentry,
              // or show a notification UI.
            }
          },
        }}
      >
        {children}
      </SWRConfig>
    </StoreProvider>
  );
};
