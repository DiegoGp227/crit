import { Request, Response } from "express";
import { ValidationError } from "../../errors/appError.js";
import { asyncHandler } from "../../middlewares/asyncHandler.js";
import {
  getMyProfile,
  getPublicProfile,
  getUsedBibNumbers,
  upsertMyProfile,
} from "./profile.services.js";
import { updateProfileSchema } from "./profile.schemas.js";

/**
 * @route GET /me
 * @returns { user, profile | null }
 */
export const getProfile = asyncHandler(async (req: Request, res: Response) => {
  const result = await getMyProfile(req.user!.id);
  res.status(200).json(result);
});

/**
 * @route PATCH /me/profile
 * @body { fullName, avatarUrl?, kilometers?, category?, team?, bike* }
 * @returns { message, profile }
 */
export const updateProfile = asyncHandler(async (req: Request, res: Response) => {
  const validation = updateProfileSchema.safeParse(req.body);

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

  const profile = await upsertMyProfile(req.user!.id, validation.data);

  res.status(200).json({ message: "Profile saved", profile });
});

/**
 * @route GET /riders/:id
 * @returns { profile, registration, stats }
 */
export const getRiderProfile = asyncHandler(async (req: Request, res: Response) => {
  const result = await getPublicProfile(String(req.params.id));
  res.status(200).json(result);
});

/**
 * @route GET /bibs
 * @returns { used: number[] }
 */
export const getBibs = asyncHandler(async (_req: Request, res: Response) => {
  const used = await getUsedBibNumbers();
  res.status(200).json({ used });
});
