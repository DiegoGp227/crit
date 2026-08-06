import { CookieOptions } from "express";
import { env, TOKEN_EXPIRATION_MS } from "../config/env.js";

export const cookieOptions = (): CookieOptions => ({
  httpOnly: true,
  sameSite: "lax",
  secure: env.COOKIE_SECURE,
  maxAge: TOKEN_EXPIRATION_MS,
  path: "/",
});
