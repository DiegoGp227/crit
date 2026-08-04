import { z } from "zod";
import { CompetitionType } from "@prisma/client";

export const createRegistrationSchema = z.object({
  competitionType: z.nativeEnum(CompetitionType),
  document: z.string().trim().min(1).max(20),
  phone: z.string().trim().min(1).max(20),
  team: z.string().trim().max(120).optional(),
  eps: z.string().trim().min(1).max(120),
  emergencyContactName: z.string().trim().min(1).max(120),
  emergencyContactPhone: z.string().trim().min(1).max(20),
});

export type CreateRegistrationDTO = z.infer<typeof createRegistrationSchema>;
