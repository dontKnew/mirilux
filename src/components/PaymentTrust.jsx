import Image from "next/image";
import { ShieldCheck, RefreshCcw } from "lucide-react";

export default function PaymentTrust() {
  return (
    <section className="md:max-w-7xl mx-auto md:px-4 px-1 py-12">
      <div className="bg-white border border-color rounded-2xl p-6 shadow-sm">

        {/* HEADER */}
        <div className="flex items-start gap-4 mb-6">
          <div className="h-12 w-12 rounded-full bg-green-50 flex items-center justify-center">
            <ShieldCheck className="text-green-600" size={26} />
          </div>

          <div>

            <h2 className="text-2xl font-bold text-gray-900">
              Secure & Trusted Payments
            </h2>
            <p className="text-sm text-green-600 mt-1">
              100% Payment Protection • Easy Returns • Trusted Gateways
            </p>
          </div>
        </div>

        {/* PAYMENT LOGOS */}
        <div className="flex flex-wrap justify-between items-center md:gap-4 gap-2 cursor-pointer">

          <PaymentLogo src="/images/payments/upi.png" alt="UPI" />
          <PaymentLogo src="/images/payments/phonepe.png" alt="PhonePe" />
          <PaymentLogo src="/images/payments/gpay.png" alt="Google Pay" />
          <PaymentLogo src="/images/payments/paytm.png" alt="Paytm" />

          <PaymentLogo src="/images/payments/visa.png" alt="Visa" />
          <PaymentLogo src="/images/payments/mastercard.png" alt="Mastercard" />
          <PaymentLogo src="/images/payments/rupay.png" alt="RuPay" />
        </div>
      </div>
    </section>
  );
}

/* Payment Logo Item */
function PaymentLogo({ src, alt }) {
  return (
    <div className="h-12 w-[72px] flex items-center justify-center border border-color rounded-lg bg-white hover:shadow-md transition">
      <Image
        src={src}
        alt={alt}
        width={60}
        height={32}
        className="object-contain"
      />
    </div>
  );
}
