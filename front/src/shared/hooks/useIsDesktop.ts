"use client";

import { useSyncExternalStore } from "react";

const QUERY = "(min-width: 1024px)";

const subscribe = (callback: () => void) => {
  const mql = window.matchMedia(QUERY);
  mql.addEventListener("change", callback);
  return () => mql.removeEventListener("change", callback);
};

const getSnapshot = () => window.matchMedia(QUERY).matches;

const getServerSnapshot = () => false;

export const useIsDesktop = () =>
  useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
