import { AsyncHandler } from "@/lib/AsyncHandler";
import { ApiError } from "@/lib/errors/ApiError";
import { logger } from "@/lib/logger";
import { ProfileService } from "@/modules/profile/profile.service";
import { NextRequest } from "next/server";

export const POST = AsyncHandler(async (req: NextRequest) => {
  logger.info("project update and add query received");
  const body = await req.json();
  //   const { success, data, error } = addSkillsSchema.safeParse(body);
  const userId = req.headers.get("x-user-email");
  if (!userId) {
    logger.error("user not found. UnAuthorised user!");
    throw new ApiError(401, "UnAuthorised user!");
  }
  const result = await ProfileService.projects(userId, body);
  return Response.json(result);
});
