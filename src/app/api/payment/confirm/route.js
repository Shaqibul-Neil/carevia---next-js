import { ApiResponse } from "@/lib/apiResponse";
import { authOptions } from "@/lib/authOptions";
import { sendEmail } from "@/lib/emailSender";
import { generatePaymentReceiptEmail } from "@/lib/emailTemplate";
import { stripe } from "@/lib/stripe";
import { createConfirmedBooking } from "@/modules/booking/bookingRepository";
import {
  createPaymentRecord,
  findPaymentByIntentId,
} from "@/modules/payment/paymentRepository";
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

    if (existingPayment) {
      console.log(".........payment exist check------");
      // Webhook already did the job! Return data.
      return ApiResponse.success(
        {
          trackingId: existingPayment.trackingId,
          stripePaymentIntentId: existingPayment.stripePaymentIntentId,
          ...stripeSession.metadata,
          paymentMethod: existingPayment.paymentMethod,
        },
        "Payment confirmed successfully",
      );
    }
    // ===============================================
    // FALLBACK: Webhook didn't run yet?
    // ===============================================
    console.log(
      "⚠️ Webhook delay detected. Creating booking manually from client confirmation.",
    );
    const metadata = stripeSession.metadata;
    //7. Create booking manually
    const bookingData = {
      ...metadata,
      stripePaymentIntentId: stripeSession.payment_intent,
    };

    const result = await createConfirmedBooking(bookingData);
    //Step 8 : Create payment record
    const paymentData = {
      bookingId: result.insertedId.toString(),
      userId: metadata.userId,
      userEmail: metadata.userEmail,
      userName: metadata.userName,
      serviceName: metadata.serviceName,
      serviceId: metadata.serviceId,
      trackingId: result.trackingId,
      stripePaymentIntentId: stripeSession.payment_intent,
      paymentOption: metadata.paymentOption,
      paymentMethod: stripeSession.payment_method_types[0] || "card",
      totalPrice: metadata.totalPrice,
      amountPaid: metadata.amountPaid,
      dueAmount: metadata.dueAmount,
    };
    await createPaymentRecord(paymentData);

    // 8. Send Email (Because Webhook might have missed it)
    try {
      const emailData = {
        userName: metadata.userName,
        serviceName: metadata.serviceName,
        bookingDate: metadata.bookingDate,
        slot: metadata.slot || "N/A",
        trackingId: result.trackingId,
        totalPrice: metadata.totalPrice,
        amountPaid: metadata.amountPaid,
        dueAmount: metadata.dueAmount,
        transactionId: stripeSession.payment_intent,
      };
      const emailHtml = generatePaymentReceiptEmail(emailData);
      await sendEmail(
        metadata.userEmail,
        `Booking Confirmed! - ${metadata.serviceName} Receipt`,
        emailHtml,
      );
      console.log(`📧 Receipt sent manually to ${metadata.userEmail}`);
    } catch (emailError) {
      console.error("⚠️ Manual email sending failed:", emailError);
    }

    // 9. Return Success
    return ApiResponse.success(
      {
        trackingId: result.trackingId,
        stripePaymentIntentId: stripeSession.payment_intent,
        ...metadata,
        paymentMethod: paymentData.paymentMethod,
      },
      "Payment confirmed manually",
    );
  } catch (error) {
    console.error("Payment Confirmation Error:", error);
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
