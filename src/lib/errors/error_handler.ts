import { NextResponse } from "next/server";
import { ApiError } from "./api_error";

export function handleError(error: unknown) {
  console.log(error);
  if (error instanceof ApiError) {
    return NextResponse.json(
      {
        success: false,
        message: error.message,
      },
      {
        status: error.statusCode,
      },
    );
  }
  return NextResponse.json(
    {
      success: false,
      message: "Internal Server Error",
    },
    {
      status: 500,
    },
  );
}
