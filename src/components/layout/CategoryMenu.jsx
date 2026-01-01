"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter, usePathname } from "next/navigation";

const categories = [
  "HOME", "MEN", "WOMEN", "UNISEX", "OUD", "FLORAL", "WOODY",
  "FRESH", "GIFTS", "NEW", "BEST SELLERS", "LUXURY", "ALL"
];

export default function CategoryMenu() {
  const router = useRouter();
  const pathname = usePathname();

  const containerRef = useRef(null);
  const itemRefs = useRef({});
  const sliderRef = useRef(null);

  const [active, setActive] = useState("");

  /* 🔹 URL se active category sync */
  useEffect(() => {
    const slug = pathname.split("/").pop()?.toUpperCase();
    if (slug && categories.includes(slug)) {
      setActive(slug);
    } else {
      setActive("HOME");
    }
  }, [pathname]);

  /* 🔹 Move slider */
  const moveSlider = (cat) => {
    const el = itemRefs.current[cat];
    const slider = sliderRef.current;
    if (!el || !slider) return;

    slider.style.width = `${el.offsetWidth}px`;
    slider.style.left = `${el.offsetLeft}px`;
  };

  /* 🔹 Active item scroll + slider sync */
  useEffect(() => {
    const activeEl = itemRefs.current[active];
    if (!activeEl) return;

    activeEl.scrollIntoView({
      behavior: "smooth",
      inline: "center",
      block: "nearest",
    });

    moveSlider(active);
  }, [active]);

  const handleClick = (cat) => {
    setActive(cat);

    if (cat === "HOME") {
      router.push("/");
    } else {
      router.push(`/category/${cat.toLowerCase()}`);
    }
  };

  return (
    <div className="bg-white/90 backdrop-blur border-y border-color shadow-md">
      <div className="max-w-7xl mx-auto px-4">
        <div
          ref={containerRef}
          className="relative flex gap-2 md:justify-between justify-start overflow-x-auto scrollbar-hide"
        >
          <span
            ref={sliderRef}
            className="absolute top-1/2 -translate-y-1/2 h-9 rounded bg-[var(--primary)]/10 transition-all duration-300 ease-out pointer-events-none"
          />

          {categories.map((cat) => {
            const isActive = active === cat;

            return (
              <button
                type="button" // ✅ VERY IMPORTANT
                key={cat}
                ref={(el) => (itemRefs.current[cat] = el)}
                onClick={() => handleClick(cat)}
                onMouseEnter={() => moveSlider(cat)}
                className={`relative z-10 md:px-4 px-2 py-2 md:text-base text-sm whitespace-nowrap font-[500] transition-colors duration-200 rounded
                  ${
                    isActive
                      ? "text-[var(--primary)]"
                      : "text-[var(--secondary)] hover:text-[var(--primary)]"
                  }
                `}
              >
                {cat}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
