"use client";

import { useState } from "react";
import { User, Phone, MapPin, Home } from "lucide-react";
import Link from "next/link";
import OrderSummary from "@/components/checkout/OrderSummary";
import FloatingInput from "@/components/ui/FloatingInput";

export default function AddressPage() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  return (      
      <div>
        <h2 className="text-lg font-semibold mb-4">
          Delivery Address
        </h2>

        <div className="grid md:grid-cols-2 grid-cols-1 gap-4 mb-4">
            <FloatingInput
            label="Your Name"
            icon={User}
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <FloatingInput
            label="Mobile Number"
            icon={Phone}
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            error={
              phone && phone.length < 10
                ? "Invalid mobile number"
                : ""
            }
          />
        </div>

        <div className="grid gap-4">

          <FloatingInput
            label="Pincode"
            icon={MapPin}
            value=""
            onChange={() => {}}
          />

          <FloatingInput
            label="Full Address"
            icon={Home}
            value=""
            onChange={() => {}}
          />
        </div>
      </div>
    
  );
}
