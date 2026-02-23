import { ObjectId } from "mongodb";

import { collections, dbConnect } from "@/lib/dbConnect";

const paymentCollection = () => dbConnect(collections.PAYMENTS);

const groupPayments = {
  _id: null,
  totalTransaction: { $sum: 1 },
  totalPrice: { $sum: "$totalPrice" },
  amountPaid: { $sum: "$amountPaid" },
  dueAmount: { $sum: "$dueAmount" },
};

const defaultStats = {
  totalTransaction: 0,
  totalPrice: 0,
  amountPaid: 0,
  dueAmount: 0,
};

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
// Find Payments by User Email
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
    if (direction === "desc") {
      sortOptions[fieldName] = -1;
    } else {
      sortOptions[fieldName] = 1;
    } //sortOptions["createdAt"]
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
// Payments Aggregation All Time Stats
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
        $group: groupPayments,
      },
      { $project: { _id: 0 } },
    ])
    .toArray();

  return data.length > 0 ? data[0] : defaultStats;
};

// ==========================================
// Get Monthly Comparison Stats
// ==========================================
export const getMonthlyComparisonStats = async (email = null) => {
  const now = new Date();
  //get the timestamp of this month
  const startOfCurrentMonth = new Date(now.getFullYear(), now.getMonth(), 1);
  //get the last months timestamp
  const startOfLastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);
  //get the last day of last month
  const endOfLastMonth = new Date(
    now.getFullYear(),
    now.getMonth(),
    0,
    23,
    59,
    59,
  );
  const matchEmail = email ? { userEmail: email } : {};
  const stats = await paymentCollection()
    .aggregate([
      { $match: matchEmail },
      {
        $facet: {
          currentMonth: [
            { $match: { updatedAt: { $gte: startOfCurrentMonth } } },
            { $group: groupPayments },
          ],
          previousMonth: [
            {
              $match: {
                updatedAt: { $gte: startOfLastMonth, $lte: endOfLastMonth },
              },
            },
            { $group: groupPayments },
          ],
        },
      },
    ])
    .toArray();
  return {
    current: stats[0].currentMonth[0] || defaultStats,
    previous: stats[0].previousMonth[0] || defaultStats,
  };
};
