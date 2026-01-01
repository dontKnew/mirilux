import {
  Sparkles,
  Clock,
  ShieldCheck,
  Leaf,
  Gift,
  Truck,
} from "lucide-react";
import BrandName from "../ui/BrandName";
import Container from "../layout/Container";
import Title from "../ui/Title";

export default function WhyChooseUs() {
  return (
    <Container>
        <Title title="Why Choose MiriLux" description="Discover what makes MiriLux a trusted choice for premium, long-lasting fragrances loved by customers across India." />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 md:gap-8 gap-4">
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
    </Container>
  );
}

/* ---------------- Feature Card ---------------- */

function Feature({ icon, title, desc }) {
  return (
    <div className="bg-[#fafafa] border border-gray-200 rounded-xl md:p-6 p-3 hover:shadow-md transition">
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
