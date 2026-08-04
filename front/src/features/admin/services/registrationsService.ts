import apiClient from "@/src/shared/services/apiClient";
import { AdminRegistrationsURL } from "@/src/shared/constants/urls";
import type {
  CompetitionType,
  Registration,
} from "@/src/features/profile/services/registrationService";

export interface AdminRegistration extends Registration {
  profile: {
    fullName: string;
    bibNumber: number;
  };
}

export const fetchRegistrations = async (
  competitionType?: CompetitionType,
): Promise<AdminRegistration[]> => {
  const url = new URL(AdminRegistrationsURL.href);
  if (competitionType) {
    url.searchParams.set("competitionType", competitionType);
  }
  const response = await apiClient.get<{ registrations: AdminRegistration[] }>(
    url.href,
  );
  return response.data.registrations;
};
