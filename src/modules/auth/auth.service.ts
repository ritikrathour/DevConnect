import { ApiError } from "next/dist/server/api-utils";
import { createUser, findUserByEmail } from "./auth.repository";
import { HashedPassword } from "@/lib/password";
import { TokenService } from "./token.service";
import { logger } from "@/lib/logger";

export const registerUser = async (data: any) => {
  const existingUser = await findUserByEmail(data?.email);
  if (existingUser) {
    logger.error("user already registered");
    throw new ApiError(400, "User already exist with this email");
  }
  const hashedPassword = await HashedPassword(data?.password);
  const user = await createUser({ ...data, password: hashedPassword });
  if (!user) {
    logger.error("user not found with the email", data?.email);
    throw new ApiError(500, "User not created successfully");
  }
  const accessToken = new TokenService().generateAccessToken(data?.email);
  const refreshToken = new TokenService().gererateREfresshToken(data);
  logger.info("tokens generated successfully");
  return { user, accessToken, refreshToken };
};
