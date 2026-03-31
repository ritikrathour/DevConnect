import { AsyncHandler } from "@/lib/AsyncHandler";
import { ApiError } from "@/lib/errors/ApiError";
import { logger } from "@/lib/logger";
import { addSkillsSchema } from "@/modules/profile/profile.schema";
import { NextRequest } from "next/server";

export const POST = AsyncHandler(async (req: NextRequest) => {
  logger.info("add skills query received");
  const body = req.json();
  const { success, data, error } = addSkillsSchema.safeParse(body);
  const userId = req.headers.get("x-user-email");
  if (!userId) {
    throw new ApiError(401, "UnAuthorised user!");
  }
  //   const result =
});
