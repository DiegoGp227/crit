"use client";

import { Crown, Trophy } from "lucide-react";
import { cn } from "@/src/shared/utils/cn";
import { padBib } from "@/src/shared/utils/format";
import type { Champion } from "../../hooks/useChampions";
import type { CompetitionType } from "../../services/classificationService";

const CATEGORY_META: Record<
  CompetitionType,
  { label: string; accent: string; border: string; chip: string }
> = {
  EXPERTOS: {
    label: "Expertos",
    accent: "text-cta",
    border: "border-l-cta",
    chip: "border-border-yellow bg-bg-yellow-tint text-text-secondary",
  },
  FEMENINO: {
    label: "Femenino",
    accent: "text-accent-bright",
    border: "border-l-accent-bright",
    chip: "border-accent-bright/30 bg-accent-bright/10 text-accent-bright",
  },
};

const getInitials = (name: string) =>
  name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("") || "?";

interface ChampionCardProps {
  type: CompetitionType;
  champion: Champion;
}

export default function ChampionCard({ type, champion }: ChampionCardProps) {
  const meta = CATEGORY_META[type];
  const { entry, podium, tied } = champion;
  const rest = podium.slice(1);

  return (
    <article
      className={cn(
        "group relative flex flex-col gap-3.5 rounded-2xl border border-border bg-surface-raised p-4 transition-all duration-300",
        "border-l-2",
        meta.border,
        "hover:-translate-y-1 hover:border-border-yellow hover:shadow-[0_18px_40px_rgba(0,0,0,0.45)]",
      )}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex flex-col gap-0.5">
          <span
            className={cn(
              "text-2xs font-semibold uppercase tracking-widest",
              meta.accent,
            )}
          >
            {meta.label}
          </span>
          <span className="text-2xs uppercase tracking-widest text-text-dim">
            Campeón
          </span>
        </div>

        <span
          className={cn(
            "badge shrink-0 border text-2xs",
            tied ? "border-amber/30 bg-amber/10 text-amber" : meta.chip,
          )}
        >
          {tied ? (
            "Empate"
          ) : (
            <>
              <Trophy className="size-2.5" />
              1er lugar
            </>
          )}
        </span>
      </div>

      <div className="flex items-center gap-3">
        <div className="relative shrink-0">
          <span
            className="absolute -top-2.5 left-1/2 z-10 -translate-x-1/2 animate-float-slow text-sm select-none motion-reduce:animate-none"
            aria-hidden="true"
          >
            👑
          </span>
          <div
            className={cn(
              "flex h-12 w-12 items-center justify-center overflow-hidden rounded-full border-2 bg-surface text-sm font-bold transition-shadow duration-300",
              type === "EXPERTOS"
                ? "border-cta/60 text-text-secondary group-hover:shadow-[0_0_18px_rgba(254,243,0,0.25)]"
                : "border-accent-bright/50 text-accent-bright group-hover:shadow-[0_0_18px_rgba(240,20,84,0.25)]",
            )}
          >
            {entry.avatarUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={entry.avatarUrl}
                alt={entry.fullName}
                className="h-full w-full object-cover"
              />
            ) : (
              getInitials(entry.fullName)
            )}
          </div>
        </div>

        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-bold text-text-primary">
            {entry.fullName}
          </p>
          <div className="mt-0.5 flex flex-wrap items-center gap-1.5">
            {entry.team && (
              <span className="truncate text-2xs text-text-muted">
                {entry.team}
              </span>
            )}
            <span className="rounded border border-border bg-surface px-1 py-px font-mono text-[10px] text-text-dim">
              #{padBib(entry.bibNumber)}
            </span>
          </div>
        </div>
      </div>

      <div className="flex items-end justify-between gap-3 border-t border-border pt-3">
        <div className="flex items-baseline gap-1">
          <span
            className={cn(
              "text-2xl font-bold leading-none tabular-nums",
              meta.accent,
            )}
          >
            {entry.points}
          </span>
          <span className="text-[10px] font-semibold uppercase tracking-widest text-text-dim">
            pts
          </span>
        </div>
        <span className="text-2xs text-text-muted">
          {entry.races} {entry.races === 1 ? "carrera" : "carreras"}
        </span>
      </div>

      {rest.length > 0 && (
        <div className="flex flex-col gap-1 border-t border-border pt-2.5">
          {rest.map((rider, index) => (
            <div
              key={rider.profileId}
              className="flex items-center justify-between gap-3 text-2xs"
            >
              <span className="flex min-w-0 items-center gap-1.5">
                <span className="w-3 shrink-0 font-mono text-text-dim">
                  {index + 2}.
                </span>
                <span className="truncate text-text-muted">
                  {rider.fullName}
                </span>
              </span>
              <span className="shrink-0 tabular-nums text-text-dim">
                {rider.points}
              </span>
            </div>
          ))}
        </div>
      )}

      <Crown
        className="pointer-events-none absolute -bottom-2.5 -right-2.5 size-12 text-cta/5 transition-transform duration-500 group-hover:scale-110"
        aria-hidden="true"
      />
    </article>
  );
}
