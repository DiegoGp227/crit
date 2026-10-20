"use client";

import Image from "next/image";
import { Trophy } from "lucide-react";
import Section from "@/src/shared/components/ui/Section";
import { cn } from "@/src/shared/utils/cn";
import { useChampions } from "../../hooks/useChampions";
import { useRiders } from "../../hooks/useRiders";
import ChampionCard from "../molecules/ChampionCard";

const SEASON_YEAR = new Date().getFullYear();

const SPARKS = [
  { className: "left-[8%] top-[12%] h-1.5 w-1.5", delay: "0s" },
  { className: "left-[2%] bottom-[22%] h-1 w-1", delay: "1.2s" },
  { className: "right-[6%] top-[6%] h-1 w-1", delay: "0.6s" },
  { className: "right-[1%] bottom-[28%] h-1.5 w-1.5", delay: "1.8s" },
  { className: "left-1/2 top-[-6%] h-1 w-1", delay: "2.4s" },
  { className: "right-[26%] bottom-[-5%] h-1 w-1", delay: "0.9s" },
];

const CORNERS = [
  "left-0 top-0 border-l-2 border-t-2 rounded-tl-lg",
  "right-0 top-0 border-r-2 border-t-2 rounded-tr-lg",
  "left-0 bottom-0 border-l-2 border-b-2 rounded-bl-lg",
  "right-0 bottom-0 border-r-2 border-b-2 rounded-br-lg",
] as const;

export default function ChampionsSection() {
  const { list, isLoading, hasChampions } = useChampions();
  const { riders } = useRiders();

  const stats = [
    { label: "Corredores", value: String(riders.length) },
    { label: "Categorías", value: String(list.length || 2) },
    { label: "Circuito", value: "Av. Calle 53 · Bogotá" },
  ];

  return (
    <Section className="relative overflow-hidden">
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 h-125 w-160 -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{
          background:
            "radial-gradient(ellipse, rgba(254, 243, 0, 0.09), transparent 62%)",
        }}
      />

      <div className="relative flex w-full flex-col gap-10">
        <div className="flex flex-col items-center gap-2 text-center">
          <span className="badge border-border-yellow bg-bg-yellow-tint text-2xs text-text-secondary">
            <Trophy className="size-3" />
            Palmarés
          </span>
          <h2 className="text-2xl font-bold text-text-primary sm:text-3xl">
            Campeones de la Temporada
          </h2>
          <p className="max-w-md text-xs leading-relaxed text-text-muted">
            Expertos y Femenino · Crit Virgilium · Temporada {SEASON_YEAR}
          </p>
        </div>

        <div className="grid w-full grid-cols-1 items-center gap-10 lg:grid-cols-[1.25fr_0.75fr] lg:gap-8">
          {/* Marco con la foto de los campeones */}
          <div className="group relative mx-auto w-full max-w-2xl">
            <div
              className="pointer-events-none absolute -inset-6 rounded-[2.5rem] opacity-80 blur-2xl transition-opacity duration-500 group-hover:opacity-100"
              style={{
                background:
                  "radial-gradient(ellipse at center, rgba(254, 243, 0, 0.28), transparent 68%)",
              }}
            />

            {SPARKS.map((spark) => (
              <span
                key={`${spark.className}-${spark.delay}`}
                className={cn(
                  "pointer-events-none absolute animate-float-slow rounded-full bg-cta shadow-[0_0_10px_rgba(254,243,0,0.8)] motion-reduce:animate-none",
                  spark.className,
                )}
                style={{ animationDelay: spark.delay }}
                aria-hidden="true"
              />
            ))}

            <div className="relative rounded-3xl border-2 border-cta p-2.5 shadow-[0_0_70px_rgba(254,243,0,0.22)] transition-transform duration-500 group-hover:scale-[1.01]">
              {CORNERS.map((corner) => (
                <span
                  key={corner}
                  aria-hidden="true"
                  className={cn(
                    "absolute -m-1 h-6 w-6 animate-pulse border-cta motion-reduce:animate-none",
                    corner,
                  )}
                />
              ))}

              <div className="relative overflow-hidden rounded-2xl bg-surface">
                <Image
                  src="/brand/Champions.png"
                  alt="Los campeones de Crit Virgilium celebrando en el podio"
                  width={557}
                  height={405}
                  quality={90}
                  sizes="(max-width: 1024px) 100vw, 660px"
                  className="h-auto w-full object-cover contrast-[1.06] saturate-[1.08]"
                />

                <div
                  className="pointer-events-none absolute inset-y-0 -left-1/3 w-1/3 animate-shimmer bg-linear-to-r from-transparent via-white/30 to-transparent motion-reduce:animate-none"
                  aria-hidden="true"
                />

                <div
                  className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-linear-to-t from-bg/90 to-transparent"
                  aria-hidden="true"
                />

                <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 p-4">
                  <div>
                    <p className="text-2xs font-semibold uppercase tracking-widest text-cta">
                      Podio
                    </p>
                    <p className="text-sm font-bold text-text-primary">
                      Crit Virgilium
                    </p>
                  </div>
                  <span className="badge border border-cta/40 bg-bg/80 text-2xs text-text-secondary backdrop-blur-sm">
                    Temporada {SEASON_YEAR}
                  </span>
                </div>
              </div>
            </div>

            <div className="absolute -left-3 -top-4 z-20 -rotate-6 rounded-lg border border-cta bg-cta px-3 py-1.5 shadow-[0_12px_30px_rgba(254,243,0,0.35)]">
              <span className="text-2xs font-black uppercase tracking-widest text-cta-ink">
                🏆 Campeones
              </span>
            </div>
          </div>

          {/* Tarjetas de campeón */}
          <div className="flex w-full flex-col gap-4">
            {isLoading ? (
              <>
                <div className="h-44 animate-pulse rounded-2xl border border-border bg-surface-raised" />
                <div className="h-44 animate-pulse rounded-2xl border border-border bg-surface-raised" />
              </>
            ) : hasChampions ? (
              list.map(({ type, champion }) => (
                <ChampionCard key={type} type={type} champion={champion} />
              ))
            ) : (
              <div className="flex flex-col items-center gap-1.5 rounded-2xl border border-border bg-surface px-6 py-10 text-center">
                <p className="text-xs font-semibold text-text-primary">
                  La clasificación se publica tras la primera carrera
                </p>
                <p className="text-2xs text-text-muted">
                  Aquí se coronarán los campeones de la temporada.
                </p>
              </div>
            )}
          </div>
        </div>

        <div className="grid w-full grid-cols-1 gap-2 sm:grid-cols-3">
          {stats.map((stat) => (
            <div key={stat.label} className="card px-3 py-2 text-center">
              <p className="text-2xs text-text-muted">
                {stat.label}:{" "}
                <span className="font-bold text-text-primary">{stat.value}</span>
              </p>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}
