import { ApiResponse } from "@/lib/apiResponse";
import authenticate from "@/lib/authenticate";
import { getBookingMetricsTrends } from "@/modules/booking/bookingService";

export async function GET(req) {
  try {
    const auth = await authenticate(req);
    if (!auth) return ApiResponse.unauthorized("Authentication required");

    const { user } = auth;
    if (!user) return ApiResponse.unauthorized("Authentication required");

    //  Fetch payments based on role
    let serviceResponse;

    if (user?.role === "admin") {
      serviceResponse = await getBookingMetricsTrends();
    } else if (user?.role === "user") {
      serviceResponse = await getBookingMetricsTrends(user?.email);
    }
    //error handling
    if (!serviceResponse.success) {
      return ApiResponse.error(serviceResponse.error, 400);
    }
    const { data } = serviceResponse;

    return ApiResponse.success(data, "Booking stats fetched successfully");
  } catch (error) {
    return ApiResponse.error(
      "Failed to fetch booking stats",
      500,
      error.message,
    );
  }
}
