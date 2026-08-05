export interface RaceOption {
  id: number;
  round: number;
  title: string;
  date: string;
}

export const RACES: RaceOption[] = [
  { id: 1, round: 20, title: "Crit #20", date: "2026-08-01" },
  { id: 2, round: 19, title: "Crit #19", date: "2026-07-18" },
  { id: 3, round: 18, title: "Crit #18", date: "2026-07-05" },
  { id: 4, round: 17, title: "Crit #17", date: "2026-06-21" },
  { id: 5, round: 16, title: "Crit #16", date: "2026-06-14" },
];

export const raceLabel = (race: RaceOption) =>
  `${race.title} — ${new Date(race.date).toLocaleDateString("es-CO", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  })}`;