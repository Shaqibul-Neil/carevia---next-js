import {
  createConfirmedBooking,
  findBookingByEmail,
} from "./bookingRepository";

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
export const getAllBookings = async (email, filterObject) => {
  try {
    const { bookings } = await findBookingByEmail(email, filterObject);
    return {
      success: true,
      bookings: bookings.map((booking) => ({
        ...booking,
        _id: booking._id.toString(),
      })),
    };
  } catch (error) {
    return {
      success: false,
      error: error.message || "Failed to fetch bookings",
      bookings: [],
    };
  }
};
