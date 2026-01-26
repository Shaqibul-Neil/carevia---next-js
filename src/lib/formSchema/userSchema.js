import * as z from "zod";

/* ---------------- Registration Form Schema ---------------- */
export const userRegistrationSchema = z.object({
  firstName: z
    .string()
    .trim()
    .min(3, "First name must be at least 3 characters"),

  lastName: z.string().trim().min(2, "Last name must be at least 2 characters"),

  email: z.email("Invalid email address").trim().toLowerCase(),

  password: z
    .string()
    .min(6, "Password must be at least 6 characters")
    .regex(/[A-Z]/, "Must contain at least one uppercase letter")
    .regex(/[a-z]/, "Must contain at least one lowercase letter")
    .regex(/[0-9]/, "Must contain at least one number")
    .regex(
      /[!@#$%^&*(),.?":{}|<>]/,
      "Must contain at least one special character",
    ),
  nid: z.string().trim().regex(/^\d+$/, "NID must be numeric"),
  phoneNumber: z
    .string()
    .trim()
    .regex(/^01[3-9]\d{8}$/, "Invalid phone number"),
  address: z.string().trim(),
  city: z.string().trim().min(1, "City is required"),
  postalCode: z.string().trim().optional(),
});

/* ---------------- Login Form Schema ---------------- */
export const loginFormSchema = z.object({
  email: z.email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});
