import { AsyncHandler } from "@/lib/AsyncHandler";
import { ApiError } from "@/lib/errors/ApiError";
import { ProfileService } from "@/modules/profile/profile.service";

export const PUT = AsyncHandler(async (req: Request) => {
  const body = await req.json();
  const userId = req.headers.get("x-user-email"); // from middleware
  if (!userId) {
    throw new ApiError(401, "Unauthorised User!");
  }
  const profile = await ProfileService.updateProfile(userId, body);
  return Response.json(profile);
});
