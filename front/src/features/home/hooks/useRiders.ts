"use client";

import useSWR from "swr";
import { RidersURL } from "@/src/shared/constants/urls";
import { fetchRiders, type Rider } from "../services/ridersService";

export const useRiders = () => {
  const { data, error, isLoading } = useSWR<Rider[]>(RidersURL, fetchRiders);

  return {
    riders: data ?? [],
    error,
    isLoading,
  };
};
