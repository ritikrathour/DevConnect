// import { redis } from "@/lib/cache/redis";
import { CacheKeys, CacheTTL } from "@/lib/cache/redis.keys";
import { logger } from "@/lib/logger";
import { prisma } from "@/lib/prisma";
import { fetchProfile } from "./profile.repository";
import { SocialPlatform } from "@prisma/client";
interface ISkill {
  name: string;
  percentage: number;
  slug: string;
}
interface IProject {
  title: string;
  description: string;
  githubUrl?: string;
  liveUrl?: string;
  techStack: string[];
  featured: boolean;
}
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
  //   static async updateProfile(email: string, data: any) {
  //     const profile = await prisma.profile.upsert({
  //       where: { user:email },
  //       update: {
  //         bio: data.bio,
  //         portfolio: data.portfolio,
  //       },
  //       create: {
  //         email,
  //         bio: data.bio,
  //         portfolio: data.portfolio,
  //       },
  //     });
  //
  //     // Invalidate cache
  //     // await redis.del(`user:profile:${email}`);
  //
  //     return profile;
  //   }
  static async basicDetails(
    email: string,
    payload: { username: string; age?: number },
  ) {
    const data = await prisma.user.update({
      where: { email: email },
      data: {
        username: payload.username,
        age: payload.age,
      },
    });
    // await redis.del(`user:profile:${email}`);
    return data;
  }
  static async bio(email: string, bioText: string) {
    const data = await prisma.user.update({
      where: { email },
      data: {
        profile: {
          upsert: {
            // If the profile exists, update the bio
            update: { bio: bioText },
            // If the profile doesn't exist, create it with this bio
            create: { bio: bioText },
          },
        },
      },
    });
    // await redis.del(`user:profile:${email}`);
    return data;
  }
  static async locationWeb(email: string, portfolio: string) {
    const data = await prisma.user.update({
      where: { email },
      data: {
        profile: {
          upsert: {
            update: { portfolio },
            create: { portfolio },
          },
        },
      },
    });
    // await redis.del(`user:profile:${email}`);
    return data;
  }
  static async socialLinks(
    email: string,
    payload: { type: SocialPlatform; url: string },
  ) {
    const data = await prisma.profile.update({
      where: {
        userId: (await prisma.user.findUnique({ where: { email } }))?.id,
      },
      data: {
        socials: {
          create: {
            type: payload.type,
            url: payload.url,
          },
        },
      },
      include: {
        socials: true,
      },
    });
    // await redis.del(`user:profile:${email}`);
    return data;
  }
  static async skillsAndTechnologies(
    email: string,
    payload: { categoryName: string; skill: ISkill },
  ) {
    const data = await prisma.profile.update({
      where: { id: email },
      data: {
        skills: {
          create: {
            name: payload.categoryName,
            skills: {
              create: payload.skill,
            },
            userId: email,
          },
        },
      },
    });
    // await redis.del(`user:profile:${email}`);
    return data;
  }
  static async projects(email: string, project: IProject) {
    const data = await prisma.profile.update({
      where: { id: email },
      data: {
        projects: {
          create: project,
        },
      },
    });
    // await redis.del(`user:profile:${email}`);
    return data;
  }
}
