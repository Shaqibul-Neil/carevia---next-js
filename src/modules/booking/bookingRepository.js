import { ObjectId } from "mongodb";
import { collections, dbConnect } from "@/lib/dbConnect";

const bookingCollection = () => dbConnect(collections.BOOKINGS);

// ==========================================
// Create Confirmed Booking (after payment)
// ==========================================
export const createConfirmedBooking = async (bookingData) => {
  // Generate booking tracking ID
  const bookingId = new ObjectId();
  const trackingId = `CV${bookingId.toString().slice(-6).toUpperCase()}`;
  const booking = {
    _id: bookingId,
    userId: new ObjectId(bookingData.userId),
    serviceId: new ObjectId(bookingData.serviceId),
    trackingId: trackingId,
    serviceName: bookingData.serviceName,
    serviceImage: bookingData.serviceImage,
    date: new Date(bookingData.bookingDate),
    durationType: bookingData.durationType,
    quantity: Number(bookingData.quantity),
    division: bookingData.division,
    district: bookingData.district,
    address: bookingData.address,
    paymentOption: bookingData.paymentOption,
    totalPrice: parseFloat(bookingData.totalPrice),
    amountPaid: parseFloat(bookingData.amountPaid),
    dueAmount: parseFloat(bookingData.dueAmount),
    status: "confirmed",
    stripePaymentIntentId: bookingData.stripePaymentIntentId,
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  const result = await bookingCollection().insertOne(booking);

  // Return both insertedId and trackingId
  return {
    insertedId: result.insertedId,
    trackingId: trackingId,
  };
};

// ==========================================
// Find Booking by Stripe Session ID
// ==========================================

// ==========================================
// Find bookings by user ID
// ==========================================
