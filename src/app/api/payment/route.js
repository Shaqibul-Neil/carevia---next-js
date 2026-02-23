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

    //get the queries from the url
    const { searchParams } = new URL(req.url);
    const search = searchParams.get("search");
    const sortby = searchParams.get("sortby");
    const status = searchParams.get("status");
    const method = searchParams.get("method");
    const page = searchParams.get("page");
    const limit = searchParams.get("limit");
    const filterObject = { search, sortby, status, method, page, limit };

    //check role
    if (user.role === "admin") {
      paymentData = await getAllPayments(null, filterObject);
    } else if (user.role === "user") {
      const email = user.email;
      paymentData = await getAllPayments(email, filterObject);
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
