// ==========================================
// Confirm Payment (WITHOUT Webhook)
// ==========================================
// ⚠️ WARNING: This approach is NOT production-safe!
// Why risky:
// 1. Client can manipulate the confirmation call
// 2. Network failure after payment but before DB update = lost booking
// 3. No retry mechanism if DB write fails
// 4. Race conditions possible
//
// When acceptable:
// - Local testing / development
// - MVP / demo purposes
// - Non-critical flows
//
// ALWAYS use webhook approach for production!

import { ApiResponse } from "@/lib/apiResponse";
import { authOptions } from "@/lib/authOptions";
import { getServerSession } from "next-auth";
import { findPaymentByEmail } from "./paymentRepository";

//Notes: Always return response as a general object because it is not an api route. do not use apiResponse here Otherwise it will become Response object
// import { stripe } from "@/lib/stripe";
// import {
//   createPaymentRecord,
//   findPaymentByIntentId,
// } from "./paymentRepository";
// import { createConfirmedBooking } from "../booking/bookingRepository";

// ==========================================
// export const confirmPaymentWithoutWebhook = async (sessionId, userId) => {
//   try {
//     // 1. Retrieve the checkout session from Stripe
//     const session = await stripe.checkout.sessions.retrieve(sessionId);

//     // 2. Verify payment was actually successful
//     if (session.payment_status !== "paid") {
//       return {
//         success: false,
//         message: "Payment not completed",
//       };
//     }

//     // 3. Check if payment already processed (prevent duplicate bookings)
//     const existingPayment = await findPaymentByIntentId(session.payment_intent);
//     if (existingPayment) {
//       return {
//         success: false,
//         message: "Payment already processed",
//         bookingId: existingPayment.bookingId.toString(),
//       };
//     }

//     // 4. Extract booking data from session metadata
//     const metadata = session.metadata;
//     if (!metadata || !metadata.userId) {
//       return {
//         success: false,
//         message: "Invalid session metadata",
//       };
//     }

//     // 5. Verify user owns this session (security check)
//     if (metadata.userId !== userId) {
//       return {
//         success: false,
//         message: "Unauthorized access",
//       };
//     }

//     // 6. Create booking in database
//     const bookingData = {
//       ...metadata,
//       stripePaymentIntentId: session.payment_intent, // Store Stripe Payment Intent ID
//     };
//     const bookingResult = await createConfirmedBooking(bookingData);
//     if (!bookingResult.insertedId) {
//       return {
//         success: false,
//         message: "Failed to create booking",
//       };
//     }
//     const bookingId = bookingResult.insertedId.toString();
//     const trackingId = bookingResult.trackingId;

//     // 7. Create payment record
//     const paymentData = {
//       bookingId,
//       userId: metadata.userId,
//       userEmail: metadata.userEmail,
//       serviceName: metadata.serviceName,
//       serviceId: metadata.serviceId,
//       trackingId: trackingId,
//       stripePaymentIntentId: session.payment_intent,
//       paymentOption: metadata.paymentOption,
//       paymentMethod: session.payment_method_types[0] || "card",
//       totalPrice: metadata.totalPrice,
//       amountPaid: metadata.amountPaid,
//       dueAmount: metadata.dueAmount,
//     };
//     await createPaymentRecord(paymentData);

//     // 8. Return success with booking details
//     return {
//       success: true,
//       message: "Payment confirmed and booking created",
//       data: {
//         ...paymentData,
//         trackingId: trackingId,
//       },
//     };
//   } catch (error) {
//     return {
//       success: false,
//       message: error.message || "Failed to confirm payment",
//     };
//   }
// };

//Get all payments
export const getAllPayments = async (email = null) => {
  try {
    const allPayments = await findPaymentByEmail(email);
    return {
      success: true,
      payments: allPayments.map((payment) => ({
        ...payment,
        _id: payment._id.toString(),
      })),
    };
  } catch (error) {
    //console.error("[getAllPayments] Error:", error.message);
    return {
      success: false,
      error: error.message || "Failed to fetch payments",
      payments: [],
    };
  }
};
