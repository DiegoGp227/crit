import { CompetitionType } from "@prisma/client";
import prisma from "../../db/prisma.js";

const KM_PER_LAP = 1.5;

export const recalculateProfileStats = async (profileIds: number[]) => {
  if (profileIds.length === 0) return;

  const results = await prisma.result.findMany({
    where: { profileId: { in: profileIds } },
    select: {
      profileId: true,
      status: true,
      points: true,
      raceDateId: true,
      raceDate: {
        select: {
          maleLaps: true,
          femaleLaps: true,
        },
      },
      profile: {
        select: {
          registration: {
            select: { competitionType: true },
          },
        },
      },
    },
  });

  const statsMap = new Map<
    number,
    { points: number; races: number; km: number }
  >();

  for (const result of results) {
    const id = result.profileId;
    if (!statsMap.has(id)) {
      statsMap.set(id, { points: 0, races: 0, km: 0 });
    }
    const stats = statsMap.get(id)!;

    stats.points += result.points;

    if (result.status === "PRESENT") {
      stats.races += 1;

      const competitionType = result.profile.registration?.competitionType;
      const laps =
        competitionType === CompetitionType.EXPERTOS
          ? result.raceDate.maleLaps
          : result.raceDate.femaleLaps;
      stats.km += laps * KM_PER_LAP;
    }
  }

  const maxPointsByRace = new Map<number, number>();
  for (const result of results) {
    const current = maxPointsByRace.get(result.raceDateId) ?? -Infinity;
    if (result.points > current) {
      maxPointsByRace.set(result.raceDateId, result.points);
    }
  }

  const victoryCounts = new Map<number, number>();
  for (const profileId of profileIds) {
    victoryCounts.set(profileId, 0);
  }

  for (const result of results) {
    const maxPts = maxPointsByRace.get(result.raceDateId) ?? 0;
    if (result.points === maxPts && maxPts > 0) {
      victoryCounts.set(
        result.profileId,
        (victoryCounts.get(result.profileId) ?? 0) + 1,
      );
    }
  }

  const updates = profileIds.map((id) => {
    const stats = statsMap.get(id) ?? { points: 0, races: 0, km: 0 };
    return prisma.profile.update({
      where: { id },
      data: {
        totalPoints: stats.points,
        totalRaces: stats.races,
        totalVictories: victoryCounts.get(id) ?? 0,
        totalKm: stats.km,
      },
    });
  });

  await prisma.$transaction(updates);
};
