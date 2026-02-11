"use client";

import { useEffect, useState } from "react";
import { User, Mail, Phone, MessageSquare } from "lucide-react";
import FloatingInput from "@/components/ui/FloatingInput";
import useApiRequest from "@/hooks/useApiRequest";
import { useToast } from "@/components/ui/toast/ToastProvider";
import TitleHeading from "./ui/TitleHeading";
import Title from "./ui/Title";
import FloatingTextarea from "./ui/FloatingTextarea";
import ButtonLoader from "./ui/buttons/ButtonLoader";

export default function ContactForm() {

  const { data, send, loading, error } = useApiRequest();
  const { showToast } = useToast();

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNo, setPhoneNo] = useState("");
  const [message, setMessage] = useState("");

  /* -------- VALIDATION -------- */
  const isValidEmail = (v) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);

  const isValidPhone = (v) =>
    /^\d{10}$/.test(v);

  const handleSubmit = async () => {
    if (!fullName || fullName.length < 3) {
      return showToast("Enter valid name" );
    }

    if (!isValidEmail(email)) {
      return showToast("Enter valid email");
    }

    if (!isValidPhone(phoneNo)) {
      return showToast("Enter valid mobile number");
    }

    if (!message || message.length < 10) {
      return showToast("Message too short" );
    }
    send("/enquiry", {
      full_name: fullName,
      email,
      phone_no: phoneNo,
      message
    });
  };

  useEffect(()=>{
    if(error){
      showToast(error);
    }
    if(data){
      showToast("Message sent successfully! We will contact you soon.", "success");
      setFullName("");
      setEmail("");
      setPhoneNo("");
      setMessage("");
    }

  }, [data, error])

  return (
    <div className="max-w-2xl mx-auto py-10 px-4">

<Title 
title={'Contact us'}
description="Have questions? Send us a message and we’ll get back to you shortly."
/>

      <form className="space-y-5">

        {/* Full Name */}
        <FloatingInput
          label="Full Name"
          icon={User}
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          success={fullName && fullName.length > 2}
        />

        {/* Email */}
        <FloatingInput
          label="Email Address"
          icon={Mail}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          error={email && !isValidEmail(email) ? "Invalid email" : ""}
          success={email && isValidEmail(email)}
        />

        {/* Phone */}
        <FloatingInput
          label="Mobile Number"
          icon={Phone}
          value={phoneNo}
          onChange={(e) => setPhoneNo(e.target.value.replace(/\D/g, ""))}
          error={phoneNo && !isValidPhone(phoneNo) ? "Invalid mobile number" : ""}
          success={phoneNo && isValidPhone(phoneNo)}
        />

       <FloatingTextarea
        label="Enter Your Message"
        icon={MessageSquare}
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        success={message && message.length > 10}
      />


        {/* Submit */}

        <ButtonLoader
        handleClick={handleSubmit}
        loading={loading}
        text="Send Message"
        className="w-full !py-3"
        />

      </form>
    </div>
  );
}
