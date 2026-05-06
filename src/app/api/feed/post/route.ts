import { createPostSchema } from "@/features/feed/validation/Post.validation";
import { AsyncHandler } from "@/lib/AsyncHandler";
import { ApiError } from "@/lib/errors/ApiError";
import { feedService } from "@/modules/feed/feed.service";
import { NextRequest } from "next/server";

export const POST = AsyncHandler(async (req: NextRequest) => {
  const body = await req.json();
  const userId = req.headers.get("x-user-id");
  if (!userId) {
    throw new ApiError(401, "Unauthorized user");
  }
  const validatedData = createPostSchema.safeParse(body);
  if (!validatedData.success) {
    // new ApiError(400, "Validation failed");
    return new Response(
      JSON.stringify({
        message: "Validation failed",
        errors: validatedData.error.issues,
      }),
      { status: 400 },
    );
  }
  const post = await feedService.createPost(userId, validatedData.data);
  if (!post) {
    throw new ApiError(500, "Failed to create post");
  }
  return new Response(JSON.stringify({ success: true, post }), { status: 201 });
});
