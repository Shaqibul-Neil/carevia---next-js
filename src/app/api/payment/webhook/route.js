// ==========================================
// Stripe Webhook Handler

import { stripe } from "@/lib/stripe";
import { createConfirmedBooking } from "@/modules/booking/bookingRepository";
import {
  createPaymentRecord,
  findPaymentByIntentId,
} from "@/modules/payment/paymentRepository";
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

    // ==========================================
    // Handle: checkout.session.completed
    // ==========================================
    if (event.type === "checkout.session.completed") {
      //Step 6 : Extract metadata from session
      const session = event.data.object;
      const metadata = session.metadata;

      //Step 7 : Check for duplicate(Idempotency)
      const existingPayment = await findPaymentByIntentId(
        session.payment_intent,
      );
      if (existingPayment) {
        console.log("Payment already processed, skipping");
        return NextResponse.json({ received: true });
      }

      //Step 8 : Create booking
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
          userName: metadata.userName,
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

        // ==========================================
        // SEND EMAIL NOTIFICATION
        // ==========================================
      } catch (error) {
        console.error("❌ Booking creation failed:", error.message);
        //Don't throw error here - Webhook should still return 200
        //Return 400 fr signature errors only
        if (error.message.includes("signature")) {
          return NextResponse.json(
            { error: "Invalid signature" },
            { status: 400 },
          );
        }
        //For other errors, return 200 to prevent retry
        return NextResponse.json({ received: true });
      }
    }

    // ==========================================
    // Handle: checkout.session.expired
    // ==========================================
    if (event.type === "checkout.session.expired") {
      console.log("❌ Payment failed or expired");
      const session = event.data.object;
      //Only log in development
      if (process.env.NODE_ENV === "development") {
        console.log("📦 Session ID:", session.id);
        console.log("📧 User email:", session.metadata?.userEmail);
        console.log("🎫 Service:", session.metadata?.serviceName);
      }
      // TODO: Send email notification to user
    }

    // ==========================================
    // Handle: payment_intent.payment_failed
    // ==========================================
    if (event.type === "payment_intent.payment_failed") {
      console.log("💳 Payment Intent Failed");
      const paymentIntent = event.data.object;
      if (process.env.NODE_ENV === "development") {
        console.log("Full payment intent:", paymentIntent);
      }
      console.log("Payment Intent ID :", paymentIntent.id);
      console.log(
        "❌ Failure reason:",
        paymentIntent.last_payment_error?.message || "unknown",
      );

      // Only log details in development
      if (process.env.NODE_ENV === "development") {
        console.log(
          "📧 User email:",
          paymentIntent.metadata?.userEmail || "Not Available",
        );
      }

      // TODO: Send failure notification to user
    }

    // ==========================================
    // Handle: charge.refunded
    // ==========================================
    if (event.type === "charge.refunded") {
      console.log("💸 Refund processed");
      const charge = event.data.object;
      // TODO: Update booking status in database
      // TODO: Send refund confirmation email
    }

    // ==========================================
    // Handle: payment_intent.succeeded
    // ==========================================
    if (event.type === "payment_intent.succeeded") {
      console.log("✅ Payment intent succeeded");
      const paymentIntent = event.data.object;
      // Just log - booking already created by checkout.session.completed
      console.log("Payment Intent ID:", paymentIntent.id);
    }
  } catch (error) {
    console.error("❌ Webhook error:", error.message);

    // Return 400 for signature errors only
    if (error.message.includes("signature")) {
      return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
    }

    // For other errors, return 200 to prevent retry
    return NextResponse.json({ received: true });
  }
  // Log event summary
  console.log(`✅ Webhook processed: ${event.type} [${event.id}]`);
  return NextResponse.json({ received: true });
}
