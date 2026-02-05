import {
  getServicesByCategory,
  getSingleServiceDetails,
} from "@/modules/services/servicesService";
import Image from "next/image";
import {
  Star,
  MapPin,
  Clock,
  CheckCircle2,
  Users,
  Award,
  Heart,
  Phone,
  BadgeCheck,
  ShieldCheck,
  Calendar,
  CreditCard,
} from "lucide-react";
import PrimaryButton from "@/components/shared/button/PrimaryButton";
import RelatedServiceCard from "@/components/shared/card/RelatedServiceCard";
import ServiceDetailsTabs from "@/components/shared/button/ServiceDetailsTabs";
import AdditionalInfo from "@/components/service details/AdditionalInfo";
import BookingPolicy from "@/components/service details/BookingPolicy";
import Reviews from "@/components/service details/Reviews";

/* ===========================
    Dynamic SEO Metadata
=========================== */
export async function generateMetadata({ params }) {
  const { slug } = await params;
  // fetch data
  const service = await getSingleServiceDetails(slug);
  if (!service) {
    return {
      title: "Service Not Found - Carevia",
      description: "Care That Comes Home",
    };
  }
  return {
    title: `${service.serviceName} - Carevia`,
    description:
      service.detailedDescription ||
      `Book trusted ${service.category} services with verified caregivers at Carevia.`,
    openGraph: {
      title: `${service.serviceName} - Carevia`,
      description:
        service.detailedDescription ||
        `Reliable ${service.category} services delivered to your home.`,
      images: [service.image],
    },
  };
}

/* ===========================
   Page Component
=========================== */

