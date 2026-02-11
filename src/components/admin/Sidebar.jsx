"use client";
import { pageData } from "@/data/admin/pageData";
import { X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Sidebar({ collapsed, mobileOpen, setMobileOpen }) {
  const pathname = usePathname();
  const menu = pageData;

  return (
    <>
      {mobileOpen && (
        <div
          onClick={() => setMobileOpen(false)}
          className="fixed inset-0 bg-black/40 z-40 md:hidden"
        />
      )}

      <aside
        className={`
          fixed md:static z-50 md:h-[unset] h-full
          bg-[linear-gradient(to_bottom,var(--from-secondary),var(--to-secondary))]
          text-white transition-all duration-300
          ${collapsed ? "w-20" : "w-64"}
          ${mobileOpen ? "left-0" : "-left-full md:left-0"}
        `}
      >
        <div className="p-4 font-bold text-lg border-b border-gray-300 border-white/20">
          {!collapsed && "Miriluxe Admin"}
          <button className="md:hidden float-right" onClick={() => setMobileOpen(false)}>
            <X />
          </button>
        </div>

        <nav className="mt-4 space-y-4">
          {menu.map((item) => {
            const Icon = item.icon;
            const active = pathname === item.href;

            return (
              <Link
               onClick={()=>{setMobileOpen(false)}}
                key={item.name}
                href={item.href}
                className={`
                  flex items-center gap-4 px-4 py-3 mx-2 rounded-lg
                  transition
                  ${active
                    ? "bg-[linear-gradient(to_right,var(--from-primary),var(--to-primary))]"
                    : "hover:bg-white/10 text-white/80"}
                `}
              >
                <Icon size={20} />
                {!collapsed && item.name}
              </Link>
            );
          })}
        </nav>
      </aside>
    </>
  );
}
