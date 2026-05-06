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
  static async getProfile(userId: string) {
    // check cache
    // const cached = await redis.get(CacheKeys.USER_PROFILE(email));
    // if (cached) {
    //   logger.info("profile cache hit");
    //   return JSON.parse(cached);
    // }
    // DB call
    logger.info("DB call profile");
    const profile = await fetchProfile(userId);
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
      where: {
        id: userId as string,
      },
      update: {
        bio: data.bio,
        portfolio: data.portfolio,
      },
      create: {
        user: { connect: { id: userId } },
        bio: data.bio,
        portfolio: data.portfolio,
      },
    });

    // Invalidate cache
    // await redis.del(`user:profile:${email}`);

    return profile;
  }
  static async basicDetails(
    userId: string,
    payload: { username: string; age?: number },
  ) {
    const data = await prisma.user.update({
      where: { id: userId },
      data: {
        username: payload.username,
        age: payload.age,
      },
    });
    // await redis.del(`user:profile:${email}`);
    return data;
  }
  static async bio(userId: string, bioText: string) {
    const data = await prisma.user.update({
      where: { id: userId },
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
  static async locationWeb(userId: string, portfolio: string) {
    const data = await prisma.user.update({
      where: { id: userId },
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
    userId: string,
    payload: { type: SocialPlatform; url: string },
  ) {
    const data = await prisma.profile.update({
      where: {
        userId,
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
    userId: string,
    payload: { categoryName: string; skill: ISkill },
  ) {
    let category = await prisma.skillCategory.findUnique({
      where: {
        userId_name: {
          userId: userId as string,
          name: payload.categoryName,
        },
      },
    });
    // create category
    if (!category) {
      category = await prisma.skillCategory.create({
        data: {
          name: payload.categoryName,
          userId: userId as string,
          profile: {
            connect: {
              id: userId,
            },
          },
        },
      });
    }
    // Create Skill
    const skill = await prisma.skill.create({
      data: {
        name: payload.skill.name,
        percentage: payload.skill.percentage,
        category: {
          connect: {
            id: category.id,
          },
        },
      },
    });
    // await redis.del(`user:profile:${email}`);

    return skill;
  }
  static async projects(userId: string, project: IProject) {
    const data = await prisma.profile.upsert({
      where: {
        userId: userId as string,
      },
      update: {
        projects: {
          create: project,
        },
      },
      create: {
        projects: {
          create: project,
        },
        user: {
          connect: { id: userId },
        },
      },
    });

    // await redis.del(`user:profile:${email}`);
    return data;
  }
  static async deleteProject(projectId: string) {
    const data = await prisma.project.delete({
      where: {
        id: projectId,
      },
    });
    return data;
  }
}
