import PriceDetails from "@/components/checkout/PriceDetails";
import Link from "next/link";

export default function PaymentPage() {
  return (
<div className="grid md:grid-cols-3 md:gap-4 gap-0">

      <div className="md:col-span-2 bg-white bg-white md:px-6 px-1 py-2 rounded-xl">
        <h2 className="text-lg font-semibold mb-4">
          Choose Payment Method
        </h2>

        <div className="space-y-3">
          <div className="border p-4 rounded-lg cursor-pointer hover:border-orange-500">
            UPI (Recommended)
          </div>
          <div className="border p-4 rounded-lg cursor-pointer hover:border-orange-500">
            Debit / Credit Card
          </div>
          <div className="border p-4 rounded-lg cursor-pointer hover:border-orange-500">
            Cash on Delivery
          </div>
        </div>
      </div>
      <div className="bg-white md:px-6 px-1 md:py-4 rounded-xl h-fit mt-4 mt:-0">
        <PriceDetails />
      </div>
      <div className="md:relative fixed bottom-2 left-0 w-full flex justify-center col-span-3">
        <Link
          href="/checkout/success"
          className="w-[250px] shadow-[0_-4px_12px_rgba(0,0,0,0.08)] bg-[var(--primary)] hover:bg-[var(--secondary)] hover:scale-105 active:scale-95 text-white py-3 rounded-lg text-center font-medium  mt-4"
        >
          Pay Now ₹1,515
        </Link>
      </div>
    </div>
  );
}
