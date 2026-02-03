# 💳 Stripe Payment Integration Guide (Carevia)

এই ডকুমেন্টটিতে Stripe পেমেন্ট সিস্টেমের দুটি অ্যাপ্রোচ (Without Webhook এবং With Webhook) বিস্তারিতভাবে আলোচনা করা হয়েছে। প্রোডাকশন অ্যাপ্লিকেশনের জন্য **Phase 2 (With Webhook)** ব্যবহার করা বাধ্যতামূলক।

---

## 📑 সূচিপত্র
1. [Phase 1: WITHOUT Webhook (Testing/MVP)](#phase-1-without-webhook-testingmvp)
2. [Phase 2: WITH Webhook (Production Standard)](#phase-2-with-webhook-production-standard)
3. [🚀 Step-by-Step Implementation Guideline](#-step-by-step-implementation-guideline)
4. [🧠 Industry Insights & Production Pitfalls](#-industry-insights--production-pitfalls)
5. [📚 References](#-references)

---

## Phase 1: WITHOUT Webhook (Testing/MVP)

এই অ্যাপ্রোচটি মূলত লোকাল টেস্টিং বা খুব ছোট প্রোজেক্টের জন্য যেখানে পেমেন্ট কনফার্মেশন ক্লায়েন্ট-সাইড থেকে ট্রিগার করা হয়।

### ⚠️ ঝুঁকি (Risks):
- **Network Failure:** ইউজার পেমেন্ট করার পর যদি ব্রাউজার ক্লোজ করে দেয় বা ইন্টারনেট চলে যায়, তবে পেমেন্ট সফল হলেও ডাটাবেসে বুকিং তৈরি হবে না।
- **Security:** এটি ক্লায়েন্ট-সাইড ট্রিগারড, তাই ম্যালিশিয়াস ইউজার পেমেন্ট না করেই এপিআই হিট করার চেষ্টা করতে পারে (যদিও স্ট্রাইপ সেশন চেক করা হয়)।
- **No Retry:** ডাটাবেস রাইট ফেইল করলে স্ট্রাইপ আর নতুন করে ট্রাই করবে না।

### 📁 কোডব্লক (Part 1):

#### File 1: Payment Repository
Path: 
src/modules/payment/paymentRepository.js
```javascript
import { collections, dbConnect } from "@/lib/dbConnect";
import { ObjectId } from "mongodb";

const paymentCollection = () => dbConnect(collections.PAYMENTS);

// ==========================================
// Create Payment Record
// ==========================================
export const createPaymentRecord = async (paymentData) => {
  const payment = {
    bookingId: new ObjectId(paymentData.bookingId),
    userId: new ObjectId(paymentData.userId),
    stripePaymentIntentId: paymentData.stripePaymentIntentId,
    amount: parseFloat(paymentData.amount),
    currency: paymentData.currency || "usd",
    status: "succeeded", // Only create when payment succeeds
    paymentMethod: paymentData.paymentMethod || "card",
    metadata: paymentData.metadata || {},
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  return await paymentCollection().insertOne(payment);
};

// ==========================================
// Find Payment by Payment Intent ID
// ==========================================
export const findPaymentByIntentId = async (paymentIntentId) => {
  return await paymentCollection().findOne({
    stripePaymentIntentId: paymentIntentId,
  });
};

// ==========================================
// Find Payments by User ID
// ==========================================
export const findPaymentsByUserId = async (userId) => {
  return await paymentCollection()
    .find({ userId: new ObjectId(userId) })
    .sort({ createdAt: -1 })
    .toArray();
};
```

####  File 2: Payment Service
Path: 
src/modules/payment/paymentService.js

```javascript
import { stripe } from "@/lib/stripe";
import { createPaymentRecord, findPaymentByIntentId } from "./paymentRepository";
import { createConfirmedBooking } from "@/modules/booking/bookingRepository";

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
// ==========================================

export const confirmPaymentWithoutWebhook = async (sessionId, userId) => {
  try {
    // 1. Retrieve the checkout session from Stripe
    const session = await stripe.checkout.sessions.retrieve(sessionId);

    // 2. Verify payment was actually successful
    if (session.payment_status !== "paid") {
      return {
        success: false,
        message: "Payment not completed",
      };
    }

    // 3. Check if payment already processed (prevent duplicate bookings)
    const existingPayment = await findPaymentByIntentId(session.payment_intent);
    if (existingPayment) {
      return {
        success: false,
        message: "Payment already processed",
        bookingId: existingPayment.bookingId.toString(),
      };
    }

    // 4. Extract booking data from session metadata
    const metadata = session.metadata;
    if (!metadata || !metadata.userId) {
      return {
        success: false,
        message: "Invalid session metadata",
      };
    }

    // 5. Verify user owns this session (security check)
    if (metadata.userId !== userId) {
      return {
        success: false,
        message: "Unauthorized access",
      };
    }

    // 6. Create booking in database
    const bookingData = {
      ...metadata,
      paymentIntentId: session.payment_intent, // Store Stripe Payment Intent ID
    };

    const bookingResult = await createConfirmedBooking(bookingData);

    if (!bookingResult.insertedId) {
      return {
        success: false,
        message: "Failed to create booking",
      };
    }

    const bookingId = bookingResult.insertedId.toString();

    // 7. Create payment record
    const paymentData = {
      bookingId,
      userId: metadata.userId,
      stripePaymentIntentId: session.payment_intent,
      amount: metadata.amountToPay,
      currency: session.currency,
      paymentMethod: session.payment_method_types[0] || "card",
      metadata: {
        sessionId: session.id,
        serviceName: metadata.serviceName,
        paymentOption: metadata.paymentOption,
      },
    };

    await createPaymentRecord(paymentData);

    // 8. Return success with booking details
    return {
      success: true,
      message: "Payment confirmed and booking created",
      bookingId,
      data: {
        bookingId,
        serviceName: metadata.serviceName,
        amount: metadata.amountToPay,
        paymentOption: metadata.paymentOption,
      },
    };
  } catch (error) {
    console.error("[confirmPaymentWithoutWebhook] Error:", error.message);
    return {
      success: false,
      message: error.message || "Failed to confirm payment",
    };
  }
};
```

---
📁 File 3: Payment Confirmation API
Path: 
src/app/api/payment/confirm/route.js
import { ApiResponse } from "@/lib/apiResponse";
import { authOptions } from "@/lib/authOptions";
import { confirmPaymentWithoutWebhook } from "@/modules/payment/paymentService";
import { getServerSession } from "next-auth";

// ==========================================
// POST /api/payment/confirm
// Confirm payment and create booking (WITHOUT webhook)
// ==========================================
export async function POST(request) {
  try {
    // 1. Check authentication
    const session = await getServerSession(authOptions);
    if (!session) {
      return ApiResponse.unauthorized();
    }

    // 2. Get session ID from request
    const { sessionId } = await request.json();

    if (!sessionId || typeof sessionId !== "string") {
      return ApiResponse.badRequest("Session ID is required");
    }

    // 3. Confirm payment and create booking
    const result = await confirmPaymentWithoutWebhook(
      sessionId,
      session.user.id
    );

    // 4. Handle result
    if (!result.success) {
      return ApiResponse.error(result.message, 400);
    }

    // 5. Return success response
    return ApiResponse.success(result.data, result.message);
  } catch (error) {
    console.error("[payment/confirm] Error:", error.message);
    return ApiResponse.error(
      error.message || "Failed to confirm payment",
      500
    );
  }
}
 File 4: Payment Success Page
 "use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { CheckCircle2, Download, Eye, Home, Loader2 } from "lucide-react";
import Link from "next/link";

export default function PaymentSuccessPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("session_id");

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [bookingData, setBookingData] = useState(null);

  useEffect(() => {
    if (!sessionId) {
      setError("Invalid payment session");
      setLoading(false);
      return;
    }

    // Confirm payment and create booking
    const confirmPayment = async () => {
      try {
        const response = await fetch("/api/payment/confirm", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ sessionId }),
        });

        const result = await response.json();

        if (!result.success) {
          setError(result.message || "Payment confirmation failed");
          setLoading(false);
          return;
        }

        setBookingData(result.data);
        setLoading(false);
      } catch (err) {
        console.error("Payment confirmation error:", err);
        setError("Failed to confirm payment. Please contact support.");
        setLoading(false);
      }
    };

    confirmPayment();
  }, [sessionId]);

  // Loading State
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center space-y-4">
          <Loader2 className="w-12 h-12 animate-spin text-primary mx-auto" />
          <p className="text-muted-foreground">Processing your payment...</p>
        </div>
      </div>
    );
  }

  // Error State
  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background px-4">
        <div className="max-w-md w-full text-center space-y-6">
          <div className="w-20 h-20 rounded-full bg-destructive/10 flex items-center justify-center mx-auto">
            <svg
              className="w-10 h-10 text-destructive"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-foreground">Payment Error</h1>
          <p className="text-muted-foreground">{error}</p>
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
          >
            <Home className="w-4 h-4" />
            Go to Home
          </Link>
        </div>
      </div>
    );
  }

  // Success State
  return (
    <div className="min-h-screen bg-background py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        {/* Success Animation */}
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{
            type: "spring",
            stiffness: 200,
            damping: 20,
            delay: 0.1,
          }}
          className="text-center mb-8"
        >
          <div className="relative inline-block">
            {/* Animated Ring */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="absolute inset-0 bg-primary/20 rounded-full blur-xl"
            />
            
            {/* Check Icon */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{
                type: "spring",
                stiffness: 300,
                damping: 15,
                delay: 0.3,
              }}
            >
              <CheckCircle2 className="w-24 h-24 text-primary relative z-10" />
            </motion.div>
          </div>

          <motion.h1
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="mt-6 text-3xl sm:text-4xl font-bold text-foreground"
          >
            Payment Successful!
          </motion.h1>
          
          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-3 text-lg text-muted-foreground"
          >
            Your booking has been confirmed
          </motion.p>
        </motion.div>

        {/* Booking Details Card */}
        <motion.div
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="bg-card border border-border rounded-2xl p-6 sm:p-8 shadow-lg backdrop-blur-sm"
        >
          {/* Booking ID */}
          <div className="mb-6 pb-6 border-b border-border">
            <p className="text-sm text-muted-foreground mb-1">Booking ID</p>
            <p className="text-lg font-mono font-semibold text-foreground">
              {bookingData?.bookingId}
            </p>
          </div>

          {/* Service Details */}
          <div className="space-y-4 mb-6">
            <h2 className="text-xl font-semibold text-foreground">
              Booking Summary
            </h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-muted-foreground">Service</p>
                <p className="font-medium text-foreground">
                  {bookingData?.serviceName}
                </p>
              </div>
              
              <div>
                <p className="text-sm text-muted-foreground">Amount Paid</p>
                <p className="font-medium text-foreground">
                  ${bookingData?.amount}
                </p>
              </div>
              
              <div>
                <p className="text-sm text-muted-foreground">Payment Option</p>
                <p className="font-medium text-foreground capitalize">
                  {bookingData?.paymentOption === "half" ? "50% Advance" : "Full Payment"}
                </p>
              </div>
              
              <div>
                <p className="text-sm text-muted-foreground">Status</p>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                  Confirmed
                </span>
              </div>
            </div>
          </div>

          {/* Next Steps */}
          <div className="bg-muted/50 rounded-xl p-4 mb-6">
            <h3 className="font-semibold text-foreground mb-2 flex items-center gap-2">
              <svg
                className="w-5 h-5 text-primary"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              What's Next?
            </h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex items-start gap-2">
                <span className="text-primary mt-0.5">✓</span>
                <span>A confirmation email has been sent to your registered email</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-0.5">✓</span>
                <span>You can view your booking details anytime from your dashboard</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-0.5">✓</span>
                <span>Our team will contact you shortly to confirm the schedule</span>
              </li>
            </ul>
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Link
              href={`/booking/${bookingData?.bookingId}`}
              className="flex items-center justify-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-all hover:scale-[1.02] active:scale-[0.98] font-medium"
            >
              <Eye className="w-4 h-4" />
              View Booking
            </Link>
            
            <button
              onClick={() => window.print()}
              className="flex items-center justify-center gap-2 px-6 py-3 bg-secondary text-secondary-foreground rounded-lg hover:bg-secondary/80 transition-all hover:scale-[1.02] active:scale-[0.98] font-medium"
            >
              <Download className="w-4 h-4" />
              Download Receipt
            </button>
          </div>
        </motion.div>

        {/* Back to Home */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="text-center mt-8"
        >
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <Home className="w-4 h-4" />
            Back to Home
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
File 5: Update Booking Repository
// OLD LINE (line 26):
stripeSessionId: bookingData.stripeSessionId,

// NEW LINE (replace with):
paymentIntentId: bookingData.paymentIntentId, // Stripe Payment Intent ID

## Phase 2:Phase 2: WITH Webhook - Production-Grade Implementation

এটিই ইন্ডাস্ট্রির স্ট্যান্ডার্ড পদ্ধতি। এখানে স্ট্রাইপ সার্ভার সরাসরি আপনার ব্যাকএন্ডে ইভেন্ট পাঠায়।

### ✅ সুবিধা (Benefits):
- **Authoritative:** পেমেন্ট কনফার্মেশনের জন্য স্ট্রাইপ আপনার সার্ভারের একমাত্র সোর্স অফ ট্রুথ।
- **Retry Mechanism:** যদি আপনার সার্ভার ডাউন থাকে, স্ট্রাইপ ৩ দিন পর্যন্ত পলিং রিট্রাই করবে।
- **Security:** সিগনেচার ভেরিফিকেশন করার ফলে কেউ ফেক রিকোয়েস্ট পাঠাতে পারবে না।

### 📁  File 1: Webhook Handler (Core Logic)
Path: 
src/modules/payment/webhookHandler.js

#### 1. Webhook Handler (`src/modules/payment/webhookHandler.js`)
```javascript
import { stripe } from "@/lib/stripe";
import { createConfirmedBooking } from "@/modules/booking/bookingRepository";
import { createPaymentRecord, findPaymentByIntentId } from "./paymentRepository";

// ==========================================
// Handle Stripe Webhook Events
// ==========================================
// This is the PRODUCTION-GRADE approach for payment processing.
// 
// Why Webhooks are Critical:
// 1. AUTHORITATIVE SOURCE: Stripe tells YOU when payment succeeds, not the client
// 2. RELIABILITY: Stripe retries failed webhooks automatically (up to 3 days)
// 3. SECURITY: Client cannot manipulate payment confirmation
// 4. RESILIENCE: Works even if user closes browser after payment
// 5. IDEMPOTENCY: Handle duplicate events safely
//
// Stripe Webhook Retry Behavior:
// - Stripe sends webhook immediately after event
// - If your endpoint returns non-2xx status, Stripe retries
// - Retry schedule: immediately, then exponential backoff
// - Continues retrying for up to 3 days
// - You can see retry attempts in Stripe Dashboard
//
// Event Ordering:
// - Webhooks may arrive OUT OF ORDER
// - Example: payment_intent.succeeded might arrive AFTER charge.succeeded
// - Always check current state, don't assume linear progression
// ==========================================

export const handleWebhookEvent = async (event) => {
  // Log the event type for debugging
  console.log(`[Webhook] Received event: ${event.type}`);

  // Handle different event types
  switch (event.type) {
    case "checkout.session.completed":
      return await handleCheckoutSessionCompleted(event.data.object);

    case "payment_intent.succeeded":
      return await handlePaymentIntentSucceeded(event.data.object);

    case "payment_intent.payment_failed":
      return await handlePaymentIntentFailed(event.data.object);

    default:
      // Unknown event type - log but don't error
      // This allows Stripe to add new event types without breaking your webhook
      console.log(`[Webhook] Unhandled event type: ${event.type}`);
      return { success: true, message: "Event type not handled" };
  }
};

// ==========================================
// Handle: checkout.session.completed
// ==========================================
// This event fires when user completes the Stripe Checkout flow.
// This is the PRIMARY event we use to create bookings.
//
// Why use this event:
// - Contains full session metadata (booking details)
// - Fires immediately after successful checkout
// - Includes payment_intent reference
//
// Important Notes:
// - This fires BEFORE payment_intent.succeeded in most cases
// - But order is NOT guaranteed (out-of-order events possible)
// - Always implement idempotency checks
// ==========================================

async function handleCheckoutSessionCompleted(session) {
  try {
    console.log(`[Webhook] Processing checkout.session.completed: ${session.id}`);

    // 1. Verify payment was successful
    // CRITICAL: Always check payment_status, don't assume success
    if (session.payment_status !== "paid") {
      console.log(`[Webhook] Session not paid yet: ${session.id}`);
      return {
        success: true,
        message: "Session not paid, skipping booking creation",
      };
    }

    // 2. IDEMPOTENCY CHECK: Prevent duplicate bookings
    // Why critical:
    // - Stripe may send same event multiple times (network issues, retries)
    // - Your server might process same event twice (race conditions)
    // - Without this check: User gets charged once, but 2+ bookings created
    //
    // How it works:
    // - Check if payment record already exists for this payment_intent
    // - If exists, return success (idempotent response)
    // - Stripe sees 200 OK and stops retrying
    const existingPayment = await findPaymentByIntentId(session.payment_intent);
    
    if (existingPayment) {
      console.log(`[Webhook] Payment already processed: ${session.payment_intent}`);
      // Return success to acknowledge receipt (stops Stripe retries)
      return {
        success: true,
        message: "Payment already processed (idempotent)",
        bookingId: existingPayment.bookingId.toString(),
      };
    }

    // 3. Extract booking data from session metadata
    // Metadata was attached during checkout session creation
    const metadata = session.metadata;
    
    if (!metadata || !metadata.userId) {
      console.error(`[Webhook] Invalid metadata in session: ${session.id}`);
      return {
        success: false,
        message: "Invalid session metadata",
      };
    }

    // 4. Create booking in database
    // CRITICAL SECTION: This is where actual booking is created
    // Race Condition Prevention:
    // - We already checked for existing payment (idempotency)
    // - MongoDB insertOne is atomic
    // - If two webhooks race here, second will fail on payment creation (duplicate key)
    const bookingData = {
      ...metadata,
      paymentIntentId: session.payment_intent, // Store for reference/refunds
    };

    const bookingResult = await createConfirmedBooking(bookingData);

    if (!bookingResult.insertedId) {
      console.error(`[Webhook] Failed to create booking for session: ${session.id}`);
      // Return failure - Stripe will retry this webhook
      return {
        success: false,
        message: "Failed to create booking",
      };
    }

    const bookingId = bookingResult.insertedId.toString();
    console.log(`[Webhook] Booking created: ${bookingId}`);

    // 5. Create payment record
    // This serves as our idempotency key (checked in step 2)
    // Also provides audit trail and enables refunds
    const paymentData = {
      bookingId,
      userId: metadata.userId,
      stripePaymentIntentId: session.payment_intent,
      amount: metadata.amountToPay,
      currency: session.currency || "usd",
      paymentMethod: session.payment_method_types?.[0] || "card",
      metadata: {
        sessionId: session.id,
        serviceName: metadata.serviceName,
        paymentOption: metadata.paymentOption,
        webhookEventId: session.id, // For debugging/tracking
      },
    };

    await createPaymentRecord(paymentData);
    console.log(`[Webhook] Payment record created for booking: ${bookingId}`);

    // 6. Return success
    // Stripe receives 200 OK and marks webhook as delivered
    return {
      success: true,
      message: "Booking created successfully",
      bookingId,
    };

  } catch (error) {
    // ERROR HANDLING:
    // - Log full error for debugging
    // - Return failure so Stripe retries
    // - Stripe will retry with exponential backoff
    console.error("[Webhook] Error in checkout.session.completed:", error);
    
    return {
      success: false,
      message: error.message || "Webhook processing failed",
    };
  }
}

// ==========================================
// Handle: payment_intent.succeeded
// ==========================================
// This event fires when a PaymentIntent successfully completes.
//
// When to use:
// - Backup confirmation (in case checkout.session.completed missed)
// - Update payment status if needed
// - Trigger additional business logic (emails, notifications)
//
// Important:
// - May fire BEFORE or AFTER checkout.session.completed (no guaranteed order)
// - Should be idempotent (check if already processed)
// - In our flow, checkout.session.completed is primary, this is backup
// ==========================================

async function handlePaymentIntentSucceeded(paymentIntent) {
  try {
    console.log(`[Webhook] Processing payment_intent.succeeded: ${paymentIntent.id}`);

    // Check if we already processed this payment
    const existingPayment = await findPaymentByIntentId(paymentIntent.id);

    if (existingPayment) {
      console.log(`[Webhook] Payment already processed: ${paymentIntent.id}`);
      // Already handled by checkout.session.completed
      return {
        success: true,
        message: "Payment already processed",
      };
    }

    // If we reach here, checkout.session.completed hasn't fired yet
    // This is unusual but possible (out-of-order events)
    // 
    // Options:
    // 1. Wait for checkout.session.completed (recommended - has metadata)
    // 2. Retrieve session and process (more complex)
    // 
    // For safety, we'll just log and wait for the session event
    console.log(`[Webhook] Waiting for checkout.session.completed for: ${paymentIntent.id}`);

    return {
      success: true,
      message: "Waiting for checkout session event",
    };

  } catch (error) {
    console.error("[Webhook] Error in payment_intent.succeeded:", error);
    return {
      success: false,
      message: error.message || "Failed to process payment intent",
    };
  }
}

// ==========================================
// Handle: payment_intent.payment_failed
// ==========================================
// This event fires when a payment fails.
//
// Use cases:
// - Log failed payments for analytics
// - Send notification to user
// - Update any pending records
//
// Important:
// - User never reaches success page (Stripe shows error)
// - No booking should be created
// - This is for logging/notification purposes
// ==========================================

async function handlePaymentIntentFailed(paymentIntent) {
  try {
    console.log(`[Webhook] Payment failed: ${paymentIntent.id}`);
    console.log(`[Webhook] Failure reason: ${paymentIntent.last_payment_error?.message || "Unknown"}`);

    // Log for analytics/debugging
    // In production, you might:
    // - Store failed payment attempts
    // - Send notification to user
    // - Alert admin if high failure rate
    // - Track fraud patterns

    return {
      success: true,
      message: "Payment failure logged",
    };

  } catch (error) {
    console.error("[Webhook] Error in payment_intent.payment_failed:", error);
    return {
      success: false,
      message: error.message || "Failed to process payment failure",
    };
  }
}
```

#### 2. File 2: Webhook API Route
Path: src/app/api/payment/webhook/route.js

```javascript
import { stripe } from "@/lib/stripe";
import { handleWebhookEvent } from "@/modules/payment/webhookHandler";
import { headers } from "next/headers";

// ==========================================
// POST /api/payment/webhook
// Stripe Webhook Endpoint
// ==========================================
// This is the MOST CRITICAL endpoint in your payment system.
//
// Security Requirements:
// 1. MUST verify webhook signature (prevents fake webhooks)
// 2. MUST use raw body (signature verification needs exact bytes)
// 3. MUST return 200 OK quickly (Stripe has 30s timeout)
// 4. MUST be idempotent (handle duplicate events)
//
// Stripe Webhook Signature Verification:
// - Stripe signs each webhook with your webhook secret
// - Signature is sent in 'stripe-signature' header
// - We verify signature using stripe.webhooks.constructEvent()
// - If signature invalid → reject (prevents attacks)
//
// Why This Matters:
// - Without verification, anyone could send fake "payment succeeded" webhooks
// - Attacker could create bookings without paying
// - NEVER skip signature verification in production
// ==========================================

export async function POST(request) {
  try {
    // 1. Get raw body (required for signature verification)
    // CRITICAL: Must use raw body, not parsed JSON
    // Signature is calculated on exact bytes received
    const body = await request.text();

    // 2. Get Stripe signature from headers
    // Stripe sends signature in 'stripe-signature' header
    const headersList = await headers();
    const signature = headersList.get("stripe-signature");

    if (!signature) {
      console.error("[Webhook] No stripe-signature header found");
      return Response.json(
        { success: false, message: "No signature provided" },
        { status: 400 }
      );
    }

    // 3. Verify webhook signature
    // This is the SECURITY GATE - most important step
    //
    // What happens here:
    // - stripe.webhooks.constructEvent() verifies signature
    // - If signature invalid → throws error (webhook rejected)
    // - If signature valid → returns parsed event object
    //
    // Why critical:
    // - Prevents fake webhooks from attackers
    // - Ensures webhook actually came from Stripe
    // - Protects against replay attacks (signature includes timestamp)
    //
    // Common errors:
    // - "No signatures found matching the expected signature"
    //   → Wrong webhook secret (check STRIPE_WEBHOOK_SECRET)
    // - "Timestamp outside the tolerance zone"
    //   → Server clock skew or replay attack
    let event;

    try {
      event = stripe.webhooks.constructEvent(
        body,
        signature,
        process.env.STRIPE_WEBHOOK_SECRET
      );
    } catch (err) {
      console.error(`[Webhook] Signature verification failed: ${err.message}`);
      // Return 400 - tells Stripe this webhook is invalid
      // Stripe will NOT retry (signature will never be valid)
      return Response.json(
        { success: false, message: `Webhook signature verification failed: ${err.message}` },
        { status: 400 }
      );
    }

    // 4. Log webhook receipt (for debugging)
    console.log(`[Webhook] ✅ Verified event: ${event.type} (${event.id})`);

    // 5. Process the webhook event
    // Delegate to handler for business logic
    // Handler is responsible for idempotency
    const result = await handleWebhookEvent(event);

    // 6. Return response to Stripe
    //
    // Response Status Codes:
    // - 200 OK: Event processed successfully
    //   → Stripe marks webhook as delivered, stops retrying
    // - 4xx (400-499): Client error, don't retry
    //   → Use for invalid webhooks, signature failures
    // - 5xx (500-599): Server error, retry
    //   → Stripe will retry with exponential backoff
    //
    // Best Practice:
    // - Return 200 for idempotent operations (already processed)
    // - Return 500 for transient errors (DB down, network issues)
    // - Return 400 for permanent errors (invalid data)
    if (result.success) {
      return Response.json(
        { success: true, message: result.message },
        { status: 200 }
      );
    } else {
      // Processing failed - return 500 so Stripe retries
      console.error(`[Webhook] Processing failed: ${result.message}`);
      return Response.json(
        { success: false, message: result.message },
        { status: 500 }
      );
    }

  } catch (error) {
    // Unexpected error - return 500 so Stripe retries
    console.error("[Webhook] Unexpected error:", error);
    return Response.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}

// ==========================================
// Disable body parsing for webhook route
// ==========================================
// Next.js normally parses request body as JSON.
// We need RAW body for signature verification.
// This config tells Next.js to skip parsing.
// ==========================================
export const config = {
  api: {
    bodyParser: false,
  },
};

File 3: Update Payment Service (Add Webhook Method)
Path: 
src/modules/payment/paymentService.js
// ==========================================
// Confirm Payment (WITH Webhook - Production)
// ==========================================
// This is a HELPER function for manual payment verification.
// In production webhook flow, this is NOT called automatically.
//
// Use cases:
// - Admin panel: Manually verify payment status
// - Customer support: Check payment details
// - Debugging: Investigate payment issues
//
// Normal Flow:
// - Webhook handles everything automatically
// - This function is for manual/admin operations only
// ==========================================

export const confirmPaymentWithWebhook = async (sessionId) => {
  try {
    // Retrieve session from Stripe
    const session = await stripe.checkout.sessions.retrieve(sessionId);

    // Check payment status
    if (session.payment_status !== "paid") {
      return {
        success: false,
        message: "Payment not completed",
        status: session.payment_status,
      };
    }

    // Check if already processed by webhook
    const existingPayment = await findPaymentByIntentId(session.payment_intent);

    if (existingPayment) {
      return {
        success: true,
        message: "Payment already processed by webhook",
        bookingId: existingPayment.bookingId.toString(),
        processedBy: "webhook",
      };
    }

    // If webhook hasn't processed yet (unusual)
    return {
      success: false,
      message: "Payment successful but webhook not processed yet. Please wait.",
      status: "pending_webhook",
    };

  } catch (error) {
    console.error("[confirmPaymentWithWebhook] Error:", error.message);
    return {
      success: false,
      message: error.message || "Failed to verify payment",
    };
  }
};

File 4: Update Success Page (Webhook-Aware)
Path: src/app/(commonLayout)/(private)/payment/success/page.jsx

তোমার existing success page এ confirmPayment function টা replace করো:
// Confirm payment and create booking
const confirmPayment = async () => {
  try {
    // In webhook flow, we just poll to check if webhook processed the payment
    // We DON'T trigger booking creation from client
    
    let attempts = 0;
    const maxAttempts = 10; // Poll for ~10 seconds
    const pollInterval = 1000; // 1 second

    const checkPaymentStatus = async () => {
      const response = await fetch("/api/payment/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sessionId }),
      });

      const result = await response.json();

      if (result.success && result.data.bookingId) {
        // Webhook processed successfully
        setBookingData(result.data);
        setLoading(false);
        return true;
      }

      return false;
    };

    // Poll until webhook processes or timeout
    while (attempts < maxAttempts) {
      const processed = await checkPaymentStatus();
      if (processed) return;

      attempts++;
      await new Promise(resolve => setTimeout(resolve, pollInterval));
    }

    // Timeout - webhook might still be processing
    setError("Payment is being processed. Please check your bookings in a moment.");
    setLoading(false);

  } catch (err) {
    console.error("Payment verification error:", err);
    setError("Failed to verify payment. Please contact support if you were charged.");
    setLoading(false);
  }
};

File 5: Payment Verification API (For Success Page Polling)

---
import { ApiResponse } from "@/lib/apiResponse";
import { authOptions } from "@/lib/authOptions";
import { stripe } from "@/lib/stripe";
import { findPaymentByIntentId } from "@/modules/payment/paymentRepository";
import { getServerSession } from "next-auth";

// ==========================================
// POST /api/payment/verify
// Verify if webhook has processed payment
// ==========================================
// This endpoint is called by success page to check if webhook
// has finished processing the payment.
//
// Flow:
// 1. User completes payment on Stripe
// 2. Stripe redirects to success page
// 3. Success page polls this endpoint
// 4. This endpoint checks if webhook created booking
// 5. Once booking exists, success page displays it
//
// Why polling:
// - Webhook might take 1-5 seconds to process
// - User sees loading state while waiting
// - Better UX than showing error immediately
// ==========================================

export async function POST(request) {
  try {
    // 1. Check authentication
    const session = await getServerSession(authOptions);
    if (!session) {
      return ApiResponse.unauthorized();
    }

    // 2. Get session ID
    const { sessionId } = await request.json();

    if (!sessionId) {
      return ApiResponse.badRequest("Session ID is required");
    }

    // 3. Retrieve Stripe session
    const stripeSession = await stripe.checkout.sessions.retrieve(sessionId);

    // 4. Verify payment completed
    if (stripeSession.payment_status !== "paid") {
      return ApiResponse.error("Payment not completed", 400);
    }

    // 5. Check if webhook processed this payment
    const payment = await findPaymentByIntentId(stripeSession.payment_intent);

    if (!payment) {
      // Webhook hasn't processed yet
      return ApiResponse.success(
        { processed: false },
        "Payment successful, processing..."
      );
    }

    // 6. Webhook processed - return booking details
    const metadata = stripeSession.metadata;

    return ApiResponse.success(
      {
        processed: true,
        bookingId: payment.bookingId.toString(),
        serviceName: metadata.serviceName,
        amount: metadata.amountToPay,
        paymentOption: metadata.paymentOption,
      },
      "Payment verified"
    );

  } catch (error) {
    console.error("[payment/verify] Error:", error.message);
    return ApiResponse.error(
      error.message || "Failed to verify payment",
      500
    );
  }
}
🛡️ Production Best Practices
1️⃣ Idempotency (Critical)
// ALWAYS check if event already processed
const existingPayment = await findPaymentByIntentId(paymentIntent);
if (existingPayment) {
  // Return success - stops Stripe retries
  return { success: true, message: "Already processed" };
}
Why:

Stripe may send same event multiple times
Network issues cause retries
Without check: Duplicate bookings created


2️⃣ Signature Verification (Security)
javascript
// NEVER skip this in production
const event = stripe.webhooks.constructEvent(
  body,
  signature,
  process.env.STRIPE_WEBHOOK_SECRET
);
Why:

Prevents fake webhooks from attackers
Ensures webhook came from Stripe
Protects against replay attacks

3️⃣ Database Race Conditions
javascript
// Use payment record as idempotency key
// MongoDB insertOne is atomic
// Second insert will fail (duplicate key)
await createPaymentRecord(paymentData);
Why:

Two webhooks might race to create booking
First wins, second fails gracefully
No duplicate bookings
4️⃣ Error Handling & Retries
javascript
// Return 500 for transient errors (Stripe retries)
if (!bookingResult.insertedId) {
  return { success: false, message: "DB write failed" };
}
// Return 200 for idempotent operations (stop retries)
if (existingPayment) {
  return { success: true, message: "Already processed" };
}
Why:

Stripe retries 500 errors automatically
200 stops retries (event handled)
Automatic recovery from transient failures
5️⃣ Out-of-Order Events
javascript
// Don't assume event order
// payment_intent.succeeded might arrive BEFORE checkout.session.completed
// Always check current state
const existingPayment = await findPaymentByIntentId(paymentIntent);
Why:

Network delays cause out-of-order delivery
Can't rely on event sequence
Always check database state
6️⃣ Logging & Monitoring
javascript
// Log every webhook event
console.log(`[Webhook] ✅ Verified event: ${event.type} (${event.id})`);
// Log failures for debugging
console.error(`[Webhook] Processing failed: ${error.message}`);
Why:

Debug production issues
Track webhook delivery
Monitor failure rates
📚 Official References
Stripe Documentation:
Webhooks Guide: https://stripe.com/docs/webhooks
Webhook Best Practices: https://stripe.com/docs/webhooks/best-practices
Payment Intents: https://stripe.com/docs/payments/payment-intents
Checkout Sessions: https://stripe.com/docs/payments/checkout
Webhook Signature Verification: https://stripe.com/docs/webhooks/signatures
Idempotent Requests: https://stripe.com/docs/api/idempotent_requests
YouTube Resources:
Stripe Official - Webhooks Explained: https://www.youtube.com/watch?v=oYSLhriIZaA
Web Dev Simplified - Stripe Webhooks: https://www.youtube.com/watch?v=Psq5N5C-FGo
```
## 🚀 Step-by-Step Implementation Guideline

তুমি যদি নিজে থেকে সব সাকসেসফুলি ইমপ্লিমেন্ট করতে চাও, তবে নিচের স্টেপগুলো ফলো করো:

### Step 1: Stripe Setup
- [Stripe Dashboard](https://dashboard.stripe.com/) এ গিয়ে API Keys (Public ও Secret) সংগ্রহ করো।
- `.env.local` ফাইলে `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` এবং `STRIPE_SECRET_KEY` বসাও।

### Step 2: Webhook Endpoint Preparation
- স্ট্রাইপ ড্যাশবোর্ডে গিয়ে "Webhooks" অপশনে যাও।
- "Add endpoint" এ ক্লিক করে তোমার প্রোডাকশন ইউআরএল দাও (যেমন: `https://yourdomain.com/api/payment/webhook`)।
- **Local Testing এর জন্য:** Stripe CLI ডাউনলোড করে `stripe listen --forward-to localhost:3000/api/payment/webhook` কমান্ডটি চালাও। এই কমান্ডটি তোমাকে একটি `whsec_...` কোড দিবে। এটি `STRIPE_WEBHOOK_SECRET` হিসেবে ব্যবহার করো।

### Step 3: Metadata is King
- `checkout.session.create` করার সময় `metadata` ফিল্ডে অবশ্যই সব প্রয়োজনীয় বুকিং ডাটা (`serviceId`, `userId`, `amountToPay`, ইত্যাদি) পাঠাতে হবে। কারণ ওয়েব হুক যখন ফায়ার হয়, তখন স্ট্রাইপ শুধুমাত্র সেশন আইডি পাঠায়, তাই মেটাডাটা না থাকলে তুমি চিনতে পারবে না এই পেমেন্ট কার জন্য।

### Step 4: Idempotency Handling
- ডাটাবেসে সেভ করার আগে অবশ্যই চেক করবে এই `payment_intent_id` অলরেডি তোমার ডাটাবেসে আছে কি না। একই ওয়েব হুক স্ট্রাইপ একাধিকবার পাঠাতে পারে। এই চেক না করলে ডুপ্লিকেট বুকিং তৈরি হবে।

### Step 5: Secure Signature Verification
- `api/payment/webhook` রাউটে অবশ্যই `stripe.webhooks.constructEvent` ব্যবহার করবে। এটা বাদ দিলে সিকিউরিটিতে বড় হোল তৈরি হবে।

### Step 6: Polling on Success Page
- ইউজার পেমেন্ট করার পর যখন সাকসেস পেজে আসবে, তখন সাথে সাথেই ডাটাবেসে ডাটা নাও থাকতে পারে (ওয়েবেহুক ১-২ সেকেন্ড লেট হতে পারে)। তাই সাকসেস পেজে একটি পোলিং (Polling) লজিক রাখবে যা ৫-১০ সেকেন্ড পর্যন্ত কয়েকবার চেক করবে বুকিং মেম্বার হয়েছে কি না।

---

## 🧠 Industry Insights & Production Pitfalls

1. **Race Conditions:** অনেক সময় সাকসেস পেজ লোড হয়ে যায় কিন্তু ওয়েব হুক তখনো ডেটাবেসে বুকিং তৈরি করেনি। এই অবস্থায় ইউজারকে "Processing" স্টেট দেখানো উচিত।
2. **Out-of-order Events:** `payment_intent.succeeded` ইভেন্টটি অনেক সময় `checkout.session.completed` এর আগেই আসতে পারে। তাই সবসময় স্টেট চেক করে কাজ করবে।
3. **Partial Failure:** ধরো বুকিং তৈরি হয়েছে কিন্তু পেমেন্ট রেকর্ড সেভ হওয়ার আগে সার্ভার ক্র্যাশ করেছে। এই জন্য ডাটাবেস ট্রানজ্যাকশন (Transaction) ব্যবহার করা বেস্ট প্র্যাকটিস।
4. **Logging:** প্রতিটি স্ট্রাইপ ইভেন্ট লগ করে রাখা উচিত যাতে পরবর্তীতে কোনো পেমেন্ট ডিসপিউট হলে চেক করা যায়।

---

## 📚 References

- [Official Stripe Webhook Docs](https://stripe.com/docs/webhooks)
- [Stripe Payment Intents Guide](https://stripe.com/docs/payments/payment-intents)
- [Stripe CLI Setup](https://stripe.com/docs/stripe-cli)
- [Testing Webhooks Locally](https://stripe.com/docs/webhooks/test)

---
*Generated by Antigravity AI Assistant - Production Mindset Series*



