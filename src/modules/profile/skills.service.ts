import { redis } from "@/lib/cache/redis";
import { CacheKeys } from "@/lib/cache/redis.keys";
import { prisma } from "@/lib/prisma";

export class SkillsServices {
  static async addSkill(userId: string, skills: string[]) {
    // Normalize (lowercase + trim)
    const NormalizeSkills = skills.map((skill) => skill.trim()?.toLowerCase());
    // create or get skills
    const skillRecords = await Promise.all(
      NormalizeSkills.map((name) =>
        prisma.skill.upsert({
          where: { name },
          update: {},
          create: { name },
        }),
      ),
    );
    // map to user
    await prisma.userSkill.createMany({
      data: skillRecords.map((skill) => ({
        userId,
        skillId: skill.id,
      })),
      skipDuplicates: true,
    });
    //  Invalidate cache
    await redis.del(CacheKeys.USER_PROFILE(userId));
    return { added: NormalizeSkills.length };
  }
}
