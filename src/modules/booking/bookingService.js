import { calculateGrowth } from "@/lib/utils";
import {
  createBookingAggregation,
  createConfirmedBooking,
  defaultStats,
  findBookingByEmail,
  getLastSevenDaysBookingStats,
  getMonthlyBookingStats,
  getUpcomingBooking,
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
    //common task
    const tasks = [
      createBookingAggregation(email),
      getMonthlyBookingStats(email),
    ];
    //now push promise according to role--> if email given then role is user
    if (email) {
      tasks.push(getUpcomingBooking(email));
    } else {
      tasks.push(getLastSevenDaysBookingStats());
    }

    //parallel execution
    const results = await Promise.allSettled(tasks);

    const allTime =
      results[0].status === "fulfilled" ? results[0].value : defaultStats;

    const monthlyData =
      results[1].status === "fulfilled" ? results[1].value : defaultStats;

    const conditionalData =
      results[2].status === "fulfilled" ? results[2].value : [];

    const { current, previous } = monthlyData;

    //metrics card
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

    const finalData = { metrics };
    if (email) {
      finalData.upcoming = conditionalData;
    } else {
      //chart data
      //creating an array with 0 booking for last 7days. we'll merge it with the db's last 7days data so that if there is 0 booking in any day of the last 7 days then it will just take 0 from this js logic
      const sevenDays = [];
      for (let i = 6; i >= 0; i--) {
        const date = new Date();
        date.setDate(date.getDate() - i);
        const formattedDate = date.toISOString().split("T")[0];
        sevenDays.push({ date: formattedDate, totalBookings: 0 });
      }
      //merging seven days data with db data. checking if db data's date(id) is similar to seven days date. if yes then replace the booking
      conditionalData.forEach((item) => {
        const day = sevenDays.find((d) => d.date === item._id);
        if (day) {
          day.totalBookings = item.totalBookings;
        }
      });
      finalData.trends = sevenDays;
    }
    return {
      success: true,
      data: finalData,
    };
  } catch (error) {
    return {
      success: false,
      error: error.message || "Failed to fetch payment stats",
    };
  }
};
