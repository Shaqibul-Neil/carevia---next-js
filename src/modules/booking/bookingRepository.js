import { ObjectId } from "mongodb";
import { collections, dbConnect } from "@/lib/dbConnect";
import { dateComparison } from "@/lib/utils";
import { previousDay } from "date-fns";

const bookingCollection = () => dbConnect(collections.BOOKINGS);

const groupBookings = {
  _id: null,
  totalBookings: { $sum: 1 },
  confirmed: {
    $sum: { $cond: [{ $eq: ["$status", "confirmed"] }, 1, 0] },
  },
  cancelled: {
    $sum: { $cond: [{ $eq: ["$status", "cancelled"] }, 1, 0] },
  },
};
const defaultStats = { totalBookings: 0, confirmed: 0, cancelled: 0 };

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
    userEmail: bookingData.userEmail,
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
    status: "booked",
    caregiver: {
      assigned: false,
      id: null,
      name: null,
      email: null,
      assignedAt: null,
      phone: null,
    },
    serviceFlow: {
      assignedAt: null,
      startedAt: null,
      completedAt: null,
    },
    userFeedback: null,
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
// Find bookings by user id
// ==========================================
export const findBookingByEmail = async (email = null, filterObject) => {
  const { search, sortby, status, duration, caregiver, division, limit, page } =
    filterObject;
  let query = {};
  if (email) query.userEmail = email;
  if (search && search.trim()) {
    query.$or = [
      { trackingId: { $regex: search, $options: "i" } },
      { userEmail: { $regex: search, $options: "i" } },
      { serviceName: { $regex: search, $options: "i" } },
    ];
  }
  let sortOptions = {};
  //sorting
  if (sortby && sortby !== "all") {
    const [fieldName, direction] = sortby.split("-");
    if (direction === "desc") {
      sortOptions[fieldName] = -1;
    } else sortOptions[fieldName] = 1;
  }
  //filter - on status
  if (status && status !== "all") {
    if (status === "booked") {
      query.status = status;
    } else if (status === "confirmed") {
      query.status = status;
    } else if (status === "cancelled") {
      query.status = status;
    }
  }
  //filter - on duration
  if (duration && duration !== "all") {
    query.durationType = duration;
  }
  //filter - on caregiver
  if (caregiver && caregiver !== "all") {
    if (caregiver === "assigned") {
      query["caregiver.assigned"] = true;
    } else {
      query["caregiver.assigned"] = false;
    }
  }
  //filter - on division
  if (division && division !== "all") {
    query.division = division;
  }

  //pagination
  const totalItems = await bookingCollection().countDocuments(query);
  const totalPages = Math.ceil(totalItems / Number(limit));
  const currentPage = Number(page);

  const bookings = await bookingCollection()
    .find(query)
    .skip((currentPage - 1) * Number(limit))
    .limit(Number(limit))
    .sort(sortOptions)
    .toArray();
  return { bookings, totalPages, totalItems, currentPage };
};

// ==========================================
// Booking Aggregation All Time Stats
// ==========================================
export const createBookingAggregation = async (email = null) => {
  let query = {};
  if (email) query.userEmail = email;
  const data = await bookingCollection()
    .aggregate([
      { $match: query },
      {
        $group: groupBookings,
      },

      { $project: { _id: 0 } },
    ])
    .toArray();
  return data.length > 0 ? data[0] : defaultStats;
};

// ==========================================
// Get Monthly Comparison Stats
// ==========================================
export const getMonthlyBookingStats = async (email = null) => {
  console.log("🔍 Function Called with email:", email);
  const { startOfCurrentMonth, startOfLastMonth, endOfLastMonth } =
    await dateComparison();
  const matchEmail = email ? { userEmail: email } : {};
  const stats = await bookingCollection()
    .aggregate([
      { $match: matchEmail },
      {
        $facet: {
          currentMonth: [
            { $match: { updatedAt: { $gte: startOfCurrentMonth } } },
            { $group: groupBookings },
          ],
          previousMonth: [
            {
              $match: {
                updatedAt: { $gte: startOfLastMonth, $lte: endOfLastMonth },
              },
            },
            { $group: groupBookings },
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
