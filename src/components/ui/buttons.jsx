import { ArrowRight } from "lucide-react";
import { ShoppingCart } from "lucide-react";


function ButtonAddToCart({text="Add Cart"}) {
  return (<button className={`w-full hover:scale-102 active:scale-95 flex items-center justify-center gap-2 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-600 hover:to-green-700 text-white py-1 rounded-md transition`}>
    <ShoppingCart size={18} />
    {text}
  </button>)
}

function ButtonBuyNow() {
  return (<button className={`w-full flex items-center justify-center gap-2 bg-[var(--primary)] text-white py-2 rounded-md shadow-md hover:shadow-xl hover:scale-[1.02] transition`}>
    Buy Now
    <ArrowRight size={18} />
  </button>)
}


export { ButtonBuyNow, ButtonAddToCart }