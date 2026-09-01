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
   Create Admin (TEMPORAL)
========================= */

export const createAdminSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
});

/* =========================
   Types
========================= */

export type LoginDTO = z.infer<typeof loginSchema>;
export type SignupDTO = z.infer<typeof signupSchema>;
export type CreateAdminDTO = z.infer<typeof createAdminSchema>;
