"use client";

import { Testimonials as Data } from "@/data/testimonial";
import TestimonialCard from "./TestimonialCard";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";

export default function Testimonials() {
  return (
    <section className="bg-[#fafafa] pt-14 pb-8">
      <div className="md:max-w-7xl mx-auto px-4">

        {/* Heading */}
        <div className="mb-10">
          <h2 className="flex items-center gap-2 text-2xl font-bold">
            <span className="h-10 w-1.5 bg-[var(--primary)] rounded"></span>
            What Our Customers Say
          </h2>
          <p className="mt-2 text-gray-600">
            Trusted by thousands of customers across India for premium,
            long-lasting fragrances.
          </p>
        </div>

        {/* Swiper */}
        <Swiper
          modules={[Autoplay, Pagination]}
          autoplay={{
            delay: 1000,
            disableOnInteraction: true,
            pauseOnMouseEnter: true,
          }}
          pagination={{
            clickable: true,
          }}
          loop
          spaceBetween={24}
          breakpoints={{
            0: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
          className="pb-10" 
        >
          {Data.map((item) => (
            <SwiperSlide key={item.id}>
              <TestimonialCard data={item} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
