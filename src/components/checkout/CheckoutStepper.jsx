"use client";

import { usePathname } from "next/navigation";
import { motion } from "framer-motion";

const steps = [
  { name: "Summary", path: "/checkout/summary" },
  { name: "Payment", path: "/checkout/payment" },
  { name: "Invoice", path: "/checkout/success" },
];

export default function CheckoutStepper() {
  const pathname = usePathname();
  const currentStep = steps.findIndex(step =>
    pathname.startsWith(step.path)
  );

  return (
    <div className="mb-2 px-2 py-4 rounded">
      {/* CENTERED STEPPER */}
      <div className="flex justify-center md:bg-gray-100 bg-white">
        <div className="flex items-center w-fit">

          {steps.map((step, index) => (
            <div key={step.name} className="flex items-center">

              {/* Step Circle */}
              <div
                className={`w-9 h-9 flex items-center justify-center rounded-full text-sm font-semibold transition-all
                ${
                  index < currentStep
                    ? "bg-green-500 text-white"
                    : index === currentStep
                    ? "bg-orange-500 text-white scale-105 shadow-md"
                    : "border border-gray-300 text-gray-400"
                }`}
              >
                {index < currentStep ? "✓" : index + 1}
              </div>

              {/* Step Label */}
              <p
                className={`ml-2 text-sm hidden sm:block whitespace-nowrap
                ${
                  index === currentStep
                    ? "text-orange-600 font-semibold"
                    : "text-gray-500"
                }`}
              >
                {step.name}
              </p>

              {/* Progress Line */}
              {index !== steps.length - 1 && (
                <div className="mx-4 w-16 sm:w-20 h-[2px] bg-gray-200 relative overflow-hidden rounded-full">
                  {index < currentStep && (
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: "100%" }}
                      transition={{ duration: 0.35, ease: "easeOut" }}
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
