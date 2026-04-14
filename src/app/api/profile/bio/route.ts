import { AsyncHandler } from "@/lib/AsyncHandler";
import { ProfileService } from "@/modules/profile/profile.service";
import { ApiError } from "next/dist/server/api-utils";

export const PUT = AsyncHandler(async (req: Request) => {
  const body = await req.json();
  const userId = req.headers.get("x-user-email"); // from middleware
  if (!userId) {
    throw new ApiError(401, "Unauthorised User!");
  }
  const updateBio = await ProfileService.bio(userId, body);
  return Response.json(updateBio);
});
