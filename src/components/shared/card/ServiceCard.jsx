import { Star, MapPin } from "lucide-react";
import Image from "next/image";
import SecondaryButton from "../button/SecondaryButton";

const ServiceCard = ({ service }) => {
  const {
    category,
    serviceName,
    image,
    price,
    detailedDescription,
    ratingSummary,
    locationCoverage,
  } = service;

  return (
    <div className="w-full">
      {/* Main Card Container */}
      <div className="service-card relative w-full min-h-120 rounded-2xl overflow-hidden flex flex-col shadow-[0_8px_24px_rgba(34,197,94,0.08),0_2px_8px_rgba(34,197,94,0.04)] transition-all duration-400 ease-in-out hover:shadow-[0_12px_32px_rgba(34,197,94,0.12),0_4px_12px_rgba(34,197,94,0.08)] hover:-translate-y-1">
        {/* Background Layer */}
        <div className="card-bg absolute inset-0.5 z-2 bg-white/98 dark:bg-slate-800/95 backdrop-blur-2xl rounded-xl border-[1.5px] border-slate-200/60 dark:border-slate-700/60 transition-all duration-300"></div>

        {/* Animated Blob */}
        <div className="card-blob"></div>

        {/* Card Content */}
        <div className="relative z-3 flex flex-col h-full p-5">
          {/* Service Image */}
          <div className="w-full h-50 rounded-xl overflow-hidden mb-4 bg-linear-to-br from-slate-100 to-slate-200 dark:from-slate-700 dark:to-slate-800 relative">
            <Image
              src={image}
              alt={serviceName}
              width={280}
              height={180}
              className="w-full h-full object-cover transition-transform duration-500 ease-in-out hover:scale-105"
            />
            {/* Dark Overlay */}
            <div className="absolute inset-0 bg-black/20 dark:bg-black/35 pointer-events-none"></div>
            {/* Location Badge - Bottom Right */}
            <div className="absolute bottom-4 right-4 z-10 flex items-center gap-1 bg-muted px-2.5 py-1.5 rounded-lg transition-all duration-300">
              <MapPin className="w-3.5 h-3.5 text-primary" />
              <span className="text-[0.8125rem] font-medium text-slate-600 dark:text-slate-300">
                {locationCoverage.supportedDivisions.join(", ")}
              </span>
            </div>
          </div>

          {/* Service Info Section */}
          <div className="flex flex-col gap-3 flex-1">
            <div className="flex justify-between items-center">
              {/* Service Name */}
              <h3 className="text-xl font-semibold text-foreground leading-[1.4] m-0">
                {serviceName}
              </h3>
            </div>
            <div className="flex justify-between items-center">
              {/* Rating Container */}
              <div className="flex items-center gap-1.5">
                <Star className="w-4 h-4 text-amber-500 fill-current" />
                <span className="text-sm font-semibold text-foreground">
                  {ratingSummary.averageRating}
                </span>
                <span className="text-[0.8125rem] text-muted-foreground font-normal">
                  ({ratingSummary.totalReviews} reviews)
                </span>
              </div>
              {/* Category Badge - Top Left */}
              <div>
                <p className="text-xs font-bold tracking-wide text-green-800 px-2 py-1 rounded-lg bg-green-100">
                  {category}
                </p>
              </div>
            </div>

            {/* Description - Line Clamp 2 */}
            <p className="text-[0.9375rem] leading-[1.65] text-slate-600 dark:text-slate-300 m-0 line-clamp-2">
              {detailedDescription}
            </p>

            {/* Bottom Row - Price & Location */}
            <div className="flex items-end justify-between mt-auto pt-4 border-t border-border">
              {/* Price Container */}
              <div className="flex flex-col gap-0.5">
                <span className="text-xs text-muted-foreground font-medium uppercase tracking-wide">
                  Starting from
                </span>
                <span className="text-2xl font-bold text-primary leading-none">
                  ${price.perHour}
                  <span className="text-sm font-medium text-muted-foreground ml-0.5">
                    /hr
                  </span>
                </span>
              </div>
              {/* Details button */}
              <SecondaryButton label="View Details" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceCard;
