import { z } from "zod";

export const LoginSchema = z.object({
  email: z
    .string()
    .trim()
    .email("Please provide a valid email address")
    .max(120, "Email exceeds maximum length"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .max(128, "Password exceeds maximum length"),
});

export type LoginInput = z.infer<typeof LoginSchema>;
