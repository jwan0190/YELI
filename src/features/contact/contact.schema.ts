import { z } from "zod";
import contactContent from "../../assets/strings/contact.json";

const TYPES = contactContent.form.inquiryTypes as unknown as readonly [string, ...string[]];

export const INQUIRY_TYPES = TYPES;

export const inquirySchema = z.object({
  yourName: z.string().trim().min(1, contactContent.form.errors.yourNameRequired),
  partnerName: z.string().trim().optional(),
  email: z.string().trim().email(contactContent.form.errors.emailInvalid),
  date: z.string().trim().optional(),
  type: z.enum(TYPES),
  location: z.string().trim().optional(),
  message: z.string().trim().optional(),
});

export type InquiryForm = z.infer<typeof inquirySchema>;
