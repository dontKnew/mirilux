"use client";

import { useEffect, useRef, useState } from "react";
const categories = [
  "HOME",
  "MEN",
  "WOMEN",
  "UNISEX",
  "OUD",
  "FLORAL",
  "WOODY",
  "FRESH",
  "GIFTS",
  "NEW",
  "BEST SELLERS",
  "LUXURY",
  "ALL"
];


export default function CategoryMenu() {
  const [active, setActive] = useState("HOME");
  const containerRef = useRef(null);
  const itemRefs = useRef({});

  const [lineStyle, setLineStyle] = useState({
    width: 0,
    left: 0,
  });

  // 🔥 Update underline position
  useEffect(() => {
    const activeEl = itemRefs.current[active];
    if (activeEl && containerRef.current) {
      const { offsetLeft, offsetWidth } = activeEl;
      setLineStyle({
        width: offsetWidth,
        left: offsetLeft,
      });

      // auto scroll into view (mobile UX)
      activeEl.scrollIntoView({
        behavior: "smooth",
        inline: "center",
        block: "nearest",
      });
    }
  }, [active]);

  return (
    <div className="border-b border-gray-300 shadow-xl/30 shadow-white">
      <div className="max-w-7xl mx-auto px-4">
        <div
          ref={containerRef}
          className="relative flex gap-6 overflow-x-auto scrollbar-hide justify-between"
        >
          {categories.map((cat) => (
            <button
              key={cat}
              ref={(el) => (itemRefs.current[cat] = el)}
              onClick={() => setActive(cat)}
              className={`py-3  whitespace-nowrap text-sm transition-colors cursor-pointer ${
                active === cat
                  ? "text-[var(--primary)]"
                  : "text-gray-600 hover:text-[var(--primary)]"
              }`}
            >
              {cat}
            </button>
          ))}

          {/* 🔵 Sliding underline */}
          <span
            className="absolute bottom-0 h-[2px] bg-[var(--primary)] transition-all duration-300 ease-out"
            style={{
              width: `${lineStyle.width}px`,
              left: `${lineStyle.left}px`,
            }}
          />
        </div>
      </div>
    </div>
  );
}
