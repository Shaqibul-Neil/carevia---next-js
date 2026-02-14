import { Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const RelatedServiceCard = ({ relatedService }) => {
  return (
    <Link
      href={`/services/${relatedService.slug}`}
      className="flex gap-4 p-4 rounded-xs border border-gray-200 dark:border-gray-700 hover:border-emerald-300 dark:hover:border-emerald-700 hover:bg-emerald-50/50 dark:hover:bg-emerald-950/20 transition-all duration-300 cursor-pointer group shadow-sm hover:shadow-md"
    >
      {/* Left - Image */}
      <div className="relative w-18 h-18 rounded-xs overflow-hidden shrink-0 bg-gradient-to-br from-emerald-100 to-teal-100 dark:from-emerald-900/20 dark:to-teal-900/20">
        <Image
          src={relatedService.image}
          alt={relatedService.serviceName}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-110"
        />
      </div>

      {/* Right - Content */}
      <div className="flex flex-col gap-2 min-w-0 flex-1">
        {/* Service Name */}
        <h4 className="text-sm font-semibold text-gray-900 dark:text-white line-clamp-1 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
          {relatedService.serviceName}
        </h4>

        {/* Rating */}
        <div className="flex items-center gap-1.5">
          <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
          <span className="text-xs font-semibold text-gray-900 dark:text-white">
            {relatedService.ratingSummary.averageRating}
          </span>
          <span className="text-xs text-gray-500 dark:text-gray-400">
            ({relatedService.ratingSummary.totalReviews})
          </span>
        </div>

        {/* Price */}
        <div className="flex items-baseline gap-1">
          <span className="text-base font-bold text-emerald-600 dark:text-emerald-400">
            ${relatedService.price.perHour}
          </span>
          <span className="text-xs text-gray-500 dark:text-gray-400">/hr</span>
        </div>
      </div>
    </Link>
  );
};

export default RelatedServiceCard;
