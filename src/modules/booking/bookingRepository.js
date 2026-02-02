import { collections, dbConnect } from "@/lib/dbConnect";
import { ObjectId } from "mongodb";

const bookingCollection = () => dbConnect(collections.BOOKINGS);

// ==========================================
// Create Confirmed Booking (after payment)
// ==========================================
export const createConfirmedBooking = async (bookingData) => {
  const booking = {
    userId: new ObjectId(bookingData.userId),
    serviceId: new ObjectId(bookingData.serviceId),
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
    amountPaid: parseFloat(bookingData.amountToPay),
    dueAmount: parseFloat(bookingData.dueAmount),
    status: "confirmed",
    stripeSessionId: bookingData.stripeSessionId,
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  return await bookingCollection().insertOne(booking);
};

// ==========================================
// Find Booking by Stripe Session ID
// ==========================================

// ==========================================
// Find bookings by user ID
// ==========================================
