"use client";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  CheckCircle2,
  Download,
  Home,
  Calendar,
  CreditCard,
  Mail,
  Clock,
  DollarSign,
  AlertCircle,
} from "lucide-react";
import Link from "next/link";

export default function PaymentSuccessPage() {
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
        setBookingData(result.data);
        setLoading(false);
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
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center space-y-6">
          {/* Animated Loader */}
          <div className="relative w-24 h-24 mx-auto">
            {/* Outer Ring */}
            <motion.div
              className="absolute inset-0 border-4 border-emerald-200 dark:border-emerald-900 rounded-full"
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            />
            {/* Inner Ring */}
            <motion.div
              className="absolute inset-2 border-4 border-t-emerald-600 dark:border-t-emerald-400 border-transparent rounded-full"
              animate={{ rotate: -360 }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
            />
            {/* Center Icon */}
            <motion.div
              className="absolute inset-0 flex items-center justify-center"
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <CreditCard className="w-8 h-8 text-emerald-600 dark:text-emerald-400" />
            </motion.div>
          </div>

          {/* Loading Text */}
          <div className="space-y-2">
            <motion.h3
              className="text-xl font-semibold text-gray-900 dark:text-white"
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              Processing Payment
            </motion.h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Please wait while we confirm your booking...
            </p>
          </div>

          {/* Animated Dots */}
          <div className="flex items-center justify-center gap-2">
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                className="w-2 h-2 bg-emerald-600 dark:bg-emerald-400 rounded-full"
                animate={{ y: [0, -10, 0] }}
                transition={{
                  duration: 0.6,
                  repeat: Infinity,
                  delay: i * 0.2,
                }}
              />
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Error State
  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background px-4">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="max-w-md w-full"
        >
          <div className="bg-card border border-border rounded-2xl p-8 shadow-lg text-center space-y-6">
            {/* Error Icon */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 200, damping: 15 }}
              className="relative inline-block"
            >
              <div className="absolute inset-0 bg-red-500/20 rounded-full blur-xl" />
              <div className="relative w-20 h-20 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center mx-auto">
                <AlertCircle className="w-10 h-10 text-red-600 dark:text-red-400" />
              </div>
            </motion.div>

            {/* Error Message */}
            <div className="space-y-2">
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                Payment Error
              </h1>
              <p className="text-gray-600 dark:text-gray-400">{error}</p>
            </div>

            {/* Action Button */}
            <Link
              href="/"
              className="inline-flex items-center gap-2 px-6 py-3 bg-emerald-600 hover:bg-emerald-700 dark:bg-emerald-500 dark:hover:bg-emerald-600 text-white rounded-xl transition-all hover:scale-105 active:scale-95 font-medium shadow-lg shadow-emerald-500/30"
            >
              <Home className="w-4 h-4" />
              Return to Home
            </Link>
          </div>
        </motion.div>
      </div>
    );
  }

  // Success State
  const hasDueAmount = parseFloat(bookingData?.dueAmount || 0) > 0;

  return (
    <div className="min-h-screen bg-background py-8 md:py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Success Header */}
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{
            type: "spring",
            stiffness: 200,
            damping: 20,
            delay: 0.1,
          }}
          className="text-center mb-8 md:mb-12"
        >
          {/* Animated Success Icon */}
          <div className="relative inline-block mb-6">
            {/* Glow Effect */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="absolute inset-0 bg-emerald-500/20 rounded-full blur-2xl"
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
              className="relative"
            >
              <CheckCircle2 className="w-20 h-20 md:w-24 md:h-24 text-emerald-600 dark:text-emerald-400" />
            </motion.div>

            {/* Animated Ring */}
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1.3, opacity: 0 }}
              transition={{
                delay: 0.4,
                duration: 1,
                repeat: Infinity,
                repeatDelay: 1,
              }}
              className="absolute inset-0 border-4 border-emerald-500 rounded-full"
            />
          </div>

          {/* Success Text */}
          <motion.h1
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-3"
          >
            Payment Successful!
          </motion.h1>

          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-base md:text-lg text-gray-600 dark:text-gray-400"
          >
            Your booking has been confirmed
          </motion.p>
        </motion.div>

        {/* Booking Details Card */}
        <motion.div
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 dark:from-emerald-950/30 dark:via-teal-950/30 dark:to-cyan-950/30 border-2 border-emerald-200 dark:border-emerald-800 rounded-2xl p-6 md:p-8 shadow-xl backdrop-blur-sm space-y-6"
        >
          {/* Booking ID & Status */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-6 border-b border-emerald-200 dark:border-emerald-800">
            <div>
              <p className="text-xs md:text-sm text-gray-600 dark:text-gray-400 mb-1">
                Booking ID
              </p>
              <p className="text-lg md:text-xl font-mono font-bold text-gray-900 dark:text-white">
                #{bookingData?.trackingId}
              </p>
            </div>
            <div>
              <p className="text-xs md:text-sm text-gray-600 dark:text-gray-400 mb-1">
                Transaction ID
              </p>
              <p className="text-sm md:text-base font-mono font-bold text-gray-900 dark:text-white">
                #{bookingData?.stripePaymentIntentId}
              </p>
            </div>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-100 dark:bg-emerald-900/50 border border-emerald-300 dark:border-emerald-700 w-fit">
              <span className="w-2 h-2 rounded-full bg-emerald-600 dark:bg-emerald-400 animate-pulse" />
              <span className="text-sm font-semibold text-emerald-700 dark:text-emerald-300">
                Confirmed
              </span>
            </div>
          </div>

          {/* Service & Payment Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Service Name */}
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                <Calendar className="w-4 h-4" />
                <span className="text-xs md:text-sm font-medium">Service</span>
              </div>
              <p className="text-base md:text-lg font-semibold text-gray-900 dark:text-white">
                {bookingData?.serviceName}
              </p>
            </div>

            {/* User Email */}
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                <Mail className="w-4 h-4" />
                <span className="text-xs md:text-sm font-medium">Email</span>
              </div>
              <p className="text-base md:text-lg font-semibold text-gray-900 dark:text-white break-all">
                {bookingData?.userEmail}
              </p>
            </div>

            {/* Payment Method */}
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                <CreditCard className="w-4 h-4" />
                <span className="text-xs md:text-sm font-medium">
                  Payment Method
                </span>
              </div>
              <p className="text-base md:text-lg font-semibold text-gray-900 dark:text-white capitalize">
                {bookingData?.paymentMethod}
              </p>
            </div>

            {/* Payment Option */}
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                <DollarSign className="w-4 h-4" />
                <span className="text-xs md:text-sm font-medium">
                  Payment Type
                </span>
              </div>
              <p className="text-base md:text-lg font-semibold text-gray-900 dark:text-white">
                {bookingData?.paymentOption === "full"
                  ? "Full Payment"
                  : "50% Advance Payment"}
              </p>
            </div>
          </div>

          {/* Divider */}
          <div className="border-t border-emerald-200 dark:border-emerald-800" />

          {/* Payment Summary */}
          <div className="space-y-4">
            <h3 className="text-lg md:text-xl font-bold text-gray-900 dark:text-white">
              Payment Summary
            </h3>

            <div className="space-y-3">
              {/* Total Price */}
              <div className="flex items-center justify-between">
                <span className="text-sm md:text-base text-gray-700 dark:text-gray-300">
                  Total Service Cost
                </span>
                <span className="text-base md:text-lg font-semibold text-gray-900 dark:text-white">
                  ${parseFloat(bookingData?.totalPrice || 0).toFixed(2)}
                </span>
              </div>

              {/* Amount Paid */}
              <div className="flex items-center justify-between pb-3 border-b border-emerald-200 dark:border-emerald-800">
                <span className="text-sm md:text-base text-gray-700 dark:text-gray-300">
                  Amount Paid
                </span>
                <span className="text-base md:text-lg font-bold text-emerald-600 dark:text-emerald-400">
                  ${parseFloat(bookingData?.amountPaid || 0).toFixed(2)}
                </span>
              </div>

              {/* Due Amount (if applicable) */}
              {hasDueAmount && (
                <div className="flex items-center justify-between p-4 rounded-xl bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800">
                  <span className="text-sm md:text-base font-medium text-amber-800 dark:text-amber-300">
                    Due Amount
                  </span>
                  <span className="text-base md:text-lg font-bold text-amber-600 dark:text-amber-400">
                    ${parseFloat(bookingData?.dueAmount || 0).toFixed(2)}
                  </span>
                </div>
              )}
            </div>
          </div>
        </motion.div>

        {/* What's Next Section */}
        <motion.div
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="mt-6 md:mt-8 bg-card border border-border rounded-2xl p-6 md:p-8 shadow-lg"
        >
          <h3 className="text-lg md:text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
            <Clock className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
            What's Next?
          </h3>
          <ul className="space-y-3 ml-1">
            <li className="flex items-start gap-3">
              <span className="mt-2 inline-block h-2 w-2 rounded-full bg-emerald-600 dark:bg-emerald-400 shrink-0"></span>
              <span className="text-sm md:text-base text-gray-700 dark:text-gray-300">
                A confirmation email has been sent to{" "}
                <span className="font-semibold">{bookingData?.userEmail}</span>
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="mt-2 inline-block h-2 w-2 rounded-full bg-emerald-600 dark:bg-emerald-400 shrink-0"></span>
              <span className="text-sm md:text-base text-gray-700 dark:text-gray-300">
                You can view your booking details anytime from your dashboard
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="mt-2 inline-block h-2 w-2 rounded-full bg-emerald-600 dark:bg-emerald-400 shrink-0"></span>
              <span className="text-sm md:text-base text-gray-700 dark:text-gray-300">
                Our team will contact you shortly to confirm the schedule
              </span>
            </li>
            {hasDueAmount && (
              <li className="flex items-start gap-3">
                <span className="mt-2 inline-block h-2 w-2 rounded-full bg-amber-600 dark:bg-amber-400 shrink-0"></span>
                <span className="text-sm md:text-base text-gray-700 dark:text-gray-300">
                  Please pay the remaining{" "}
                  <span className="font-semibold text-amber-600 dark:text-amber-400">
                    ${parseFloat(bookingData?.dueAmount || 0).toFixed(2)}
                  </span>{" "}
                  before the service date
                </span>
              </li>
            )}
          </ul>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mt-6 md:mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4"
        >
          {/* View Booking Button */}
          <Link
            href="/"
            className="flex items-center justify-center gap-2 px-6 py-4 bg-emerald-600 hover:bg-emerald-700 dark:bg-emerald-500 dark:hover:bg-emerald-600 text-white rounded-xl transition-all hover:scale-105 active:scale-95 font-semibold shadow-lg shadow-emerald-500/30"
          >
            <Calendar className="w-5 h-5" />
            View Booking
          </Link>

          {/* Download Receipt Button */}
          <button className="flex items-center justify-center gap-2 px-6 py-4 bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-900 dark:text-white rounded-xl transition-all hover:scale-105 active:scale-95 font-semibold border border-gray-300 dark:border-gray-600">
            <Download className="w-5 h-5" />
            Download Receipt
          </button>
        </motion.div>

        {/* Back to Home Link */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9 }}
          className="text-center mt-8"
        >
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors font-medium"
          >
            <Home className="w-4 h-4" />
            Back to Home
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
