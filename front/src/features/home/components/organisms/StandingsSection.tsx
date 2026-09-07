"use client";

import { useCallback, useMemo, useState } from "react";
import { Loader2 } from "lucide-react";
import Section from "@/src/shared/components/ui/Section";
import NavStanding, {
  type StandingCategory,
  type StandingView,
} from "../molecules/NavStanding";
import StandingsTable, { type StandingRow } from "../molecules/StandingsTable";
import { useClassification } from "../../hooks/useClassification";
import { useRaces, useRaceResults } from "@/src/features/admin/hooks/useRaces";
import Pagination from "@/src/features/admin/components/molecules/Pagination";

const ITEMS_PER_PAGE = 10;

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
  const [page, setPage] = useState(1);

  const {
    classification,
    pagination,
    error: classificationError,
    isLoading: classificationLoading,
  } = useClassification(view === "general" ? page : null, ITEMS_PER_PAGE, view === "general" ? category : undefined);

  const {
    classification: fullClassification,
  } = useClassification(view === "etapa" ? 1 : null, 1000);

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
    const source = view === "etapa" ? fullClassification : classification;
    for (const entry of source) {
      if (entry.competitionType) {
        map.set(entry.profileId, entry.competitionType);
      }
    }
    return map;
  }, [classification, fullClassification, view]);

  const generalRows = useMemo<StandingRow[]>(
    () =>
      classification.map((entry, index) => ({
        profileId: entry.profileId,
        position: (page - 1) * ITEMS_PER_PAGE + index + 1,
        initials: getInitials(entry.fullName),
        avatarUrl: entry.avatarUrl,
        name: entry.fullName,
        team: entry.team ?? "—",
        points: entry.points,
        races: entry.races,
      })),
    [classification, page],
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

  const handleCategoryChange = useCallback((newCategory: StandingCategory) => {
    setCategory(newCategory);
    setPage(1);
  }, []);

  const handleViewChange = useCallback((newView: StandingView) => {
    setView(newView);
    setPage(1);
  }, []);

  return (
    <Section className="flex flex-col gap-14">
      <NavStanding
        view={view}
        onViewChange={handleViewChange}
        category={category}
        onCategoryChange={handleCategoryChange}
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
        <>
          <StandingsTable rows={rows} showRaces={view === "general"} />
          {view === "general" && pagination.totalPages > 1 && (
            <Pagination
              page={pagination.page}
              totalPages={pagination.totalPages}
              onPageChange={setPage}
            />
          )}
        </>
      )}
    </Section>
  );
}