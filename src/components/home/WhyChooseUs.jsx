import {
  Sparkles,
  Clock,
  ShieldCheck,
  Leaf,
  Gift,
  Truck,
} from "lucide-react";

export default function WhyChooseUs() {
  return (
    <section className="bg-white py-10">
      <div className="md:max-w-7xl mx-auto px-4">

        {/* Heading */}
        <div className="mb-12">
          <h2 className="flex items-center gap-2 text-2xl font-bold">
            <span className="h-10 w-1.5 bg-[var(--primary)] rounded"></span>
            Why Choose MiriLux
          </h2>
          <p className="mt-3 text-gray-600">
            Discover what makes MiriLux a trusted choice for premium,
            long-lasting fragrances loved by customers across India.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">

          <Feature
            icon={<Sparkles />}
            title="Luxury Fragrances"
            desc="Expertly crafted premium perfumes with elegant and sophisticated notes for every occasion."
          />

          <Feature
            icon={<Clock />}
            title="Long-Lasting Performance"
            desc="High-quality formulations designed to last all day with just one or two sprays."
          />

          <Feature
            icon={<Leaf />}
            title="Safe & Skin-Friendly"
            desc="Carefully formulated with skin-friendly ingredients, suitable for everyday use."
          />

          <Feature
            icon={<ShieldCheck />}
            title="Trusted & Authentic"
            desc="100% genuine products with quality assurance and secure packaging."
          />

          <Feature
            icon={<Truck />}
            title="Fast Delivery Across India"
            desc="Quick and reliable shipping so your favourite fragrance reaches you on time."
          />

          <Feature
            icon={<Gift />}
            title="Perfect for Gifting"
            desc="Premium packaging makes MiriLux perfumes an ideal gift for loved ones."
          />

        </div>
      </div>
    </section>
  );
}

/* ---------------- Feature Card ---------------- */

function Feature({ icon, title, desc }) {
  return (
    <div className="bg-[#fafafa] border border-gray-200 rounded-xl p-6 hover:shadow-md transition">

      <div className="flex items-center gap-3 mb-4">
        <div className="h-12 w-12 rounded-full bg-[var(--primary)]/10 flex items-center justify-center  text-[var(--primary)]">
            {icon}
        </div>

        <h3 className="font-semibold text-base">
            {title}
        </h3>
      </div>

      <p className="text-sm text-gray-600 leading-relaxed">
        {desc}
      </p>
    </div>
  );
}
