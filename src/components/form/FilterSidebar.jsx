"use client";
import { Filter, DollarSign, Tag, MapPin, Star } from "lucide-react";
const FilterSidebar = () => {
  const categories = ["Baby Care", "Elderly Care", "Sick Care", "Special Care"];
  const divisions = ["Dhaka", "Chattogram", "Sylhet", "Rajshahi", "Khulna"];
  const ratings = [5, 4, 3, 2, 1];

  return (
    <div className="w-full space-y-6">
      {/* Filter Header */}
      <div className="flex items-center gap-2 pb-4 border-b border-border">
        <Filter className="w-5 h-5 text-primary" />
        <h3 className="text-lg font-bold text-foreground">Filters</h3>
      </div>

      {/* Price Range Filter */}
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <DollarSign className="w-4 h-4 text-muted-foreground" />
          <h4 className="text-sm font-semibold text-foreground">Price Range</h4>
        </div>
        <div className="space-y-2">
          <input
            type="range"
            min="0"
            max="5000"
            step="100"
            className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer accent-primary"
          />
          <div className="flex justify-between text-sm text-muted-foreground">
            <span>$0</span>
            <span className="font-semibold text-primary">$5000</span>
          </div>
        </div>
      </div>

      {/* Category Filter */}
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <Tag className="w-4 h-4 text-muted-foreground" />
          <h4 className="text-sm font-semibold text-foreground">Category</h4>
        </div>
        <div className="space-y-2">
          {categories.map((category) => (
            <label
              key={category}
              className="flex items-center gap-2 cursor-pointer group"
            >
              <input
                type="radio"
                name="category"
                className="w-4 h-4 text-primary border-border focus:ring-primary/20 cursor-pointer"
              />
              <span className="text-sm text-foreground group-hover:text-primary transition-colors">
                {category}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Division Filter */}
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <MapPin className="w-4 h-4 text-muted-foreground" />
          <h4 className="text-sm font-semibold text-foreground">Division</h4>
        </div>
        <div className="space-y-2">
          {divisions.map((division) => (
            <label
              key={division}
              className="flex items-center gap-2 cursor-pointer group"
            >
              <input
                type="checkbox"
                className="w-4 h-4 text-primary border-border rounded focus:ring-primary/20 cursor-pointer"
              />
              <span className="text-sm text-foreground group-hover:text-primary transition-colors">
                {division}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Rating Filter */}
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <Star className="w-4 h-4 text-muted-foreground" />
          <h4 className="text-sm font-semibold text-foreground">Rating</h4>
        </div>
        <div className="space-y-2">
          {ratings.map((rating) => (
            <label
              key={rating}
              className="flex items-center gap-2 cursor-pointer group"
            >
              <input
                type="radio"
                name="rating"
                className="w-4 h-4 text-primary border-border focus:ring-primary/20 cursor-pointer"
              />
              <div className="flex items-center gap-1">
                <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
                <span className="text-sm text-foreground group-hover:text-primary transition-colors">
                  {rating}+ Stars
                </span>
              </div>
            </label>
          ))}
        </div>
      </div>

      {/* Clear Filters Button */}
      <button className="w-full py-2.5 px-4 rounded-lg border border-border bg-background hover:bg-muted text-foreground font-medium text-sm transition-all duration-200">
        Clear All Filters
      </button>
    </div>
  );
};

export default FilterSidebar;
