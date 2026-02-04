import { ObjectId } from "mongodb";

import { collections, dbConnect } from "@/lib/dbConnect";

const paymentCollection = () => dbConnect(collections.PAYMENTS);

// ==========================================
// Create Payment Record
// ==========================================
export const createPaymentRecord = async (paymentData) => {
  const payment = {
    bookingId: new ObjectId(paymentData.bookingId),
    userId: new ObjectId(paymentData.userId),
    serviceId: new ObjectId(paymentData.serviceId),
    userEmail: paymentData.userEmail,
    trackingId: paymentData.trackingId,
    serviceName: paymentData.serviceName,
    stripePaymentIntentId: paymentData.stripePaymentIntentId,
    paymentOption: paymentData.paymentOption,
    paymentMethod: paymentData.paymentMethod,
    totalPrice: paymentData.totalPrice,
    amountPaid: paymentData.amountPaid,
    dueAmount: paymentData.dueAmount,
    createdAt: new Date(),
    updatedAt: new Date(),
  };
  return await paymentCollection().insertOne(payment);
};
// ==========================================
// Find Payment by Payment Intent ID
// ==========================================
export const findPaymentByIntentId = async (paymentIntentId) => {
  return await paymentCollection().findOne({
    stripePaymentIntentId: paymentIntentId,
  });
};
// ==========================================
// Find Payments by User ID
// ==========================================
