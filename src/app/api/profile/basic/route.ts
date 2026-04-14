import { AsyncHandler } from "@/lib/AsyncHandler";
import { ProfileService } from "@/modules/profile/profile.service";
import { ApiError } from "next/dist/server/api-utils";

export const PUT = AsyncHandler(async (req: Request) => {
  const body = await req.json();
  const email = req.headers.get("x-user-email"); // from middleware
  if (!email) {
    throw new ApiError(401, "Unauthorised User!");
  }
  const updateBasicDetails = await ProfileService.basicDetails(email, body);
  return Response.json(updateBasicDetails);
});
