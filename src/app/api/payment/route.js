import { ApiResponse } from "@/lib/apiResponse";
import { authOptions } from "@/lib/authOptions";
import { verifyJWT } from "@/lib/verifyJWT";
import { getAllPayments } from "@/modules/payment/paymentService";
import { getServerSession } from "next-auth";

//get all payments
export async function GET(req) {
  try {
    //for cross app
    let userEmail = null;
    let userRole = null;
    let authMethod = null;

    // STEP 1: Try NextAuth session first (for same-origin)
    const session = await getServerSession(authOptions);
    if (session) {
      userEmail = session.user.email;
      userRole = session.user.role;
      authMethod = "NextAuth Session";
    } else {
      // STEP 2: Try JWT token (for cross-origin dashboard)
      const authHeader = req.headers.get("authorization");
      if (!authHeader) {
        //console.log("❌ No session and no auth header");
        return ApiResponse.unauthorized("Authentication required");
      }
      //  Note: verifyJWT is async when using jose
      const decoded = await verifyJWT(authHeader);
      if (!decoded) {
        //console.log("❌ Invalid JWT token");
        return ApiResponse.unauthorized("Invalid or expired token");
      }
      userEmail = decoded.email;
      userRole = decoded.role;
      authMethod = "JWT Token";
    }
    //console.log(`✅ Auth Method: ${authMethod}`);
    //console.log(`✅ User: ${userEmail}, Role: ${userRole}`);

    // STEP 3: Fetch payments based on role
    let paymentData = { success: false, payments: [] };

    //check role
    if (userRole === "admin") {
      paymentData = await getAllPayments();
      //console.log(`✅ Fetched ${paymentData.payments?.length || 0} payments (all)`);
    } else if (userRole === "user") {
      paymentData = await getAllPayments(userEmail);
      //console.log(`✅ Fetched ${paymentData.payments?.length || 0} payments for ${userEmail}`,);
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
