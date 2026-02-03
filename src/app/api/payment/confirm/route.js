import { ApiResponse } from "@/lib/apiResponse";
import { authOptions } from "@/lib/authOptions";
import { getServerSession } from "next-auth";

// Confirm payment and create booking (WITHOUT webhook)
export async function POST(request) {
  try {
    //1. Check authentication
    const session = await getServerSession(authOptions);
    if (!session) return ApiResponse.unauthorized();

    // 2. Get session ID from request
    const { sessionId } = await request.json();
    console.log("sessionId from confirm route", sessionId);
    if (!sessionId || typeof sessionId !== "string") {
      return ApiResponse.badRequest("Session Id is required");
    }

    // 3. Confirm payment and create booking(call payment service)

    // 4. Handle result

    // 5. Return success response
  } catch (error) {
    return ApiResponse.error(error.message);
  }
}
