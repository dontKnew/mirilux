"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "@/context/CartContext";
import { useEffect } from "react";

import CartHeader from "./layout/CartHeader";
import CartItems from "./items/CartItems";
import CartSuggestions from "./items/CartSuggestions";
import CartFooter from "./layout/CartFooter";
import CartCoupon from "./pricing/CartCoupon";
import CartFreeShipping from "./pricing/CartFreeShipping";
import CartAddress from "./input/CartAddress";

export default function CartSidebar() {
  const { isOpen, setIsOpen } = useCart();
  const hasItems = useCart((s) => s.hasItems());
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        setIsOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, setIsOpen]);

  // useEffect(()=>{
  //   // setIsOpen(true)
  // }, [])

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 bg-black/40 z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          {/* Sidebar */}
          <motion.aside
            className="fixed right-0 top-0 h-full w-full md:w-[450px] bg-white z-50 flex flex-col"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.35, ease: "easeInOut" }}
          >
            <CartHeader onClose={() => setIsOpen(false)} />
            <div className="flex-1 overflow-y-auto px-4 py-3 space-y-6">
              <CartFreeShipping total={50} />
              <CartItems />
              <CartCoupon />
              <CartAddress />
              <CartSuggestions />
            </div>
            <CartFooter />
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
