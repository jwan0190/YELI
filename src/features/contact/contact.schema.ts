import { z } from "zod";

export const INQUIRY_TYPES = ["Wedding", "Elopement", "Editorial event", "Other"] as const;

export const inquirySchema = z.object({
  yourName: z.string().trim().min(1, "Please share your name."),
  partnerName: z.string().trim().optional(),
  email: z.string().trim().email("Please enter a valid email."),
  date: z.string().trim().optional(),
  type: z.enum(INQUIRY_TYPES),
  location: z.string().trim().optional(),
  message: z.string().trim().optional(),
});

export type InquiryForm = z.infer<typeof inquirySchema>;
