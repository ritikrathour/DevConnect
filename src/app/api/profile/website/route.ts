import { AsyncHandler } from "@/lib/AsyncHandler";
import { ApiError } from "@/lib/errors/ApiError";
import { ProfileService } from "@/modules/profile/profile.service";

export const POST = AsyncHandler(async (req: Request) => {
  const body = await req.json();
  const email = req.headers.get("x-user-email");
  if (!email) {
    throw new ApiError(401, "Unauthorised user!");
  }
  console.log(body, "body");

  const response = await ProfileService.locationWeb(email, body?.portfolio);
  return Response.json(response);
});
