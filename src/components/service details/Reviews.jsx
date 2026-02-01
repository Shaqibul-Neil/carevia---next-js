import { Star, TrendingUp, Users, ThumbsUp, Shield } from "lucide-react";
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
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* Left Side - Rating Summary & Distribution */}
      <div className="space-y-6">
        {/* Overall Rating Card */}
        <div className="bg-gradient-to-br from-primary/10 to-primary/5 dark:from-primary/20 dark:to-primary/10 border border-primary/20 rounded-lg p-6">
          <h3 className="text-xl font-bold text-foreground mb-6">
            Overall Rating
          </h3>
          <div className="flex items-center gap-6">
            {/* Large Rating Number */}
            <div className="text-center">
              <p className="text-6xl font-bold text-primary leading-none">
                {ratingSummary.averageRating}
              </p>
              <div className="flex items-center justify-center gap-1 mt-2">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${
                      i < Math.floor(ratingSummary.averageRating)
                        ? "text-amber-500 fill-amber-500"
                        : "text-gray-300 dark:text-gray-600"
                    }`}
                  />
                ))}
              </div>
              <p className="text-sm text-muted-foreground mt-2">out of 5</p>
            </div>

            {/* Stats */}
            <div className="flex-1 space-y-3">
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5 text-primary" />
                <div>
                  <p className="text-2xl font-bold text-foreground">
                    {ratingSummary.totalReviews}
                  </p>
                  <p className="text-xs text-muted-foreground">Total Reviews</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <ThumbsUp className="w-5 h-5 text-primary" />
                <div>
                  <p className="text-2xl font-bold text-foreground">
                    {Math.floor((ratingSummary.totalReviews * 90) / 100)}
                  </p>
                  <p className="text-xs text-muted-foreground">Recommended</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Rating Distribution */}
        <div className="bg-card border border-border rounded-lg p-6">
          <h3 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-primary" />
            Rating Distribution
          </h3>
          <div className="space-y-3">
            {ratingDistribution.map((rating) => (
              <div key={rating.stars} className="flex items-center gap-3">
                {/* Star Label */}
                <div className="flex items-center gap-1 w-12">
                  <span className="text-sm font-semibold text-foreground">
                    {rating.stars}
                  </span>
                  <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                </div>

                {/* Progress Bar */}
                <div className="flex-1 h-2.5 bg-muted rounded-full overflow-hidden">
                  <div
                    className="h-full bg-primary rounded-full transition-all duration-500"
                    style={{ width: `${rating.percentage}%` }}
                  />
                </div>

                {/* Count */}
                <span className="text-xs text-muted-foreground w-12 text-right">
                  {rating.count}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Trust Indicators */}
        <div className="bg-card border border-border rounded-lg p-6">
          <h3 className="text-lg font-bold text-foreground mb-4">
            Why Trust Our Reviews?
          </h3>
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                <Star className="w-4 h-4 text-primary" />
              </div>
              <div>
                <p className="text-sm font-semibold text-foreground">
                  Verified Bookings Only
                </p>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Reviews from customers who actually used this service
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                <Shield className="w-4 h-4 text-primary" />
              </div>
              <div>
                <p className="text-sm font-semibold text-foreground">
                  Moderated Content
                </p>
                <p className="text-xs text-muted-foreground mt-0.5">
                  All reviews are checked for authenticity
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Review Form */}
      <div className="bg-card border border-border rounded-lg p-6">
        <h3 className="text-xl font-bold text-foreground mb-4">
          Share Your Experience
        </h3>
        <p className="text-sm text-muted-foreground mb-6">
          Your feedback helps others make informed decisions
        </p>

        <ReviewsForm />
      </div>
    </div>
  );
};

export default Reviews;
