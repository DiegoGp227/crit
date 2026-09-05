import apiClient from "@/src/shared/services/apiClient";
import {
  AdminRaceExcelURL,
  AdminRaceURL,
  AdminRacesURL,
  RaceURL,
  RacesURL,
} from "@/src/shared/constants/urls";

export type RaceStatus = "SCHEDULED" | "FINISHED" | "POSTPONED";

export interface Race {
  id: number;
  raceDate: string;
  status: RaceStatus;
  maleLaps: number;
  femaleLaps: number;
  updatedAt: string;
}

export interface PaginationMeta {
  page: number;
  pageSize: number;
  total: number;
  totalPages: number;
}

export interface RacesResponse {
  races: Race[];
  pagination: PaginationMeta;
}

export interface FetchRacesParams {
  status?: RaceStatus;
  page?: number;
  pageSize?: number;
}

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

export const raceLabel = (race: Race) =>
  `Carrera #${race.id} — ${formatRaceDate(race.raceDate)}`;

export const formatRaceDate = (raceDate: string) =>
  new Date(raceDate).toLocaleDateString("es-CO", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });

export const fetchRaces = async (
  params: FetchRacesParams = {},
): Promise<RacesResponse> => {
  const searchParams = new URLSearchParams();
  if (params.status) searchParams.set("status", params.status);
  searchParams.set("page", String(params.page ?? 1));
  searchParams.set("pageSize", String(params.pageSize ?? 100));

  const response = await apiClient.get<RacesResponse>(
    `${RacesURL}?${searchParams.toString()}`,
  );
  return response.data;
};

export const fetchRace = async (id: number): Promise<Race> => {
  const response = await apiClient.get<{ race: Race }>(RaceURL(id));
  return response.data.race;
};

export const createRace = async (
  raceDate: string,
  maleLaps: number,
  femaleLaps: number,
): Promise<Race> => {
  const response = await apiClient.post<{ message: string; race: Race }>(
    AdminRacesURL,
    { raceDate, maleLaps, femaleLaps },
  );
  return response.data.race;
};

export const updateRace = async (
  id: number,
  data: {
    raceDate?: string;
    status?: RaceStatus;
    maleLaps?: number;
    femaleLaps?: number;
  },
): Promise<Race> => {
  const response = await apiClient.patch<{ message: string; race: Race }>(
    AdminRaceURL(id),
    data,
  );
  return response.data.race;
};

export const deleteRace = async (id: number): Promise<void> => {
  await apiClient.delete(AdminRaceURL(id));
};

export const downloadRaceExcel = async (raceId: number): Promise<void> => {
  const response = await apiClient.get<Blob>(AdminRaceExcelURL(raceId), {
    responseType: "blob",
  });

  const url = URL.createObjectURL(response.data);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = `carrera-${raceId}.xlsx`;
  document.body.appendChild(anchor);
  anchor.click();
  anchor.remove();
  URL.revokeObjectURL(url);
};

export const uploadRaceExcel = async (
  raceId: number,
  file: File,
): Promise<number> => {
  const formData = new FormData();
  formData.append("file", file);

  const response = await apiClient.post<{ message: string; count: number }>(
    AdminRaceExcelURL(raceId),
    formData,
    { headers: { "Content-Type": undefined } },
  );

  return response.data.count;
};
