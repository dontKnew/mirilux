"use client";

import { motion } from "framer-motion";

export default function CartUndoToast({ item, onUndo }) {
  if (!item) return null;

  return (
    <motion.div
      initial={{ y: 80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: 80, opacity: 0 }}
      className="fixed bottom-20 left-1/2 -translate-x-1/2
                 bg-black text-white px-4 py-3 rounded-lg
                 flex items-center gap-4 z-50 shadow-lg"
    >
      <span className="text-sm">
        {item.name} removed
      </span>

      <button
        onClick={onUndo}
        className="text-[var(--secondary)] font-semibold text-sm"
      >
        UNDO
      </button>
    </motion.div>
  );
}
