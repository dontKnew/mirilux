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
  RefreshCcw, Truck,
} from "lucide-react";
import BrandName from "../ui/BrandName";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-[#fafafa] border-t border-gray-200">
      <div className="md:max-w-7xl mx-auto px-4 py-14">

        {/* TOP GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">

          {/* BRAND */}
          <div className="relative -top-[25px]">
            {/* LOGO */}
            <Image
              src="/logo.png"
              alt="MiriLux Logo"
              width={180}
              height={40}
            />

            <p className=" text-gray-600 leading-relaxed max-w-xs text-justify">
              <BrandName /> is India’s premium perfume brand offering timeless, elegant, and long-lasting luxury fragrances crafted for modern lifestyles
            </p>

            {/* Social Icons */}
            <div className="flex gap-3 mt-5 justify-between">
              <SocialIcon
                Icon={Instagram}
                className="text-pink-500 hover:bg-pink-500 hover:text-white hover:border-pink-500"
              />
              <SocialIcon
                Icon={Facebook}
                className="text-blue-600 hover:bg-blue-600 hover:text-white hover:border-blue-600"
              />
              <SocialIcon
                Icon={Twitter}
                className="text-sky-500 hover:bg-sky-500 hover:text-white hover:border-sky-500"
              />
              <SocialIcon
                Icon={Youtube}
                className="text-red-600 hover:bg-red-600 hover:text-white hover:border-red-600"
              />
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
            <FooterLink link="/about" text="About Us" />
            <FooterLink link="/our-story" text="Our Story" />
            <FooterLink link="/careers" text="Careers" />
            <FooterLink link="/blogs" text="Blogs" />
            <FooterLink link="/contact-us" text="Contact Us" />
          </div>

          {/* SUPPORT */}
          <div>
            <FooterTitle link="/support" title="Support" />
            <FooterLink link="/track-order" text="Track Order" />
            <FooterLink link="/cancellation-policy" text="Return Policy" />
            <FooterLink link="/shipping-policy" text="Shipping Policy" />
            <FooterLink link="/privacy-policy" text="Privacy Policy" />
            <FooterLink link="/terms-and-conditions" text="Terms & Conditions" />
          </div>
        </div>

        {/* TRUST STRIP */}
        <div className="flex md:flex-row flex-col gap-4 flex-wrap md:justify-between border-t border-gray-300 mt-12 py-6  text-gray-700">
          <div className="flex md:flex-row flex-col justify-between  gap-4">

            <div className="flex items-center gap-2">
              <ShieldCheck className="text-green-600" size={18} />
              <span>100% Secure Payments</span>
            </div>

            <div className="flex items-center gap-2">
              <RefreshCcw className="text-blue-600" size={18} />
              <span>Easy Returns</span>
            </div>

            <div className="flex items-center gap-2">
              <Truck className="text-orange-500" size={18} />
              <span>Fast Shipping Across India</span>
            </div>
          </div>

          {/* CONTACT INFO */}
          <div className="flex md:flex-row flex-col justify-between  gap-4  text-gray-700">
            <div className="flex items-center gap-2 text-gray-700 hover:text-[var(--primary)] transition">
              <Mail size={16} className="text-blue-500" />
              <span>support@mirilux.com</span>
            </div>

            <div className="flex items-center gap-2 text-gray-700 hover:text-[var(--secondary)] transition">
              <Phone size={16} className="text-green-600" />
              <span>+91 98765 43210</span>
            </div>

            <div className="flex items-center gap-2 text-gray-700">
              <MapPin size={16} className="text-orange-500" />
              <span>Made in India 🇮🇳</span>
            </div>
          </div>
        </div>


        <div className="border-t border-gray-300 md:mt-0 mt-10 pt-6 text-center">
          <p className="text-sm tracking-wide text-gray-700">
            © {new Date().getFullYear()}{" "}
            <BrandName />. All rights reserved.
          </p>
          <p className="mt-1 text-xs text-gray-500">
            Crafted with care in India 🇮🇳
          </p>
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

function FooterLink({ text, link="/" }) {
  return (
    <Link href={link} >
      <p className="text-gray-600 hover:text-[var(--primary)] cursor-pointer mb-3 transition-colors">{text}</p>
      
    </Link>
  );
}

function SocialIcon({ Icon, className }) {
  return (
    <div
      className={`h-9 w-9 rounded-full border border-gray-300 flex items-center justify-center cursor-pointer transition-all duration-200 hover:scale-110 ${className}`}
    >
      <Icon size={18} />
    </div>
  );
}
