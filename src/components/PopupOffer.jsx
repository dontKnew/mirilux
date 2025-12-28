"use client";

import { useEffect, useState } from "react";
import { X, Sparkles } from "lucide-react";

const MAX_SHOWS = 2;
const BLOCK_TIME = 60 * 60 * 1000; // 1 hour in ms

export default function PopupOffer() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const now = Date.now();

    const popupCount = Number(localStorage.getItem("popupCount")) || 0;
    const lastShown = Number(localStorage.getItem("popupLastShown")) || 0;

    // ⏳ If 1 hour passed → reset count
    if (now - lastShown > BLOCK_TIME) {
      localStorage.setItem("popupCount", "0");
    }

    const updatedCount = Number(localStorage.getItem("popupCount")) || 0;

    // ✅ Show popup only if count < MAX_SHOWS
    if (updatedCount < MAX_SHOWS) {
      const timer = setTimeout(() => {
        setOpen(true);
        localStorage.setItem(
          "popupCount",
          String(updatedCount + 1)
        );
        localStorage.setItem(
          "popupLastShown",
          String(now)
        );
      }, 600);

      return () => clearTimeout(timer);
    }
  }, []);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm"
      onClick={() => setOpen(false)}
    >
      {/* Popup Card */}
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-[90%] max-w-md bg-white rounded-2xl p-6
                   shadow-xl animate-popup"
      >
        {/* Close */}
        <button
          onClick={() => setOpen(false)}
          className="absolute top-3 right-3 text-gray-400 hover:text-gray-700"
        >
          <X size={20} />
        </button>

        {/* Icon */}
        <div className="h-14 w-14 rounded-full bg-[var(--primary)]/10
                        flex items-center justify-center mb-4">
          <Sparkles className="text-[var(--primary)]" size={26} />
        </div>

        {/* Content */}
        <h3 className="text-xl font-bold mb-2">
          Welcome to MiriLux ✨
        </h3>

        <p className="text-sm text-gray-600 mb-5">
          Get{" "}
          <span className="font-semibold text-[var(--primary)]">
            15% OFF
          </span>{" "}
          on your first order. Discover luxury fragrances crafted just for you.
        </p>

        {/* CTA */}
        <button
          onClick={() => setOpen(false)}
          className="w-full bg-[var(--primary)] hover:bg-[var(--secondary)]
                     text-white font-semibold py-2.5 rounded-md transition"
        >
          Explore Perfumes
        </button>
      </div>
    </div>
  );
}
