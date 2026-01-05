"use client";

import { useCart } from "@/context/CartContext";
import { ShoppingBag } from "lucide-react";
import { useRouter } from "next/navigation";

export default function ButtonShop() {
  const { setIsOpen } = useCart();   // ✅ correct destructuring
  const router = useRouter();

  const goToShopping = () => {
    setIsOpen(false);                // ✅ close cart drawer
    router.push("/shop");            // ✅ navigate
  };

  return (
    <div className="flex justify-center">
      <button
        onClick={goToShopping}
        className="w-[250px] flex items-center justify-center gap-2 py-2 rounded-md font-medium transition-all duration-200 bg-gradient-to-r from-green-600 to-green-700 text-white hover:scale-[1.02] active:scale-95"
      >
        <ShoppingBag size={18} />
        Continue Shopping
      </button>
    </div>
  );
}
