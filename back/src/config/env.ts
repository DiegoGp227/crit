function requireEnv(key: string): string {
  const value = process.env[key];
  if (!value) {
    throw new Error(`Missing required environment variable: ${key}`);
  }
  return value;
}

export const env = {
  DATABASE_URL:     requireEnv("DATABASE_URL"),
  PORT:             Number(process.env.PORT) || 8000,
  JWT_SECRET:       requireEnv("JWT_SECRET"),
  TOKEN_EXPIRATION: process.env.TOKEN_EXPIRATION ?? "1h",
  CORS_ORIGIN:      process.env.CORS_ORIGIN || "http://localhost:3000",
  MINIO_ENDPOINT:   process.env.MINIO_ENDPOINT || "minio",
  MINIO_PORT:       Number(process.env.MINIO_PORT) || 9000,
  MINIO_ROOT_USER:  process.env.MINIO_ROOT_USER || "minioadmin",
  MINIO_ROOT_PASSWORD: process.env.MINIO_ROOT_PASSWORD || "minioadmin",
  MINIO_BUCKET:     process.env.MINIO_BUCKET || "crit-images",
  MINIO_PUBLIC_URL: process.env.MINIO_PUBLIC_URL || "http://localhost:9000",
};
