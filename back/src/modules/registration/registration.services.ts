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
