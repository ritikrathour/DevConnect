import { AsyncHandler } from "@/lib/AsyncHandler";
import { ApiError } from "@/lib/errors/ApiError";
import { logger } from "@/lib/logger";
import { ProfileService } from "@/modules/profile/profile.service";
import { NextRequest } from "next/server";

export const GET = AsyncHandler(async (req: NextRequest) => {
  logger.info("Profile route hit.");
  const email = req.headers.get("x-user-email");
  if (!email) {
    throw new ApiError(401, "UnAuthorised user");
  }
  const profile = await ProfileService.getProfile(email);
  return Response.json(profile);
});
