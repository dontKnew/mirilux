import OrderSummary from "@/components/checkout/OrderSummary";

export default function PaymentPage() {
  return (
    <div className="grid md:grid-cols-3 gap-6">
      
      <div className="md:col-span-2 bg-white p-6 rounded-xl">
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

        <button className="mt-6 w-full bg-orange-500 text-white py-3 rounded-lg font-semibold">
          Pay ₹1515
        </button>
      </div>

      <OrderSummary />
    </div>
  );
}
