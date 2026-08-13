"use client";

import { useSyncExternalStore } from "react";

// Viernes 21 de agosto de 2026, 19:00 Bogotá (UTC-5) == 24:00 UTC del mismo día
export const EVENT_UTC = Date.UTC(2026, 7, 21, 24, 0, 0);

const getSecondsLeft = () =>
  Math.max(0, Math.floor((EVENT_UTC - Date.now()) / 1000));

const subscribe = (callback: () => void) => {
  callback();
  const timer = setInterval(callback, 1000);
  return () => clearInterval(timer);
};

const getSnapshot = () => String(getSecondsLeft());

const getServerSnapshot = () => "0";

export const pad = (value: number) => String(value).padStart(2, "0");

export function useCountdown() {
  const totalSeconds = Number(
    useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot),
  );
  const done = totalSeconds === 0;

  return {
    days: Math.floor(totalSeconds / 86400),
    hours: Math.floor((totalSeconds % 86400) / 3600),
    minutes: Math.floor((totalSeconds % 3600) / 60),
    seconds: totalSeconds % 60,
    done,
  };
}