import { ShoppingBag } from "lucide-react";
export default function ButtonAddToCart({ handleAdd, isInCart }) {
    return (
        <button
            onClick={handleAdd}
            disabled={isInCart}
            className={`w-full flex items-center justify-center gap-2 py-2 rounded-md font-medium transition-all duration-200
            ${isInCart
                    ? "bg-[var(--secondary)] text-white !cursor-not-allowed opacity-80"
                    : "bg-gradient-to-r from-green-600 to-green-700 text-white hover:scale-[1.02] active:scale-95"
                }
        `}
        >
            <ShoppingBag size={18} />
            {isInCart ? "Added" : "Add to Cart"}
        </button>
    );
}