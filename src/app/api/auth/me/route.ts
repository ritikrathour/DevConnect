import { ApiError } from "@/lib/errors/ApiError";
import { AsyncHandler } from "@/lib/AsyncHandler";
import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
export const GET = AsyncHandler(async (req: NextRequest) => {
  const email = req.headers.get("x-user-email");
  if (!email) {
    throw new ApiError(401, "Unauthorised");
  }
  const user = await prisma.user.findUnique({
    where: {
      email: email,
    },
  });
  if (!user) {
    throw new ApiError(404, "User not found");
  }
  return NextResponse.json({
    success: true,
    data: user,
  });
});
