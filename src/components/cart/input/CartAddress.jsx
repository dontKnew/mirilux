"use client";

import { useState } from "react";
import { User, Phone, MapPin, Home, EqualApproximatelyIcon } from "lucide-react";
import FloatingInput from "@/components/ui/FloatingInput";
import { useCart } from "@/lib/useCart";

export default function AddressPage() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const hasItems = useCart((s) => s.hasItems());
  if(!hasItems) return ;
  

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
        <div className="grid md:grid-cols-2 grid-cols-1 gap-4 mb-4">
          
            <FloatingInput
              label="Email"
              icon={EqualApproximatelyIcon}
              value=""
              onChange={() => {}}
            />
            <FloatingInput
              label="Pincode"
              icon={MapPin}
              value=""
              onChange={() => {}}
            />

        </div>
        <FloatingInput
            label="Full Address"
            icon={Home}
            value=""
            onChange={() => {}}
          />
      </div>
    
  );
}
