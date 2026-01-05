import { BadgePercent } from "lucide-react";

export default function PriceDetails() {
  return (
    <>
      <h3 className="font-semibold mb-4">Price Details</h3>
        <div className="space-y-4">
          <div className="flex justify-between">
            <span>Subtotal</span>
            <span>₹1,615</span>
          </div>
          <div className="flex justify-between text-blue-600">
            <span>Coupons for you</span>
            <span>-₹100</span>
          </div>

          <div className="flex justify-between text-green-600">
            <span>Discount</span>
            <span>-₹100</span>
          </div>

          <div className="flex justify-between font-semibold border-t pt-2">
            <span>Total</span>
            <span>₹1,515</span>
          </div>
          <div className="flex items-center justify-center mb-2 gap-2 rounded-md px-3 py-1.5 bg-green-100  text-green-700 text-sm">
            <BadgePercent size={16} />
            <span>You'll save <span className="font-medium">₹ 200</span> on this order</span>
          </div>
        </div>
    </>
  );
}
