import type { RaceStatus } from "@prisma/client";

export interface IRaceResponse {
  id: number;
  raceDate: Date;
  status: RaceStatus;
  maleLaps: number;
  femaleLaps: number;
  updatedAt: Date;
}

export interface IPaginationMeta {
  page: number;
  pageSize: number;
  total: number;
  totalPages: number;
}

export interface IRacePaginatedResponse {
  races: IRaceResponse[];
  pagination: IPaginationMeta;
}
