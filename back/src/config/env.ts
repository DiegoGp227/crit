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
};
