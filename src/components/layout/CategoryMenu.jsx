"use client";
import { useEffect, useRef, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { Categories } from "@/data/categories";

export default function CategoryMenu() {
  const router = useRouter();
  const pathname = usePathname();

  const itemRefs = useRef({});
  const sliderRef = useRef(null);

  const [active, setActive] = useState("home");

  /* 🔹 URL → active sync */
  useEffect(() => {
    if (pathname === "/") {
      setActive("home");
      return;
    }

    const slug = pathname.split("/").pop()?.toLowerCase();
    const match = Categories.find(cat => cat.slug === slug);

    if (match) {
      setActive(match.slug);
    } else {
      setActive("home");
    }
  }, [pathname]);

  /* 🔹 Move slider */
  const moveSlider = (key) => {
    const el = itemRefs.current[key];
    const slider = sliderRef.current;
    if (!el || !slider) return;

    slider.style.width = `${el.offsetWidth}px`;
    slider.style.left = `${el.offsetLeft}px`;
  };

  /* 🔹 Scroll + slider sync */
  useEffect(() => {
    const el = itemRefs.current[active];
    if (!el) return;

    el.scrollIntoView({
      behavior: "smooth",
      inline: "center",
      block: "nearest",
    });

    moveSlider(active);
  }, [active]);

  const handleClick = (key) => {
    setActive(key);

    if (key === "home") {
      router.push("/");
    } else {
      router.push(`/category/${key}`);
    }
  };

  return (
    <div className="bg-white/90 backdrop-blur border-y border-color shadow-md">
      <div className="max-w-7xl mx-auto px-4">
        <div className="relative flex gap-2 md:justify-between justify-start overflow-x-auto scrollbar-hide">

          {/* Slider */}
          <span
            ref={sliderRef}
            className="absolute top-1/2 -translate-y-1/2 h-9 rounded bg-[var(--primary)]/10 transition-all duration-300 ease-out pointer-events-none"
          />

          {/* 🏠 HOME (separate) */}
          <button
            type="button"
            ref={(el) => (itemRefs.current["home"] = el)}
            onClick={() => handleClick("home")}
            onMouseEnter={() => moveSlider("home")}
            className={`relative z-10 md:px-4 px-2 py-2 md:text-base text-sm font-medium rounded transition-colors
              ${
                active === "home"
                  ? "text-[var(--primary)]"
                  : "text-[var(--secondary)] hover:text-[var(--primary)]"
              }
            `}
          >
            Home
          </button>

          {/* Categories */}
          {Categories.map((cat) => {
            const isActive = active === cat.slug;

            return (
              <button
                type="button"
                key={cat.id}
                ref={(el) => (itemRefs.current[cat.slug] = el)}
                onClick={() => handleClick(cat.slug)}
                onMouseEnter={() => moveSlider(cat.slug)}
                className={`relative z-10 md:px-4 px-2 py-2 md:text-base text-sm whitespace-nowrap font-medium rounded transition-colors
                  ${
                    isActive
                      ? "text-[var(--primary)]"
                      : "text-[var(--secondary)] hover:text-[var(--primary)]"
                  }
                `}
              >
                {cat.name}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
