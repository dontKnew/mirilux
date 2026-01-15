"use client";

import { motion } from "framer-motion";
import { CheckCircle, XCircle } from "lucide-react";

/* 🎯 POSITION MAP */
const POSITION_CLASSES = {
  "top-left": "top-5 left-5",
  "top-center": "top-5 left-1/2 -translate-x-1/2",
  "top-right": "top-5 right-5",

  "center": "top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2",

  "bottom-left": "bottom-6 left-5",
  "bottom-center": "bottom-6 left-1/2 -translate-x-1/2",
  "bottom-right": "bottom-6 right-5",
};

export default function Toast({
  message,
  type,
  position, 
}) {
  const isSuccess = type === "success";

  return (
    <motion.div
      initial={{ opacity: 0, y: -10, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -10, scale: 0.96 }}
      transition={{ duration: 0.25 }}
      className={`
        fixed z-[9999] pointer-events-auto
        ${POSITION_CLASSES[position]}
        w-fit
        rounded-lg shadow-xl text-sm
        ${isSuccess ? "bg-green-600 text-white" : "bg-red-600 text-white"}
      `}
    >
      <div className="flex items-center gap-3 px-4 py-3">
        {isSuccess ? (
          <CheckCircle size={18} />
        ) : (
          <XCircle size={18} />
        )}

        <span
          title={message}
        >
          {message}
        </span>
      </div>
    </motion.div>
  );
}
