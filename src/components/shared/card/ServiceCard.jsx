import { Star, MapPin } from "lucide-react";
import Image from "next/image";
import SecondaryButton from "../button/SecondaryButton";
import { cn } from "@/lib/utils";

const ServiceCard = ({ service }) => {
  const {
    slug,
    category,
    serviceName,
    image,
    price,
    detailedDescription,
    ratingSummary,
    locationCoverage,
  } = service;
  // Refined badge colors for a cleaner, more premium look
  const getBadgeStyle = (cat = "") => {
    switch (cat.toLowerCase()) {
      case "baby care":
        return "bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-900/20 dark:text-blue-300 dark:border-blue-800";
      case "elder care":
      case "elderly care":
        return "bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-900/20 dark:text-amber-300 dark:border-amber-800";
      case "sick care":
        return "bg-rose-50 text-rose-700 border-rose-200 dark:bg-rose-900/20 dark:text-rose-300 dark:border-rose-800";
      case "special care":
        return "bg-purple-50 text-purple-700 border-purple-200 dark:bg-purple-900/20 dark:text-purple-300 dark:border-purple-800";
      default:
        return "bg-slate-50 text-slate-700 border-slate-200 dark:bg-slate-900/20 dark:text-slate-300 dark:border-slate-800";
    }
  };
  return (
    <div className="group relative w-full h-full flex flex-col bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden transition-all duration-500 hover:shadow-2xl hover:shadow-emerald-900/5 hover:border-emerald-200 dark:hover:border-emerald-800/50 hover:-translate-y-1">
      {/* IMAGE SECTION */}
      <div className="relative w-full h-56 overflow-hidden">
        <Image
          src={image}
          alt={serviceName}
          fill
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />

        {/* Gradient Overlay for Text Readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60" />
        {/* Top Left: Category Badge */}
        <div className="absolute top-4 left-4 z-10">
          <span
            className={cn(
              "px-3 py-1 text-xs font-bold tracking-wide uppercase rounded-full border backdrop-blur-md shadow-sm",
              getBadgeStyle(category),
            )}
          >
            {category}
          </span>
        </div>
        {/* Bottom Right: Review Badge */}
        <div className="absolute bottom-4 right-4 z-10">
          <div className="flex items-center gap-1.5 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md px-2.5 py-1 rounded-lg border border-white/20 shadow-lg">
            <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
            <div className="flex items-baseline gap-1 text-xs font-bold text-slate-800 dark:text-slate-100">
              {ratingSummary.averageRating}
              <span className="text-[10px] font-medium text-slate-500 dark:text-slate-400">
                ({ratingSummary.totalReviews})
              </span>
            </div>
          </div>
        </div>
      </div>
      {/* CONTENT SECTION */}
      <div className="flex flex-col flex-1 p-6 gap-4">
        {/* Header: Name & Location */}
        <div className="space-y-2">
          <h3 className="text-xl font-bold text-slate-900 dark:text-white leading-tight group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
            {serviceName}
          </h3>

          <div className="flex items-center gap-1.5 text-slate-500 dark:text-slate-400">
            <MapPin className="w-4 h-4 shrink-0" />
            <span className="text-sm font-medium line-clamp-1">
              {locationCoverage.supportedDivisions.join(", ")}
            </span>
          </div>
        </div>
        {/* Description */}
        <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed line-clamp-2">
          {detailedDescription}
        </p>
        {/* Footer: Price & CTA */}
        <div className="mt-auto pt-5 flex items-end justify-between border-t border-slate-100 dark:border-slate-800">
          <div>
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-0.5">
              Starting from
            </p>
            <div className="flex items-baseline gap-1">
              <span className="text-2xl font-extrabold text-emerald-600 dark:text-emerald-400">
                ${price.perHour}
              </span>
              <span className="text-sm font-medium text-slate-500">/hr</span>
            </div>
          </div>
          <SecondaryButton label="View Details" href={`/services/${slug}`} />
        </div>
      </div>
    </div>
  );
};
export default ServiceCard;
