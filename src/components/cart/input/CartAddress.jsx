"use client";

import { useState, useEffect } from "react";
import {
  User,
  Phone,
  Mail,
  MapPin,
  Home,
  Map,
  Flag
} from "lucide-react";
import FloatingInput from "@/components/ui/FloatingInput";
import { useCart } from "@/lib/useCart";
import useApiRequest from "@/hooks/useApiRequest";
import { useToast } from "@/components/ui/toast/ToastProvider";
import { useGlobalState } from "@/lib/useGlobalState";

export default function AddressPage() {
  const hasItems = useCart((s) => s.hasItems());

  const [fullName, setFullName] = useState("Sajid Ali");
  const [phoneNo, setPhoneNo] = useState("7065221377");
  const [email, setEmail] = useState("sajid.phpmaster@gmail.com");
  const [pincode, setPincode] = useState("");
  const [addressLine, setAddressLine] = useState("House No. 702, Gali No. 11");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [country, setCountry] = useState("");
  const { send, data, error } = useApiRequest();
  const { showToast } = useToast();
  const {setCartAddress} = useGlobalState();


  if (!hasItems) return null;

  const isValidEmail = (v) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);

  // Pincode handler
  const handlePincodeChange = (e) => {
    const value = e.target.value.replace(/\D/g, "");
    setPincode(value);
    if (value.length === 6) {
      send("/pincode", { pincode: value })
    } else {
      setCity("");
      setState("");
      setCountry("");
    }
  };

  useEffect(() => {
    if (data) {
      setCity(data.city);
      setState(data.state);
      setCountry(data.country);
    }
    if (error) {
      showToast({
        type: "error",
        message: error,
      });
    }
  }, [data, error])



  // Sync cart address
  useEffect(() => {
    setCartAddress({
      full_name: fullName,
      phone_no: phoneNo,
      email,
      address_line: addressLine,
      city,
      state,
      pincode,
      country
    });
  }, [
    fullName,
    phoneNo,
    email,
    addressLine,
    city,
    state,
    pincode,
    country
  ]);

  return (
    <div>
      <h2 className="text-lg font-semibold mb-4">
        Delivery Address
      </h2>

      {/* Name & Phone */}
      <div className="grid md:grid-cols-2 grid-cols-1 gap-5 mb-4">
        <FloatingInput
          label="Full Name"
          icon={User}
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          success={fullName.length > 2}
        />

        <FloatingInput
          label="Mobile Number"
          icon={Phone}
          value={phoneNo}
          onChange={(e) => setPhoneNo(e.target.value.replace(/\D/g, ""))}
          error={
            phoneNo && phoneNo.length !== 10
              ? "Invalid mobile number"
              : ""
          }
          success={phoneNo.length === 10}
        />
      </div>

      {/* Email */}
      <div className="mb-4">
        <FloatingInput
          label="Email"
          icon={Mail}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          error={
            email && !isValidEmail(email)
              ? "Please enter a valid email"
              : ""
          }
          success={email && isValidEmail(email)}
        />
      </div>

      <div className="grid md:grid-cols-2 grid-cols-1 gap-4 mb-4">
        {/* Pincode */}

        <FloatingInput
          label="Pincode"
          icon={MapPin}
          value={pincode}
          onChange={handlePincodeChange}
          error={
            pincode && pincode.length !== 6
              ? "Invalid pincode"
              : ""
          }
          success={pincode.length === 6}
        />


        <FloatingInput
          label="City"
          icon={Map}
          value={city}
          onChange={(e) => setCity(e.target.value)}
          success={city.length > 1}
        />
      </div>

      {/* City, State, Country */}
      <div className="grid md:grid-cols-2 grid-cols-1 gap-4 mb-4">

        <FloatingInput
          label="State"
          icon={Map}
          value={state}
          onChange={(e) => setState(e.target.value)}
          success={!!state}
        />

        <FloatingInput
          label="Country"
          icon={Flag}
          value={country}
          onChange={(e) => setCountry(e.target.value)}
          success={!!country}
        />
      </div>

      {/* Full Address */}
      <FloatingInput
        label="Full Address"
        icon={Home}
        value={addressLine}
        onChange={(e) => setAddressLine(e.target.value)}
        success={addressLine.length > 10}
      />
    </div>
  );
}
