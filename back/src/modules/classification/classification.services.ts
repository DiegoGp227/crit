import type { CategoryType, CompetitionType } from "@prisma/client";
import prisma from "../../db/prisma.js";
import { getCached, setCached } from "../../lib/classificationCache.js";

const CLASSIFICATION_CACHE_KEY = "classification";

export interface IClassificationEntry {
  profileId: number;
  bibNumber: number;
  fullName: string;
  team: string | null;
  category: CategoryType | null;
  competitionType: CompetitionType | null;
  points: number;
  races: number;
}

export const getClassification = async (): Promise<IClassificationEntry[]> => {
  const cached = getCached<IClassificationEntry[]>(CLASSIFICATION_CACHE_KEY);

  if (cached) {
    return cached;
  }

  const grouped = await prisma.result.groupBy({
    by: ["profileId"],
    _sum: { points: true },
    _count: { profileId: true },
    orderBy: { _sum: { points: "desc" } },
  });

  if (grouped.length === 0) {
    return setCached(CLASSIFICATION_CACHE_KEY, []);
  }

  const profiles = await prisma.profile.findMany({
    where: { id: { in: grouped.map((row) => row.profileId) } },
    select: {
      id: true,
      fullName: true,
      team: true,
      category: true,
      registration: {
        select: { bibNumber: true, competitionType: true },
      },
    },
  });

  const profileMap = new Map(profiles.map((profile) => [profile.id, profile]));

  const classification: IClassificationEntry[] = grouped.map((row) => {
    const profile = profileMap.get(row.profileId);

    return {
      profileId: row.profileId,
      bibNumber: profile?.registration?.bibNumber ?? 0,
      fullName: profile?.fullName ?? "Corredor eliminado",
      team: profile?.team ?? null,
      category: profile?.category ?? null,
      competitionType: profile?.registration?.competitionType ?? null,
      points: row._sum.points ?? 0,
      races: row._count.profileId,
    };
  });

  return setCached(CLASSIFICATION_CACHE_KEY, classification);
};
