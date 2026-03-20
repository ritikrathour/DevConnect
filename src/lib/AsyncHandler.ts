import { NextResponse } from "next/server";
import { ApiError } from "./errors/ApiError";

export const AsyncHandler =
  (handler: any) => async (req: Request, context?: any) => {
    try {
      return await handler(req, context);
    } catch (error: any) {
      console.error("API ERROR:", error);
      return NextResponse.json(
        {
          success: false,
          message: error.message || "Internal server error",
        },
        { status: error instanceof ApiError ? error.statusCode : 500 },
      );
    }
  };
