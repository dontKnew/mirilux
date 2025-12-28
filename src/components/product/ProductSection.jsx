"use client";

import { useRef } from "react";
import ProductCard from "./ProductCard";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import { ChevronLeft, ChevronRight } from "lucide-react";

import "swiper/css";
import { Products } from "@/data/product";

export default function ProductSection({ title = "Best Sellers", reverse = false }) {
  const swiperRef = useRef(null);

  return (
    <section className="md:max-w-7xl mx-auto px-4 py-10 relative">

      {/* HEADER */}
      <div className="md:flex justify-between items-start mb-6">
        <div>
          <h2 className="flex items-center gap-2 text-2xl font-bold">
            <span className="h-10 w-1.5 bg-[var(--primary)] rounded"></span>
            {title}
          </h2>

          <p className="mt-2 text-gray-600">
            Explore best-selling safe, natural, and 100% toxin-free baby and beauty products.
          </p>
        </div>

        {/* CUSTOM ARROWS (TOP RIGHT) */}
        <div className="flex justify-end gap-3 z-20">
        <button
          onClick={() => swiperRef.current?.slidePrev()}
          className="group hover:scale-105 h-11 w-11 rounded-full bg-white border-2 border-[var(--primary)] flex items-center justify-center shadow-sm hover:bg-[var(--primary)] transition-colors duration-200"
        >
          <ChevronLeft
            size={22}
            className="text-[var(--primary)] group-hover:text-white transition-colors duration-200"
          />
        </button>

        <button
          onClick={() => swiperRef.current?.slideNext()}
          className="group hover:scale-105 h-11 w-11 rounded-full bg-white border-2 border-[var(--secondary)] flex items-center justify-center shadow-sm hover:bg-[var(--secondary)] transition-colors duration-200"
        >
          <ChevronRight
            size={22}
            className="text-[var(--secondary)] group-hover:text-white transition-colors duration-200"
          />
        </button>


        </div>
      </div>

      {/* SLIDER */}
      <Swiper
        modules={[Autoplay]}
        onSwiper={(swiper) => (swiperRef.current = swiper)}
        loop
        autoplay={{
          delay: 1000,
          disableOnInteraction: true,
          pauseOnMouseEnter: true,
          reverseDirection: reverse, // 🔥 magic
        }}
        speed={800}
        spaceBetween={24}
        breakpoints={{
          0: { slidesPerView: 1 },
          640: { slidesPerView: 2 },
          768: { slidesPerView: 3 },
          1024: { slidesPerView: 4 },
        }}
      >
        {Products.map((product) => (
          <SwiperSlide key={product.id}>
            <ProductCard product={product} />
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}
