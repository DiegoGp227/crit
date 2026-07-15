const isDev = process.env.NODE_ENV !== "production";

export const logger = {
  info: (message: string, ...args: unknown[]): void => {
    if (isDev) console.log(`[INFO] ${message}`, ...args);
  },
  warn: (message: string, ...args: unknown[]): void => {
    if (isDev) console.warn(`[WARN] ${message}`, ...args);
  },
  error: (message: string, ...args: unknown[]): void => {
    if (isDev) {
      console.error(`[ERROR] ${message}`, ...args);
    } else {
      // En producción conectar a Sentry, LogRocket, etc.
      console.error(JSON.stringify({ level: "error", message }));
    }
  },
};
