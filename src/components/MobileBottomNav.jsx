"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home,
  Grid,
  Tag,
  HelpCircle,
  Truck,
} from "lucide-react";

export default function MobileBottomNav() {
  const pathname = usePathname();

  const items = [
    { name: "Home", icon: Home, href: "/" },
    { name: "Categories", icon: Grid, href: "/category" },
    { name: "Offers", icon: Tag, href: "/offers" },
    { name: "Track", icon: Truck, href: "/track-order" },
    { name: "Help", icon: HelpCircle, href: "/help" },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-white pb-[env(safe-area-inset-bottom)] border-t border-gray-200">
      <div className="flex items-center">

        {items.map(({ name, icon: Icon, href }) => {
          const isActive = pathname === href;

          return (
            <Link
              key={name}
              href={href}
              className="flex-1"
            >
              <div className="flex flex-col items-center justify-center gap-0.5 py-2 active:bg-gray-100 transition-colors"
              >
                <Icon
                  size={24}
                  strokeWidth={1.6}
                  className={`transition-transform scale-110 ${
                    isActive
                      ? "text-[var(--primary)]"
                      : "text-[var(--secondary)]"
                  }`}
                />

                <span
                  className={`text-[12px] font-medium ${
                    isActive
                      ? "text-[var(--primary)]"
                      : "text-[var(--secondary)]"
                  }`}
                >
                  {name}
                </span>

                {/* Active indicator */}
                <span
                  className={`mt-1 h-[2px] w-6 rounded-full transition-all ${
                    isActive
                      ? "bg-[var(--primary)]"
                      : "bg-transparent"
                  }`}
                />
              </div>
            </Link>
          );
        })}

      </div>
    </nav>
  );
}
