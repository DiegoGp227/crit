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
    bibNumber: number;
    team: string | null;
  };
}
