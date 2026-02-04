import { ApiResponse } from "@/lib/apiResponse";
import { authOptions } from "@/lib/authOptions";
import { confirmPaymentWithoutWebhook } from "@/modules/payment/paymentService";
import { getServerSession } from "next-auth";

// Confirm payment and create booking (WITHOUT webhook)
export async function POST(request) {
  try {
    //1. Check authentication
    const session = await getServerSession(authOptions);
    if (!session) return ApiResponse.unauthorized();

    // 2. Get session ID from request
    const { sessionId } = await request.json();
    if (!sessionId || typeof sessionId !== "string") {
      return ApiResponse.badRequest("Session Id is required");
    }

    // 3. Confirm payment and create booking(call payment service)
    const result = await confirmPaymentWithoutWebhook(
      sessionId,
      session.user.id,
    );

    // 4. Handle result
    if (!result.success) {
      return ApiResponse.error(result.message, 400);
    }

    // 5. Return success response
    return ApiResponse.success(result.data, result.message);
    // 5. Return success response
  } catch (error) {
    return ApiResponse.error(error.message);
  }
}
