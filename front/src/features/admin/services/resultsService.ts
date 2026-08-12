import apiClient from "@/src/shared/services/apiClient";
import {
  AdminRaceResultsURL,
  RaceResultsURL,
} from "@/src/shared/constants/urls";

export type ResultStatus = "PRESENT" | "ABSENT";

export interface RaceResult {
  id: number;
  profileId: number;
  raceDateId: number;
  status: ResultStatus;
  points: number;
  createdAt: string;
  profile: {
    fullName: string;
    bibNumber: number;
    team: string | null;
  };
}

export interface SetResultDTO {
  profileId: number;
  status: ResultStatus;
  points: number;
}

export interface ResultView {
  bib: number;
  name: string;
  team: string | null;
  attendance: ResultStatus;
  points: number;
}

export const toResultView = (result: RaceResult): ResultView => ({
  bib: result.profile.bibNumber,
  name: result.profile.fullName,
  team: result.profile.team,
  attendance: result.status,
  points: result.points,
});

export const fetchRaceResults = async (raceId: number): Promise<RaceResult[]> => {
  const response = await apiClient.get<{ results: RaceResult[] }>(
    RaceResultsURL(raceId),
  );
  return response.data.results;
};

export const setRaceResults = async (
  raceId: number,
  results: SetResultDTO[],
): Promise<void> => {
  await apiClient.put(AdminRaceResultsURL(raceId), { results });
};
