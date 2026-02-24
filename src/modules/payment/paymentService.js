import { calculateGrowth } from "@/lib/utils";
import {
  createPaymentAggregation,
  findPaymentByEmail,
  getMonthlyPaymentStats,
} from "./paymentRepository";

//Get all payments
export const getAllPayments = async (email = null, filterObject) => {
  try {
    const { payments, totalPages, totalItems, currentPage } =
      await findPaymentByEmail(email, filterObject);
    return {
      success: true,
      payments: payments.map((payment) => ({
        ...payment,
        _id: payment._id.toString(),
      })),
      totalPages,
      totalItems,
      currentPage,
    };
  } catch (error) {
    //console.error("[getAllPayments] Error:", error.message);
    return {
      success: false,
      error: error.message || "Failed to fetch payments",
      payments: [],
    };
  }
};

//Get payments stats with Monthly Trends/Metrics
export const getPaymentMetricsTrends = async (email = null) => {
  try {
    const [allTime, monthlyData] = await Promise.all([
      createPaymentAggregation(email),
      getMonthlyPaymentStats(email),
    ]);
    const { current, previous } = monthlyData;

    const metrics = [
      {
        _id: "total-price",
        label: "Total Price",
        value: `${allTime.totalPrice.toFixed(2)}`,
        ...calculateGrowth(previous.totalPrice, current.totalPrice),
      },
      {
        _id: "amount-Paid",
        label: "Paid Amount",
        value: `${allTime.amountPaid.toFixed(2)}`,
        ...calculateGrowth(previous.amountPaid, current.amountPaid),
      },
      {
        _id: "due-amount",
        label: "Due Amount",
        value: `${allTime.dueAmount.toFixed(2)}`,
        ...calculateGrowth(previous.dueAmount, current.dueAmount),
      },
      {
        _id: "transactions",
        label: "Transactions",
        value: allTime.totalTransaction,
        ...calculateGrowth(previous.totalTransaction, current.totalTransaction),
      },
    ];
    return {
      success: true,
      data: metrics,
    };
  } catch (error) {
    return {
      success: false,
      error: error.message || "Failed to fetch payment stats",
    };
  }
};
