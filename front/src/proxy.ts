import { NextRequest, NextResponse } from "next/server";

// Nombre de la cookie de sesión. Debe coincidir con COOKIE_NAME del backend.
const SESSION_COOKIE = process.env.COOKIE_NAME ?? "crit_token";

// Ruta al login para redirigir cuando no hay sesión válida.
const LOGIN_PATH = "/auth";

/**
 * Decodifica el payload de un JWT sin verificar la firma.
 *
 * ¿Por qué sin verificar? Este middleware solo decide si el usuario *puede
 * intentar* ver la página (gate de navegación). La seguridad real la da el
 * backend: cualquier request a la API que llegue con un token falso o vencido
 * recibe 401 y el interceptor redirige al login. Verificar la firma aquí
 * exigiría exponer el JWT_SECRET al frontend, lo cual no aporta seguridad
 * adicional al gate de rutas.
 */
function decodePayload(token: string): { exp?: number } | null {
  try {
    const payloadPart = token.split(".")[1];
    if (!payloadPart) return null;
    const json = atob(payloadPart.replace(/-/g, "+").replace(/_/g, "/"));
    return JSON.parse(json) as { exp?: number };
  } catch {
    return null;
  }
}

/** Devuelve true si el token existe y aún no expiró (según `exp`). */
function isValidSessionToken(token: string | undefined): boolean {
  if (!token) return false;
  const payload = decodePayload(token);
  if (!payload?.exp) return false;
  return payload.exp * 1000 > Date.now();
}

/**
 * Proxy de Next.js (antes "middleware"; corre en el servidor/edge, ANTES de
 * renderizar). Protege rutas privadas: /admin y /profile.
 *
 * Las rutas públicas (/, /auth, /profiles/*) NO están en el matcher,
 * así que pasan directo sin este chequeo.
 */
export function proxy(request: NextRequest) {
  const sessionToken = request.cookies.get(SESSION_COOKIE)?.value;

  if (!isValidSessionToken(sessionToken)) {
    const loginUrl = new URL(LOGIN_PATH, request.url);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/profile/:path*"],
};