const ServiceDetailsPage = async ({ params }) => {
  const { slug } = await params;
  const service = await getSingleServiceDetails(slug);

  // If no service, show message instead of notFound()
  if (!service) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-foreground mb-4">
            Service Not Found
          </h1>
          <p className="text-muted-foreground">
            The service you&apos;re looking for doesn&apos;t exist.
          </p>
        </div>
      </div>
    );
  }

  const {
    serviceName,
    shortTitle,
    category,
    image,
    price,
    availability,
    ageGroupSupported,
    caregiverProfile,
    safetyMeasures,
    ratingSummary,
    locationCoverage,
    status,
    isFeatured,
  } = service || {};

  // Related services (same category)
  const relatedServices = await getServicesByCategory(category);
  const relatedServicesFiltered = relatedServices.filter(
    (s) => s._id !== service._id,
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white dark:from-gray-950 dark:to-gray-900">
      {/* Main Content Section */}
      <section className="container mx-auto px-4 py-12 md:py-16 lg:py-20">
        <div className="max-w-7xl mx-auto">
          {/* Grid Layout: 3-1 */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 lg:gap-12">
            {/* LEFT: Main Service Details (3 columns) */}
            <div className="lg:col-span-3">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Service Image */}
                <div className="lg:col-span-1">
                  <div className="sticky top-24">
                    <div className="relative h-96 lg:h-[500px] rounded-2xl overflow-hidden group bg-gradient-to-br from-emerald-100 to-teal-100 dark:from-emerald-900/20 dark:to-teal-900/20 shadow-lg border border-gray-200 dark:border-gray-700">
                      <Image
                        src={image}
                        alt={serviceName}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                        priority
                      />
                      {/* Overlay gradient */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

                      {/* Top Left - Status Badge */}
                      <div className="absolute top-4 left-4 z-10">
                        <div className="flex items-center gap-2 bg-emerald-600/95 dark:bg-emerald-500/95 backdrop-blur-sm px-4 py-2 rounded-xl shadow-lg">
                          <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
                          <span className="text-xs font-semibold text-white uppercase tracking-wide">
                            {status}
                          </span>
                        </div>
                      </div>

                      {/* Top Right - Featured Badge */}
                      {isFeatured && (
                        <div className="absolute top-4 right-4 z-10">
                          <div className="flex items-center gap-2 bg-amber-500/95 backdrop-blur-sm px-4 py-2 rounded-xl shadow-lg">
                            <Award className="w-4 h-4 text-white" />
                            <span className="text-xs font-semibold text-white uppercase tracking-wide">
                              Featured
                            </span>
                          </div>
                        </div>
                      )}

                      {/* Bottom Left - Category */}
                      <div className="absolute bottom-4 left-4 z-10">
                        <div className="bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm px-5 py-3 rounded-xl shadow-lg border border-emerald-200 dark:border-emerald-800">
                          <p className="text-xs text-gray-600 dark:text-gray-400 font-medium uppercase tracking-wide mb-1">
                            Category
                          </p>
                          <p className="text-sm font-bold text-gray-900 dark:text-white">
                            {category}
                          </p>
                        </div>
                      </div>

                      {/* Bottom Right - Rating */}
                      <div className="absolute bottom-4 right-4 z-10">
                        <div className="flex items-center gap-2 bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm px-5 py-3 rounded-xl shadow-lg border border-amber-200 dark:border-amber-800">
                          <Star className="w-5 h-5 text-amber-500 fill-amber-500" />
                          <div>
                            <p className="text-base font-bold text-gray-900 dark:text-white leading-none">
                              {ratingSummary.averageRating}
                            </p>
                            <p className="text-[10px] text-gray-600 dark:text-gray-400 leading-none mt-1">
                              {ratingSummary.totalReviews} reviews
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Service Info */}
                <div className="lg:col-span-1 flex flex-col gap-6">
                  {/* Header */}
                  <div className="space-y-3">
                    <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white leading-tight">
                      {serviceName}
                    </h1>
                    <p className="text-lg text-gray-600 dark:text-gray-400 font-medium">
                      {shortTitle}
                    </p>
                  </div>

                  {/* Price Card */}
                  <div className="p-6 rounded-xl bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 dark:from-emerald-950/30 dark:via-teal-950/30 dark:to-cyan-950/30 border-2 border-emerald-200 dark:border-emerald-800 shadow-lg">
                    <div className="flex items-center gap-2 mb-3">
                      <CreditCard className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                      <p className="text-xs text-gray-600 dark:text-gray-400 font-semibold uppercase tracking-wide">
                        Pricing Starts From
                      </p>
                    </div>
                    <div className="flex items-baseline gap-3 mb-2">
                      <span className="text-4xl font-bold text-emerald-600 dark:text-emerald-400">
                        ${price.perHour}
                      </span>
                      <span className="text-lg text-gray-600 dark:text-gray-400 font-medium">
                        / hour
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                      <span>or ${price.perDay} / day</span>
                    </div>
                  </div>

                  {/* Trust Badges */}
                  <div className="grid grid-cols-2 gap-3">
                    {caregiverProfile?.verifiedCaregivers && (
                      <div className="flex items-center gap-2 bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800 rounded-xl px-4 py-3 transition-all duration-300 hover:shadow-md">
                        <BadgeCheck className="w-5 h-5 text-blue-600 dark:text-blue-400 shrink-0" />
                        <span className="text-xs font-semibold text-blue-700 dark:text-blue-300">
                          Verified
                        </span>
                      </div>
                    )}
                    {caregiverProfile?.backgroundChecked && (
                      <div className="flex items-center gap-2 bg-green-50 dark:bg-green-950/30 border border-green-200 dark:border-green-800 rounded-xl px-4 py-3 transition-all duration-300 hover:shadow-md">
                        <ShieldCheck className="w-5 h-5 text-green-600 dark:text-green-400 shrink-0" />
                        <span className="text-xs font-semibold text-green-700 dark:text-green-300">
                          Background Checked
                        </span>
                      </div>
                    )}
                    {safetyMeasures?.emergencyTraining && (
                      <div className="flex items-center gap-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-3 transition-all duration-300 hover:shadow-md">
                        <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400 flex-shrink-0" />
                        <span className="text-xs font-semibold text-gray-900 dark:text-white">
                          Emergency Trained
                        </span>
                      </div>
                    )}
                    {availability?.emergencySupport && (
                      <div className="flex items-center gap-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-3 transition-all duration-300 hover:shadow-md">
                        <Phone className="w-5 h-5 text-emerald-600 dark:text-emerald-400 flex-shrink-0" />
                        <span className="text-xs font-semibold text-gray-900 dark:text-white">
                          24/7 Support
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Divider */}
                  <div className="border-t border-gray-200 dark:border-gray-700"></div>

                  {/* Quick Info */}
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-950/30 flex items-center justify-center shrink-0">
                        <Clock className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-gray-900 dark:text-white">
                          {availability.workingHours}
                        </p>
                        <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                          {availability.serviceType.join(", ")} booking
                          available
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-950/30 flex items-center justify-center shrink-0">
                        <MapPin className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-gray-900 dark:text-white">
                          {locationCoverage.supportedDivisions.join(", ")}
                        </p>
                        <div className="flex items-center gap-2 mt-1">
                          <p className="text-xs text-gray-600 dark:text-gray-400">
                            Service coverage areas
                          </p>
                          {locationCoverage.serviceAtHome && (
                            <span className="text-[10px] bg-emerald-100 dark:bg-emerald-900/50 text-emerald-700 dark:text-emerald-300 px-2 py-0.5 rounded-full font-semibold">
                              At Home
                            </span>
                          )}
                        </div>
                      </div>
                    </div>

                    {ageGroupSupported && (
                      <div className="flex items-start gap-3">
                        <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-950/30 flex items-center justify-center shrink-0">
                          <Users className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-gray-900 dark:text-white">
                            Age {ageGroupSupported.minAgeInMonths} months -{" "}
                            {ageGroupSupported.maxAgeInYears} years
                          </p>
                          <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                            Age group supported
                          </p>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Book Now Button */}
                  <div className="mt-auto pt-4">
                    <PrimaryButton
                      label="Book This Service Now"
                      href={`/booking/${service._id}`}
                      className="w-full"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* RIGHT: Related Services Sidebar (1 column) */}
            <div className="lg:col-span-1">
              <div className="sticky top-24">
                <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl p-6 shadow-lg">
                  <div className="flex items-center gap-2 mb-6">
                    <Heart className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                      Related Services
                    </h3>
                  </div>
                  <div className="space-y-4">
                    {relatedServicesFiltered?.map((relatedService, index) => (
                      <RelatedServiceCard
                        key={relatedService._id || index}
                        relatedService={relatedService}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tabs Section */}
      <ServiceDetailsTabs>
        <AdditionalInfo service={service} />
        <BookingPolicy service={service} />
        <Reviews service={service} />
      </ServiceDetailsTabs>
    </div>
  );
};

export default ServiceDetailsPage;
