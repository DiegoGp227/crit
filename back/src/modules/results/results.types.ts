import type { ResultStatus } from "@prisma/client";

export interface IResultResponse {
  id: number;
  profileId: number;
  raceDateId: number;
  status: ResultStatus;
  points: number;
  createdAt: Date;
  profile: {
    fullName: string;
    team: string | null;
    registration: {
      bibNumber: number;
    } | null;
  };
}
