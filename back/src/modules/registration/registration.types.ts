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
  instagram: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface IPaginationMeta {
  page: number;
  pageSize: number;
  total: number;
  totalPages: number;
}

export interface IRegistrationsPaginatedResponse {
  registrations: IRegistrationResponse[];
  pagination: IPaginationMeta;
}
