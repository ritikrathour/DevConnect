import { AsyncHandler } from "@/lib/AsyncHandler";
import { ApiError } from "@/lib/errors/ApiError";
import { logger } from "@/lib/logger";
import { ProfileService } from "@/modules/profile/profile.service";
import { NextRequest } from "next/server";

export const GET = AsyncHandler(async (req: NextRequest) => {
  logger.info("Profile route hit.");

  const userId = req.headers.get("x-user-id");
  if (!userId) {
    throw new ApiError(401, "UnAuthorised user");
  }
  const profile = await ProfileService.getProfile(userId);
  return Response.json(profile);
});
