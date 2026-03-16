import { prisma } from "@/lib/prisma";
export const findUserByEmail = async (email: string) => {
  return await prisma.user.findUnique({ where: { email } });
};
export const createUser = async (data: any) => {
  return await prisma.user.create({ data });
};
