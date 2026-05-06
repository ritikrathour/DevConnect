import { PostType } from "@/features/feed/validation/Post.validation";
import z from "zod";

export const createPostSchema = z.object({
  content: z
    .string()
    .min(1, "Content is required")
    .max(5000, "Content must not exceed 5000 characters")
    .trim(),

  //   title: z
  //     .string()
  //     .min(1, "Title is required")
  //     .max(200, "Title must not exceed 200 characters")
  //     .trim()
  //     .optional(),

  tags: z
    .array(z.string().min(1).max(50))
    .max(5, "Maximum 5 tags allowed")
    .optional()
    .default([]),
  imageUrl: z.url("Invalid image URL").optional().nullable(),
});
