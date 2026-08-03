import type { Prisma } from "@prisma/client";
import prisma from "../../db/prisma.js";
import {
  BadRequestError,
  ConflictError,
  NotFoundError,
} from "../../errors/appError.js";
import type { UpdateProfileDTO } from "./profile.schemas.js";

const emptyToNull = (value?: string | null): string | null =>
  value === "" ? null : value ?? null;

const buildCreateData = (
  userId: number,
  data: UpdateProfileDTO,
): Prisma.ProfileUncheckedCreateInput => {
  if (data.bibNumber === undefined || data.bibNumber === null) {
    throw new BadRequestError("bibNumber is required to create a profile");
  }

  return {
    userId,
    fullName: data.fullName,
    bibNumber: data.bibNumber,
    ...(data.avatarUrl !== undefined && { avatarUrl: emptyToNull(data.avatarUrl) }),
    ...(data.kilometers !== undefined && { kilometers: data.kilometers }),
    ...(data.category !== undefined && { category: data.category }),
    ...(data.team !== undefined && { team: emptyToNull(data.team) }),
    ...(data.bikePhotoUrl !== undefined && {
      bikePhotoUrl: emptyToNull(data.bikePhotoUrl),
    }),
    ...(data.bikeNickname !== undefined && {
      bikeNickname: emptyToNull(data.bikeNickname),
    }),
    ...(data.bikeFrame !== undefined && { bikeFrame: emptyToNull(data.bikeFrame) }),
    ...(data.bikeRatio !== undefined && { bikeRatio: emptyToNull(data.bikeRatio) }),
    ...(data.bikeWeight !== undefined && { bikeWeight: data.bikeWeight }),
    ...(data.bikeSize !== undefined && { bikeSize: emptyToNull(data.bikeSize) }),
  };
};

const buildUpdateData = (
  data: UpdateProfileDTO,
): Prisma.ProfileUncheckedUpdateInput => ({
  fullName: data.fullName,
  ...(data.avatarUrl !== undefined && { avatarUrl: emptyToNull(data.avatarUrl) }),
  ...(data.kilometers !== undefined && { kilometers: data.kilometers }),
  ...(data.category !== undefined && { category: data.category }),
  ...(data.team !== undefined && { team: emptyToNull(data.team) }),
  ...(data.bikePhotoUrl !== undefined && {
    bikePhotoUrl: emptyToNull(data.bikePhotoUrl),
  }),
  ...(data.bikeNickname !== undefined && {
    bikeNickname: emptyToNull(data.bikeNickname),
  }),
  ...(data.bikeFrame !== undefined && { bikeFrame: emptyToNull(data.bikeFrame) }),
  ...(data.bikeRatio !== undefined && { bikeRatio: emptyToNull(data.bikeRatio) }),
  ...(data.bikeWeight !== undefined && { bikeWeight: data.bikeWeight }),
  ...(data.bikeSize !== undefined && { bikeSize: emptyToNull(data.bikeSize) }),
});

const throwIfBibInUse = (error: unknown, bibNumber?: number | null): never => {
  if (
    typeof error === "object" &&
    error !== null &&
    "code" in error &&
    error.code === "P2002"
  ) {
    throw new ConflictError(
      bibNumber != null
        ? `Bib number ${bibNumber} is already in use`
        : "Bib number is already in use",
    );
  }
  throw error;
};

export const getMyProfile = async (userId: number) => {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: {
      id: true,
      email: true,
      role: true,
      createdAt: true,
      updatedAt: true,
      profile: true,
    },
  });

  if (!user) {
    throw new NotFoundError("User");
  }

  const { profile, ...userData } = user;
  return { user: userData, profile };
};

export const upsertMyProfile = async (userId: number, data: UpdateProfileDTO) => {
  const existing = await prisma.profile.findUnique({ where: { userId } });

  try {
    if (existing) {
      if (
        data.bibNumber !== undefined &&
        data.bibNumber !== null &&
        data.bibNumber !== existing.bibNumber
      ) {
        throw new ConflictError(
          "El dorsal ya está asignado y no se puede cambiar",
        );
      }
      return await prisma.profile.update({
        where: { id: existing.id },
        data: buildUpdateData(data),
      });
    }
    return await prisma.profile.create({
      data: buildCreateData(userId, data),
    });
  } catch (error) {
    throwIfBibInUse(error, data.bibNumber);
  }
};

export const getPublicProfile = async (profileId: string) => {
  const id = Number(profileId);
  if (!Number.isInteger(id)) {
    throw new NotFoundError("Profile");
  }

  const profile = await prisma.profile.findUnique({
    where: { id },
    include: { results: true },
  });

  if (!profile) {
    throw new NotFoundError("Profile");
  }

  const { results, ...profileData } = profile;
  const stats = {
    points: results.reduce((acc, result) => acc + result.points, 0),
    races: results.length,
  };

  return { profile: profileData, stats };
};

export const getUsedBibNumbers = async (): Promise<number[]> => {
  const profiles = await prisma.profile.findMany({
    select: { bibNumber: true },
  });

  return profiles.map((profile) => profile.bibNumber);
};
