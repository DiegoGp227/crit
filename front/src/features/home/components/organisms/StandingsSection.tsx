"use client";

import { useMemo, useState } from "react";
import { Loader2 } from "lucide-react";
import Section from "@/src/shared/components/ui/Section";
import NavStanding, {
  type StandingCategory,
  type StandingView,
} from "../molecules/NavStanding";
import StandingsTable, { type StandingRow } from "../molecules/StandingsTable";
import { useClassification } from "../../hooks/useClassification";
import { useRaces, useRaceResults } from "@/src/features/admin/hooks/useRaces";

const getInitials = (name: string) =>
  name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("") || "?";

export default function StandingsSection() {
  const [view, setView] = useState<StandingView>("general");
  const [category, setCategory] = useState<StandingCategory>("EXPERTOS");
  const [selectedRaceId, setSelectedRaceId] = useState<number | null>(null);

  const {
    classification,
    error: classificationError,
    isLoading: classificationLoading,
  } = useClassification();

  const { races, isLoading: racesLoading } = useRaces();

  const effectiveRaceId = selectedRaceId ?? races[0]?.id ?? null;
  const selectedRace = races.find((race) => race.id === effectiveRaceId) ?? null;

  const {
    results,
    error: resultsError,
    isLoading: resultsLoading,
  } = useRaceResults(view === "etapa" ? (selectedRace?.id ?? null) : null);

  const categoryOfProfile = useMemo(() => {
    const map = new Map<number, StandingCategory>();
    for (const entry of classification) {
      if (entry.competitionType) {
        map.set(entry.profileId, entry.competitionType);
      }
    }
    return map;
  }, [classification]);

  const generalRows = useMemo<StandingRow[]>(
    () =>
      classification
        .filter((entry) => entry.competitionType === category)
        .map((entry, index) => ({
          profileId: entry.profileId,
          position: index + 1,
          initials: getInitials(entry.fullName),
          name: entry.fullName,
          team: entry.team ?? "—",
          points: entry.points,
          races: entry.races,
        })),
    [classification, category],
  );

  const stageRows = useMemo<StandingRow[]>(
    () =>
      results
        .filter(
          (result) => categoryOfProfile.get(result.profileId) === category,
        )
        .sort((a, b) => b.points - a.points)
        .map((result, index) => ({
          profileId: result.profileId,
          position: index + 1,
          initials: getInitials(result.profile.fullName),
          name: result.profile.fullName,
          team: result.profile.team ?? "—",
          points: result.points,
        })),
    [results, categoryOfProfile, category],
  );

  const rows = view === "general" ? generalRows : stageRows;
  const isLoading =
    view === "general" ? classificationLoading : racesLoading || resultsLoading;
  const error = view === "general" ? classificationError : resultsError;

  return (
    <Section className="flex flex-col gap-14">
      <NavStanding
        view={view}
        onViewChange={setView}
        category={category}
        onCategoryChange={setCategory}
        races={races}
        racesLoading={racesLoading}
        selectedRaceId={effectiveRaceId}
        onRaceChange={setSelectedRaceId}
      />

      {isLoading ? (
        <div className="flex w-full items-center justify-center gap-2 rounded-2xl border border-border bg-surface py-16 text-sm text-text-muted">
          <Loader2 className="size-4 animate-spin" />
          Cargando clasificación…
        </div>
      ) : error || rows.length === 0 ? (
        <div className="w-full overflow-hidden rounded-2xl border border-border bg-surface">
          <div className="flex flex-col items-center justify-center gap-1 px-6 py-16 text-center">
            <p className="text-sm font-semibold text-text-primary">
              Próximamente…
            </p>
            <p className="text-xs text-text-muted">
              Los resultados estarán disponibles pronto.
            </p>
          </div>
        </div>
      ) : (
        <StandingsTable rows={rows} showRaces={view === "general"} />
      )}
    </Section>
  );
}