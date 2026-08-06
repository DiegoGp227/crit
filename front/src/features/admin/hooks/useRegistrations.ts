"use client";

import useSWR from "swr";
import { AdminRegistrationsURL } from "@/src/shared/constants/urls";
import type { CompetitionType } from "@/src/features/profile/services/registrationService";
import {
  fetchRegistrations,
  type AdminRegistration,
  type PaginationMeta,
} from "../services/registrationsService";

interface UseRegistrationsParams {
  competitionType?: CompetitionType;
  search?: string;
  page?: number;
  pageSize?: number;
}

export const useRegistrations = (params: UseRegistrationsParams = {}) => {
  const { competitionType, search, page = 1, pageSize = 25 } = params;

  const query = new URLSearchParams();
  if (competitionType) query.set("competitionType", competitionType);
  if (search) query.set("search", search);
  query.set("page", String(page));
  query.set("pageSize", String(pageSize));
  const key = `${AdminRegistrationsURL}?${query.toString()}`;

  const { data, error, isLoading, mutate } = useSWR(key, () =>
    fetchRegistrations({ competitionType, search, page, pageSize }),
  );

  return {
    registrations: data?.registrations ?? [],
    pagination: data?.pagination,
    error,
    isLoading,
    mutate,
  };
};

export type { PaginationMeta, AdminRegistration };
