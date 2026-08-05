"use client";

import { Bike, Trophy, Users } from "lucide-react";
import { cn } from "@/src/shared/utils/cn";
import { COMPETITION_LABELS } from "@/src/features/profile/services/registrationService";
import type { CompetitionType } from "@/src/features/profile/services/registrationService";

export type RegistrationView = "ALL" | CompetitionType;

export interface RegistrationStat {
  key: CompetitionType;
  count: number;
}

const statIcons: Record<CompetitionType, typeof Trophy> = {
  EXPERTOS: Trophy,
  FEMENINO: Bike,
};

const iconLabel: Record<CompetitionType, string> = {
  EXPERTOS: "Categoría",
  FEMENINO: "Categoría",
};

interface RegistrationStatsProps {
  total: number;
  stats: RegistrationStat[];
  active: RegistrationView;
  onSelect: (view: RegistrationView) => void;
}

export default function RegistrationStats({
  total,
  stats,
  active,
  onSelect,
}: RegistrationStatsProps) {
  const totalActive = active === "ALL";

  return (
    <div className="grid w-full grid-cols-2 gap-3 lg:flex lg:[&>*]:flex-1">
      <button
        type="button"
        onClick={() => onSelect("ALL")}
        aria-pressed={totalActive}
        className={cn(
          "card flex items-center gap-4 p-5 text-left transition-colors",
          totalActive
            ? "border border-border-yellow bg-bg-yellow-tint"
            : "hover:border-border-hover",
        )}
      >
        <span
          className={cn(
            "flex h-11 w-11 shrink-0 items-center justify-center rounded-xl",
            totalActive ? "bg-cta text-cta-ink" : "bg-surface text-text-muted",
          )}
        >
          <Users className="size-5" />
        </span>
        <span className="min-w-0">
          <span className="block text-[0.7rem] font-medium uppercase tracking-wider text-text-muted">
            Total inscritos
          </span>
          <span
            className={cn(
              "block text-3xl font-bold",
              totalActive ? "text-text-secondary" : "text-text-primary",
            )}
          >
            {total}
          </span>
        </span>
      </button>

      {stats.map((stat) => {
        const Icon = statIcons[stat.key];
        const isActive = active === stat.key;
        return (
          <button
            key={stat.key}
            type="button"
            onClick={() => onSelect(stat.key)}
            aria-pressed={isActive}
            className={cn(
              "card flex items-center gap-4 p-5 text-left transition-colors",
              isActive
                ? "border border-border-yellow bg-bg-yellow-tint"
                : "hover:border-border-hover",
            )}
          >
            <span
              className={cn(
                "flex h-11 w-11 shrink-0 items-center justify-center rounded-xl",
                isActive ? "bg-cta text-cta-ink" : "bg-surface text-text-muted",
              )}
            >
              <Icon className="size-5" />
            </span>
            <span className="min-w-0">
              <span className="block truncate text-[0.7rem] font-medium uppercase tracking-wider text-text-muted">
                {iconLabel[stat.key]}
              </span>
              <span className="block truncate text-sm font-semibold text-text-primary">
                {COMPETITION_LABELS[stat.key]}
              </span>
              <span
                className={cn(
                  "block text-2xl font-bold",
                  isActive ? "text-text-secondary" : "text-text-primary",
                )}
              >
                {stat.count}
              </span>
            </span>
          </button>
        );
      })}
    </div>
  );
}
