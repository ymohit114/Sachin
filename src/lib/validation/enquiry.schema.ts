import { z } from "zod";

export const EnquirySchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Name must be at least 2 characters")
    .max(100, "Name must not exceed 100 characters")
    .regex(/^[a-zA-Z\s.'-]+$/, "Name contains invalid characters"),
  email: z
    .string()
    .trim()
    .email("Invalid email address")
    .max(120, "Email must not exceed 120 characters")
    .optional()
    .or(z.literal("")),
  phone: z
    .string()
    .trim()
    .min(10, "Phone number must be at least 10 digits")
    .max(15, "Phone number must not exceed 15 characters")
    .regex(/^[+]?[0-9\s-]+$/, "Phone contains invalid characters"),
  category: z
    .string()
    .trim()
    .min(2, "Please select an enquiry category")
    .max(60, "Category exceeds maximum length"),
  message: z
    .string()
    .trim()
    .min(15, "Message must be at least 15 characters")
    .max(1500, "Message must not exceed 1500 characters"),
  disclaimerConsent: z
    .boolean()
    .refine((val) => val === true, "You must acknowledge that submission does not create an advocate-client relationship"),
  // Honeypot field for bot protection
  website_url_hp: z.string().max(0, "Invalid submission detected").optional(),
});

export type EnquiryInput = z.infer<typeof EnquirySchema>;
