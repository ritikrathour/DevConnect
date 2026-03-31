import z from "zod";

// skills
export const addSkillsSchema = z.object({
  skills: z.array(z.string().min(1)).min(1),
});
