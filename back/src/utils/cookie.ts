import { CookieOptions } from "express";
import { env, TOKEN_EXPIRATION_MS } from "../config/env.js";

/**
 * Opciones comunes para la cookie de sesión (JWT HttpOnly).
 *
 * - httpOnly: el token nunca es legible desde JavaScript (inmune a XSS).
 * - sameSite: "lax" mitiga CSRF: el navegador no la envía en requests
 *   cross-site de escritura, pero sí en navegación de primer nivel y en
 *   requests same-site (localhost:3000 -> localhost:8000 es same-site).
 * - secure: solo por HTTPS en producción.
 * - maxAge: se alinea con la expiración del JWT (TOKEN_EXPIRATION).
 * - Sin atributo `domain`: cookie host-only, atada al host que la setea.
 *   OJO: para que el proxy de Next (que corre en el host del front) pueda
 *   leerla, front y API deben compartir host (los puertos no importan).
 *   En dev ambos viven en "localhost" -> funciona. En producción, si la API
 *   estuviera en un subdominio distinto al front, habría que usar un proxy
 *   inverso que sirva /api en el mismo dominio del front (o fijar `domain`).
 */
export const cookieOptions = (): CookieOptions => ({
  httpOnly: true,
  sameSite: "lax",
  secure: env.COOKIE_SECURE,
  maxAge: TOKEN_EXPIRATION_MS,
  path: "/",
});
