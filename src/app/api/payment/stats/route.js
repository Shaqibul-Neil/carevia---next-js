import { ApiResponse } from "@/lib/apiResponse";
import authenticate from "@/lib/authenticate";

import { getPaymentMetricsTrends } from "@/modules/payment/paymentService";

export async function GET(req) {
  try {
    const auth = await authenticate();
    if (!auth) {
      return ApiResponse.unauthorized("Authentication required");
    }
    const { user } = auth;
    let serviceResponse;
    if (user?.role === "admin") {
      serviceResponse = await getPaymentMetricsTrends();
    } else if (user?.role === "user") {
      serviceResponse = await getPaymentMetricsTrends(user?.email);
    }
    //error handling
    if (!serviceResponse.success) {
      return ApiResponse.error(serviceResponse.error, 400);
    }

    const { data } = serviceResponse;

    return ApiResponse.success(data, "Payment stats fetched successfully");
  } catch (error) {
    return ApiResponse.error(
      "Failed to fetch payment stats",
      500,
      error.message,
    );
  }
}
