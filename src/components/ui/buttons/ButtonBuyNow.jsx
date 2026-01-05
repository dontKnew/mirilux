import { ArrowRight } from "lucide-react";
export default function ButtonBuyNow({handleBuyNow}) {
    return (
        <button 
        onClick={handleBuyNow}
        className="group w-full active:scale-95 hover:scale-102 flex  items-center justify-center gap-1 border-2 border-[var(--primary)] text-[var(--primary)] bg-white py-1 rounded-md hover:bg-[var(--primary)] hover:text-white shadow-sm hover:shadow-md hover:scale-[1.02] transition-all duration-200" >
            Buy Now
            <ArrowRight
                size={18}
                className="text-[var(--primary)] group-hover:text-white transition-colors"
            />
        </button>
    );
}