import { z } from "zod";
import { ResultStatus } from "@prisma/client";

export const raceResultSchema = z.object({
  profileId: z.number().int().positive(),
  status: z.nativeEnum(ResultStatus),
  points: z.number().int(),
});

export type RaceResultDTO = z.infer<typeof raceResultSchema>;

export const setResultsBodySchema = z.object({
  results: z.array(raceResultSchema).max(200),
});

export type SetResultsBody = z.infer<typeof setResultsBodySchema>;

export const raceIdParamSchema = z.object({
  id: z.coerce.number().int().positive(),
});
