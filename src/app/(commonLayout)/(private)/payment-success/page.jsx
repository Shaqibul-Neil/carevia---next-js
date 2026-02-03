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
  console.log("sessionId", sessionId);

  useEffect(() => {
    if (!sessionId) {
      setError("Invalid payment session");
      setLoading(false);
      return;
    }
    /* 
    Stripe redirection doesn't update our DB. 
    We call this API to verify payment and finally 
    create the booking/payment records in MongoDB.
  */
    const confirmPayment = async () => {
      try {
        const response = await fetch("/api/payment/confirm", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ sessionId }),
        });
        console.log("confirmPayment---response", response);
        const result = await response.json();
        console.log("confirmPayment---result", result);
        if (!result.success) {
          setError(result.message || "Payment confirmation failed");
          setLoading(false);
          return;
        }
      } catch (error) {
        console.error("Payment confirmation error:", error);
        setError("Failed to confirm payment. Please contact support.");
        setLoading(false);
      }
    };
    //call the function immediately to start the payment process
    confirmPayment();
  }, [sessionId]);

  // Loading State
  //   if (loading) {
  //     return (
  //       <div className="min-h-screen flex items-center justify-center bg-background">
  //         <div className="text-center space-y-4">
  //           <Loader2 className="w-12 h-12 animate-spin text-primary mx-auto" />
  //           <p className="text-muted-foreground">Processing your payment...</p>
  //         </div>
  //       </div>
  //     );
  //   }

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
          {/* <div className="mb-6 pb-6 border-b border-border">
            <p className="text-sm text-muted-foreground mb-1">Booking ID</p>
            <p className="text-lg font-mono font-semibold text-foreground">
              {bookingData?.bookingId}
            </p>
          </div> */}

          {/* Service Details */}
          {/* <div className="space-y-4 mb-6">
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
                  {bookingData?.paymentOption === "half"
                    ? "50% Advance"
                    : "Full Payment"}
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
          </div> */}

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
                <span>
                  A confirmation email has been sent to your registered email
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-0.5">✓</span>
                <span>
                  You can view your booking details anytime from your dashboard
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-0.5">✓</span>
                <span>
                  Our team will contact you shortly to confirm the schedule
                </span>
              </li>
            </ul>
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Link
              href="/"
              //   href={`/booking/${bookingData?.bookingId}`}
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
