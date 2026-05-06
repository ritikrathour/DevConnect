import { AsyncHandler } from "@/lib/AsyncHandler";
import { ApiError } from "@/lib/errors/ApiError";
import { logger } from "@/lib/logger";
import { ProfileService } from "@/modules/profile/profile.service";
import { NextRequest } from "next/server";

export const DELETE = AsyncHandler(async (req: NextRequest) => {
  logger.info("project delete query received");
  // how can i get project id here? from query params?
  const projectId = req.nextUrl.pathname.split("/").pop();
  if (!projectId) {
    logger.error("project id not found in query params!");
    throw new ApiError(400, "Project ID is required!");
  }
  const userId = req.headers.get("x-user-id");
  if (!userId) {
    logger.error("user not found. UnAuthorised user!");
    throw new ApiError(401, "UnAuthorised user!");
  }
  const result = await ProfileService.deleteProject(projectId);
  return Response.json(result);
});
