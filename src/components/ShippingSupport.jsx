import Image from "next/image";
import { MessageCircle, Phone, ShieldCheck } from "lucide-react";

export default function ShippingSupport() {
  return (
    <section className="bg-white my-4">
      <div className="md:max-w-7xl mx-auto ">
        <div className="flex md:flex-row flex-col md:justify-between gap-4 items-center md:pb-0 pb-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:gap-20">
            <Feature
              image="/images/free-shipping.png"
              title="Free Shipping"
              desc="On orders above ₹399"
            />

            {/* COD */}
            <Feature
              image="/images/cod.png"
              title="COD Available"
              desc="₹40 per order"
            />
          </div>

          {/* RIGHT: SUPPORT (LESS WIDTH BUT CLEAN) */}
          <div className="flex md:flex-row flex-col items-center md:items-end gap-8">

            <div>
              <h4 className="text-lg font-semibold text-gray-900">
                Have Queries or Concerns?
              </h4>
              <p className="text-sm text-gray-600">
                Our team is here to help you 24/7
              </p>
            </div>

            {/* Buttons */}
            <div className="flex gap-3 flex-wrap justify-center md:justify-end">
              <a
                href="https://wa.me/919876543210"
                target="_blank"
                className={`flex w-[150px] items-center gap-2 px-5 py-2.5 rounded-md bg-green-500 text-white font-medium hover:bg-green-600 transition`}
              >
                <MessageCircle size={18} />
                WhatsApp
              </a>

              <a
                href="tel:+919876543210"
                className={`w-[150px] justify-center flex items-center gap-2 px-5 py-2.5 rounded-md border-2 border-[var(--primary)] text-orange-600 hover:bg-[var(--primary)] hover:text-white transition`}
              >
                <Phone size={18} />
                Call Us
              </a>
            </div>

            
          </div>

        </div>
      </div>
    </section>
  );
}

/* ---------- Feature Card ---------- */

function Feature({ image, title, desc }) {
  return (
    <div
      className="flex items-center gap-3 rounded-xl p-4  transition"
    >
      {/* IMAGE ICON */}
      <div className="h-20 w-20 flex items-center justify-center rounded-full bg-orange-50">
        <Image
          src={image}
          alt={title}
          width={50}
          height={50}
          className="object-contain"
        />
      </div>

      <div>
        <h3 className="font-semibold text-gray-900">
          {title}
        </h3>
        <p className="text-sm text-gray-600">
          {desc}
        </p>
      </div>
    </div>
  );
}
