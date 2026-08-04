"use client";

import useSWR from "swr";
import { AdminRegistrationsURL } from "@/src/shared/constants/urls";
import type { CompetitionType } from "@/src/features/profile/services/registrationService";
import {
  fetchRegistrations,
  type AdminRegistration,
} from "../services/registrationsService";

export const useRegistrations = (competitionType?: CompetitionType) => {
  const key = competitionType
    ? `${AdminRegistrationsURL.href}?competitionType=${competitionType}`
    : AdminRegistrationsURL.href;

  const { data, error, isLoading, mutate } = useSWR<AdminRegistration[]>(
    key,
    () => fetchRegistrations(competitionType),
  );

  return { registrations: data ?? [], error, isLoading, mutate };
};
