import { ArrowRightCircle } from "lucide-react";
import Link from "next/link";

export default function CartFooter() {
  return (
    <div className="border-t border-color px-4 py-2">
      <button className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-[var(--from-primary)] to-[var(--to-primary)] hover:from-green-600 hover:to-green-700 text-white py-3 font-semibold rounded-md transition">
        CHECKOUT — ₹485 <ArrowRightCircle />
      </button>
    </div>
  );
}
