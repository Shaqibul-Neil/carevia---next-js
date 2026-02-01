import { Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const RelatedServiceCard = ({ relatedService }) => {
  return (
    <Link
      href={`/services/${relatedService.slug}`}
      className="flex gap-3 p-3 rounded-lg border border-border hover:border-primary/50 hover:bg-primary/5 transition-all duration-300 cursor-pointer group"
    >
      {/* Left - Image */}
      <div className="relative w-15 h-15 rounded-lg overflow-hidden shrink-0">
        <Image
          src={relatedService.image}
          alt={relatedService.serviceName}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-110"
        />
      </div>
      {/* Right - Content */}
      <div className="flex flex-col gap-1 min-w-0">
        {/* Service Name */}
        <h4 className="text-sm font-semibold text-foreground line-clamp-2 group-hover:text-primary transition-colors">
          {relatedService.serviceName}
        </h4>

        {/* Rating */}
        <div className="flex items-center gap-1">
          <Star className="w-3 h-3 text-amber-500 fill-amber-500" />
          <span className="text-xs font-semibold text-foreground">
            {relatedService.ratingSummary.averageRating}
          </span>
        </div>
        {/* Price */}
        <div>
          {/* Price */}
          <div className="flex items-baseline gap-1">
            <span className="text-sm font-bold text-primary">
              <span className="text-[10px] text-muted-foreground">
                Starts from
              </span>{" "}
              ${relatedService.price.perHour}
            </span>
            <span className="text-[10px] text-muted-foreground">/hr</span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default RelatedServiceCard;
