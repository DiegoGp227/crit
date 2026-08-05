import apiClient from "@/src/shared/services/apiClient";
import { MeRegistrationURL } from "@/src/shared/constants/urls";

export type CompetitionType =
  | "EXPERTOS"
  | "FEMENINO";

export const COMPETITION_LABELS: Record<CompetitionType, string> = {
  EXPERTOS: "Expertos",
  FEMENINO: "Femenino",
};

export interface Registration {
  id: number;
  profileId: number;
  competitionType: CompetitionType;
  document: string;
  phone: string;
  eps: string;
  emergencyContactName: string;
  emergencyContactPhone: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateRegistrationDTO {
  competitionType: CompetitionType;
  document: string;
  phone: string;
  team?: string;
  eps: string;
  emergencyContactName: string;
  emergencyContactPhone: string;
}

export interface RegistrationFormValues {
  document: string;
  phone: string;
  team: string;
  eps: string;
  emergencyContactName: string;
  emergencyContactPhone: string;
}

export function toCreateRegistrationDTO(
  values: RegistrationFormValues,
  competitionType: CompetitionType,
): CreateRegistrationDTO {
  const team = values.team.trim();
  return {
    competitionType,
    document: values.document.trim(),
    phone: values.phone.trim(),
    eps: values.eps.trim(),
    emergencyContactName: values.emergencyContactName.trim(),
    emergencyContactPhone: values.emergencyContactPhone.trim(),
    ...(team && { team }),
  };
}

export interface CreateRegistrationResponse {
  message: string;
  registration: Registration;
}

export const createRegistration = async (
  data: CreateRegistrationDTO,
): Promise<CreateRegistrationResponse> => {
  const response = await apiClient.post<CreateRegistrationResponse>(
    MeRegistrationURL.href,
    data,
  );
  return response.data;
};
