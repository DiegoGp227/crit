export type RaceStatus = "SCHEDULED" | "FINISHED" | "POSTPONED";

export interface RaceOption {
  id: number;
  raceDate: string;
  status: RaceStatus;
}

export const RACES: RaceOption[] = [
  { id: 12, raceDate: "2026-08-01", status: "SCHEDULED" },
  { id: 11, raceDate: "2026-07-18", status: "FINISHED" },
  { id: 10, raceDate: "2026-07-05", status: "FINISHED" },
  { id: 9, raceDate: "2026-06-21", status: "POSTPONED" },
  { id: 8, raceDate: "2026-06-14", status: "FINISHED" },
];

export const RACE_STATUS_META: Record<
  RaceStatus,
  { label: string; className: string }
> = {
  SCHEDULED: {
    label: "Programada",
    className: "border border-border-hover bg-surface text-text-muted",
  },
  FINISHED: {
    label: "Finalizada",
    className: "border border-green/25 bg-green-dim text-green",
  },
  POSTPONED: {
    label: "Aplazada",
    className: "border border-border-yellow bg-bg-yellow-tint text-text-secondary",
  },
};

export const raceLabel = (race: RaceOption) =>
  `Carrera #${race.id} — ${new Date(race.raceDate).toLocaleDateString("es-CO", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  })}`;

export const formatRaceDate = (raceDate: string) =>
  new Date(raceDate).toLocaleDateString("es-CO", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
