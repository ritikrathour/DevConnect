import { AsyncHandler } from "@/lib/AsyncHandler";
import { ApiError } from "@/lib/errors/ApiError";
import { ProfileService } from "@/modules/profile/profile.service";

export const POST = AsyncHandler(async (req: Request) => {
  const body = await req.json();
  const userId = req.headers.get("x-user-id");
  if (!userId) {
    throw new ApiError(401, "Unauthorised user!");
  }
  const response = await ProfileService.locationWeb(userId, body?.portfolio);
  return Response.json(response);
});
