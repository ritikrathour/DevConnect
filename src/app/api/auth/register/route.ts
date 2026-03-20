import { AsyncHandler } from "@/lib/AsyncHandler";
import { logger } from "@/lib/logger";
import { registerSchema } from "@/modules/auth/auth.schema";
import { AuthService } from "@/modules/auth/auth.service";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import z from "zod";

export const POST = AsyncHandler(async (req: Request) => {
  logger.info("Register query received");
  const body = await req.json();
  // validation
  const parsed = registerSchema.safeParse(body);
  if (!parsed.success) {
    logger.error(parsed.error);
    return NextResponse.json(
      {
        message: "Validation failed",
        errors: z.flattenError(parsed.error),
      },
      { status: 400 },
    );
  }
  // check exist user by email
  const { accessToken, refreshToken, user } = await AuthService.registerUser(
    parsed.data,
  );
  // set cookies
  logger.info("setting the cookies");
  const storeCookies = await cookies();
  storeCookies.set("devConnect_accessToken", accessToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
    maxAge: 24 * 60 * 60,
  });
  storeCookies.set("devConnect_refreshToken", refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });
  logger.info("cookies set successfullly and sending response");
  // send response
  return NextResponse.json(
    {
      success: true,
      user,
    },
    { status: 201 },
  );
});
