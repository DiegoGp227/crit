"use client";

import Button from "@/src/shared/components/ui/Button";
import {
  raceLabel,
  type Race,
} from "@/src/features/admin/services/racesService";
import type { CompetitionType } from "../../services/classificationService";

export type StandingCategory = CompetitionType;
export type StandingView = "general" | "etapa";

const CATEGORY_TABS: Array<{ value: StandingCategory; label: string }> = [
  { value: "EXPERTOS", label: "Expertos" },
  { value: "FEMENINO", label: "Femenino" },
];

interface NavStandingProps {
  view: StandingView;
  onViewChange: (view: StandingView) => void;
  category: StandingCategory;
  onCategoryChange: (category: StandingCategory) => void;
  races: Race[];
  racesLoading: boolean;
  selectedRaceId: number | null;
  onRaceChange: (raceId: number) => void;
}

export default function NavStanding({
  view,
  onViewChange,
  category,
  onCategoryChange,
  races,
  racesLoading,
  selectedRaceId,
  onRaceChange,
}: NavStandingProps) {
  return (
    <div className="flex w-full flex-col gap-5">
      <nav className="flex w-full overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        <ul className="mx-auto inline-flex w-max items-center gap-2 rounded-2xl bg-surface-raised p-2 sm:w-auto sm:gap-5">
          {CATEGORY_TABS.map((tab) => (
            <li key={tab.value}>
              <Button
                size="lg"
                variant={category === tab.value ? "primary" : "ghost"}
                onClick={() => onCategoryChange(tab.value)}
                aria-pressed={category === tab.value}
              >
                {tab.label}
              </Button>
            </li>
          ))}
        </ul>
      </nav>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex min-w-0 flex-wrap items-center gap-2">
          <h2 className="font-bold text-2xl text-text-primary">
            {view === "general" ? "Clasificación general" : "Resultados por etapa"} · Crit Virgilio
          </h2>
          <span className="badge border border-border-yellow bg-bg-yellow-tint text-text-secondary">
            <span aria-hidden="true" className="text-sm">⚡</span>
            <span>En Curso</span>
          </span>
        </div>
        <div className="flex min-w-0 flex-wrap items-center gap-2">
          <div className="flex shrink-0 items-center gap-2 rounded-2xl bg-surface">
            <Button
              variant={view === "general" ? "surface" : "ghost"}
              size="sm"
              onClick={() => onViewChange("general")}
              aria-pressed={view === "general"}
            >
              General
            </Button>
            <Button
              variant={view === "etapa" ? "surface" : "ghost"}
              size="sm"
              onClick={() => onViewChange("etapa")}
              aria-pressed={view === "etapa"}
            >
              Por Etapa
            </Button>
          </div>
          {view === "etapa" && (
            <select
              value={selectedRaceId ?? ""}
              onChange={(event) => onRaceChange(Number(event.target.value))}
              aria-label="Seleccionar carrera"
              className="min-w-0 max-w-full cursor-pointer rounded-full border border-border bg-surface px-4 py-2 text-xs font-medium text-text transition-colors hover:border-border-hover focus:border-border-yellow focus:outline-none"
            >
              {racesLoading ? (
                <option value="">Cargando carreras…</option>
              ) : races.length === 0 ? (
                <option value="">Sin carreras</option>
              ) : (
                races.map((race) => (
                  <option key={race.id} value={race.id}>
                    {raceLabel(race)}
                  </option>
                ))
              )}
            </select>
          )}
        </div>
      </div>
    </div>
  );
}