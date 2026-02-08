"use client";
import {
  Filter,
  DollarSign,
  Tag,
  MapPin,
  Star,
  Plus,
  ChevronDown,
} from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import AccordionFilter from "../shared/accordion/AccordionFilter";
const FilterSidebar = () => {
  const [open, setOpen] = useState(null);
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathName = usePathname();
  const currentCategory = searchParams.get("category");
  const currentDivision = searchParams.getAll("division");
  const currentRating = searchParams.get("rating");
  const currentPrice = searchParams.get("priceSort");

  const categories = ["Baby Care", "Elderly Care", "Sick Care", "Special Care"];
  const divisions = ["Dhaka", "Chattogram", "Sylhet", "Rajshahi", "Khulna"];
  const ratings = ["5", "4.5", "4", "3", "2", "1"];

  //filteration logic
  const handleFilter = (e) => {
    //getting the necessary property
    const { name, value, type, checked } = e.target;
    //creating a new url search params object with all the params of the current url
    const params = new URLSearchParams(searchParams.toString());
    if (type === "checkbox") {
      //creating an array with all the name of that type
      let values = params.getAll(name);
      if (checked) {
        //add to the existing values array
        values.push(value);
      } else {
        //return the checked values
        values = values.filter((v) => v !== value);
      }
      //remove all previous values with this name
      params.delete(name);
      //now adding all the values to the params
      values.forEach((v) => params.append(name, v));
    } else {
      //for radio category
      params.set(name, value);
    }

    return router.push(`${pathName}?${params.toString()}`, { scroll: false });
  };

  //handle filter toggle
  useEffect(() => {
    const resizeWindow = () => {
      if (window.innerWidth >= 1024) setOpen(true);
    };
    // Call once to set initial state
    resizeWindow();
    // Add the resize listener
    window.addEventListener("resize", resizeWindow);
    return () => window.removeEventListener("resize", resizeWindow);
  }, []);

  return (
    <div
      className={`w-full space-y-6 lg:px-6  px-4 ${open ? "lg:pb-6 lg:pt-2" : "lg:py-0 lg:pb-0.5"}`}
    >
      {/* Filter Header */}
      <div className="flex justify-between items-center w-full h-11 mb-0 border-b">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-green-100 flex items-center justify-center rounded-md">
            <Filter className="w-4 h-4 text-primary" />
          </div>

          <h3 className="text-base font-bold text-foreground">Filters</h3>
        </div>
        <button
          className="p-2 hover:bg-muted rounded-full transition-all duration-300 active:scale-95"
          onClick={() => setOpen(!open)}
          type="button"
        >
          <ChevronDown
            className={`w-5 h-5 text-foreground transition-transform duration-500 cursor-pointer ease-[cubic-bezier(0.34,1.56,0.64,1)] ${open ? "rotate-180 text-primary" : ""}`}
          />
        </button>
      </div>
      <div
        className={`grid transition-all duration-700 ease-in-out ${open ? "grid-rows-[1fr] opacity-100 mt-4" : "grid-rows-[0fr] opacity-0 pointer-events-none lg:pointer-events-auto"}`}
      >
        <div className="overflow-hidden space-y-4 px-1">
          {/* Price Range Filter */}
          <div>
            <AccordionFilter
              title={"Price"}
              icon={DollarSign}
              content={
                <div className="space-y-2 pt-2">
                  {["Low to High", "High to Low"].map((priceSort) => (
                    <label
                      key={priceSort}
                      className="flex items-center gap-2 cursor-pointer group"
                    >
                      <input
                        type="radio"
                        name="priceSort"
                        value={priceSort}
                        checked={currentPrice === priceSort}
                        onChange={handleFilter}
                        className="w-3 h-3 text-primary border-border focus:ring-primary/20 cursor-pointer"
                      />
                      <span className="text-xs text-foreground group-hover:text-primary transition-colors">
                        {priceSort}
                      </span>
                    </label>
                  ))}
                </div>
              }
            />
          </div>

          {/* Category Filter */}
          <div>
            <AccordionFilter
              title={"Category"}
              icon={Tag}
              content={
                <div>
                  <div className="space-y-2 pt-2">
                    {categories.map((category) => (
                      <label
                        key={category}
                        className="flex items-center gap-2 cursor-pointer group"
                      >
                        <input
                          type="radio"
                          name="category"
                          checked={currentCategory === category}
                          onChange={handleFilter}
                          value={category}
                          className="w-3 h-3 text-primary border-border focus:ring-primary/20 cursor-pointer"
                        />
                        <span className="text-xs text-foreground group-hover:text-primary transition-colors">
                          {category}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>
              }
            />
          </div>

          {/* Division Filter */}
          <div>
            <AccordionFilter
              title={"Division"}
              icon={MapPin}
              content={
                <div className="space-y-2 pt-2">
                  {divisions.map((division) => (
                    <label
                      key={division}
                      className="flex items-center gap-2 cursor-pointer group"
                    >
                      <input
                        type="checkbox"
                        name="division"
                        value={division}
                        checked={currentDivision.includes(division)}
                        onChange={handleFilter}
                        className="w-3 h-3 text-primary border-border rounded focus:ring-primary/20 cursor-pointer"
                      />
                      <span className="text-xs text-foreground group-hover:text-primary transition-colors">
                        {division}
                      </span>
                    </label>
                  ))}
                </div>
              }
            />
          </div>

          {/* Rating Filter */}
          <div>
            <AccordionFilter
              title={"Rating"}
              icon={Star}
              content={
                <div className="space-y-2 pt-2">
                  {ratings.map((rating) => (
                    <label
                      key={rating}
                      className="flex items-center gap-2 cursor-pointer group"
                    >
                      <input
                        type="radio"
                        name="rating"
                        value={rating}
                        checked={currentRating === rating}
                        onChange={handleFilter}
                        className="w-4 h-4 text-primary border-border focus:ring-primary/20 cursor-pointer"
                      />
                      <div className="flex items-center gap-1">
                        <Star className="w-3 h-3 text-amber-500 fill-amber-500" />
                        <span className="text-xs text-foreground group-hover:text-primary transition-colors">
                          {rating}+ Stars
                        </span>
                      </div>
                    </label>
                  ))}
                </div>
              }
            />
          </div>

          {/* Clear Filters Button */}
          <button
            className="w-full py-2.5 px-4 rounded-lg border border-border bg-background hover:bg-muted text-foreground font-medium text-sm transition-all duration-200 cursor-pointer mb-3"
            type="button"
            onClick={() => router.push("/services")}
          >
            Clear All Filters
          </button>
        </div>
      </div>
    </div>
  );
};

export default FilterSidebar;
