import { ApiResponse } from "@/lib/apiResponse";
import { authOptions } from "@/lib/authOptions";
import { stripe } from "@/lib/stripe";
import { findPaymentByIntentId } from "@/modules/payment/paymentRepository";
import { getServerSession } from "next-auth";

// Confirm payment and create booking (WITH webhook)
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

    // 3. Retrieve Stripe session (just to get data)
    const stripeSession = await stripe.checkout.sessions.retrieve(sessionId);
    console.log(stripeSession);

    // 4. Verify payment was successful
    if (stripeSession.payment_status !== "paid") {
      return ApiResponse.error("Payment not completed", 400);
    }

    // 5. Verify user owns this session (security check)
    if (stripeSession.metadata.userId !== session.user.id) {
      return ApiResponse.unauthorized();
    }

    // 6. Check if booking EXISTS (created by webhook)
    const existingPayment = await findPaymentByIntentId(
      stripeSession.payment_intent,
    );

    if (!existingPayment) {
      // Webhook hasn't processed yet
      return ApiResponse.error(
        "Booking is being processed. Please refresh in a moment.",
        202,
      );
    }
    // 5. Return existing data (NO creation!)
    return ApiResponse.success(
      {
        bookingId: existingPayment.bookingId.toString(),
        trackingId: existingPayment.trackingId,
        paymentMethod: stripeSession.payment_method_types[0] || "card",
        stripePaymentIntentId: stripeSession.payment_intent,
        ...stripeSession.metadata,
      },
      "Payment confirmed successfully",
    );
  } catch (error) {
    return ApiResponse.error(error.message);
  }
}

// Confirm payment and create booking (WITHOUT webhook)
// export async function POST(request) {
//   try {
//     //1. Check authentication
//     const session = await getServerSession(authOptions);
//     if (!session) return ApiResponse.unauthorized();

//     // 2. Get session ID from request
//     const { sessionId } = await request.json();
//     if (!sessionId || typeof sessionId !== "string") {
//       return ApiResponse.badRequest("Session Id is required");
//     }

//     // 3. Confirm payment and create booking(call payment service)
//     const result = await confirmPaymentWithoutWebhook(
//       sessionId,
//       session.user.id,
//     );

//     // 4. Handle result
//     if (!result.success) {
//       return ApiResponse.error(result.message, 400);
//     }

//     // 5. Return success response
//     return ApiResponse.success(result.data, result.message);
//     // 5. Return success response
//   } catch (error) {
//     return ApiResponse.error(error.message);
//   }
// }
