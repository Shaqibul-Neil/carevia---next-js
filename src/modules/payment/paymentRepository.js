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
    userName: paymentData.userName,
    trackingId: paymentData.trackingId,
    serviceName: paymentData.serviceName,
    stripePaymentIntentId: paymentData.stripePaymentIntentId,
    paymentOption: paymentData.paymentOption,
    paymentMethod: paymentData.paymentMethod,
    totalPrice: Number(paymentData.totalPrice),
    amountPaid: Number(paymentData.amountPaid),
    dueAmount: Number(paymentData.dueAmount),
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
export const findPaymentByEmail = async (email, filterObject) => {
  const { search, sortby, status, method } = filterObject;
  const query = {};
  if (email) query.userEmail = email;
  if (search && search.trim()) {
    query.$or = [
      { trackingId: { $regex: search, $options: "i" } },
      { userName: { $regex: search, $options: "i" } },
      { userEmail: { $regex: search, $options: "i" } },
      { serviceName: { $regex: search, $options: "i" } },
    ];
  }
  let sortOptions = {};
  if (sortby && sortby !== "all") {
    //break down the sort field like 'createdAt-desc' should be createdAt(mongodb property) and desc
    const [fieldName, direction] = sortby.split("-");
    sortOptions[fieldName] = direction === "desc" ? -1 : 1;
  }
  if (status && status !== "all") {
    if (status === "paid") {
      query.dueAmount = 0;
    } else if (status === "due") {
      query.dueAmount = { $gt: 0 };
    }
  }
  if (method && method !== "all") {
    method === "card"
      ? (query.paymentMethod = "card")
      : (query.paymentMethod = "cash");
  }

  console.log(query);
  return await paymentCollection().find(query).sort(sortOptions).toArray();
};
