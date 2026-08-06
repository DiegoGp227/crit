const cache = new Map<string, { data: unknown; expiresAt: number }>();

const DEFAULT_TTL_MS = 60_000;

export const getCached = <T>(key: string): T | null => {
  const entry = cache.get(key);

  if (!entry) return null;

  if (Date.now() > entry.expiresAt) {
    cache.delete(key);
    return null;
  }

  return entry.data as T;
};

export const setCached = <T>(key: string, data: T, ttlMs = DEFAULT_TTL_MS): T => {
  cache.set(key, { data, expiresAt: Date.now() + ttlMs });
  return data;
};

export const invalidateCached = (key: string): void => {
  cache.delete(key);
};
