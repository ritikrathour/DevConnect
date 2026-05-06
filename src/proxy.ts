import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
export default function proxy(req: NextRequest) {
  const token = req.cookies.get("devConnect_accessToken")?.value;
  if (!token) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }
  const decoded = jwt.verify(token, process.env.JWT_ACCESS_SECRET!) as {
    userId: string;
    email: string;
  };

  const requsetHeaders = new Headers(req.headers);
  requsetHeaders.set("x-user-id", decoded.userId);
  return NextResponse.next({
    request: {
      headers: requsetHeaders,
    },
  });
}
export const config = {
  matcher: ["/api/profile/:path*", "/api/feed/:path*"],
};
