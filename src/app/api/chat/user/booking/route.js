import { ApiResponse } from "@/lib/apiResponse";
import authenticate from "@/lib/authenticate";
import { findUserByBooking } from "@/modules/user/userRepository";

export async function GET(req) {
  try {
    //Single Line authentication
    const auth = await authenticate(req);
    if (!auth) {
      return ApiResponse.unauthorized("Authentication required");
    }
    const { user } = auth;
    console.log(user);
    if (user.role !== "admin")
      return ApiResponse.unauthorized("Authentication required");

    const userData = await findUserByBooking();
    return ApiResponse.success(userData, "User data fetched successfully");
    return;
  } catch (error) {
    return ApiResponse.error("Failed to fetch user data", 500, error.message);
  }
}
