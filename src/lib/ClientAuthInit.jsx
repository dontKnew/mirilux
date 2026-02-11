// components/ClientAuthInit.jsx
"use client";
import AuthClientService from "@/services/AuthClientService";
import { useEffect } from "react";
import { useGlobalState } from "./useGlobalState";

export default function ClientAuthInit() {
  const {setHasAuthChecked, hasAuthChecked} = useGlobalState();
  useEffect(() => {
    const checkAuthClient = async ()=>{
      await AuthClientService.init();
      setHasAuthChecked(true);
    }
    checkAuthClient();
  }, []);
  return null;
}
