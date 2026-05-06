import { z } from "zod";

// ============================================
// POST VALIDATION SCHEMAS
// ============================================

// Content types
export const PostType = z.enum(["POST", "PROJECT", "ACHIEVEMENT", "ARTICLE"]);

// Create Post Schema
export const createPostSchema = z.object({
  content: z
    .string()
    .min(1, "Content is required")
    .max(5000, "Content must not exceed 5000 characters")
    .trim(),

  // title: z
  //   .string()
  //   .min(1, "Title is required")
  //   .max(200, "Title must not exceed 200 characters")
  //   .trim()
  //   .optional(),

  tags: z
    .array(z.string().min(1).max(50))
    .max(5, "Maximum 5 tags allowed")
    .optional()
    .default([]),
  images: z.array(z.url("Invalid image URL")).optional().nullable(),
});

// Update Post Schema
export const updatePostSchema = z.object({
  content: z
    .string()
    .min(1, "Content is required")
    .max(5000, "Content must not exceed 5000 characters")
    .trim()
    .optional(),

  title: z
    .string()
    .min(1, "Title is required")
    .max(200, "Title must not exceed 200 characters")
    .trim()
    .optional(),

  tags: z
    .array(z.string().min(1).max(50))
    .max(5, "Maximum 5 tags allowed")
    .optional(),

  imageUrl: z.url("Invalid image URL").optional().nullable(),

  linkUrl: z.string().url("Invalid link URL").optional().nullable(),

  metadata: z.record(z.string(), z.any()).optional().nullable(),
});

// Query Parameters Schema
export const getFeedQuerySchema = z.object({
  page: z.coerce.number().int().positive().default(1),
  limit: z.coerce.number().int().positive().max(50).default(10),
  filter: z.enum(["latest", "trending", "following"]).default("latest"),
  userId: z.string().optional(),
  tag: z.string().optional(),
  type: PostType.optional(),
});

// Comment Schema
export const createCommentSchema = z.object({
  content: z
    .string()
    .min(1, "Comment cannot be empty")
    .max(1000, "Comment must not exceed 1000 characters")
    .trim(),

  parentId: z.string().optional().nullable(),
});

// Report Schema
export const reportPostSchema = z.object({
  reason: z.enum([
    "SPAM",
    "HARASSMENT",
    "INAPPROPRIATE",
    "MISINFORMATION",
    "COPYRIGHT",
    "OTHER",
  ]),

  description: z
    .string()
    .min(10, "Please provide more details")
    .max(500, "Description must not exceed 500 characters")
    .optional(),
});

// Types inferred from schemas
export type CreatePostInput = z.infer<typeof createPostSchema>;
export type UpdatePostInput = z.infer<typeof updatePostSchema>;
export type GetFeedQuery = z.infer<typeof getFeedQuerySchema>;
export type CreateCommentInput = z.infer<typeof createCommentSchema>;
export type ReportPostInput = z.infer<typeof reportPostSchema>;
