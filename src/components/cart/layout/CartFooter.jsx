import { useCart } from "@/lib/useCart";
import { ArrowRightCircle } from "lucide-react";
import { useCart as useCartContext } from "@/context/CartContext";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function CartFooter() {
  const hasItems = useCart((s) => s.hasItems());
  if(!hasItems) return ;
  const { setIsOpen } = useCartContext();
  const router = useRouter();
  const checkout = ()=>{
      setIsOpen(false);
      router.push("/checkout/summary");
  }
  return (
    <div className="border-t border-color px-4 py-2">
      <button onClick={()=>checkout()}  className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-[var(--from-primary)] to-[var(--to-primary)] hover:from-green-600 hover:to-green-700 text-white py-3 font-semibold rounded-md transition">
        CHECKOUT — ₹485 <ArrowRightCircle />
      </button>
    </div>
  );
}
