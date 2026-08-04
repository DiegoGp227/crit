import type { CompetitionType } from "@prisma/client";

export interface IRegistrationResponse {
  id: number;
  profileId: number;
  competitionType: CompetitionType;
  document: string;
  phone: string;
  eps: string;
  emergencyContactName: string;
  emergencyContactPhone: string;
  createdAt: Date;
  updatedAt: Date;
}
