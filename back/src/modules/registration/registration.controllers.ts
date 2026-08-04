import { Request, Response } from "express";
import { z } from "zod";
import { ValidationError } from "../../errors/appError.js";
import { asyncHandler } from "../../middlewares/asyncHandler.js";
import { createRegistration, listRegistrations } from "./registration.services.js";
import { createRegistrationSchema } from "./registration.schemas.js";
import { CompetitionType } from "@prisma/client";

const listRegistrationsQuerySchema = z.object({
  competitionType: z.nativeEnum(CompetitionType).optional(),
});

/**
 * @route POST /me/registration
 * @body { competitionType, document, phone, team?, eps, emergencyContactName, emergencyContactPhone }
 * @returns { message, registration }
 */
export const registerForChampionship = asyncHandler(
  async (req: Request, res: Response) => {
    const validation = createRegistrationSchema.safeParse(req.body);

    if (!validation.success) {
      const errors = validation.error.issues.reduce<Record<string, string>>(
        (acc, err) => {
          acc[err.path.join(".")] = err.message;
          return acc;
        },
        {},
      );
      throw new ValidationError("Validation errors", errors);
    }

    const registration = await createRegistration(
      req.user!.id,
      validation.data,
    );

    res.status(201).json({ message: "Registration successful", registration });
  },
);

/**
 * @route GET /admin/registrations
 * @query { competitionType? }
 * @returns { registrations }
 */
export const getRegistrations = asyncHandler(
  async (req: Request, res: Response) => {
    const query = listRegistrationsQuerySchema.safeParse(req.query);

    if (!query.success) {
      const errors = query.error.issues.reduce<Record<string, string>>(
        (acc, err) => {
          acc[err.path.join(".")] = err.message;
          return acc;
        },
        {},
      );
      throw new ValidationError("Validation errors", errors);
    }

    const registrations = await listRegistrations(
      query.data.competitionType,
    );

    res.status(200).json({ registrations });
  },
);
