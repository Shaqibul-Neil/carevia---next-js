import React from "react";

const ServicesLoading = () => {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        {[...Array(12)].map((_, i) => (
          <div key={i} className="w-full">
            {/* Main Card Container */}
            <div className="relative w-full min-h-120 rounded-2xl overflow-hidden flex flex-col shadow-[0_8px_24px_rgba(34,197,94,0.08),0_2px_8px_rgba(34,197,94,0.04)]">
              {/* Background Layer */}
              <div className="absolute inset-0.5 z-2 bg-white/98 dark:bg-slate-800/95 backdrop-blur-2xl rounded-xl border-[1.5px] border-slate-200/60 dark:border-slate-700/60"></div>

              {/* Card Content */}
              <div className="relative z-3 flex flex-col h-full p-5 space-y-4">
                {/* Image Skeleton */}
                <div className="w-full h-50 rounded-xl overflow-hidden bg-slate-200 dark:bg-slate-700 animate-pulse relative">
                  {/* Shimmer effect */}
                  <div className="absolute inset-0 -translate-x-full animate-shimmer bg-gradient-to-r from-transparent via-white/20 dark:via-slate-600/20 to-transparent"></div>
                </div>

                {/* Service Info Section */}
                <div className="flex flex-col gap-3 flex-1">
                  {/* Service Name & Category Row */}
                  <div className="flex justify-between items-center">
                    {/* Service Name Skeleton */}
                    <div className="h-6 w-3/4 bg-slate-200 dark:bg-slate-700 rounded-md animate-pulse"></div>
                  </div>

                  {/* Rating & Category Row */}
                  <div className="flex justify-between items-center">
                    {/* Rating Skeleton */}
                    <div className="flex items-center gap-1.5">
                      <div className="w-4 h-4 bg-slate-200 dark:bg-slate-700 rounded-full animate-pulse"></div>
                      <div className="h-4 w-8 bg-slate-200 dark:bg-slate-700 rounded animate-pulse"></div>
                      <div className="h-4 w-20 bg-slate-200 dark:bg-slate-700 rounded animate-pulse"></div>
                    </div>

                    {/* Category Badge Skeleton */}
                    <div className="h-6 w-20 bg-slate-200 dark:bg-slate-700 rounded-lg animate-pulse"></div>
                  </div>

                  {/* Description Skeleton */}
                  <div className="space-y-2">
                    <div className="h-4 w-full bg-slate-200 dark:bg-slate-700 rounded animate-pulse"></div>
                    <div className="h-4 w-5/6 bg-slate-200 dark:bg-slate-700 rounded animate-pulse"></div>
                  </div>

                  {/* Bottom Row - Price & Button */}
                  <div className="flex items-end justify-between mt-auto pt-4 border-t border-slate-200 dark:border-slate-700">
                    {/* Price Skeleton */}
                    <div className="flex flex-col gap-1">
                      <div className="h-3 w-20 bg-slate-200 dark:bg-slate-700 rounded animate-pulse"></div>
                      <div className="h-7 w-24 bg-slate-200 dark:bg-slate-700 rounded animate-pulse"></div>
                    </div>

                    {/* Button Skeleton */}
                    <div className="h-8 w-24 bg-slate-200 dark:bg-slate-700 rounded-md animate-pulse"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ServicesLoading;
