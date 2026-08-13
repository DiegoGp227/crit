"use client";

import { Fragment, useEffect } from "react";
import Link from "next/link";
import Button from "@/src/shared/components/ui/Button";
import { useCountdown, pad } from "@/src/shared/hooks/useCountdown";

export default function HomeCountdownMask() {
  const { days, hours, minutes, seconds, done } = useCountdown();

  useEffect(() => {
    if (done) return;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [done]);

  if (done) return null;

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
        className="absolute inset-0 bottom-[-40vh] bg-bg/70 backdrop-blur-lg"
      />
      <div className="relative flex h-full flex-col items-center justify-center gap-6 px-4 text-center sm:gap-8 sm:px-6">
        <p className="text-2xs font-semibold uppercase tracking-[0.3em] text-text-muted sm:text-xs">
          Próximo crit · Virgilio Barco
        </p>
        <h1 className="text-2xl font-bold text-text-primary sm:text-3xl md:text-4xl lg:text-5xl">
          La leña comienza el viernes 21 de agosto a las 7:00 PM
        </h1>
        <div className="flex items-center justify-center gap-0">
          {cells.map((cell, index) => (
            <Fragment key={cell.label}>
              {index > 0 && (
                <span className="mx-1.5 -mt-1 h-2 w-2 shrink-0 animate-pulse rounded-full bg-cta sm:mx-4 sm:h-2.5 sm:w-2.5" />
              )}
              <div className="flex flex-col items-center">
                <span className="text-countdown leading-none font-bold text-text-primary tabular-nums">
                  {cell.value}
                </span>
                <span className="-mt-2 text-2xs font-semibold uppercase tracking-widest text-text-secondary sm:text-xs">
                  {cell.label}
                </span>
              </div>
            </Fragment>
          ))}
        </div>
        <div className="mt-2 flex w-full max-w-sm flex-col items-center gap-3 rounded-2xl border border-border bg-surface/60 px-6 py-5 backdrop-blur-sm sm:max-w-md">
          <p className="flex items-center gap-2 text-sm font-medium text-text-secondary sm:text-base">
            <span aria-hidden className="h-2 w-2 animate-pulse rounded-full bg-cta" />
            Puedes ir inscribiéndote
          </p>
          <Link href="/auth" className="w-full sm:w-auto">
            <Button size="lg" className="w-full sm:w-auto">
              Inscríbete
            </Button>
          </Link>
        </div>
        <p className="max-w-md text-xs text-text-muted sm:text-sm">
          La página estará disponible cuando inicie el evento.
        </p>
      </div>
    </div>
  );
}
