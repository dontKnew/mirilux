import Image from "next/image";
import {
  Instagram,
  Facebook,
  Twitter,
  Mail,
  Phone,
  MapPin,
  ShieldCheck,
  Youtube,
} from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#fafafa] border-t border-gray-200">
      <div className="md:max-w-7xl mx-auto px-4 py-14">

        {/* TOP GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">

          {/* BRAND */}
          <div>
            {/* LOGO */}
            <Image
              src="/logo.png"
              alt="MiriLux Logo"
              width={180}
              height={40}
            />

            <p className=" text-gray-600 leading-relaxed max-w-xs text-justify">
              MiriLux is India’s premium perfume brand offering long - lasting,
              luxury fragrances crafted for modern lifestyles.
            </p>

            {/* Social Icons */}
            <div className="flex gap-3 mt-5">
              <SocialIcon Icon={Instagram} />
              <SocialIcon Icon={Facebook} />
              <SocialIcon Icon={Twitter} />
              <SocialIcon Icon={Youtube} />
            </div>
          </div>

          {/* SHOP */}
          <div>
            <FooterTitle title="Shop" />
            <FooterLink text="Men Perfumes" />
            <FooterLink text="Women Perfumes" />
            <FooterLink text="Unisex Perfumes" />
            <FooterLink text="Luxury Collection" />
            <FooterLink text="Gift Sets" />
          </div>

          {/* COMPANY */}
          <div>
            <FooterTitle title="Company" />
            <FooterLink text="About Us" />
            <FooterLink text="Our Story" />
            <FooterLink text="Careers" />
            <FooterLink text="Blogs" />
            <FooterLink text="Contact Us" />
          </div>

          {/* SUPPORT */}
          <div>
            <FooterTitle title="Support" />
            <FooterLink text="Track Order" />
            <FooterLink text="Return Policy" />
            <FooterLink text="Shipping Policy" />
            <FooterLink text="Privacy Policy" />
            <FooterLink text="Terms & Conditions" />
          </div>
        </div>

        {/* TRUST STRIP */}
        <div className="flex md:flex-row flex-col gap-4 flex-wrap md:justify-between border-t border-gray-300 mt-12 py-6  text-gray-700">
          <div className="flex md:flex-row flex-col justify-between  gap-4">
            <div className="flex items-center gap-2">
              <ShieldCheck className="text-green-600" size={18} />
              100% Secure Payments
            </div>
            <div>Easy Returns</div>
            <div>Fast Shipping Across India</div>
          </div>
          
        {/* CONTACT INFO */}
        <div className="flex md:flex-row flex-col justify-between  gap-4  text-gray-700">

          <div className="flex items-center gap-2">
            <Mail size={16} />
            support@mirilux.com
          </div>

          <div className="flex items-center gap-2">
            <Phone size={16} />
            +91 98765 43210
          </div>

          <div className="flex items-center gap-2">
            <MapPin size={16} />
            Made in India 🇮🇳
          </div>
        </div>
        </div>


        {/* COPYRIGHT */}
        <div className="border-t border-gray-200 pt-5 text-center text-gray-500">
          © {new Date().getFullYear()} MiriLux. All rights reserved.
        </div>
      </div>
    </footer>
  );
}

/* ------------------ Reusable UI ------------------ */

function FooterTitle({ title }) {
  return (
    <h4 className=" font-semibold mb-4 uppercase tracking-wide text-gray-800">
      {title}
    </h4>
  );
}

function FooterLink({ text }) {
  return (
    <p className=" text-gray-600 hover:text-[var(--primary)] cursor-pointer mb-3 transition-colors">
      {text}
    </p>
  );
}

function SocialIcon({ Icon }) {
  return (
    <div className="h-9 w-9 rounded-full border border-gray-300 flex items-center justify-center
                    text-gray-600 hover:bg-[var(--primary)] hover:text-white hover:border-[var(--primary)]
                    transition cursor-pointer">
      <Icon size={18} />
    </div>
  );
}
