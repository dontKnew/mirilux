"use client";
import Main from "@/components/admin/Main";
import useApiRequest from "@/hooks/useApiRequest";
import { useEffect } from "react";
import { useToast } from "@/components/ui/toast/ToastProvider";
import StatCardSkeleton from "@/components/admin/skeleton/StatCardSkeleton";
import { StatCard } from "@/components/admin/StatCard";
import { IndianRupee, ShoppingCart, Package, Users } from "lucide-react";


export default function DashboardPage() {
  const {data, error, send, loading} = useApiRequest();
  const {showToast} = useToast();

  useEffect(()=>{
    send("/auth/admin", {page:"dashboard"});
  }, []);

  useEffect(()=>{
    if(error){
      showToast(error);
    }
  }, [error]);

  return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {loading && (
          <>
            <StatCardSkeleton />
            <StatCardSkeleton />
            <StatCardSkeleton />
            <StatCardSkeleton />
            <StatCardSkeleton />
          </>
        )}
        {!loading && data && (
          <>            
              <StatCard
                title="Total Revenue"
                value={`₹ ${data.total_income}`}
                icon={IndianRupee}
                link="/admin/orders"
              />

              <StatCard
                title="Orders"
                value={data.total_orders}
                icon={ShoppingCart}
                link="/admin/orders"
              />

              <StatCard
                title="Enquiries"
                value={data.total_enquiries}
                icon={Package}
                link="/admin/products"
              />

              <StatCard
                title="Customers"
                value={data.total_users}
                icon={Users}
                link="/admin/users"
              />
          </>
        )}

      </div>
  );
}
