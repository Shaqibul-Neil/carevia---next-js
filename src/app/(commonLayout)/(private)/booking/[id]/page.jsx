import { getServiceForBookingPage } from "@/modules/services/servicesService";
import React from "react";
import Image from "next/image";
import { Clock, MapPin, ShieldCheck } from "lucide-react";
import PageHeading from "@/components/headings/PageHeading";
import BookingForm from "@/components/form/BookingForm";

export const metadata = {
  title: "Service Booking",
  description: "Care That Comes Home",
};

const BookingPage = async ({ params }) => {
  const { id } = await params;
  const service = await getServiceForBookingPage(id);

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white dark:from-gray-950 dark:to-gray-900">
      {/* Page Heading */}
      <PageHeading
        badge="Secure & Verified Booking"
        heading="Complete Your"
        highlight="Care Booking"
        subheading="Choose your preferred schedule and location. Our verified caregivers are ready to provide exceptional service with complete peace of mind."
        icon={ShieldCheck}
        trustIndicators={[
          "Instant Confirmation",
          "Flexible Scheduling",
          "100% Satisfaction Guaranteed",
        ]}
        variant="gradient"
      />

      {/* Main Booking Content */}
      <section className="container mx-auto px-4 py-12 md:py-16 lg:py-20">
        <div className="max-w-7xl mx-auto">
          {/* Two Column Layout */}
          <div className="grid lg:grid-cols-5 gap-8 lg:gap-12">
            {/* LEFT: Service Summary Card */}
            <div className="lg:col-span-2">
              <div className="sticky top-24">
                <div className="bg-white dark:bg-gray-800 rounded-xs shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden transition-all duration-300 hover:shadow-xl">
                  {/* Service Image */}
                  <div className="relative aspect-[4/3] overflow-hidden bg-gradient-to-br from-emerald-100 to-teal-100 dark:from-emerald-900/20 dark:to-teal-900/20">
                    <Image
                      src={service.image}
                      alt={service.serviceName}
                      fill
                      className="object-cover"
                      priority
                    />
                    {/* Category Badge Overlay */}
                    <div className="absolute top-4 left-4">
                      <span className="inline-flex items-center px-3 py-1.5 rounded-full text-xs font-semibold bg-white/95 dark:bg-gray-900/95 text-emerald-700 dark:text-emerald-300 backdrop-blur-sm border border-emerald-200 dark:border-emerald-700 shadow-sm">
                        {service.category}
                      </span>
                    </div>
                    {/* Category Badge Overlay */}
                    <div className="absolute bottom-4 right-4 z-10 flex items-center gap-1 bg-muted px-2.5 py-1.5 rounded-xs transition-all duration-300">
                      <MapPin className="w-3.5 h-3.5 text-primary" />
                      <span className="text-[0.8125rem] font-medium text-slate-600 dark:text-slate-300">
                        {service?.locationCoverage?.supportedDivisions.join(
                          ", ",
                        )}
                      </span>
                    </div>
                  </div>

                  {/* Service Info */}
                  <div className="p-6 space-y-4">
                    <div>
                      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                        {service.serviceName}
                      </h2>
                      <p className="text-sm text-gray-500 dark:text-gray-400 flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                        Professional {service.category} Service
                      </p>
                    </div>

                    {/* Price Hint */}
                    <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                        Starting from
                      </p>
                      <div className="flex items-baseline gap-2">
                        <span className="text-3xl font-bold text-emerald-600 dark:text-emerald-400">
                          {service.price.perHour}
                        </span>
                        <span className="text-lg text-gray-500 dark:text-gray-400">
                          ${service.currency}/hour
                        </span>
                      </div>
                    </div>

                    {/* Trust Indicators */}
                    <div className="pt-4 space-y-3">
                      <div className="flex items-start gap-3 text-sm text-gray-600 dark:text-gray-400">
                        <ShieldCheck className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                        <span>
                          All caregivers are background-verified and trained
                          professionals
                        </span>
                      </div>
                      <div className="flex items-start gap-3 text-sm text-gray-600 dark:text-gray-400">
                        <Clock className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                        <span>
                          Flexible scheduling with same-day availability
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* RIGHT: Booking Configuration Card */}
            <div className="lg:col-span-3">
              <div className="bg-white dark:bg-gray-800 rounded-xs shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
                <div className="p-6 md:p-8 lg:p-10 space-y-6 md:space-y-8">
                  {/* Section Header */}
                  <div className="space-y-2">
                    <h3 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white">
                      Configure Your Booking
                    </h3>
                    <p className="text-sm md:text-base text-gray-600 dark:text-gray-400">
                      Customize your service schedule and location preferences
                    </p>
                  </div>

                  {/* Booking Form Component */}
                  <BookingForm service={service} />
                  {/* Security Note */}
                  <div className="flex items-center justify-center gap-2 text-xs md:text-sm text-gray-500 dark:text-gray-400">
                    <ShieldCheck className="w-3.5 h-3.5 md:w-4 md:h-4" />
                    <span>
                      Secure payment powered by industry-leading encryption
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default BookingPage;
