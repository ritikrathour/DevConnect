import { AsyncHandler } from "@/lib/AsyncHandler";
import { ProfileService } from "@/modules/profile/profile.service";
import { NextRequest } from "next/server";

export const GET = AsyncHandler(async (_: NextRequest, { params }: any) => {
  const profile = await ProfileService.getProfile(params.id);
  return Response.json(profile);
});
