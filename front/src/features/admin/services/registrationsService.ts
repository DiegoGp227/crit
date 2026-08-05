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
    avatarUrl: string | null;
  };
}

export interface PaginationMeta {
  page: number;
  pageSize: number;
  total: number;
  totalPages: number;
}

export interface RegistrationsResponse {
  registrations: AdminRegistration[];
  pagination: PaginationMeta;
}

export interface FetchRegistrationsParams {
  competitionType?: CompetitionType;
  search?: string;
  page?: number;
  pageSize?: number;
}

export const fetchRegistrations = async (
  params: FetchRegistrationsParams = {},
): Promise<RegistrationsResponse> => {
  const url = new URL(AdminRegistrationsURL.href);

  if (params.competitionType) {
    url.searchParams.set("competitionType", params.competitionType);
  }
  if (params.search) {
    url.searchParams.set("search", params.search);
  }
  url.searchParams.set("page", String(params.page ?? 1));
  url.searchParams.set("pageSize", String(params.pageSize ?? 25));

  const response = await apiClient.get<RegistrationsResponse>(url.href);
  return response.data;
};
