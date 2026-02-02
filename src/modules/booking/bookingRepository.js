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
    status: "pending",
    updatedAt: new Date(),
  };
  return await bookingCollection().insertOne(booking);
};

// ==========================================
// Update Booking with Stripe Session ID
// ==========================================

// ==========================================
// Update Booking Status to Confirmed
// ==========================================

// ==========================================
// Get Booking by ID
// ==========================================

// ==========================================
// Get Booking by Stripe Session ID
// ==========================================
