import Link from "next/link";
import OrderSummary from "@/components/checkout/OrderSummary";

export default function AddressPage() {
  return (
    <div className="grid md:grid-cols-3 gap-6">
      
      {/* Address form */}
      <div className="md:col-span-2 bg-white p-6 rounded-xl">
        <h2 className="text-lg font-semibold mb-4">
          Delivery Address
        </h2>

        <form className="grid gap-4">
          <input className="input" placeholder="Full Name" />
          <input className="input" placeholder="Mobile Number" />
          <input className="input" placeholder="Pincode" />
          <input className="input" placeholder="Address Line 1" />
          <input className="input" placeholder="Address Line 2 (Optional)" />

          <Link
            href="/checkout/summary"
            className="mt-4 bg-orange-500 text-white py-3 rounded-lg text-center font-semibold"
          >
            Continue to Summary
          </Link>
        </form>
      </div>

      <OrderSummary />
    </div>
  );
}
