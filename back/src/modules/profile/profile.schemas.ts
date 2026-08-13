import { z } from "zod";
import { CategoryType } from "@prisma/client";

const optionalString = z.string().trim().max(120).nullish();

const optionalUrl = z.union([z.string().url(), z.literal("")]).nullish();

export const updateProfileSchema = z.object({
  fullName: z.string().trim().min(1).max(120),
  avatarUrl: optionalUrl,
  kilometers: z.number().int().min(0).nullish(),
  category: z.nativeEnum(CategoryType).nullish(),
  team: optionalString,
  bikePhotoUrl: optionalUrl,
  bikeNickname: optionalString,
  bikeFrame: optionalString,
  bikeRatio: optionalString,
  bikeWeight: z.coerce.number().positive().nullish(),
  bikeSize: z.string().trim().max(40).nullish(),
});

export type UpdateProfileDTO = z.infer<typeof updateProfileSchema>;
