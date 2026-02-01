import { Calendar, Clock, XCircle, CheckCircle2, FileCheck } from "lucide-react";

const BookingPolicy = ({ service }) => {
  const { bookingRules, availability } = service;

  return (
    <div className="container mx-auto px-4 py-12 md:py-16">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Booking Rules */}
          <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950/30 dark:to-emerald-950/30 flex items-center justify-center shrink-0 border border-green-200 dark:border-green-800">
                <FileCheck className="w-5 h-5 text-green-600 dark:text-green-400" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                Booking Rules
              </h3>
            </div>
            <div className="space-y-4">
              {/* Minimum Duration */}
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-green-600 dark:bg-green-400 shrink-0 mt-2" />
                <div>
                  <p className="text-sm font-semibold text-gray-900 dark:text-white">
                    Minimum Duration
                  </p>
                  <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                    {bookingRules.minBookingDurationHours} hours minimum
                  </p>
                </div>
              </div>

              {/* Instant Booking */}
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-green-600 dark:bg-green-400 shrink-0 mt-2" />
                <div>
                  <p className="text-sm font-semibold text-gray-900 dark:text-white">
                    Instant Booking
                  </p>
                  <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                    {bookingRules.instantBooking
                      ? "Available instantly"
                      : "Requires approval"}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Service Availability */}
          <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-950/30 dark:to-cyan-950/30 flex items-center justify-center shrink-0 border border-blue-200 dark:border-blue-800">
                <Calendar className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                Availability
              </h3>
            </div>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-blue-600 dark:bg-blue-400 shrink-0 mt-2" />
                <div>
                  <p className="text-sm font-semibold text-gray-900 dark:text-white">
                    Service Types
                  </p>
                  <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                    {availability.serviceType.join(", ")}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-blue-600 dark:bg-blue-400 shrink-0 mt-2" />
                <div>
                  <p className="text-sm font-semibold text-gray-900 dark:text-white">
                    Working Hours
                  </p>
                  <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                    {availability.workingHours}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Cancellation Policy */}
          <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-red-50 to-orange-50 dark:from-red-950/30 dark:to-orange-950/30 flex items-center justify-center shrink-0 border border-red-200 dark:border-red-800">
                <XCircle className="w-5 h-5 text-red-600 dark:text-red-400" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                Cancellation Policy
              </h3>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 rounded-full bg-red-600 dark:bg-red-400 shrink-0 mt-2" />
              <div>
                <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                  {bookingRules.cancellationPolicy}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingPolicy;
