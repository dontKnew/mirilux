"use client";

import { useState } from "react";
import LoginPopup from "@/components/auth/LoginPopup";

export default function Page() {
  const [openLogin, setOpenLogin] = useState(true);

  return (
    <div className="p-10">
      {/* Button user clicks */}
      <button
        onClick={() => setOpenLogin(true)}
        className="rounded-lg bg-black px-6 py-3 text-white"
      >
        Proceed to Order Booking
      </button>

      {/* 🔐 Login Popup */}
      <LoginPopup
        open={openLogin}
        onClose={() => setOpenLogin(false)}
        email="sajid.rapidexworldwide@gmail.com"
        phone="9876543210"
        />

    </div>
  );
}
