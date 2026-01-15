"use client";

import { useEffect, useState } from "react";
import { Store, ShoppingCart, Search, HelpCircle, Truck, BookOpen, LogOutIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useCart as useCartContext } from "@/context/CartContext";
import { useCart } from "@/lib/useCart";
import Icon from "../ui/Icon";
import Logo from "../ui/Logo";
import { useGlobalState } from "@/lib/useGlobalState";
import AuthClientService from "@/services/AuthClientService";
import { useToast } from "../ui/toast/ToastProvider";

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
  const { setIsOpen } = useCartContext();
  const totalCartitems = useCart((s) => s.getTotalItems());
  const {hasAuth} = useGlobalState();
  const {showToast} = useToast()

  const logoutUser = async  ()=>{
    try {
      const result = await AuthClientService.logout();
      showToast(result, "success");
    }catch(e){
      showToast(e.message)
    }
  }

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
    <div className="bg-white">
      <div className="mx-2 md:mx-auto relative md:top-0 h-[100px] md:h-fit -top-[15px]  md:max-w-7xl md:px-4 px-0 flex md:flex-row flex-col md:items-center items-start justify-between md:gap-5 gap-0">

        {/* Logo */}
        <div>
          <Logo />
          <div className="md:hidden block w-fit absolute top-[32px] right-[11px]">
              <div className="flex gap-4">
                  <Link href="/shop"><Icon Icon={Store} /></Link>
                  <div onClick={() => setIsOpen(true)}><Icon Icon={ShoppingCart} count={totalCartitems} /></div>
              </div>
          </div>
        </div>


        {/* Search */}
        <div className="flex flex-1 w-full justify-center md:mb-0 mb-1">
          <div className="relative w-full max-w-lg">
            <Search
              size={18}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            />

            <input
              type="search"
              placeholder={placeholder}
              className="w-full border rounded-md pl-10 md:pr-24 pr-10 py-2  placeholder:text-sm md:placeholder:text-md  outline-none border-gray-300"
            />

            <button
              className="absolute right-0 top-0 h-full px-4 bg-gradient-to-r from-[var(--from-primary)] to-[var(--to-primary)] hover:from-green-600 hover:to-green-700   transition-colors text-white rounded-r-md flex items-center gap-2"
            >
              <Search size={18} />
              <span className="hidden sm:inline">Search</span>
            </button>

          </div>
        </div>

        {/* Icons */}
        <div className="hidden md:flex items-center gap-8">
          <Link href="/shop"><Icon label="Shop" Icon={Store} /></Link>
          <div onClick={() => setIsOpen(true)} ><Icon label="Cart" Icon={ShoppingCart} count={totalCartitems} /> </div>
          <Link href="/track-order"><Icon label="Track" Icon={Truck} /></Link>
          <Link href="/help"><Icon label="Help" Icon={HelpCircle} /></Link>
          {hasAuth && <div onClick={async ()=>{logoutUser()}} ><Icon label="Logout" Icon={LogOutIcon} /></div> }
        </div>

      </div>
    </div>
  );
}
