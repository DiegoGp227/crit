"use client";

import { Fragment, useEffect, useSyncExternalStore } from "react";

const BOGOTA_TZ = "America/Bogota";

const getNextThursday7pm = (): number => {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: BOGOTA_TZ,
    year: "numeric",
    month: "numeric",
    day: "numeric",
    weekday: "short",
    hour: "numeric",
    minute: "numeric",
    hour12: false,
  }).formatToParts(new Date());

  const get = (type: string) => parts.find((part) => part.type === type)?.value;

  const weekdays: Record<string, number> = {
    Sun: 0,
    Mon: 1,
    Tue: 2,
    Wed: 3,
    Thu: 4,
    Fri: 5,
    Sat: 6,
  };

  const weekday = weekdays[get("weekday") ?? "Mon"] ?? 0;
  const year = Number(get("year"));
  const month = Number(get("month"));
  const day = Number(get("day"));
  const hour = Number(get("hour"));
  const minute = Number(get("minute"));

  let daysUntil = (4 - weekday + 7) % 7;
  if (daysUntil === 0 && (hour > 19 || (hour === 19 && minute > 0))) {
    daysUntil = 7;
  }

  // 19:00 Bogotá (UTC-5) == 24:00 UTC del mismo día
  return Date.UTC(year, month - 1, day + daysUntil, 24, 0, 0);
};

const getSecondsLeft = () =>
  Math.max(0, Math.floor((getNextThursday7pm() - Date.now()) / 1000));

const subscribe = (callback: () => void) => {
  callback();
  const timer = setInterval(callback, 1000);
  return () => clearInterval(timer);
};

const getSnapshot = () => String(getSecondsLeft());

const getServerSnapshot = () => "0";

const pad = (value: number) => String(value).padStart(2, "0");

export default function HomeCountdownMask() {
  const totalSeconds = Number(
    useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot),
  );
  const done = totalSeconds === 0;

  useEffect(() => {
    if (done) return;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [done]);

  if (done) return null;

  const days = Math.floor(totalSeconds / 86400);
  const hours = Math.floor((totalSeconds % 86400) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  const cells = [
    { label: "Días", value: pad(days) },
    { label: "Horas", value: pad(hours) },
    { label: "Minutos", value: pad(minutes) },
    { label: "Segundos", value: pad(seconds) },
  ];

  return (
    <div className="fixed inset-0 z-40">
      <div
        aria-hidden
        className="absolute inset-0 -bottom-[40vh] bg-bg/70 backdrop-blur-lg"
      />
      <div className="relative flex h-full flex-col items-center justify-center gap-6 px-4 text-center sm:gap-8 sm:px-6">
        <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-text-muted sm:text-xs">
          Próximo crit · Virgilio Barco
        </p>
        <h1 className="text-2xl font-bold text-text-primary sm:text-3xl md:text-4xl lg:text-5xl">
          La Leña comienza el jueves a las 7:00 PM
        </h1>
        <div className="flex items-center justify-center gap-0">
          {cells.map((cell, index) => (
            <Fragment key={cell.label}>
              {index > 0 && (
                <span className="mx-1.5 -mt-1 h-2 w-2 shrink-0 animate-pulse rounded-full bg-cta sm:mx-4 sm:h-2.5 sm:w-2.5" />
              )}
              <div className="flex flex-col items-center">
                <span className="text-[clamp(2.25rem,11vw,7.5rem)] leading-none font-bold text-text-primary tabular-nums">
                  {cell.value}
                </span>
                <span className="-mt-2 text-[10px] font-semibold uppercase tracking-widest text-text-secondary sm:text-xs">
                  {cell.label}
                </span>
              </div>
            </Fragment>
          ))}
        </div>
        <p className="mt-2 max-w-md text-xs text-text-muted sm:text-sm">
          La página estará disponible cuando inicie el evento.
        </p>
      </div>
    </div>
  );
}
