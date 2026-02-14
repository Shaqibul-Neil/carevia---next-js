import { Star, TrendingUp, Users, ThumbsUp, ShieldCheck } from "lucide-react";
import ReviewsForm from "../form/ReviewsForm";

const Reviews = ({ service }) => {
  const { ratingSummary } = service;

  // Calculate rating distribution (mock data for visual)
  const ratingDistribution = [
    {
      stars: 5,
      percentage: 75,
      count: Math.floor(ratingSummary.totalReviews * 0.75),
    },
    {
      stars: 4,
      percentage: 15,
      count: Math.floor(ratingSummary.totalReviews * 0.15),
    },
    {
      stars: 3,
      percentage: 7,
      count: Math.floor(ratingSummary.totalReviews * 0.07),
    },
    {
      stars: 2,
      percentage: 2,
      count: Math.floor(ratingSummary.totalReviews * 0.02),
    },
    {
      stars: 1,
      percentage: 1,
      count: Math.floor(ratingSummary.totalReviews * 0.01),
    },
  ];

  return (
    <div className="container mx-auto px-4 py-8 md:py-12 lg:py-16">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
          {/* Left Side - Rating Summary & Distribution */}
          <div className="space-y-4 md:space-y-6">
            {/* Overall Rating Card */}
            <div className="bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 dark:from-emerald-950/30 dark:via-teal-950/30 dark:to-cyan-950/30 border-2 border-emerald-200 dark:border-emerald-800 rounded-xs p-6 md:p-8 shadow-lg">
              <h3 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white mb-4 md:mb-6">
                Overall Rating
              </h3>
              <div className="flex flex-col sm:flex-row items-center gap-6 md:gap-8">
                {/* Large Rating Number */}
                <div className="text-center">
                  <p className="text-5xl md:text-7xl font-bold text-emerald-600 dark:text-emerald-400 leading-none">
                    {ratingSummary.averageRating}
                  </p>
                  <div className="flex items-center justify-center gap-1 mt-2 md:mt-3">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 md:w-5 md:h-5 ${
                          i < Math.floor(ratingSummary.averageRating)
                            ? "text-amber-500 fill-amber-500"
                            : "text-gray-300 dark:text-gray-600"
                        }`}
                      />
                    ))}
                  </div>
                  <p className="text-xs md:text-sm text-gray-600 dark:text-gray-400 mt-2 font-medium">
                    out of 5
                  </p>
                </div>

                {/* Stats */}
                <div className="flex-1 space-y-3 md:space-y-4 w-full sm:w-auto">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 md:w-10 md:h-10 rounded-xs bg-white/80 dark:bg-gray-800/80 flex items-center justify-center shrink-0">
                      <Users className="w-4 h-4 md:w-5 md:h-5 text-emerald-600 dark:text-emerald-400" />
                    </div>
                    <div>
                      <p className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white">
                        {ratingSummary.totalReviews}
                      </p>
                      <p className="text-xs text-gray-600 dark:text-gray-400">
                        Total Reviews
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 md:w-10 md:h-10 rounded-xs bg-white/80 dark:bg-gray-800/80 flex items-center justify-center shrink-0">
                      <ThumbsUp className="w-4 h-4 md:w-5 md:h-5 text-emerald-600 dark:text-emerald-400" />
                    </div>
                    <div>
                      <p className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white">
                        {Math.floor((ratingSummary.totalReviews * 90) / 100)}
                      </p>
                      <p className="text-xs text-gray-600 dark:text-gray-400">
                        Recommended
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Rating Distribution */}
            <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xs p-5 md:p-6 shadow-lg hover:shadow-xl transition-all duration-300">
              <h3 className="text-base md:text-lg font-bold text-gray-900 dark:text-white mb-4 md:mb-5 flex items-center gap-2">
                <div className="w-8 h-8 md:w-10 md:h-10 rounded-xs bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-950/30 dark:to-orange-950/30 flex items-center justify-center border border-amber-200 dark:border-amber-800">
                  <TrendingUp className="w-4 h-4 md:w-5 md:h-5 text-amber-600 dark:text-amber-400" />
                </div>
                <span className="text-sm md:text-lg">Rating Distribution</span>
              </h3>
              <div className="space-y-2 md:space-y-3">
                {ratingDistribution.map((rating) => (
                  <div
                    key={rating.stars}
                    className="flex items-center gap-2 md:gap-3"
                  >
                    {/* Star Label */}
                    <div className="flex items-center gap-1 w-10 md:w-14">
                      <span className="text-xs md:text-sm font-semibold text-gray-900 dark:text-white">
                        {rating.stars}
                      </span>
                      <Star className="w-3 h-3 md:w-4 md:h-4 text-amber-500 fill-amber-500" />
                    </div>

                    {/* Progress Bar */}
                    <div className="flex-1 h-2.5 md:h-3 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-emerald-600 to-teal-600 dark:from-emerald-500 dark:to-teal-500 rounded-full transition-all duration-500"
                        style={{ width: `${rating.percentage}%` }}
                      />
                    </div>

                    {/* Count */}
                    <span className="text-xs md:text-sm text-gray-600 dark:text-gray-400 w-10 md:w-14 text-right font-medium">
                      {rating.count}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Trust Indicators */}
            <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xs p-5 md:p-6 shadow-lg hover:shadow-xl transition-all duration-300">
              <h3 className="text-base md:text-lg font-bold text-gray-900 dark:text-white mb-4 md:mb-5">
                Why Trust Our Reviews?
              </h3>
              <div className="space-y-3 md:space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 md:w-10 md:h-10 rounded-xs bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-950/30 dark:to-teal-950/30 flex items-center justify-center shrink-0 border border-emerald-200 dark:border-emerald-800">
                    <Star className="w-4 h-4 md:w-5 md:h-5 text-emerald-600 dark:text-emerald-400" />
                  </div>
                  <div>
                    <p className="text-xs md:text-sm font-semibold text-gray-900 dark:text-white">
                      Verified Bookings Only
                    </p>
                    <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                      Reviews from customers who actually used this service
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 md:w-10 md:h-10 rounded-xs bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-950/30 dark:to-cyan-950/30 flex items-center justify-center shrink-0 border border-blue-200 dark:border-blue-800">
                    <ShieldCheck className="w-4 h-4 md:w-5 md:h-5 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div>
                    <p className="text-xs md:text-sm font-semibold text-gray-900 dark:text-white">
                      Moderated Content
                    </p>
                    <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                      All reviews are checked for authenticity
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Review Form */}
          <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xs p-6 md:p-8 shadow-lg hover:shadow-xl transition-all duration-300">
            <h3 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white mb-2 md:mb-3">
              Share Your Experience
            </h3>
            <p className="text-xs md:text-sm text-gray-600 dark:text-gray-400 mb-5 md:mb-6">
              Your feedback helps others make informed decisions
            </p>

            <ReviewsForm />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reviews;
