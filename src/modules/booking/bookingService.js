import { createConfirmedBooking } from "./bookingRepository";

// ==========================================
// Create confirmed booking (called from webhook)
// ==========================================
export const createBookingFromWebhook = async (metadata, stripeSessionId) => {
  try {
    const bookingData = { ...metadata, stripeSessionId };
    const result = await createConfirmedBooking(bookingData);
    return { success: true, bookingId: result.insertedId.toString() };
  } catch (error) {
    //console.error("[createBookingFromWebhook] Error:", error.message);
    return {
      success: false,
      message: error.message || "Failed to create booking",
    };
  }
};

// ==========================================
// Confirm booking (after payment)
// ==========================================

// ==========================================
// Get booking details
// ==========================================

// ==========================================
// Get user bookings
// ==========================================
