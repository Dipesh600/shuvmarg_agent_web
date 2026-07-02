/**
 * CacheService — Generic client-side TTL cache backed by localStorage.
 *
 * Usage:
 *   const data = CacheService.get<Stop[]>("popular-stops");
 *   CacheService.set("popular-stops", stops, 24 * 60 * 60 * 1000); // 24 h
 *
 * Cache Object shape (stored as JSON):
 *   { data: T, expiresAt: number (unix ms), version: string }
 *
 * Pre-defined TTLs (use CacheService.TTL.*):
 *   POPULAR_STOPS  24 h
 *   OPERATORS      12 h
 *   AMENITIES       7 d
 *   LANGUAGES      30 d
 */

const CACHE_VERSION = "v1";

export interface CacheEntry<T> {
  data: T;
  expiresAt: number;
  version: string;
}

const CacheService = {
  // ── Pre-defined TTLs (ms) ────────────────────────────────────────────────
  TTL: {
    POPULAR_STOPS: 24 * 60 * 60 * 1000,   // 24 hours
    OPERATORS:     12 * 60 * 60 * 1000,   // 12 hours
    AMENITIES:      7 * 24 * 60 * 60 * 1000, // 7 days
    LANGUAGES:     30 * 24 * 60 * 60 * 1000, // 30 days
  } as const,

  /**
   * Read a cached value. Returns null if missing, expired, or version mismatch.
   */
  get<T>(key: string): T | null {
    try {
      const raw = localStorage.getItem(`sm_cache_${key}`);
      if (!raw) return null;

      const entry = JSON.parse(raw) as CacheEntry<T>;

      // Invalidate on version mismatch or expiry
      if (entry.version !== CACHE_VERSION) {
        localStorage.removeItem(`sm_cache_${key}`);
        return null;
      }
      if (Date.now() > entry.expiresAt) {
        localStorage.removeItem(`sm_cache_${key}`);
        return null;
      }

      return entry.data;
    } catch {
      // Corrupt data — clear and let it re-fetch
      localStorage.removeItem(`sm_cache_${key}`);
      return null;
    }
  },

  /**
   * Write a value to the cache with a TTL (milliseconds).
   */
  set<T>(key: string, data: T, ttlMs: number): void {
    try {
      const entry: CacheEntry<T> = {
        data,
        expiresAt: Date.now() + ttlMs,
        version: CACHE_VERSION,
      };
      localStorage.setItem(`sm_cache_${key}`, JSON.stringify(entry));
    } catch {
      // localStorage full or unavailable — fail silently
    }
  },

  /**
   * Remove a specific key from the cache.
   */
  remove(key: string): void {
    localStorage.removeItem(`sm_cache_${key}`);
  },

  /**
   * Clear all Shuv Marg cache entries (keys prefixed with sm_cache_).
   */
  clear(): void {
    const keysToRemove: string[] = [];
    for (let i = 0; i < localStorage.length; i++) {
      const k = localStorage.key(i);
      if (k?.startsWith("sm_cache_")) keysToRemove.push(k);
    }
    keysToRemove.forEach((k) => localStorage.removeItem(k));
  },

  /**
   * True if a valid (non-expired, current-version) entry exists.
   */
  isValid(key: string): boolean {
    return CacheService.get(key) !== null;
  },
} as const;

export default CacheService;
