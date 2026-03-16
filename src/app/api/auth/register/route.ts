import { logger } from "@/lib/logger";
import { registerUser } from "@/modules/auth/auth.service";
import { registerSchema } from "@/schema/auth.schema";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import z from "zod";

export async function POST(req: Request) {
  try {
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
    const { accessToken, refreshToken, user } = await registerUser(parsed.data);
    // set cookies
    logger.info("setting the cookies");
    const storeCookies = await cookies();
    storeCookies.set("devConnect-accessToken", accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
      maxAge: 900,
    });
    storeCookies.set("devConnect-refreshToken", refreshToken, {
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
  } catch (error: any) {
    console.log(error);
    return NextResponse.json(
      { message: error.message || "Something went wrong" },
      { status: 400 },
    );
  }
}
