import type { Prisma } from "@prisma/client";
import prisma from "../../db/prisma.js";
import { NotFoundError } from "../../errors/appError.js";
import type { UpdateProfileDTO } from "./profile.schemas.js";

const emptyToNull = (value?: string | null): string | null =>
  value === "" ? null : value ?? null;

const buildCreateData = (
  userId: number,
  data: UpdateProfileDTO,
): Prisma.ProfileUncheckedCreateInput => {
  return {
    userId,
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
  const registration = profile
    ? await prisma.registration.findUnique({
        where: { profileId: profile.id },
      })
    : null;

  return { user: userData, profile, registration };
};

export const upsertMyProfile = async (userId: number, data: UpdateProfileDTO) => {
  const existing = await prisma.profile.findUnique({ where: { userId } });

  if (existing) {
    return await prisma.profile.update({
      where: { id: existing.id },
      data: buildUpdateData(data),
    });
  }
  return await prisma.profile.create({
    data: buildCreateData(userId, data),
  });
};

export const getPublicProfile = async (profileId: string) => {
  const id = Number(profileId);
  if (!Number.isInteger(id)) {
    throw new NotFoundError("Profile");
  }

  const profile = await prisma.profile.findUnique({
    where: { id },
    include: { registration: true },
  });

  if (!profile) {
    throw new NotFoundError("Profile");
  }

  const { registration, ...profileData } = profile;
  const stats = {
    points: profileData.totalPoints,
    races: profileData.totalRaces,
    victories: profileData.totalVictories,
    km: profileData.totalKm,
  };

  return {
    profile: profileData,
    registration,
    stats,
  };
};

export const getAllRiders = async () => {
  const profiles = await prisma.profile.findMany({
    select: {
      id: true,
      fullName: true,
      avatarUrl: true,
      team: true,
      category: true,
    },
    orderBy: { fullName: "asc" },
  });

  return profiles;
};

export const getUsedBibNumbers = async (): Promise<number[]> => {
  const registrations = await prisma.registration.findMany({
    select: { bibNumber: true },
  });

  return registrations.map((registration) => registration.bibNumber);
};
