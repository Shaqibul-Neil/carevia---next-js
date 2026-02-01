import { Calendar, Clock, XCircle, CheckCircle2, FileCheck } from "lucide-react";

const BookingPolicy = ({ service }) => {
  const { bookingRules, availability } = service;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Booking Rules */}
      <div className="bg-card border border-border rounded-lg p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-8 h-8 rounded-lg bg-green-500/10 flex items-center justify-center shrink-0">
            <FileCheck className="w-4 h-4 text-green-600 dark:text-green-400" />
          </div>
          <h3 className="text-lg font-bold text-foreground">
            Booking Rules
          </h3>
        </div>
        <div className="space-y-3">
          {/* Minimum Duration */}
          <div className="flex items-start gap-3">
            <div className="w-1.5 h-1.5 rounded-full bg-green-600 dark:bg-green-400 shrink-0 mt-1.5" />
            <div>
              <p className="text-sm font-semibold text-foreground">
                Minimum Duration
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                {bookingRules.minBookingDurationHours} hours minimum
              </p>
            </div>
          </div>

          {/* Instant Booking */}
          <div className="flex items-start gap-3">
            <div className="w-1.5 h-1.5 rounded-full bg-green-600 dark:bg-green-400 shrink-0 mt-1.5" />
            <div>
              <p className="text-sm font-semibold text-foreground">
                Instant Booking
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                {bookingRules.instantBooking
                  ? "Available instantly"
                  : "Requires approval"}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Service Availability */}
      <div className="bg-card border border-border rounded-lg p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-8 h-8 rounded-lg bg-green-500/10 flex items-center justify-center shrink-0">
            <Calendar className="w-4 h-4 text-green-600 dark:text-green-400" />
          </div>
          <h3 className="text-lg font-bold text-foreground">
            Availability
          </h3>
        </div>
        <div className="space-y-3">
          <div className="flex items-start gap-3">
            <div className="w-1.5 h-1.5 rounded-full bg-green-600 dark:bg-green-400 shrink-0 mt-1.5" />
            <div>
              <p className="text-sm font-semibold text-foreground">
                Service Types
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                {availability.serviceType.join(", ")}
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-1.5 h-1.5 rounded-full bg-green-600 dark:bg-green-400 shrink-0 mt-1.5" />
            <div>
              <p className="text-sm font-semibold text-foreground">
                Working Hours
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                {availability.workingHours}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Cancellation Policy */}
      <div className="bg-card border border-border rounded-lg p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-8 h-8 rounded-lg bg-red-500/10 flex items-center justify-center shrink-0">
            <XCircle className="w-4 h-4 text-red-600 dark:text-red-400" />
          </div>
          <h3 className="text-lg font-bold text-foreground">
            Cancellation Policy
          </h3>
        </div>
        <div className="flex items-start gap-3">
          <div className="w-1.5 h-1.5 rounded-full bg-green-600 dark:bg-green-400 shrink-0 mt-1.5" />
          <div>
            <p className="text-sm text-foreground leading-relaxed">
              {bookingRules.cancellationPolicy}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingPolicy;
