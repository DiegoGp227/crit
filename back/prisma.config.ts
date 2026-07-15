import { defineConfig } from "prisma/config";

try {
  process.loadEnvFile();
} catch {
  // .env not found or not available
}

export default defineConfig({
  datasource: {
    url: process.env.DATABASE_URL!,
  },
});
