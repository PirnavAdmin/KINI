// NOTE: registerSchema.js itself wasn't shared with me — this is a
// reconstruction based on what RegisterModal.jsx implies about validation
// (required name/email, 10-digit mobile, required qualification). Diff
// this against your real file and keep whatever rules already exist;
// the one change that actually matters is the key rename:
// `degreeDetails` -> `qualification`, to match the API request body.

import { z } from "zod";

export const registerSchema = z.object({
  name: z.string().trim().min(2, "Enter your full name"),
  email: z.string().trim().email("Enter a valid email address"),
  mobileNumber: z
    .string()
    .trim()
    .regex(/^\d{10}$/, "Enter a valid 10-digit mobile number"),
  qualification: z.string().trim().min(2, "Enter your degree details"),
});

export const registerDefaultValues = {
  name: "",
  email: "",
  mobileNumber: "",
  qualification: "",
};