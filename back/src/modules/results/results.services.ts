import prisma from "../../db/prisma.js";
import { BadRequestError, NotFoundError } from "../../errors/appError.js";
import { invalidateCached } from "../../lib/classificationCache.js";
import type { RaceResultDTO } from "./results.schemas.js";

const CLASSIFICATION_CACHE_KEY = "classification";

export const setRaceResults = async (raceId: number, results: RaceResultDTO[]) => {
  const race = await prisma.raceDate.findUnique({ where: { id: raceId } });

  if (!race) {
    throw new NotFoundError("Race");
  }

  const profileIds = results.map((result) => result.profileId);

  if (new Set(profileIds).size !== profileIds.length) {
    throw new BadRequestError("Corredor duplicado en los resultados");
  }

  if (profileIds.length > 0) {
    const profiles = await prisma.profile.findMany({
      where: { id: { in: profileIds } },
      select: { id: true },
    });

    const foundIds = new Set(profiles.map((profile) => profile.id));
    const missingIds = profileIds.filter((id) => !foundIds.has(id));

    if (missingIds.length > 0) {
      throw new BadRequestError(
        `Corredor inexistente: ${missingIds.join(", ")}`,
      );
    }
  }

  await prisma.$transaction([
    prisma.result.deleteMany({ where: { raceDateId: raceId } }),
    prisma.result.createMany({
      data: results.map((result) => ({
        profileId: result.profileId,
        raceDateId: raceId,
        status: result.status,
        points: result.points,
      })),
    }),
  ]);

  invalidateCached(CLASSIFICATION_CACHE_KEY);
};

export const listRaceResults = async (raceId: number) => {
  const race = await prisma.raceDate.findUnique({ where: { id: raceId } });

  if (!race) {
    throw new NotFoundError("Race");
  }

  return prisma.result.findMany({
    where: { raceDateId: raceId },
    orderBy: { profile: { bibNumber: "asc" } },
    select: {
      id: true,
      profileId: true,
      raceDateId: true,
      status: true,
      points: true,
      createdAt: true,
      profile: {
        select: {
          fullName: true,
          bibNumber: true,
          team: true,
        },
      },
    },
  });
};
