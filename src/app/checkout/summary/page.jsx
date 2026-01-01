import Link from "next/link";
import OrderSummary from "@/components/checkout/OrderSummary";

export default function SummaryPage() {
  return (
    <div className="grid md:grid-cols-3 gap-6">
      
      <div className="md:col-span-2 bg-white p-6 rounded-xl">
        <h2 className="text-lg font-semibold mb-4">
          Order Summary
        </h2>

        <div className="border rounded-lg p-4 mb-4">
          <p className="text-sm font-medium">Delivery Address</p>
          <p className="text-sm text-gray-600">
            John Doe, 9876543210 <br />
            Mumbai, Maharashtra
          </p>
        </div>

        <Link
          href="/checkout/payment"
          className="bg-orange-500 text-white py-3 rounded-lg text-center font-semibold block"
        >
          Proceed to Payment
        </Link>
      </div>

      <OrderSummary />
    </div>
  );
}
