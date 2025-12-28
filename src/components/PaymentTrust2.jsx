import {
  ShieldCheck,
  CreditCard,
  Wallet,
  Landmark,
  RefreshCcw,
} from "lucide-react";

export default function PaymentTrust2() {
  return (
    <section className="md:max-w-7xl mx-auto px-4 py-10">
      <div className="border border-gray-300 rounded-xl p-6 bg-white shadow-sm">

        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <ShieldCheck className="text-green-600" size={26} />
          <div>
            <h3 className="text-lg font-bold">Secure Payment</h3>
            <p className="text-sm text-green-600">
              100% Payment Protection & Easy Return Policy
            </p>
          </div>
        </div>

        {/* Payment Methods */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">

          {/* UPI */}
          <PaymentItem
            icon={<Wallet />}
            label="UPI / Wallets"
          />

          {/* Cards */}
          <PaymentItem
            icon={<CreditCard />}
            label="Visa / MasterCard / Amex"
          />

          {/* Net Banking */}
          <PaymentItem
            icon={<Landmark />}
            label="Net Banking"
          />

          {/* COD */}
          <PaymentItem
            icon={<RefreshCcw />}
            label="Easy Returns"
          />

          {/* Extra */}
          <PaymentItem
            icon={<ShieldCheck />}
            label="100% Secure"
          />
        </div>
      </div>
    </section>
  );
}

/* Reusable Item */
function PaymentItem({ icon, label }) {
  return (
    <div className="flex flex-col items-center justify-center gap-2 border border-gray-300 rounded-lg p-4 hover:shadow-md transition bg-gray-50">
      <div className="text-[var(--primary)]">{icon}</div>
      <p className="text-xs text-gray-600 text-center font-medium">
        {label}
      </p>
    </div>
  );
}
