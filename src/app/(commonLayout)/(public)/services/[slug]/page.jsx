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
} from "lucide-react";
import SecondaryButton from "@/components/shared/button/SecondaryButton";
import RelatedServiceCard from "@/components/shared/card/RelatedServiceCard";
import ServiceDetailsTabs from "@/components/shared/button/ServiceDetailsTabs";
import AdditionalInfo from "@/components/service details/AdditionalInfo";
import BookingPolicy from "@/components/service details/BookingPolicy";
import Reviews from "@/components/service details/Reviews";

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
            The service you're looking for doesn't exist.
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
  } = service;

  // Related services (mock data - same category)
  const relatedServices = await getServicesByCategory(category);
  const relatedServicesFiltered = relatedServices.filter(
    (s) => s._id !== service._id,
  );

  return (
    <div className="min-h-screen bg-background">
      {/* Top Section - 4 Grid Layout */}
      <div className="container mx-auto px-4 py-8 lg:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Main Service Details - 3 Grids */}
          <div className="lg:col-span-3">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Left Side - Image */}
              <div className="relative h-[400px] lg:h-[500px] rounded-lg overflow-hidden group">
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
                  <div className="flex items-center gap-2 bg-primary/95 backdrop-blur-sm px-3 py-1.5 rounded-lg shadow-lg">
                    <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
                    <span className="text-xs font-semibold text-white uppercase tracking-wide">
                      {status}
                    </span>
                  </div>
                </div>

                {/* Top Right - Featured Badge (if featured) */}
                {isFeatured && (
                  <div className="absolute top-4 right-4 z-10">
                    <div className="flex items-center gap-1.5 bg-amber-500/95 backdrop-blur-sm px-3 py-1.5 rounded-lg shadow-lg">
                      <Award className="w-3.5 h-3.5 text-white" />
                      <span className="text-xs font-semibold text-white uppercase tracking-wide">
                        Featured
                      </span>
                    </div>
                  </div>
                )}

                {/* Bottom Left - Category */}
                <div className="absolute bottom-4 left-4 z-10">
                  <div className="bg-white/95 dark:bg-slate-800/95 backdrop-blur-sm px-4 py-2 rounded-lg shadow-lg">
                    <p className="text-xs text-muted-foreground font-medium uppercase tracking-wide mb-0.5">
                      Category
                    </p>
                    <p className="text-sm font-bold text-foreground">
                      {category}
                    </p>
                  </div>
                </div>

                {/* Bottom Right - Rating */}
                <div className="absolute bottom-4 right-4 z-10">
                  <div className="flex items-center gap-2 bg-white/95 dark:bg-slate-800/95 backdrop-blur-sm px-4 py-2 rounded-lg shadow-lg">
                    <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
                    <div>
                      <p className="text-sm font-bold text-foreground leading-none">
                        {ratingSummary.averageRating}
                      </p>
                      <p className="text-[10px] text-muted-foreground leading-none mt-0.5">
                        {ratingSummary.totalReviews} reviews
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Side - Service Info */}
              <div className="flex flex-col gap-6">
                {/* Header */}
                <div>
                  <h1 className="text-3xl lg:text-4xl font-bold text-foreground mb-2 leading-tight">
                    {serviceName}
                  </h1>
                  <p className="text-lg text-muted-foreground font-medium">
                    {shortTitle}
                  </p>
                </div>

                {/* Price Card */}
                <div className="bg-gradient-to-br from-primary/10 to-primary/5 dark:from-primary/20 dark:to-primary/10 border border-primary/20 rounded-lg p-5">
                  <p className="text-xs text-muted-foreground font-semibold uppercase tracking-wide mb-3">
                    Pricing Starts From
                  </p>
                  <div className="flex items-baseline gap-3 mb-2">
                    <span className="text-4xl font-bold text-primary">
                      ${price.perHour}
                    </span>
                    <span className="text-lg text-muted-foreground font-medium">
                      / hour
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <span>or ${price.perDay} / day</span>
                  </div>
                </div>

                {/* Trust Badges */}
                <div className="grid grid-cols-2 gap-3">
                  {caregiverProfile?.verifiedCaregivers && (
                    <div className="flex items-center gap-2 bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800 rounded-lg px-3 py-2.5">
                      <BadgeCheck className="w-4 h-4 text-blue-600 dark:text-blue-400 shrink-0" />
                      <span className="text-xs font-semibold text-blue-700 dark:text-blue-300">
                        Verified
                      </span>
                    </div>
                  )}
                  {caregiverProfile?.backgroundChecked && (
                    <div className="flex items-center gap-2 bg-green-50 dark:bg-green-950/30 border border-green-200 dark:border-green-800 rounded-lg px-3 py-2.5">
                      <ShieldCheck className="w-4 h-4 text-green-600 dark:text-green-400 shrink-0" />
                      <span className="text-xs font-semibold text-green-700 dark:text-green-300">
                        Background Checked
                      </span>
                    </div>
                  )}
                  {safetyMeasures?.emergencyTraining && (
                    <div className="flex items-center gap-2 bg-card border border-border rounded-lg px-3 py-2.5">
                      <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0" />
                      <span className="text-xs font-semibold text-foreground">
                        Emergency Trained
                      </span>
                    </div>
                  )}
                  {availability?.emergencySupport && (
                    <div className="flex items-center gap-2 bg-card border border-border rounded-lg px-3 py-2.5">
                      <Phone className="w-4 h-4 text-primary flex-shrink-0" />
                      <span className="text-xs font-semibold text-foreground">
                        24/7 Support
                      </span>
                    </div>
                  )}
                </div>

                {/* Quick Info */}
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <Clock className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-sm font-semibold text-foreground">
                        {availability.workingHours}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {availability.serviceType.join(", ")} booking available
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-sm font-semibold text-foreground">
                        {locationCoverage.supportedDivisions.join(", ")}
                      </p>
                      <div className="flex items-center gap-2 mt-1">
                        <p className="text-xs text-muted-foreground">
                          Service coverage areas
                        </p>
                        {locationCoverage.serviceAtHome && (
                          <span className="text-[10px] bg-primary/10 text-primary px-2 py-0.5 rounded-full font-semibold">
                            At Home
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  {ageGroupSupported && (
                    <div className="flex items-start gap-3">
                      <Users className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="text-sm font-semibold text-foreground">
                          Age {ageGroupSupported.minAgeInMonths} months -{" "}
                          {ageGroupSupported.maxAgeInYears} years
                        </p>
                        <p className="text-xs text-muted-foreground">
                          Age group supported
                        </p>
                      </div>
                    </div>
                  )}
                </div>

                {/* Book Now Button */}
                <div className="mt-auto">
                  <SecondaryButton
                    label="Book Now"
                    className="w-48 py-3 text-base font-semibold"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Related Services - 1 Grid */}
          <div className="lg:col-span-1">
            <div className="bg-card border border-border rounded-lg p-6 sticky top-6">
              <h3 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
                <Heart className="w-5 h-5 text-primary" />
                Related Services
              </h3>
              <div className="space-y-3">
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

      {/* Bottom Section - Tabs */}
      <ServiceDetailsTabs>
        <AdditionalInfo service={service} />
        <BookingPolicy service={service} />
        <Reviews service={service} />
      </ServiceDetailsTabs>
    </div>
  );
};

export default ServiceDetailsPage;
