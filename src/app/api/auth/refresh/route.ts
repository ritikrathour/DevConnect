import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { AsyncHandler } from "@/lib/AsyncHandler";
import { TokenService } from "@/shared/utils/tokenGenrator";

export const POST = AsyncHandler(async (req: NextRequest) => {
  console.log("calll ok");

  const refreshToken = req.cookies.get("devConnect_refreshToken")?.value;
  if (!refreshToken) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }
  try {
    const decoded = jwt.verify(
      refreshToken,
      process.env.JWT_REFRESH_SECRET!,
    ) as {
      email: string;
    };
    const accessToken = new TokenService().generateAccessToken(decoded.email);
    const storeCookies = await cookies();
    storeCookies.set("devConnect_accessToken", accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
      maxAge: 24 * 60 * 60 * 1000,
    });
    return NextResponse.json({
      success: true,
    });
  } catch {
    return NextResponse.json(
      { message: "Invalid refresh token" },
      { status: 401 },
    );
  }
});
