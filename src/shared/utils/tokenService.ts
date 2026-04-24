import { ApiError } from "@/lib/errors/ApiError";
import { JWTPayload } from "../../modules/auth/auth.types";
import jwt from "jsonwebtoken";
const ACCESS_TOKEN_SECRET = process.env.JWT_ACCESS_SECRET!;
const REFRESH_TOKEN_SECRET = process.env.JWT_REFRESH_SECRET!;
const ACCESS_TOKEN_TTL = 24 * 60 * 60;

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
      expiresIn: ACCESS_TOKEN_TTL * 7,
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
        throw new ApiError(403, "AccessToken exiored");
      }
      throw new ApiError(403, "Invalid access token");
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
        throw new ApiError(403, "Invalid or expired refresh token");
      }
      throw new ApiError(403, "Invalid refresh token");
    }
  }
}
