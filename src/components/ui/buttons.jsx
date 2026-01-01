import { ArrowRight } from "lucide-react";
import { ShoppingCart } from "lucide-react";

function ButtonBuyNow2() {
  return (
    <button
      className="group w-full active:scale-95 hover:scale-102 flex  items-center justify-center gap-1 border-2 border-[var(--primary)] text-[var(--primary)] bg-white py-1 rounded-md hover:bg-[var(--primary)] hover:text-white shadow-sm hover:shadow-md hover:scale-[1.02] transition-all duration-200"
    >
      Buy Now
      <ArrowRight
        size={18}
        className="text-[var(--primary)] group-hover:text-white transition-colors"
      />
    </button>
  );
}
function ButtonAddToCart() {
  return (<button className="w-full hover:scale-102 active:scale-95 flex items-center justify-center gap-2 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-600 hover:to-green-700 text-white py-1 rounded-md transition">
    <ShoppingCart size={18} />
    Add Cart
  </button>)
}





function ButtonBuyNow() {
  return (<button className="w-full flex items-center justify-center gap-2 bg-[var(--primary)] text-white py-2 rounded-md shadow-md hover:shadow-xl hover:scale-[1.02] transition">
    Buy Now
    <ArrowRight size={18} />
  </button>)
}


function ButtonAddToCart2() {
  return (
    <button
      className="group w-full flex items-center justify-center gap-1 border-2 border-[var(--secondary)] text-[var(--secondary)] bg-white py-2 rounded-md hover:bg-[var(--secondary)] hover:text-white shadow-sm hover:shadow-md hover:scale-[1.02] transition-all duration-200"
    >
      <ShoppingCart
        size={18}
        className="text-[var(--secondary)] group-hover:text-white transition-colors"
      />
      Add to Cart
    </button>
  );
}


export { ButtonBuyNow, ButtonAddToCart2, ButtonAddToCart, ButtonBuyNow2 }