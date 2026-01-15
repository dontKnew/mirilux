"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect } from "react";

export default function Popup({
  isOpen,
  onClose,
  title,
  children,
  width = "max-w-lg",
}) {
  // ESC key close
  useEffect(() => {
    const handler = (e) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [onClose]);

  // Lock background scroll
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "auto";
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            className={`fixed inset-0 z-50 flex items-center justify-center md:px-4 px-2`}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
          >
            <div
              className={`w-full ${width} rounded-2xl bg-white shadow-xl`}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              {/* <div className="flex items-center justify-between border-b px-6 py-4">
                <h3 className="text-lg font-semibold">{title}</h3>
                <button
                  onClick={onClose}
                  className="rounded-full p-1 text-gray-500 hover:bg-gray-100"
                >
                  ✕
                </button>
              </div> */}

              {/* Content */}
              <div className="md:px-6 px-4 py-5">{children}</div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
