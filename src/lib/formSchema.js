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

/* ---------------- Booking Form  Schema ---------------- */
export const bookingFormSchema = z.object({
  bookingDate: z.coerce.date({
    required_error: "Please select a booking date",
  }),
  slot: z
    .string({ required_error: "Please select a start time" })
    .min(1, "Time slot is required"),
  durationType: z.string().min(1, "Please select a duration type"),
  quantity: z.coerce
    .number({ required_error: "Please enter quantity" })
    .min(1, "Quantity must be at least 1"),
  division: z.string().min(1, "Please select your division"),
  district: z.string().min(1, "Please select your district"),
  address: z.string().min(8, "Please enter detailed address"),
  paymentOption: z.enum(["half", "full"]),
});

/* ---------------- Booking Form  Schema ---------------- */
export const reviewFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  rating: z.string().min(1, "Please select a rating"),
  title: z.string().min(5, "Title must be at least 5 characters"),
  review: z.string().min(50, "Review must be at least 50 characters"),
  terms: z.boolean().refine((val) => val === true, {
    message: "You must confirm that you have used this service",
  }),
});
