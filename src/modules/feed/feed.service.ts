import { CreatePostInput } from "@/features/feed/validation/Post.validation";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/dist/server/web/spec-extension/response";

class FeedService {
  async createPost(userId: string, data: CreatePostInput) {
    // ✅ Normalize tags
    const normalizedTags = [
      ...new Set(data.tags.map((tag) => tag.trim().toLowerCase())),
    ];

    // 1️⃣ Find existing tags
    const existingTags = await prisma.tag.findMany({
      where: {
        name: { in: normalizedTags },
      },
    });

    const existingTagNames = new Set(existingTags.map((t) => t.name));

    // 2️⃣ Create missing tags
    const newTagsData = normalizedTags
      .filter((tag) => !existingTagNames.has(tag))
      .map((tag) => ({ name: tag }));

    let createdTags: any[] = [];

    if (newTagsData.length > 0) {
      await prisma.tag.createMany({
        data: newTagsData,
        skipDuplicates: true, // ✅ important
      });

      // fetch them again
      createdTags = await prisma.tag.findMany({
        where: {
          name: { in: newTagsData.map((t) => t.name) },
        },
      });
    }

    // 3️⃣ Combine all tags
    const allTags = [...existingTags, ...createdTags];

    // 4️⃣ Create post
    const post = await prisma.post.create({
      data: {
        content: data.content,
        authorId: userId,
        tags: {
          connect: allTags.map((tag) => ({
            id: tag.id,
          })),
        },
      },
      include: {
        author: {
          select: {
            id: true,
            username: true,
          },
        },
        tags: true,
      },
    });

    return NextResponse.json(
      {
        message: "Post created successfully",
        data: post,
      },
      { status: 201 },
    );
    // Invalidate feed cache
    // await cacheService.delPattern('feed:*');
  }
  private generateSlug(name: string): string {
    return name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");
  }
}
export const feedService = new FeedService();
