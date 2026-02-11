"use client"

import Main from "@/components/admin/Main";
import AdminSkeleton from "@/components/admin/skeleton/AdminSkeleton";
import { useGlobalState } from "@/lib/useGlobalState";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function AdminLayout({ children }) {
  const { hasAuth, hasAuthChecked, authUser } = useGlobalState();
  const router = useRouter();
  useEffect(() => {
    if (hasAuthChecked && !hasAuth) {
        router.push("/admin-login");
    }
  }, [hasAuth, hasAuthChecked, router]);
  if (!hasAuthChecked) {
    return <AdminSkeleton />;
  }
  if(!hasAuth) {
    return null; 
  }
  return (
    <Main>
      {children}
    </Main>
  );
}