import { z } from "zod";
import { RaceStatus } from "@prisma/client";

export const createRaceSchema = z.object({
  raceDate: z.coerce.date(),
  maleLaps: z.number().int().min(0).default(0),
  femaleLaps: z.number().int().min(0).default(0),
});

export type CreateRaceDTO = z.infer<typeof createRaceSchema>;

export const updateRaceSchema = z.object({
  raceDate: z.coerce.date().optional(),
  status: z.nativeEnum(RaceStatus).optional(),
  maleLaps: z.number().int().min(0).optional(),
  femaleLaps: z.number().int().min(0).optional(),
});

export type UpdateRaceDTO = z.infer<typeof updateRaceSchema>;

export const listRacesQuerySchema = z.object({
  status: z.nativeEnum(RaceStatus).optional(),
  page: z.coerce.number().int().positive().default(1),
  pageSize: z.coerce.number().int().positive().max(100).default(25),
});

export type ListRacesQuery = z.infer<typeof listRacesQuerySchema>;

export const raceIdParamSchema = z.object({
  id: z.coerce.number().int().positive(),
});
