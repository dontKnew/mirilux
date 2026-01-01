import Main from "@/components/layout/Main";
import Title from "@/components/ui/Title";
import {
  Tag,
  Flame,
  Gift,
  Truck,
  Copy,
  Sparkles,
} from "lucide-react";

export default function Page() {
  return (
    <Main>
      <section className="max-w-7xl mx-auto px-4 py-12">

        {/* PAGE TITLE */}
        <Title
          title="Exclusive Offers"
          subtitle="Save more on luxury perfumes with exciting deals & coupons"
        />

        {/* HERO OFFER */}
        <div className="mt-8 rounded-2xl bg-gradient-to-r from-[var(--primary)] to-[var(--secondary)]
                        text-white p-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h2 className="text-3xl font-bold flex items-center gap-2">
              <Sparkles />
              Flat 15% OFF
            </h2>
            <p className="mt-2 text-white/90">
              On your first order. Limited time only!
            </p>
          </div>

          <div className="flex items-center gap-3 bg-white text-gray-900
                          px-5 py-3 rounded-lg shadow">
            <Tag className="text-[var(--primary)]" />
            <span className="font-bold tracking-widest">
              MIRILUX15
            </span>
            <button className="text-sm text-[var(--primary)] font-semibold flex items-center gap-1">
              <Copy size={14} /> Copy
            </button>
          </div>
        </div>

        {/* COUPON CARDS */}
        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

          <OfferCard
            icon={<Flame />}
            title="Best Seller Deal"
            desc="Extra 10% OFF on best sellers"
            code="BEST10"
            color="bg-orange-50 border-orange-200"
          />

          <OfferCard
            icon={<Gift />}
            title="Gift Combo Offer"
            desc="Save ₹300 on combo perfumes"
            code="COMBO300"
            color="bg-pink-50 border-pink-200"
          />

          <OfferCard
            icon={<Truck />}
            title="Free Shipping"
            desc="On orders above ₹399"
            code="AUTO"
            color="bg-green-50 border-green-200"
          />

        </div>

        {/* LIMITED TIME SECTION */}
        <div className="mt-14 bg-[#fafafa] border border-gray-300 rounded-xl p-6">
          <h3 className="text-xl font-semibold mb-4">
            🔥 Limited Time Deals
          </h3>

          <ul className="space-y-3 text-sm text-gray-700">
            <li>• Buy 2 Get 1 Mini Perfume Free</li>
            <li>• Flat ₹500 OFF on Luxury Range</li>
            <li>• Extra cashback on prepaid orders</li>
          </ul>
        </div>

        {/* TRUST STRIP */}
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
          <TrustItem title="100% Authentic" desc="Premium fragrances only" />
          <TrustItem title="Fast Delivery" desc="Across India in 3–5 days" />
          <TrustItem title="Secure Payments" desc="All payment methods supported" />
        </div>

      </section>
    </Main>
  );
}

/* ---------------- COMPONENTS ---------------- */

function OfferCard({ icon, title, desc, code, color }) {
  return (
    <div className={`border rounded-xl p-5 ${color}`}>
      <div className="flex items-center gap-3 mb-3 text-[var(--primary)]">
        {icon}
        <h4 className="font-semibold">{title}</h4>
      </div>

      <p className="text-sm text-gray-700 mb-4">
        {desc}
      </p>

      <div className="flex items-center justify-between bg-white rounded-md px-4 py-2 border">
        <span className="font-bold tracking-wide">{code}</span>
        <button className="text-sm font-semibold text-[var(--primary)]">
          Copy
        </button>
      </div>
    </div>
  );
}

function TrustItem({ title, desc }) {
  return (
    <div>
      <p className="font-semibold">{title}</p>
      <p className="text-sm text-gray-600 mt-1">{desc}</p>
    </div>
  );
}
