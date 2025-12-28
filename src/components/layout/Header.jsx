"use client";

import { useEffect, useState } from "react";
import { ShoppingCart, Search, HelpCircle, Truck, BookOpen } from "lucide-react";
import Image from "next/image";

const PLACEHOLDERS = [
  "Search for Women Perfume",
  "Search for Men Perfume",
  "Search for Oud Perfume",
  "Search for Luxury Fragrance",
];

export default function Header() {
  const [placeholder, setPlaceholder] = useState("");
  const [wordIndex, setWordIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentWord = PLACEHOLDERS[wordIndex];
    let timeout;

    if (!isDeleting && charIndex < currentWord.length) {
      timeout = setTimeout(() => {
        setPlaceholder(currentWord.slice(0, charIndex + 1));
        setCharIndex(charIndex + 1);
      }, 80);
    } else if (isDeleting && charIndex > 0) {
      timeout = setTimeout(() => {
        setPlaceholder(currentWord.slice(0, charIndex - 1));
        setCharIndex(charIndex - 1);
      }, 50);
    } else if (!isDeleting && charIndex === currentWord.length) {
      timeout = setTimeout(() => setIsDeleting(true), 1500);
    } else if (isDeleting && charIndex === 0) {
      setIsDeleting(false);
      setWordIndex((prev) => (prev + 1) % PLACEHOLDERS.length);
    }

    return () => clearTimeout(timeout);
  }, [charIndex, isDeleting, wordIndex]);

  return (
    <div className="border-b bg-white border-gray-300">
      <div className="max-w-7xl mx-auto px-4 flex items-center justify-between gap-5">

        {/* Logo */}
        <Image src="/logo.png" alt="Logo" width={180} height={40} priority />

        {/* Search */}
        <div className="hidden md:flex flex-1 justify-center">
          <div className="relative w-full max-w-lg">
            <Search
              size={18}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 font-medium"
            />

            <input
              type="search"
              placeholder={placeholder}
              className="w-full border rounded-md pl-10 pr-24 py-2 outline-none border-gray-300"
            />

            <button className="absolute right-0 top-0 h-full px-4 bg-[var(--primary)] hover:bg-[var(--secondary)] text-white rounded-r-md">
              Search
            </button>
          </div>
        </div>

        {/* Icons */}
        <div className="flex items-center gap-10">
          <Icon label="Cart" Icon={ShoppingCart} count={3} />
          <Icon label="Book" Icon={BookOpen} />
          <Icon label="Track" Icon={Truck} />
          <Icon label="Help" Icon={HelpCircle} />
        </div>

      </div>
    </div>
  );
}
function Icon({ Icon, label, count }) {
  return (
    <button className="relative flex flex-col items-center text-[var(--secondary)] hover:text-[var(--primary)] transition">
      {count > 0 && (
        <span className="absolute -top-1 -right-2 bg-[var(--primary)] text-white text-xs h-5 min-w-[20px] px-1 flex items-center justify-center rounded-full">
          {count}
        </span>
      )}
      <Icon size={28} />
      <span className="text-sm">{label}</span>
    </button>
  );
}
