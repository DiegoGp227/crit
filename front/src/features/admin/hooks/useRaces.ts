"use client";

import useSWR from "swr";
import { RacesURL, RaceResultsURL } from "@/src/shared/constants/urls";
import {
  fetchRaces,
  fetchRace,
  type Race,
  type RacesResponse,
} from "../services/racesService";
import {
  fetchRaceResults,
  type RaceResult,
} from "../services/resultsService";

export const useRaces = () => {
  const { data, error, isLoading, mutate } = useSWR<RacesResponse>(
    `${RacesURL}?page=1&pageSize=100`,
    () => fetchRaces({ page: 1, pageSize: 100 }),
  );

  return {
    races: data?.races ?? [],
    error,
    isLoading,
    mutate,
  };
};

export const useRace = (id: number | null) => {
  const key = id === null ? null : RacesURL;
  const { data, error, isLoading } = useSWR<Race>(key, () => fetchRace(id!));

  return { race: data, error, isLoading };
};

export const useRaceResults = (raceId: number | null) => {
  const key = raceId === null ? null : `${RaceResultsURL(raceId)}`;

  const { data, error, isLoading, mutate } = useSWR<RaceResult[]>(
    key,
    () => fetchRaceResults(raceId!),
  );

  return {
    results: data ?? [],
    error,
    isLoading,
    mutate,
  };
};
