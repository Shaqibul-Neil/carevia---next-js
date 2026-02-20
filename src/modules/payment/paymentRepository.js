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
  const { search, sortby, status, method, page, limit } = filterObject;
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

  //pagination logic
  const totalItems = await paymentCollection().countDocuments(query);
  const totalPages = Math.ceil(totalItems / Number(limit));
  const currentPage = Number(page);

  const payments = await paymentCollection()
    .find(query)
    .skip((currentPage - 1) * Number(limit))
    .limit(Number(limit))
    .sort(sortOptions)
    .toArray();
  return { payments, totalPages, totalItems, currentPage };
};

// ==========================================
// Payments Aggregation
// ==========================================
export const createPaymentAggregation = async (email = null) => {
  let query = {};
  if (email) {
    query.userEmail = email;
  }
  const data = await paymentCollection()
    .aggregate([
      { $match: query },
      {
        $group: {
          _id: null,
          totalTransaction: { $sum: 1 || 0 },
          totalPrice: { $sum: "$totalPrice" || 0 },
          amountPaid: { $sum: "$amountPaid" || 0 },
          dueAmount: { $sum: "$dueAmount" || 0 },
        },
      },
      { $project: { _id: 0 } },
    ])
    .toArray();

  //if no data then return default 0
  const defaultStats = {
    totalTransaction: 0,
    totalPrice: 0,
    amountPaid: 0,
    dueAmount: 0,
  };
  return data.length > 0 ? data[0] : defaultStats;
};
