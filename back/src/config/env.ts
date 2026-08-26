function requireEnv(key: string): string {
  const value = process.env[key];
  if (!value) {
    throw new Error(`Missing required environment variable: ${key}`);
  }
  return value;
}

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
  COOKIE_SECURE:    process.env.COOKIE_SECURE !== "false",
  MINIO_ENDPOINT:   process.env.MINIO_ENDPOINT || "minio",
  MINIO_ROOT_USER:  process.env.MINIO_ROOT_USER || "minioadmin",
  MINIO_ROOT_PASSWORD: process.env.MINIO_ROOT_PASSWORD || "minioadmin",
  MINIO_BUCKET:     process.env.MINIO_BUCKET || "crit-images",
  MINIO_PUBLIC_URL: process.env.MINIO_PUBLIC_URL || "http://localhost:9000",
};
