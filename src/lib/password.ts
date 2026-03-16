import bcrypt from "bcryptjs";

export const HashedPassword = async (password: string) => {
  return await bcrypt.hash(password, 12);
};
export const ComparePassword = async (password: string, hash: string) => {
  return await bcrypt.compare(password, hash);
};
