export default function OrderSummary() {
  return (
    <div className="bg-white p-6 rounded-xl sticky top-28 h-fit">
      <h3 className="font-semibold mb-4">Price Details</h3>

      <div className="space-y-2 text-sm">
        <div className="flex justify-between">
          <span>Subtotal</span>
          <span>₹1,615</span>
        </div>

        <div className="flex justify-between text-green-600">
          <span>Discount</span>
          <span>-₹100</span>
        </div>

        <div className="flex justify-between font-semibold border-t pt-2">
          <span>Total</span>
          <span>₹1,515</span>
        </div>
      </div>
    </div>
  );
}
