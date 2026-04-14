import z, { string } from "zod";

// skills
export const addSkillsSchema = z.object({
  categoryName: string,
  skills: z.array(z.string().min(1)).min(1),
});
