import { z } from "zod";

export const SUBJECT_OPTIONS = [
  { value: "Course Enquiry", label: "Course Enquiry" },
  { value: "Placement", label: "Placement" },
  { value: "Demo Class", label: "Demo Class" },
  { value: "Scholarship", label: "Scholarship" },
  { value: "General Enquiry", label: "General Enquiry" },
];

export const getInTouchSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Please enter your full name"),
  email: z
    .string()
    .trim()
    .min(1, "Email is required")
    .email("Enter a valid email address"),
  mobileNumber: z
    .string()
    .trim()
    .regex(/^\d{10}$/, "Mobile number must be exactly 10 digits"),
  subject: z
    .string()
    .min(1, "Please select a subject"),
  message: z
    .string()
    .trim()
    .min(20, "Message must be at least 20 characters"),
});

export const getInTouchDefaultValues = {
  name: "",
  email: "",
  mobileNumber: "",
  subject: "",
  message: "",
};
