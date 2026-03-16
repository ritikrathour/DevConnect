import { ApiError } from "@/lib/errors/api_error";
import { JWTPayload } from "./auth.types";
import jwt from "jsonwebtoken";
const ACCESS_TOKEN_SECRET = process.env.JWT_ACCESS_SECRET!;
const REFRESH_TOKEN_SECRET = process.env.JWT_REFRESH_SECRET!;
const ACCESS_TOKEN_TTL = 15 * 60;

export class TokenService {
  // ── Generate Access Token ─────────────────
  generateAccessToken(email: string): string {
    return jwt.sign({ email }, ACCESS_TOKEN_SECRET, {
      expiresIn: ACCESS_TOKEN_TTL,
      algorithm: "HS256",
      issuer: "devConnect",
    });
  }
  // ── Generate Refresh Token ────────────────
  gererateREfresshToken(payload: JWTPayload): string {
    return jwt.sign(payload, REFRESH_TOKEN_SECRET, {
      expiresIn: "7d",
      algorithm: "HS256",
      issuer: "devConnect",
      audience: "devconnect:web",
    });
  }
  // ── Verify Access Token ───────────────────
  verifyAccessToken(token: string) {
    try {
      const payload = jwt.verify(token, ACCESS_TOKEN_SECRET, {
        algorithms: ["HS256"],
        issuer: "devConnect",
        audience: "devconnect:web",
      }) as JWTPayload;
      return payload;
    } catch (error) {
      if (error instanceof jwt.TokenExpiredError) {
        throw new ApiError("AccessToken exiored", 402);
      }
      throw new ApiError("Invalid access token", 402);
    }
  }
  // ── Verify refresh Token ───────────────────
  verifyRefreshToken(token: string) {
    try {
      const payload = jwt.verify(token, REFRESH_TOKEN_SECRET, {
        algorithms: ["HS256"],
        issuer: "devConnect",
        audience: "devconnect:web",
      });
      return payload;
    } catch (error) {
      if (error instanceof jwt.TokenExpiredError) {
        throw new ApiError("Invalid or expired refresh token", 402);
      }
      throw new ApiError("Invalid refresh token", 402);
    }
  }
}
