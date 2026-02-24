import { calculateGrowth } from "@/lib/utils";
import {
  createBookingAggregation,
  createConfirmedBooking,
  findBookingByEmail,
  getMonthlyBookingStats,
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
    const { bookings, totalPages, totalItems, currentPage } =
      await findBookingByEmail(email, filterObject);
    return {
      success: true,
      bookings: bookings.map((booking) => ({
        ...booking,
        _id: booking._id.toString(),
      })),
      totalPages,
      totalItems,
      currentPage,
    };
  } catch (error) {
    return {
      success: false,
      error: error.message || "Failed to fetch bookings",
      bookings: [],
    };
  }
};

//Get booking stats with Monthly Trends/Metrics
export const getBookingMetricsTrends = async (email = null) => {
  try {
    const [allTime, monthlyData] = await Promise.all([
      createBookingAggregation(email),
      getMonthlyBookingStats(email),
    ]);
    const { current, previous } = monthlyData;
    const metrics = [
      {
        _id: "total-bookings",
        label: "Total Bookings",
        value: allTime.totalBookings,
        ...calculateGrowth(previous.totalBookings, current.totalBookings),
      },
      {
        _id: "confirmed",
        label: "Confirmed",
        value: allTime.confirmed,
        ...calculateGrowth(previous.confirmed, current.confirmed),
      },
      {
        _id: "cancelled",
        label: "Cancelled",
        value: allTime.cancelled,
        ...calculateGrowth(previous.cancelled, current.cancelled),
      },
    ];
    return {
      success: true,
      data: metrics,
    };
  } catch (error) {
    return {
      success: false,
      error: error.message || "Failed to fetch payment stats",
    };
  }
};
