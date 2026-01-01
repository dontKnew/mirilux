"use client";

import { usePathname } from "next/navigation";
import { motion } from "framer-motion";

const steps = [
  { name: "Address", path: "/checkout/address" },
  { name: "Summary", path: "/checkout/summary" },
  { name: "Payment", path: "/checkout/payment" },
];

export default function CheckoutStepper() {
  const pathname = usePathname();
  const currentStep = steps.findIndex(step =>
    pathname.startsWith(step.path)
  );

  return (
    <div className="bg-white border-b sticky top-0 z-40">
      <div className="max-w-6xl mx-auto px-4 py-4">

        {/* Top bar */}
        <div className="flex items-center justify-between mb-4">
          <button className="text-sm text-gray-600">← Back</button>
          <span className="text-sm font-medium">Secure Checkout 🔒</span>
        </div>

        {/* Stepper */}
        <div className="flex items-center justify-between">
          {steps.map((step, index) => (
            <div key={step.name} className="flex-1 flex items-center">

              {/* Circle */}
              <div
                className={`w-8 h-8 flex items-center justify-center rounded-full text-sm font-semibold
                ${
                  index < currentStep
                    ? "bg-green-500 text-white"
                    : index === currentStep
                    ? "bg-orange-500 text-white"
                    : "border border-gray-300 text-gray-400"
                }`}
              >
                {index < currentStep ? "✓" : index + 1}
              </div>

              {/* Label */}
              <p
                className={`ml-2 text-sm hidden sm:block
                ${
                  index === currentStep
                    ? "text-orange-600 font-semibold"
                    : "text-gray-500"
                }`}
              >
                {step.name}
              </p>

              {/* Animated line */}
              {index !== steps.length - 1 && (
                <div className="flex-1 mx-2 h-[2px] bg-gray-200 relative overflow-hidden">
                  {index < currentStep && (
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: "100%" }}
                      transition={{ duration: 0.4 }}
                      className="absolute h-full bg-green-500"
                    />
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
