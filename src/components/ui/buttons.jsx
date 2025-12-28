import { ArrowRight } from "lucide-react";
import { ShoppingCart } from "lucide-react";

function ButtonBuyNow() {
  return (<button className="w-full flex items-center justify-center gap-2 bg-[var(--primary)] text-white font-bold py-2 rounded-md shadow-md hover:shadow-xl hover:scale-[1.02] transition">
    Buy Now
    <ArrowRight size={18} />
  </button>)
}

function ButtonBuyNowOutline() {
  return (
    <button className="w-full border-2 border-[var(--primary)] text-[var(--primary)] hover:bg-[var(--primary)] hover:text-white font-semibold py-2 rounded-md transition">
      BUY NOW
    </button>

  )
}

function ButtonAddToCart() {
  return (<button className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold py-2 rounded-md transition">
    <ShoppingCart size={18} />
    Cart
  </button>)
}

export { ButtonBuyNow, ButtonAddToCart, ButtonBuyNowOutline }