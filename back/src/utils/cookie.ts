import { CookieOptions } from "express";
import { env, TOKEN_EXPIRATION_MS } from "../config/env.js";

/**
 * Opciones comunes para la cookie de sesión (JWT HttpOnly).
 *
 * - httpOnly: el token nunca es legible desde JavaScript (inmune a XSS).
 * - sameSite: "lax" mitiga CSRF: el navegador no la envía en requests
 *   cross-site de escritura, pero sí en navegación de primer nivel y en
 *   requests same-site (localhost:3002 -> localhost:8000 es same-site).
 * - secure: solo por HTTPS en producción.
 * - maxAge: se alinea con la expiración del JWT (TOKEN_EXPIRATION).
 * - domain: en producción con subdominios, fija el dominio raíz.
 */
export const cookieOptions = (): CookieOptions => ({
  httpOnly: true,
  sameSite: "lax",
  secure: env.COOKIE_SECURE,
  maxAge: TOKEN_EXPIRATION_MS,
  path: "/",
  ...(env.COOKIE_DOMAIN ? { domain: env.COOKIE_DOMAIN } : {}),
});
