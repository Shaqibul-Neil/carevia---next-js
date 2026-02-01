import React from "react";

const ReviewsForm = () => {
  return (
    <form className="space-y-5">
      <div className="flex gap-4 items-center flex-col md:flex-row">
        {/* Name Input */}
        <div>
          <label className="text-sm font-medium text-foreground mb-2 block">
            Your Name <span className="text-destructive">*</span>
          </label>
          <input
            type="text"
            placeholder="Enter your full name"
            className="w-full md:w-84 lg:w-68 px-4 py-2.5 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
          />
        </div>

        {/* Email Input */}
        <div>
          <label className="text-sm font-medium text-foreground mb-2 block">
            Email Address <span className="text-destructive">*</span>
          </label>
          <input
            type="email"
            placeholder="your.email@example.com"
            className="w-full md:w-84 lg:w-68 px-4 py-2.5 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
          />
        </div>
      </div>

      {/* Rating Input */}
      <div>
        <label className="text-sm font-medium text-foreground mb-2 block">
          Your Rating <span className="text-destructive">*</span>
        </label>
        <select className="w-full px-4 py-2.5 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all">
          <option value="">Select your rating</option>
          <option value="5">⭐⭐⭐⭐⭐ Excellent</option>
          <option value="4">⭐⭐⭐⭐ Very Good</option>
          <option value="3">⭐⭐⭐ Good</option>
          <option value="2">⭐⭐ Fair</option>
          <option value="1">⭐ Poor</option>
        </select>
      </div>

      {/* Review Title */}
      <div>
        <label className="text-sm font-medium text-foreground mb-2 block">
          Review Title <span className="text-destructive">*</span>
        </label>
        <input
          type="text"
          placeholder="Summarize your experience"
          className="w-full px-4 py-2.5 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
        />
      </div>

      {/* Review Textarea */}
      <div>
        <label className="text-sm font-medium text-foreground mb-2 block">
          Your Review <span className="text-destructive">*</span>
        </label>
        <textarea
          rows={3}
          placeholder="Share details about your experience with this service. What did you like? What could be improved?"
          className="w-full px-4 py-2.5 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all resize-none"
        />
        <p className="text-xs text-muted-foreground mt-1.5">
          Minimum 50 characters
        </p>
      </div>

      {/* Checkbox */}
      <div className="flex items-start gap-2">
        <input
          type="checkbox"
          id="terms"
          className="mt-1 w-4 h-4 rounded border-border text-primary focus:ring-2 focus:ring-primary/50"
        />
        <label htmlFor="terms" className="text-xs text-muted-foreground">
          I confirm that I have used this service and this review is based on my
          own experience
        </label>
      </div>

      {/* Submit Button - Purely Visual */}
      <button
        type="button"
        className="w-full px-6 py-3 bg-primary text-white font-semibold rounded-lg hover:bg-primary/90 transition-all duration-300 shadow-lg hover:shadow-xl"
      >
        Submit Review
      </button>
    </form>
  );
};

export default ReviewsForm;
