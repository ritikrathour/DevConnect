import { redis } from "./redis";

// Cache key prefixes for organization
export const CacheKeys = {
  USER_PROFILE: (userId: string) => `user:profile:${userId}`,
  USER_BY_USERNAME: (username: string) => `user:username:${username}`,
  USER_PROJECTS: (userId: string) => `user:projects:${userId}`,
  USER_SKILLS: (userId: string) => `user:skills:${userId}`,
  USER_ACTIVITIES: (userId: string) => `user:activities:${userId}`,
  USER_ACHIEVEMENTS: (userId: string) => `user:achievements:${userId}`,
  USER_STATS: (userId: string) => `user:stats:${userId}`,
  SESSION: (token: string) => `session:${token}`,
  RATE_LIMIT: (identifier: string) => `ratelimit:${identifier}`,
  CONTRIBUTION_GRAPH: (userId: string, year: number) =>
    `contributions:${userId}:${year}`,
} as const;

// Cache TTL (Time To Live) in seconds
export const CacheTTL = {
  SHORT: 60, // 1 minute
  MEDIUM: 300, // 5 minutes
  LONG: 900, // 15 minutes
  HOUR: 3600, // 1 hour
  DAY: 86400, // 24 hours
  WEEK: 604800, // 7 days
} as const;

// Helper functions for cache operations
export const cacheService = {
  // Get cached data
  async get<T>(key: string): Promise<T | null> {
    try {
      const data = await redis.get(key);
      return data ? JSON.parse(data) : null;
    } catch (error) {
      console.error("Cache get error:", error);
      return null;
    }
  },
  // Set cache with TTL
  async set(
    key: string,
    value: any,
    ttl: number = CacheTTL.MEDIUM,
  ): Promise<void> {
    try {
      await redis.setex(key, ttl, JSON.stringify(value));
    } catch (error) {
      console.error("Cache set error:", error);
    }
  },
  // Delete cache key
  async del(key: string | string[]): Promise<void> {
    try {
      if (Array.isArray(key)) {
        if (key.length > 0) {
          await redis.del(...key);
        }
      } else {
        await redis.del(key);
      }
    } catch (error) {
      console.error("Cache delete error:", error);
    }
  },

  // Delete keys by pattern
  async delPattern(pattern: string): Promise<void> {
    try {
      const keys = await redis.keys(pattern);
      if (keys.length > 0) {
        await redis.del(...keys);
      }
    } catch (error) {
      console.error("Cache delete pattern error:", error);
    }
  },
  // Invalidate user cache
  async invalidateUserCache(userId: string): Promise<void> {
    const patterns = [`user:*:${userId}`, `user:*:${userId}:*`];

    for (const pattern of patterns) {
      await this.delPattern(pattern);
    }
  },
  // Check if key exists
  async exists(key: string): Promise<boolean> {
    try {
      const result = await redis.exists(key);
      return result === 1;
    } catch (error) {
      console.error("Cache exists error:", error);
      return false;
    }
  },
  // Get TTL of a key
  async ttl(key: string): Promise<number> {
    try {
      return await redis.ttl(key);
    } catch (error) {
      console.error("Cache TTL error:", error);
      return -1;
    }
  },

  // Increment counter (for rate limiting)
  async incr(key: string, ttl?: number): Promise<number> {
    try {
      const value = await redis.incr(key);
      if (ttl && value === 1) {
        await redis.expire(key, ttl);
      }
      return value;
    } catch (error) {
      console.error("Cache incr error:", error);
      return 0;
    }
  },
};
