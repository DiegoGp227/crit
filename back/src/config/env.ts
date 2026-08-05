function requireEnv(key: string): string {
  const value = process.env[key];
  if (!value) {
    throw new Error(`Missing required environment variable: ${key}`);
  }
  return value;
}

// Convierte una duración tipo "1h" / "30m" / "7d" a milisegundos.
// Se usa para alinear la expiración de la cookie con la del JWT.
function parseDurationToMs(value: string): number {
  const match = /^(\d+)([smhd])$/.exec(value.trim());
  if (!match) return 0;
  const amount = Number(match[1]);
  const unitMs = { s: 1_000, m: 60_000, h: 3_600_000, d: 86_400_000 }[
    match[2] as "s" | "m" | "h" | "d"
  ];
  return amount * unitMs;
}

export const TOKEN_EXPIRATION_MS = parseDurationToMs(process.env.TOKEN_EXPIRATION ?? "1h") || 3_600_000;

export const env = {
  DATABASE_URL:     requireEnv("DATABASE_URL"),
  PORT:             Number(process.env.PORT) || 8000,
  JWT_SECRET:       requireEnv("JWT_SECRET"),
  TOKEN_EXPIRATION: process.env.TOKEN_EXPIRATION ?? "1h",
  CORS_ORIGIN:      process.env.CORS_ORIGIN || "http://localhost:3000",
  COOKIE_NAME:      process.env.COOKIE_NAME || "crit_token",
  // "Secure" hace que el navegador solo envíe la cookie por HTTPS.
  // En producción (HTTPS) debe ser "true"; en dev local basta con false.
  COOKIE_SECURE:    process.env.COOKIE_SECURE === "true",
  // Si el front y el back viven en subdominios distintos del mismo dominio
  // (ej. app.midominio.com y api.midominio.com), la cookie debe fijar el
  // dominio raíz ("midominio.com") para que ambos la compartan.
  COOKIE_DOMAIN:    process.env.COOKIE_DOMAIN || undefined,
  MINIO_ENDPOINT:   process.env.MINIO_ENDPOINT || "minio",
  MINIO_ROOT_USER:  process.env.MINIO_ROOT_USER || "minioadmin",
  MINIO_ROOT_PASSWORD: process.env.MINIO_ROOT_PASSWORD || "minioadmin",
  MINIO_BUCKET:     process.env.MINIO_BUCKET || "crit-images",
  MINIO_PUBLIC_URL: process.env.MINIO_PUBLIC_URL || "http://localhost:9000",
};
