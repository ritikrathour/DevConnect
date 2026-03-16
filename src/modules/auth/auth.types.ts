export interface JWTPayload {
  sub: string; // userId
  email: string;
  role: UserRole;
  sessionId?: string; // Redis session key
  iat?: number;
  exp?: number;
}
export enum UserRole {
  USER = "USER",
  ADMIN = "ADMIN",
}
