import Link from "next/link";
import CartItems from "@/components/cart/items/CartItems";
import { ArrowLeftCircle, ArrowLeftIcon, ArrowLeftToLine, ArrowRightCircle, Percent } from "lucide-react";
import { BadgePercent } from "lucide-react";
import AddressPreview from "@/components/checkout/AddressPreview";
import PriceDetails from "@/components/checkout/PriceDetails";



export default function SummaryPage() {
  return (
    <div className="grid md:grid-cols-3 md:gap-6 gap-0">
      <div className="md:col-span-2 bg-white md:px-6 px-1 py-2 rounded-xl">
        <h2 className="text-lg text-start font-semibold flex gap-1 mb-4 items-center">
          <Link title="Cancel" className="active:bg-gray-100" href={"/"}><ArrowLeftIcon /> </Link>
          <span>Order Summary</span>
        </h2>
        <AddressPreview />
        <div className="py-4">
          <h2 className="mb-3">Product Details : </h2>
          <CartItems />
        </div>
      </div>

      <div className="bg-white md:px-6 px-1 md:py-4 rounded-xl sticky top-28 h-fit">
        <PriceDetails />
        <div className="md:relative fixed bottom-2 left-0 w-full flex justify-center">
          <Link
            href="/checkout/payment"
            className="w-[250px] shadow-[0_-4px_12px_rgba(0,0,0,0.08)] bg-[var(--primary)] hover:bg-[var(--secondary)] hover:scale-105 active:scale-95 text-white py-3 rounded-lg text-center font-medium  mt-4"
          >
            Place Order Rs. ₹1,515
          </Link>
        </div>

      </div>

    </div>
  );
}
