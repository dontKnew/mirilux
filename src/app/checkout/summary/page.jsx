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
        <p className="my-2 py-1 rounded text-center bg-[var(--secondary)]/10 text-[var(--secondary)]">Expected Delivery by 2-3 Days </p>
        <AddressPreview />
        <div>
          <h2 className="text-lg mb-3">Product Details : </h2>
            <CartItems />
        </div>
      </div>

      <div className="bg-white md:px-6 px-1 md:py-4 rounded-xl sticky top-28 h-fit">
        <PriceDetails />
        <div className="md:mt-5 bg-white md:relative col-span-2 md:py-0 py-2 items-center fixed bottom-0 left-0 w-full gap-4 flex justify-center">
        <Link
            href="/"
            className="
            w-[140px] 
            bg-primary-g transition-colors
            text-white md:py-3 py-2 rounded-lg text-center font-medium "
          >
            Cancel 
          </Link>
          <Link
            href="/checkout/payment"
            className="
            w-[140px] 
            bg-green-g transition-colors
             text-white md:py-3 py-2 rounded-lg text-center font-medium "
          >
            Place Order
          </Link>
        </div>
      </div>

    </div>
  );
}
