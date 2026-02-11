"use client";

import { useState } from "react";
import Sidebar from "@/components/admin/Sidebar";
import Navbar from "@/components/admin/Navbar";

export default function Main({children}) {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="flex bg-gray-100 min-h-screen">
      <Sidebar
        collapsed={collapsed}
        mobileOpen={mobileOpen}
        setMobileOpen={setMobileOpen}
      />
      <div className="flex-1">
        <Navbar setMobileOpen={setMobileOpen} />
        <main className="p-2 md:p-4">
          {children}
        </main>
      </div>
    </div>
  );
}
