import z from "zod";

const passwordSchema = z
  .string()
  .min(8, "Password must be at least 8 characters")
  .max(20, "Password too long")
  .regex(/[A-Z]/, "Must contain at least one uppercase letter ")
  .regex(/[a-z]/, "Must contain at least one lowercase letter ")
  .regex(/[0-9]/, "Must contain at least one number ")
  .regex(/[^A-Za-z0-9]/, "Must contain at least one special character ");
const userNameSchema = z
  .string()
  .min(3, "Username must be at least 3 characters")
  .max(30, "UserName is too long")
  .regex(/^[a-zA-Z0-9_-]+$/, "Only letters, numbers, underscores, hyphens");

//   regsiter
export const registerSchema = z.object({
  email: z.email("Invalid email address"),
  password: passwordSchema,
  username: userNameSchema,
});
export type RegisterSchema = z.infer<typeof registerSchema>;

// / ─── Login ───────────────────────────────────

export const loginSchema = z.object({
  email: z.email("Invalid email address").toLowerCase().trim(),
  password: z.string().min(1, "Password is required"),
  rememberMe: z.boolean().optional().default(false),
});

export type LoginSchema = z.infer<typeof loginSchema>;

// ─── OAuth ───────────────────────────────────

export const oauthCallbackSchema = z.object({
  code: z.string().min(1),
  state: z.string().optional(),
  redirectUri: z.string().url(),
});

// ─── Token ───────────────────────────────────

export const refreshTokenSchema = z.object({
  refreshToken: z.string().min(1, "Refresh token required"),
});

// ─── Password Reset ──────────────────────────

export const forgotPasswordSchema = z.object({
  email: z.email("Invalid email address").toLowerCase().trim(),
});

export const resetPasswordSchema = z
  .object({
    token: z.string().min(1, "Reset token required"),
    newPassword: passwordSchema,
    confirmPassword: z.string(),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export const changePasswordSchema = z
  .object({
    currentPassword: z.string().min(1, "Current password required"),
    newPassword: passwordSchema,
    confirmPassword: z.string(),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  })
  .refine((data) => data.currentPassword !== data.newPassword, {
    message: "New password must differ from current",
    path: ["newPassword"],
  });

// ─── Email Verification ──────────────────────

export const verifyEmailSchema = z.object({
  token: z.string().min(1, "Verification token required"),
});
