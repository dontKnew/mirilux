import { BadgePercent } from "lucide-react";

export default function PriceDetails() {
  return (
    <div className="bg-white md:mt-0 mt-4">
      <h3 className="font-semibold text-lg mb-4">Price Details</h3>
      <div className="md:space-y-3 space-y-2">
        <div className="flex justify-between">
          <span className="text-gray-600">Price (3 Item)</span>
          <span>₹259.60</span>
        </div>

        {/* DISCOUNT */}
        <div className="flex justify-between text-green-600">
          <span>Discount</span>
          <span>-₹23.60</span>
        </div>

        <hr className="border-dashed border-color" />

        {/* SUBTOTAL */}
        <div className="flex justify-between font-medium">
          <span>Subtotal</span>
          <span>₹236.00</span>
        </div>

        {/* COUPON */}
        <div className="flex justify-between text-blue-600">
          <span>Coupon for you</span>
          <span>-₹0</span>
        </div>

        {/* SHIPPING */}
        <div className="flex justify-between">
          <span className="text-gray-600">Shipping</span>
          <span className="text-green-600">FREE</span>
        </div>

        <hr className="border-color" />

        {/* AMOUNT PAYABLE */}
        <div className="flex justify-between text-base font-semibold">
          <span>Amount Payable</span>
          <span>₹236.00</span>
        </div>

        {/* GST NOTE */}
        <p className="text-xs text-gray-500 text-right">
          (Inclusive of GST)
        </p>

        {/* SAVINGS BADGE */}
        <div className="mt-3 flex items-center md:text-base tex-sm justify-center gap-2 rounded-md bg-green-100 text-green-700 md:px-3 px-1 py-2">
          <BadgePercent size={16} />
          <span>
            You saved <span className="font-medium">₹23.60</span> on this order
          </span>
        </div>
      </div>
    </div>
  );
}
