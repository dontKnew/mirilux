"use client";

import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const banners = [
  "/images/banner1.png",
  "/images/banner2.png",
  "/images/banner3.png",
];

export default function BannerSlider() {
  const [index, setIndex] = useState(0);
  const [pause, setPause] = useState(false);

  const prev = () =>
    setIndex((i) => (i === 0 ? banners.length - 1 : i - 1));

  const next = () =>
    setIndex((i) => (i === banners.length - 1 ? 0 : i + 1));

  useEffect(() => {
    if (pause) return;
    const id = setInterval(next, 4000);
    return () => clearInterval(id);
  }, [pause]);

  return (
    <div
      className="relative w-full overflow-hidden"
      onMouseEnter={() => setPause(true)}
      onMouseLeave={() => setPause(false)}
    >
      {/* Slides */}
      <div
        className="flex transition-transform duration-700 ease-in-out"
        style={{ transform: `translateX(-${index * 100}%)` }}
      >
        {banners.map((src, i) => (
          <img
            key={i}
            src={src}
            alt={`Banner ${i + 1}`}
            className="w-full flex-shrink-0 h-[220px] sm:h-[320px] md:h-[420px] lg:h-[520px] object-cover"
          />
        ))}
      </div>

      {/* Left Arrow */}
      <button
        onClick={prev}
        className="md:block hidden absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white shadow-md p-2 rounded-full"
      >
        <ChevronLeft size={24} />
      </button>

      {/* Right Arrow */}
      <button
        onClick={next}
        className="md:block hidden absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white shadow-md p-2 rounded-full"
      >
        <ChevronRight size={24} />
      </button>

      {/* Dots */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
        {banners.map((_, i) => (
          <button
            key={i}
            onClick={() => setIndex(i)}
            className={`h-2 w-2 rounded-full ${
              i === index ? "bg-[var(--primary)]" : "bg-white/60"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
