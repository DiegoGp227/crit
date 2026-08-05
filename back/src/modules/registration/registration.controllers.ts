import { Request, Response } from "express";
import { z } from "zod";
import { ValidationError } from "../../errors/appError.js";
import { asyncHandler } from "../../middlewares/asyncHandler.js";
import { createRegistration, listRegistrations } from "./registration.services.js";
import {
  createRegistrationSchema,
  listRegistrationsQuerySchema,
} from "./registration.schemas.js";

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
 * @query { competitionType?, search?, page?, pageSize? }
 * @returns { registrations, pagination }
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

    const { competitionType, search, page, pageSize } = query.data;

    const { registrations, total } = await listRegistrations({
      competitionType,
      search,
      page,
      pageSize,
    });

    const totalPages = Math.ceil(total / pageSize);

    res.status(200).json({
      registrations,
      pagination: { page, pageSize, total, totalPages },
    });
  },
);
