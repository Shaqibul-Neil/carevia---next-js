"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { ChevronLeft, ChevronRight, Quote, Calendar } from "lucide-react";

const TestimonialSlider = ({ testimonials }) => {
  const swiperRef = useRef(null);
  return (
    <>
      {/* Slider Controls (Custom) */}
      <div className="flex justify-end gap-3 mb-6">
        <button
          onClick={() => swiperRef.current?.slidePrev()}
          className="w-10 h-10 rounded-full border border-slate-200 dark:border-slate-800 flex items-center justify-center text-slate-600 dark:text-slate-400 hover:bg-emerald-500 hover:text-white hover:border-emerald-500 transition-all duration-300 cursor-pointer"
          aria-label="Previous slide"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <button
          onClick={() => swiperRef.current?.slideNext()}
          className="w-10 h-10 rounded-full border border-slate-200 dark:border-slate-800 flex items-center justify-center text-slate-600 dark:text-slate-400 hover:bg-emerald-500 hover:text-white hover:border-emerald-500 transition-all duration-300 cursor-pointer"
          aria-label="Next slide"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      {/* Swiper Slider */}
      <Swiper
        modules={[Autoplay, Navigation]}
        spaceBetween={20}
        slidesPerView={1}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        loop={true}
        onBeforeInit={(swiper) => {
          swiperRef.current = swiper;
        }}
        breakpoints={{
          640: { slidesPerView: 3 },
          1024: { slidesPerView: 3 },
          1280: { slidesPerView: 5 },
          1536: { slidesPerView: 6 },
        }}
        className="pb-12"
      >
        {testimonials.map((item, idx) => (
          <SwiperSlide key={idx} className="h-full">
            <div className="relative h-80 w-full rounded-xs overflow-hidden group">
              {/* Background Image */}
              <Image
                src={item.img}
                alt={item.name}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 20vw"
                placeholder="blur"
              />

              {/* Dark Overlay Gradient */}
              <div className="absolute inset-0 bg-black/80 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-300" />

              {/* Content Content on Image */}
              <div className="absolute inset-0 p-6 flex flex-col justify-end text-white">
                {/* Quote Icon Background */}
                <div className="mb-4">
                  <div className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center">
                    <Quote className="w-4 h-4 text-emerald-400 fill-emerald-400" />
                  </div>
                </div>

                {/* Review Text */}
                <p className="text-sm font-medium leading-snug mb-6 line-clamp-3 opacity-95">
                  "{item.review}"
                </p>

                {/* Divider */}
                <div className="w-full h-px bg-white/20 mb-4" />

                {/* Footer Info: Date & Author */}
                <div className="flex items-center justify-between text-xs sm:text-sm text-white/80">
                  <div className="flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-emerald-400" />
                    <span className="text-xs">{item.date}</span>
                  </div>

                  <div className="text-right">
                    <div className="font-bold text-white">{item.name}</div>
                    <div className="text-[10px] uppercase tracking-wide opacity-70">
                      {item.role}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
};

export default TestimonialSlider;
