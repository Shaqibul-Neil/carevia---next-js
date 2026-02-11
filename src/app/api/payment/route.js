import { ApiResponse } from "@/lib/apiResponse";
import { authOptions } from "@/lib/authOptions";
import { findPaymentByEmail } from "@/modules/payment/paymentRepository";
import { getAllPayments } from "@/modules/payment/paymentService";
import { getServerSession } from "next-auth";
import { success } from "zod";

//get all payments
export async function GET(req) {
  try {
    //1. get session information
    const session = await getServerSession(authOptions);
    if (!session) return ApiResponse.unauthorized();
    let paymentData = { success: false, payments: [] };

    //2.check role
    if (session.user.role === "admin") {
      paymentData = await getAllPayments();
    } else if (session.user.role === "user") {
      //3. get the email
      const email = session.user.email;
      paymentData = await getAllPayments(email);
    } else {
      return ApiResponse.unauthorized();
    }
    // 1. Remove 'success' property
    const { success, ...rest } = paymentData;

    return ApiResponse.success(rest, "Payment fetched successfully");
  } catch (error) {
    return ApiResponse.error(
      "Failed to fetch all payments",
      500,
      error.message,
    );
  }
}
