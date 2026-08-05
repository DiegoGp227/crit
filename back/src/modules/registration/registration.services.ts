import { CompetitionType } from "@prisma/client";
import prisma from "../../db/prisma.js";
import { ConflictError, NotFoundError } from "../../errors/appError.js";
import type { CreateRegistrationDTO } from "./registration.schemas.js";

const throwIfDocumentInUse = (error: unknown): never => {
  if (
    typeof error === "object" &&
    error !== null &&
    "code" in error &&
    error.code === "P2002"
  ) {
    throw new ConflictError("El documento ya está registrado");
  }
  throw error;
};

export const createRegistration = async (
  userId: number,
  data: CreateRegistrationDTO,
) => {
  const profile = await prisma.profile.findUnique({ where: { userId } });

  if (!profile) {
    throw new NotFoundError("Profile");
  }

  const existing = await prisma.registration.findUnique({
    where: { profileId: profile.id },
  });

  if (existing) {
    throw new ConflictError("Ya estás inscrito al campeonato");
  }

  try {
    const { team, ...registrationData } = data;

    if (team) {
      await prisma.profile.update({
        where: { id: profile.id },
        data: { team },
      });
    }

    return await prisma.registration.create({
      data: {
        profileId: profile.id,
        competitionType: registrationData.competitionType,
        document: registrationData.document,
        phone: registrationData.phone,
        eps: registrationData.eps,
        emergencyContactName: registrationData.emergencyContactName,
        emergencyContactPhone: registrationData.emergencyContactPhone,
      },
    });
  } catch (error) {
    throwIfDocumentInUse(error);
  }
};

const registrationsSelect = {
  id: true,
  profileId: true,
  competitionType: true,
  document: true,
  phone: true,
  eps: true,
  emergencyContactName: true,
  emergencyContactPhone: true,
  createdAt: true,
  updatedAt: true,
  profile: {
    select: {
      fullName: true,
      bibNumber: true,
      avatarUrl: true,
    },
  },
} as const;

export const listRegistrations = async ({
  competitionType,
  search,
  page = 1,
  pageSize = 25,
}: {
  competitionType?: CompetitionType;
  search?: string;
  page?: number;
  pageSize?: number;
}) => {
  const bibNumber = search && /^\d+$/.test(search) ? Number(search) : undefined;

  const where = {
    ...(competitionType ? { competitionType } : {}),
    ...(search
      ? {
          OR: [
            { profile: { fullName: { contains: search, mode: "insensitive" as const } } },
            { document: { contains: search, mode: "insensitive" as const } },
            ...(bibNumber !== undefined ? [{ profile: { bibNumber } }] : []),
          ],
        }
      : {}),
  };

  const [registrations, total] = await prisma.$transaction([
    prisma.registration.findMany({
      where,
      select: registrationsSelect,
      orderBy: { createdAt: "asc" },
      skip: (page - 1) * pageSize,
      take: pageSize,
    }),
    prisma.registration.count({ where }),
  ]);

  return { registrations, total };
};
