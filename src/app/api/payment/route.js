import { ApiResponse } from "@/lib/apiResponse";
import authenticate from "@/lib/authenticate";
import { getAllPayments } from "@/modules/payment/paymentService";

//get all payments
export async function GET(req) {
  try {
    //Single Line authentication
    const auth = await authenticate(req);
    if (!auth) {
      return ApiResponse.unauthorized("Authentication required");
    }
    const { user, authMethod } = auth;
    //  Fetch payments based on role
    let paymentData = { success: false, payments: [] };

    //check role
    if (user.role === "admin") {
      paymentData = await getAllPayments();
    } else if (user.role === "user") {
      const email = user.email;
      paymentData = await getAllPayments(email);
    } else {
      return ApiResponse.unauthorized("Invalid user role");
    }
    // // STEP 4: Return data &  Remove 'success' property
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
