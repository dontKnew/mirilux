"use client";

import { Tag, Loader2, X } from "lucide-react";
import { motion } from "framer-motion";
import { useRef, useState } from "react";
import { useToast } from "../../ui/toast/ToastProvider";
import { useCart } from "@/lib/useCart";

export default function CartCoupon() {
  const [code, setCode] = useState("");
  const [status, setStatus] = useState("idle"); // idle | loading | success | error

  const inputRef = useRef(null);
  const { showToast } = useToast();
  const hasItems = useCart((s) => s.hasItems());
  if(!hasItems) return ;

  const applyCoupon = () => {
    if (!code || status === "success") return;

    setStatus("loading");

    setTimeout(() => {
      if (code === "MIRILUX10") {
        setStatus("success");
        showToast({
          type: "success",
          message: "Coupon applied successfully!",
        });
      } else {
        setStatus("error");
        showToast({
          type: "error",
          message: "Invalid coupon code",
        });

        setTimeout(() => inputRef.current?.focus(), 200);
      }
    }, 900);
  };

  const removeCoupon = () => {
    setCode("");
    setStatus("idle");
    inputRef.current?.focus();

    showToast({
      type: "success",
      message: "Coupon removed",
    });
  };

  return (
    <motion.form
      onSubmit={(e) => {
        e.preventDefault();
        applyCoupon();
      }}
      animate={
        status === "error"
          ? { x: [-6, 6, -4, 4, 0] }
          : { x: 0 }
      }
      transition={{ duration: 0.35 }}
      className={`
        flex items-center gap-2
        border rounded ps-3 pe-1 py-1 w-full
        ${status === "error"
          ? "border-red-400 bg-red-50"
          : status === "success"
            ? "border-green-500 bg-green-50"
            : "border-gray-300"
        }
      `}
    >
      {/* Icon */}
      <Tag size={18} className="text-[var(--primary)] shrink-0" />

      {/* Input */}
      <input
        ref={inputRef}
        type="text"
        value={code}
        disabled={status === "success"}
        onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); applyCoupon(); } }}
        onChange={(e) => {
          setCode(e.target.value.toUpperCase());
          setStatus("idle");
        }}
        placeholder="Enter coupon code"
        className="
          flex-1 min-w-0 bg-transparent outline-none uppercase
           placeholder:text-gray-400
          disabled:opacity-70
        "
      />

      {/* APPLY / APPLIED */}
      {status !== "success" ? (
        <button
          type="submit"
          disabled={status === "loading"}
          className={`
            min-w-[72px] h-[35px] px-3 py-2 rounded
            flex items-center justify-center
            text-sm font-semibold transition-all
            ${status === "loading"
              ? "bg-gray-200 text-gray-400 cursor-not-allowed"
              : "bg-[var(--primary)] text-white hover:opacity-90 active:scale-95"
            }
          `}
        >
          {status === "loading" ? (
            <Loader2 size={16} className="animate-spin" />
          ) : (
            "Apply"
          )}
        </button>
      ) : (
        <div className="flex items-center gap-1  min-w-[72px] h-[35px]">
          <span className="text-green-700 font-semibold text-md">
            Applied
          </span>

          {/* REMOVE COUPON */}
          <button
            type="button"
            onClick={removeCoupon}
            className="h-6 w-6 rounded-full flex items-center justify-center hover:bg-red-100 text-red-500 transition"
            aria-label="Remove coupon"
          >
            <X size={16} />
          </button>
        </div>
      )}
    </motion.form>
  );
}
