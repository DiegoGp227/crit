import { Request, Response } from "express";
import { ValidationError } from "../../errors/appError.js";
import { asyncHandler } from "../../middlewares/asyncHandler.js";
import { cookieOptions } from "../../utils/cookie.js";
import { env } from "../../config/env.js";
import { createUser, validateUser } from "./auth.services.js";
import { loginSchema, signupSchema } from "./auth.schemas.js";


/**
 * @route POST /signup
 * @body { email, password }
 * @returns { message, userInfo }
 */
export const signup = asyncHandler(async (req: Request, res: Response) => {
  const validation = signupSchema.safeParse(req.body);

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

  const { user, token } = await createUser(validation.data);

  res.cookie(env.COOKIE_NAME, token, cookieOptions());

  res.status(201).json({
    message: "User successfully created",
    userInfo: {
      id: user.id,
      email: user.email,
      role: user.role,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    },
  });
});

/**
 * @route POST /login
 * @body { email, password }
 * @returns { message, userInfo }
 */
export const login = asyncHandler(async (req: Request, res: Response) => {
  const validation = loginSchema.safeParse(req.body);

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

  const { user, token } = await validateUser(validation.data);

  res.cookie(env.COOKIE_NAME, token, cookieOptions());

  res.status(200).json({
    message: "Login successful",
    userInfo: {
      id: user.id,
      email: user.email,
      role: user.role,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    },
  });
});

/**
 * @route POST /logout
 * @returns { message }
 * @clearCookie crit_token
 */
export const logout = asyncHandler(async (_req: Request, res: Response) => {
  res.clearCookie(env.COOKIE_NAME, cookieOptions());
  res.status(200).json({ message: "Logged out successfully" });
});
