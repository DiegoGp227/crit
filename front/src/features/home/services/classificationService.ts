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
  avatarUrl: string | null;
  team: string | null;
  category: CategoryType | null;
  competitionType: CompetitionType | null;
  points: number;
  races: number;
}

export interface PaginationMeta {
  page: number;
  pageSize: number;
  total: number;
  totalPages: number;
}

export interface ClassificationResponse {
  classification: ClassificationEntry[];
  pagination: PaginationMeta;
}

export interface FetchClassificationParams {
  page?: number;
  pageSize?: number;
}

export const fetchClassification = async (
  params: FetchClassificationParams = {},
): Promise<ClassificationResponse> => {
  const searchParams = new URLSearchParams();
  if (params.page) searchParams.set("page", String(params.page));
  if (params.pageSize) searchParams.set("pageSize", String(params.pageSize));

  const response = await apiClient.get<ClassificationResponse>(
    `${ClassificationURL}?${searchParams.toString()}`,
  );
  return response.data;
};