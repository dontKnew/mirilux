"use client";

import { useRef } from "react";
import ProductCard from "./ProductCard";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import { ChevronLeft, ChevronRight } from "lucide-react";

import "swiper/css";
import { Products } from "@/data/product";
import Title from "../ui/Title";
import Container from "../layout/Container";

export default function ProductSection({ title = "Best Sellers", reverse = false }) {
  const swiperRef = useRef(null);

  return (
    <Container>
    <div className="relative">
      <div className="flex md:flex-row flex-col md:justify-between md:items-center">
        <Title title={title} description="Explore best-selling safe, natural, and 100% toxin-free baby and beauty products." />
        <div className="flex justify-end gap-3 md:mb-0 mb-4">
          <button
            onClick={() => swiperRef.current?.slidePrev()}
            className=" group h-11 w-11 rounded-full bg-[var(--primary)] border-2 border-[var(--primary)] flex items-center justify-center shadow-sm hover:bg-white hover:scale-105 transition-all duration-200"
          >
            <ChevronLeft
              size={22}
              className=" text-white group-hover:text-[var(--primary)] transition-colors duration-200"
            />
          </button>

          <button
            onClick={() => swiperRef.current?.slideNext()}
            className=" group h-11 w-11 rounded-full bg-[var(--secondary)] border-2 border-[var(--secondary)] flex items-center justify-center shadow-sm hover:bg-white hover:scale-105 transition-all duration-200"
          >
            <ChevronRight
              size={22}
              className=" text-white group-hover:text-[var(--secondary)] transition-colors duration-200"
            />
          </button>
        </div>
      </div>
      <Swiper
        modules={[Autoplay]}
        onSwiper={(swiper) => (swiperRef.current = swiper)}
        loop
        autoplay={{
          delay: 1000,
          disableOnInteraction: true,
          pauseOnMouseEnter: true,
          reverseDirection: reverse, 
        }}
        speed={800}
        spaceBetween={24}
        breakpoints={{
          0: { slidesPerView: 1 },
          640: { slidesPerView: 2.2 },
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
    </div>
    </Container>
  );
}
