import { createUser, findUserByEmail } from "./auth.repository";
import { ComparePassword, HashedPassword } from "@/lib/password";
import { TokenService } from "../../shared/utils/tokenService";
import { logger } from "@/lib/logger";
import { ApiError } from "@/lib/errors/ApiError";
import { redis } from "@/lib/cache/redis";
import { CacheKeys, CacheTTL } from "@/lib/cache/redis.keys";
type loginData = {
  email: string;
  password: string;
};
export const AuthService = {
  registerUser: async (data: any) => {
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
  },
  loginUser: async (data: loginData) => {
    const user = await findUserByEmail(data?.email);
    if (!user) {
      logger.warn(`User not found: ${data.email}`);
      throw new ApiError(404, "User not found!");
    }
    //   check password
    const isMatch = await ComparePassword(data.password, user.password);
    if (!isMatch) {
      logger.warn(`Invalid password attempt: ${data?.email}`);
      throw new ApiError(403, "Invalid Credentials");
    }
    //  generate tokens
    const accessToken = new TokenService().generateAccessToken(data?.email);
    const refreshToken = new TokenService().gererateREfresshToken(data);
    return { accessToken, refreshToken, user };
  },
  currentUser: async (email: string) => {
    try {
      const cachedUser = await redis.get(CacheKeys.CURRENT_USER(email));
      if (cachedUser) {
        return JSON.parse(cachedUser);
      }
      const user = await findUserByEmail(email);
      await redis.setex(
        CacheKeys.CURRENT_USER(email),
        CacheTTL.MEDIUM,
        JSON.stringify(user),
      );
      return user;
    } catch (error) {
      console.log(error);
    }
  },
};
