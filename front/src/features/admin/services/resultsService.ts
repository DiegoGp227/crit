export interface PreviewResult {
  bib: number;
  name: string;
  team: string | null;
  attendance: "PRESENT" | "ABSENT";
  points: number;
}

export const RACE_RESULTS: Record<number, PreviewResult[]> = {
  12: [],
  11: [
    { bib: 101, name: "Andrés Felipe Rojas", team: "Team Bogotá", attendance: "PRESENT", points: 20 },
    { bib: 102, name: "Carlos Eduardo Méndez", team: "Team Bogotá", attendance: "PRESENT", points: 15 },
    { bib: 104, name: "Miguel Ángel Prieto", team: "Ciclo Ruta Norte", attendance: "PRESENT", points: 10 },
    { bib: 105, name: "Sergio Alejandro Vidal", team: "Team Bogotá", attendance: "PRESENT", points: 8 },
    { bib: 108, name: "Juan Camilo Ortega", team: "Ciclo Ruta Norte", attendance: "PRESENT", points: 4 },
    { bib: 106, name: "David Santiago Mora", team: "Rodadores Sur", attendance: "PRESENT", points: 0 },
    { bib: 107, name: "Óscar Julián Cabrera", team: "Rodadores Sur", attendance: "ABSENT", points: 0 },
    { bib: 103, name: "Jorge Iván Castillo", team: "Ciclo Ruta Norte", attendance: "ABSENT", points: -5 },
  ],
  10: [
    { bib: 101, name: "Andrés Felipe Rojas", team: "Team Bogotá", attendance: "PRESENT", points: 25 },
    { bib: 102, name: "Carlos Eduardo Méndez", team: "Team Bogotá", attendance: "PRESENT", points: 18 },
    { bib: 106, name: "David Santiago Mora", team: "Rodadores Sur", attendance: "PRESENT", points: 12 },
    { bib: 108, name: "Juan Camilo Ortega", team: "Ciclo Ruta Norte", attendance: "PRESENT", points: 6 },
    { bib: 103, name: "Jorge Iván Castillo", team: "Ciclo Ruta Norte", attendance: "PRESENT", points: 0 },
    { bib: 105, name: "Sergio Alejandro Vidal", team: "Team Bogotá", attendance: "ABSENT", points: -10 },
  ],
  9: [],
  8: [
    { bib: 102, name: "Carlos Eduardo Méndez", team: "Team Bogotá", attendance: "PRESENT", points: 22 },
    { bib: 101, name: "Andrés Felipe Rojas", team: "Team Bogotá", attendance: "PRESENT", points: 16 },
    { bib: 107, name: "Óscar Julián Cabrera", team: "Rodadores Sur", attendance: "PRESENT", points: 11 },
    { bib: 104, name: "Miguel Ángel Prieto", team: "Ciclo Ruta Norte", attendance: "PRESENT", points: 5 },
    { bib: 106, name: "David Santiago Mora", team: "Rodadores Sur", attendance: "ABSENT", points: 0 },
  ],
};
