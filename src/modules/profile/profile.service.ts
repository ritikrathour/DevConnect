import { redis } from "@/lib/cache/redis";
import { CacheKeys, CacheTTL } from "@/lib/cache/redis.keys";
import { prisma } from "@/lib/prisma";

export class ProfileService {
  static async getProfile(userId: string) {
    // check cache
    const cached = await redis.get(CacheKeys.USER_PROFILE(userId));
    if (cached) {
      return JSON.parse(cached);
    }
    // DB call
    const profile = await prisma.user.findUnique({
      where: { id: userId },
      include: {
        profile: {
          include: {
            skills: {
              include: { skill: true },
            },
          },
        },
        projects: true,
        socials: true,
        followers: true,
        following: true,
      },
    });
    // cache it
    await redis.setex(
      CacheKeys.USER_PROFILE(userId),
      CacheTTL.MEDIUM,
      JSON.stringify(profile),
    );
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
    await redis.del(`user:profile:${userId}`);

    return profile;
  }
}
