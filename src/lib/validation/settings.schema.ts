import { z } from "zod";

export const SettingsSchema = z.object({
  fullName: z.string().trim().min(2).max(100),
  isFullNameVerified: z.boolean(),
  designation: z.string().trim().min(2).max(80),
  isDesignationVerified: z.boolean(),
  enrolmentNumber: z.string().trim().min(2).max(80),
  isEnrolmentVerified: z.boolean(),
  enrolmentDate: z.string().trim().max(50).optional(),
  stateBarCouncil: z.string().trim().min(2).max(120),
  isBarCouncilVerified: z.boolean(),
  officeLine1: z.string().trim().min(2).max(150),
  officeCity: z.string().trim().min(2).max(80),
  officeState: z.string().trim().min(2).max(80),
  officePincode: z.string().trim().min(4).max(10),
  isOfficeVerified: z.boolean(),
  phone: z.string().trim().min(5).max(30),
  isPhoneVerified: z.boolean(),
  email: z.string().trim().email().max(100),
  isEmailVerified: z.boolean(),
  enablePublicEnquiries: z.boolean(),
  enableWhatsAppChat: z.boolean(),
  whatsAppPhoneNumber: z.string().trim().max(20).optional().or(z.literal("")),
  whatsAppPrefilledText: z.string().trim().max(300).optional().or(z.literal("")),
});

export type SettingsInput = z.infer<typeof SettingsSchema>;
