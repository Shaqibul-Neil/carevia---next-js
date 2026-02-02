import { ApiResponse } from "@/lib/apiResponse";
import { collections, dbConnect } from "@/lib/dbConnect";
import { ObjectId } from "mongodb";

const bookingCollection = () => dbConnect(collections.BOOKINGS);
// ==========================================
// Create Pending Booking
// ==========================================
export const createPendingBooking = async (bookingData) => {
  const booking = {
    ...bookingData,
    serviceId: new ObjectId(bookingData._id),
    createdAt: new Date(),
    bookingStatus: "pending",
    updatedAt: new Date(),
  };
  return await bookingCollection().insertOne(booking);
};

// ==========================================
// Update Booking with Stripe Session ID
// ==========================================
export const updateBookingWithStripeSession = (bookingId, sessionId) => {
  return bookingCollection().updateOne(
    { _id: new ObjectId(bookingId) },
    { $set: { stripeSessionId: sessionId, updatedAt: new Date() } },
  );
};

// ==========================================
// Confirm booking (update booking status to confirmed)
// ==========================================

// ==========================================
// Update booking with payment info
// ==========================================

// ==========================================
// Find Booking by ID
// ==========================================

// ==========================================
// Find Booking by Stripe Session ID
// ==========================================

// ==========================================
// Find bookings by user ID
// ==========================================
