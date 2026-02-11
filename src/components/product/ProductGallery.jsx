"use client";

import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

export default function ProductGallery({ images }) {

  const [activeIndex, setActiveIndex] = useState(0);
  const [bgPos, setBgPos] = useState("50% 50%");
  const [showZoom, setShowZoom] = useState(false);

  const swiperRef = useRef(null);
  const thumbSwiperRef = useRef(null);

  const [isThumbStart, setIsThumbStart] = useState(true);
  const [isThumbEnd, setIsThumbEnd] = useState(false);

  const getImage = (img) => `/images/products/${img}`;

  /* ================= ZOOM ================= */
  const handleMouseMove = (e) => {
    if (window.innerWidth < 1024) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setBgPos(`${x}% ${y}%`);
  };

  const activateImage = (index) => {
    swiperRef.current?.slideTo(index);
  };

  return (
    <div className="relative w-full max-w-[460px]">

      {/* ================= MAIN IMAGE (SAME FOR MOBILE + DESKTOP) ================= */}
      <div
        onMouseEnter={() => window.innerWidth >= 1024 && setShowZoom(true)}
        onMouseLeave={() => setShowZoom(false)}
        onMouseMove={handleMouseMove}
        className="shadow rounded overflow-hidden cursor-crosshair relative bg-white"
      >
        <Swiper
          slidesPerView={1}
          onSwiper={(s) => (swiperRef.current = s)}
          onSlideChange={(s) => setActiveIndex(s.activeIndex)}
        >
          {images.map((img, i) => (
            <SwiperSlide key={`${img}-${i}`} >
                  <Image
                    src={getImage(img)}
                    alt="thumb"
                    width={388}
                    height={388}
                    className="w-full h-full object-cover"
                  />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* ================= THUMBNAILS ================= */}
      <div className="relative mt-4">

        {/* LEFT ARROW */}
        <button
          onClick={() => !isThumbStart && thumbSwiperRef.current?.slidePrev()}
          disabled={isThumbStart}
          className={`absolute -left-4 top-1/2 -translate-y-1/2 p-2 rounded-full z-10
          ${isThumbStart
            ? "bg-gray-200 text-gray-400 cursor-not-allowed pointer-events-none"
            : "bg-white shadow-md hover:bg-gray-100"
          }`}
        >
          <ChevronLeft size={18} />
        </button>

        {/* RIGHT ARROW */}
        <button
          onClick={() => !isThumbEnd && thumbSwiperRef.current?.slideNext()}
          disabled={isThumbEnd}
          className={` absolute -right-4 top-1/2 -translate-y-1/2 p-2 rounded-full z-10
          ${isThumbEnd
            ? "bg-gray-200 text-gray-400 cursor-not-allowed pointer-events-none"
            : "bg-white shadow-md hover:bg-gray-100"
          }`}
        >
          <ChevronRight size={18} />
        </button>

        {/* THUMB SWIPER */}
        <Swiper
          onSwiper={(s) => {
            thumbSwiperRef.current = s;
            setIsThumbStart(s.isBeginning);
            setIsThumbEnd(s.isEnd);
          }}
          onSlideChange={(s) => {
            setIsThumbStart(s.isBeginning);
            setIsThumbEnd(s.isEnd);
          }}
          spaceBetween={4}
          slidesPerView="auto"
          freeMode
          mousewheel
          className="!px-1"
        >
          {images.map((img, i) => (
            <SwiperSlide key={`${img}-${i}`} className="!w-20">
              <button
                onClick={() => activateImage(i)}
                className={`w-20 h-20 rounded overflow-hidden transition p-1
                ${activeIndex === i
                  ? "border-2 border-[var(--primary)]"
                  : "border hover:border-2 hover:border-[var(--primary)]"
                }`}
              >
                <div className="relative w-full h-full">
                  <Image
                    src={getImage(img)}
                    alt="thumb"
                    fill
                    sizes="80px"
                    className="object-cover"
                  />
                </div>
              </button>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* ================= ZOOM WINDOW (DESKTOP ONLY) ================= */}
      {showZoom && (
        <div
          className="absolute top-0 left-[480px] w-[520px] h-[520px] rounded bg-no-repeat bg-white hidden lg:block z-50 border shadow-2xl"
          style={{
            backgroundImage: `url(${getImage(images[activeIndex])})`,
            backgroundPosition: bgPos,
            backgroundSize: "250%",
          }}
        />
      )}

    </div>
  );
}
