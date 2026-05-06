import { ApiError } from "@/lib/errors/ApiError";
import { prisma } from "@/lib/prisma";

export const fetchProfile = async (userId: string) => {
  try {
    const profile = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        username: true,
        email: true,
        gender: true,
        createdAt: true,
        photoUrl: true,
        profile: {
          select: {
            bio: true,
            portfolio: true,
            yearsOfExp: true,
            skills: {
              include: {
                skills: true,
              },
            },
            projects: true,
            socials: true,
          },
        },
        _count: {
          select: { followers: true, following: true },
        },
      },
    });
    return profile;
  } catch (error: any) {
    console.log(error);
    throw new ApiError(400, error?.message);
  }
};
