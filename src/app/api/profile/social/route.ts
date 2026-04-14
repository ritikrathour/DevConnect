import { AsyncHandler } from "@/lib/AsyncHandler";
import { ApiError } from "@/lib/errors/ApiError";
import { logger } from "@/lib/logger";
import { ProfileService } from "@/modules/profile/profile.service";
import { SocialPlatform } from "@/shared/types/globle.type";
import { NextRequest } from "next/server";

export const POST = AsyncHandler(async (req: NextRequest) => {
  logger.info("social query received");
  const body = await req.json();
  //   const { success, data, error } = addSkillsSchema.safeParse(body);
  const userId = req.headers.get("x-user-email");
  if (!userId) {
    logger.error("user not found. UnAuthorised user!");
    throw new ApiError(401, "UnAuthorised user!");
  }
  const result = await ProfileService.socialLinks(userId, body);
  return Response.json(result);
});
