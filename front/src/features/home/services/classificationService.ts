import apiClient from "@/src/shared/services/apiClient";
import { ClassificationURL } from "@/src/shared/constants/urls";

export type CompetitionType = "EXPERTOS" | "FEMENINO";

export type CategoryType =
  | "PRINCIPIANTE"
  | "NOVATO"
  | "EXPERTO"
  | "RUTA"
  | "MUJER";

export interface ClassificationEntry {
  profileId: number;
  bibNumber: number;
  fullName: string;
  team: string | null;
  category: CategoryType | null;
  competitionType: CompetitionType | null;
  points: number;
  races: number;
}

export const fetchClassification = async (): Promise<ClassificationEntry[]> => {
  const response = await apiClient.get<{ classification: ClassificationEntry[] }>(
    ClassificationURL,
  );
  return response.data.classification;
};