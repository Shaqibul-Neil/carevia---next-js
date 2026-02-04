// ==========================================
// Stripe Webhook Handler

import { stripe } from "@/lib/stripe";
import { createConfirmedBooking } from "@/modules/booking/bookingRepository";
import { createPaymentRecord } from "@/modules/payment/paymentRepository";
import { NextResponse } from "next/server";

// ==========================================
export async function POST(request) {
  // console.log("Webhook created");
  //Step 1: Read Request body-- to verify stipe signature we need .text not request.body.json
  const body = await request.text();

  //Step 2: Read stripe signature
  const signature = request.headers.get("stripe-signature");
  //console.log("🔐 Signature:", signature);

  //Step 3 : Verify signature
  let event;
  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET,
    );

    // Step 4: Event type check
    console.log("📋 Event type:", event.type);
    //Step 5 : Handle event
    if (event.type === "checkout.session.completed") {
      const session = event.data.object;

      //Step 6 : Extract metadata from session
      const metadata = session.metadata;
      console.log("session metadata", metadata);

      //Step 7 : Create booking
      try {
        const bookingData = {
          ...metadata,
          stripePaymentIntentId: session.payment_intent,
        };
        const result = await createConfirmedBooking(bookingData);

        //Step 8 : Create payment record
        const paymentData = {
          bookingId: result.insertedId.toString(),
          userId: metadata.userId,
          userEmail: metadata.userEmail,
          serviceName: metadata.serviceName,
          serviceId: metadata.serviceId,
          trackingId: result.trackingId,
          stripePaymentIntentId: session.payment_intent,
          paymentOption: metadata.paymentOption,
          paymentMethod: session.payment_method_types[0] || "card",
          totalPrice: metadata.totalPrice,
          amountPaid: metadata.amountPaid,
          dueAmount: metadata.dueAmount,
        };
        await createPaymentRecord(paymentData);
        console.log("Payment record created");
      } catch (error) {
        console.error("❌ Booking creation failed:", error.message);
      }
    }
  } catch (error) {
    console.error(error.message);
    return NextResponse.json({ error: "Invalid Signature" }, { status: 400 });
  }
  return NextResponse.json({ received: true });
}
