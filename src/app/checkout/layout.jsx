import CheckoutStepper from "@/components/checkout/CheckoutStepper";

export default function CheckoutLayout({ children }) {
  return (
    <div className="min-h-screen bg-gray-50">
      <CheckoutStepper />
      <main className="max-w-6xl mx-auto px-4 py-6">
        {children}
      </main>
    </div>
  );
}
