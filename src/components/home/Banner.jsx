import React from "react";
import BannerSVG from "../shared/svg/BannerSVG";
import { ArrowRight, PlayCircle, Star } from "lucide-react";
import PrimaryButton from "../shared/button/PrimaryButton";

const Banner = () => {
  return (
    <div className="relative min-h-[90vh] w-full overflow-hidden bg-slate-50 dark:bg-[#0f172a] font-sans lg:py-4 md:py-10 py-16 ">
      {/* Aurora Layer */}
      <div className="aurora-container">
        <div className="aurora-glow glow-1"></div>
        <div className="aurora-glow glow-2"></div>
        <div className="aurora-glow glow-3"></div>
      </div>
      {/*  SVG BANNER (Background Layout)*/}

      {/* 
           MAIN HERO CONTENT (Centered & Interactive)
        */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-[85vh] px-4 text-center max-w-5xl mx-auto space-y-8">
        {/* Badge / Pill */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xs bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800 animate-fade-in-up">
          <Star className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
          <span className="text-sm tracking-wide font-medium text-emerald-700 dark:text-emerald-300 uppercase">
            #1 Care Service Platform
          </span>
        </div>
        {/* Main Heading */}
        <div className="w-full h-full">
          <div className="w-full h-full pointer-events-none hidden md:block">
            {/* Keeping your exact component structure, just positioned absolutely */}
            <BannerSVG />
          </div>
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-slate-700 dark:text-slate-50 leading-[1.1] md:-mt-2 animate-fade-in-up delay-100">
            <span className="md:hidden text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-teal-500">
              {" "}
              Care You Deserve,
            </span>{" "}
            Delivered with Love.
          </h1>
        </div>
        {/* Subtext */}
        <p className="text-lg md:text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed animate-fade-in-up delay-200">
          Book personalized care packages for your loved ones. From baby care to
          senior support, our trusted professionals are just a click away.
        </p>
        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center gap-4 animate-fade-in-up delay-300 pt-4">
          <div className="shrink-0">
            <PrimaryButton
              label=" Book a Service"
              className="w-60 py-3 text-base group"
              icon={
                <ArrowRight
                  size={20}
                  className="w-5 h-5 duration-500 group-hover:translate-x-1 transition-transform ml-2"
                />
              }
              iconPosition="right"
              href={"/services"}
            />
          </div>

          <button className="w-60 py-2.5 rounded-xs bg-white/80 dark:bg-slate-800/80 hover:bg-white dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 font-semibold text-lg backdrop-blur-sm shadow-sm hover:shadow-md transition-all duration-500 flex items-center gap-2 justify-center cursor-pointer hover:-translate-y-0.5 active:translate-y-0 group">
            Watch How it Works
            <PlayCircle className="w-5 h-5 text-emerald-500 group-hover:translate-x-1 transition-transform duration-500" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Banner;
