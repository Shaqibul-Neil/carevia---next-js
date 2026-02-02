import { bookingFormSchema } from "@/lib/formSchema";
import { createPendingBooking } from "./bookingRepository";
import { success } from "zod";

// ==========================================
// Validate booking data
// ==========================================
export const validateBookingData = async (payload) => {
  const parsed = bookingFormSchema.safeParse(payload);
  if (!parsed.success) {
    // Format errors for frontend
    const errors = parsed.errors.issues.map((issue) => ({
      field: issue.path.join("."),
      message: issue.message,
    }));
    return {
      success: false,
      message: "Validation failed",
      errors,
    };
  }
  return { success: true, data: parsed.data };
};

// ==========================================
// Create new Booking
// ==========================================
export const createBooking = async (bookingData) => {
  try {
    //validate data
    const validation = await validateBookingData(bookingData);
    if (!validation.success) {
      return validation;
    }
    //create pending booking
    const result = await createPendingBooking(bookingData);
    return { success: true, bookingId: result.insertedId.toString() };
  } catch (error) {
    console.error("[createBooking] Error:", error.message);
    return {
      success: false,
      message: error.message || "Failed to create booking",
    };
  }
};

// ==========================================
// Update booking with Stripe session
// ==========================================

// ==========================================
// Confirm booking (after payment)
// ==========================================

// ==========================================
// Get booking details
// ==========================================

// ==========================================
// Get user bookings
// ==========================================
