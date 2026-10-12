import { z } from "zod";

export const ArticleSchema = z.object({
  title: z
    .string()
    .trim()
    .min(5, "Title must be at least 5 characters")
    .max(200, "Title must not exceed 200 characters"),
  slug: z
    .string()
    .trim()
    .min(3, "Slug must be at least 3 characters")
    .max(120, "Slug must not exceed 120 characters")
    .regex(/^[a-z0-9-]+$/, "Slug must only contain lowercase letters, numbers, and hyphens"),
  summary: z
    .string()
    .trim()
    .min(15, "Summary must be at least 15 characters")
    .max(400, "Summary must not exceed 400 characters"),
  content: z
    .string()
    .trim()
    .min(50, "Content must be at least 50 characters")
    .max(50000, "Content exceeds maximum length limit"),
  status: z.enum(["draft", "reviewed", "published"]),
  author: z
    .string()
    .trim()
    .min(2, "Author is required")
    .max(100, "Author name exceeds maximum length"),
  categories: z.array(z.string().trim().max(50)).default([]),
  tags: z.array(z.string().trim().max(50)).default([]),
  seoTitle: z.string().trim().max(100).optional().or(z.literal("")),
  seoDescription: z.string().trim().max(250).optional().or(z.literal("")),
  reviewed: z.boolean().optional(),
  approved: z.boolean().optional(),
});

export type ArticleInput = z.infer<typeof ArticleSchema>;
