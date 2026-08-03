// RM: Schema Example — replace with your own schemas
import { z } from "zod";

/* =========================
   Base schemas
========================= */

const emailSchema = z.string().email();

const passwordSchema = z.string().min(8);

/* =========================
   Signup
========================= */

export const signupSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
});

export const loginSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
});

/* =========================
   Types
========================= */

export type LoginDTO = z.infer<typeof loginSchema>;
export type SignupDTO = z.infer<typeof signupSchema>;
