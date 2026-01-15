// components/ClientAuthInit.jsx
"use client";
import AuthClientService from "@/services/AuthClientService";
import { useEffect } from "react";

export default function ClientAuthInit() {
  useEffect(() => {
    AuthClientService.init();
  }, []);

  return null;
}
