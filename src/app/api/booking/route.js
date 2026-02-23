import { ApiResponse } from "@/lib/apiResponse";
import authenticate from "@/lib/authenticate";
import { getAllBookings } from "@/modules/booking/bookingService";

export async function GET(req) {
  try {
    const auth = await authenticate(req);
    if (!auth) return ApiResponse.unauthorized("Authentication required");
    const { user } = auth;
    let serviceResponse;

    //get the queries from the url
    const { searchParams } = new URL(req.url);
    const search = searchParams.get("search");
    const sortby = searchParams.get("sortby");
    const status = searchParams.get("status");
    const duration = searchParams.get("duration");
    const caregiver = searchParams.get("caregiver");
    const division = searchParams.get("division");
    const filterObject = {
      search,
      sortby,
      status,
      duration,
      caregiver,
      division,
    };

    if (user?.role === "admin") {
      serviceResponse = await getAllBookings(null, filterObject);
    } else if (user?.role === "user") {
      serviceResponse = await getAllBookings(user?.email, filterObject);
    } else {
      return ApiResponse.unauthorized("Invalid user role");
    }

    //error handling
    if (!serviceResponse.success) {
      return ApiResponse.error(serviceResponse.error, 400);
    }
    const { bookings } = serviceResponse;
    return ApiResponse.success(bookings, "All bookings fetched successfully");
  } catch (error) {
    return ApiResponse.error(
      "Failed to fetch payment stats",
      500,
      error.message,
    );
  }
}
