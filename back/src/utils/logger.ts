const isDev = process.env.NODE_ENV !== "production";

export const logger = {
  info: (message: string, ...args: unknown[]): void => {
    console.log(`[INFO] ${message}`, ...args);
  },
  warn: (message: string, ...args: unknown[]): void => {
    console.warn(`[WARN] ${message}`, ...args);
  },
  error: (message: string, ...args: unknown[]): void => {
    if (isDev) {
      console.error(`[ERROR] ${message}`, ...args);
    } else {
      // En producción se puede conectar a Sentry, Datadog, etc.
      console.error(JSON.stringify({ level: "error", message, args }));
    }
  },
};
