import { RaceStatus } from "@prisma/client";
import prisma from "../../db/prisma.js";
import { NotFoundError } from "../../errors/appError.js";
import { invalidateCached } from "../../lib/classificationCache.js";
import type { CreateRaceDTO, UpdateRaceDTO } from "./races.schemas.js";

const CLASSIFICATION_CACHE_KEY = "classification";

const throwIfNotFound = (
  error: unknown,
): never => {
  if (
    typeof error === "object" &&
    error !== null &&
    "code" in error &&
    error.code === "P2025"
  ) {
    throw new NotFoundError("Race");
  }
  throw error;
};

export const createRace = async (data: CreateRaceDTO) => {
  return prisma.raceDate.create({
    data: {
      raceDate: data.raceDate,
      status: RaceStatus.SCHEDULED,
    },
  });
};

export const listRaces = async ({
  status,
  page = 1,
  pageSize = 25,
}: {
  status?: RaceStatus;
  page?: number;
  pageSize?: number;
}) => {
  const where = { ...(status ? { status } : {}) };

  const [races, total] = await prisma.$transaction([
    prisma.raceDate.findMany({
      where,
      orderBy: { raceDate: "desc" },
      skip: (page - 1) * pageSize,
      take: pageSize,
    }),
    prisma.raceDate.count({ where }),
  ]);

  return { races, total };
};

export const getRace = async (id: number) => {
  const race = await prisma.raceDate.findUnique({ where: { id } });

  if (!race) {
    throw new NotFoundError("Race");
  }

  return race;
};

export const updateRace = async (id: number, data: UpdateRaceDTO) => {
  try {
    return await prisma.raceDate.update({
      where: { id },
      data: {
        ...(data.raceDate !== undefined && { raceDate: data.raceDate }),
        ...(data.status !== undefined && { status: data.status }),
      },
    });
  } catch (error) {
    throwIfNotFound(error);
  }
};

export const deleteRace = async (id: number) => {
  await getRace(id);

  await prisma.$transaction([
    prisma.result.deleteMany({ where: { raceDateId: id } }),
    prisma.raceDate.delete({ where: { id } }),
  ]);

  invalidateCached(CLASSIFICATION_CACHE_KEY);
};
