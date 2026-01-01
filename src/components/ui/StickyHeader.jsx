"use client";

import { useEffect, useRef, useState } from "react";

export default function StickyHeader({ children }) {
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const onScroll = () => {
      const currentScrollY = window.scrollY;
      const isMobile = window.innerWidth < 768; // 👈 md breakpoint

      // shadow after slight scroll (all devices)
      setScrolled(currentScrollY > 5);

      // 🚫 Desktop: never auto-hide
      if (!isMobile) {
        setHidden(false);
        lastScrollY.current = currentScrollY;
        return;
      }

      // ✅ Mobile: auto-hide logic
      if (currentScrollY > lastScrollY.current && currentScrollY > 80) {
        setHidden(true);
      } else {
        setHidden(false);
      }

      lastScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      className={`
        sticky top-0 z-40
        bg-white/90 backdrop-blur
        transition-transform duration-300 ease-in-out
        ${hidden ? "-translate-y-full" : "translate-y-0"}
        ${scrolled ? "border-b border-gray-200 shadow-sm" : ""}
      `}
    >
      {children}
    </div>
  );
}
