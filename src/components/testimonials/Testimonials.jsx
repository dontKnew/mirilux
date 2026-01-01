"use client";

import { Testimonials as Data } from "@/data/testimonial";
import TestimonialCard from "./TestimonialCard";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";
import Container from "../layout/Container";
import Title from "../ui/Title";

export default function Testimonials() {
  return (
    <Container>
      <div className="md:max-w-7xl mx-auto px-4">
        <Title title="What Our Customers Say" description="Trusted by thousands of customers across India for premium, long-lasting fragrances." />
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
    </Container>
  );
}
