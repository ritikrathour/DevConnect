// import { redis } from "@/lib/cache/redis";
import { CacheKeys, CacheTTL } from "@/lib/cache/redis.keys";
import { logger } from "@/lib/logger";
import { prisma } from "@/lib/prisma";
import { fetchProfile } from "./profile.repository";
import { redis } from "@/lib/cache/redis";

export class ProfileService {
  static async getProfile(email: string) {
    // check cache
    // const cached = await redis.get(CacheKeys.USER_PROFILE(email));
    // if (cached) {
    //   logger.info("profile cache hit");
    //   return JSON.parse(cached);
    // }
    // DB call
    logger.info("DB call profile");
    const profile = await fetchProfile(email);
    logger.info("Set profile in cache");
    // cache it
    // await redis.setex(
    //   CacheKeys.USER_PROFILE(email),
    //   CacheTTL.MEDIUM,
    //   JSON.stringify(profile),
    // );
    return profile;
  }
  static async updateProfile(userId: string, data: any) {
    const profile = await prisma.profile.upsert({
      where: { userId },
      update: {
        bio: data.bio,
        portfolio: data.portfolio,
      },
      create: {
        userId,
        bio: data.bio,
        portfolio: data.portfolio,
      },
    });

    // Invalidate cache
    // await redis.del(`user:profile:${userId}`);

    return profile;
  }
}
