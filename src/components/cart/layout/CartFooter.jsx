"use client";

import { useCart } from "@/lib/useCart";
import { ArrowRightCircle, Loader2 } from "lucide-react";
import { useCart as useCartContext } from "@/context/CartContext";
import { useRouter } from "next/navigation";
import useApiRequest from "@/hooks/useApiRequest";
import { useEffect, useState } from "react";
import { useToast } from "@/components/ui/toast/ToastProvider";
import { useGlobalState } from "@/lib/useGlobalState";
import LoginPopup from "@/components/auth/LoginPopup";

export default function CartFooter({totalPrice }) {
  const hasItems = useCart((s) => s.hasItems());
  const { setIsOpen } = useCartContext();
  const router = useRouter();
  const { send, data, error, loading } = useApiRequest();
  const {showToast} = useToast();
  const {hasAuth, cartAddress} = useGlobalState();
  const [openLogin, setOpenLogin] = useState(false);
  if (!hasItems) return null;

  const checkout = () => {
    if (loading) return;
    for (const [key, value] of Object.entries(cartAddress)) {
        if (!value || value=="") {
          showToast("All address fields are required");
          return;
        }
      }
    if(!hasAuth){
      send("/register", {user:cartAddress}, {credentials:true}) // create authentication1
    }else {
      showToast("Proceed to Order Booking", "success");
      setIsOpen(false);
      // router.push("/checkout/summary");
    }
  };

  useEffect(()=>{
    if(error){
      showToast(error)
      return ;
    }
    if(data){
      console.warn("Data Got It", data);
      // user is not currently login, so process can be login 
      if(!hasAuth){
        showToast("Account Created & Proceed to Order Booking", "success");
        setIsOpen(false);
        // router.push("/checkout/summary");
      }else {
        showToast("something is wrong")
      }
    }
  }, [data, error])

  return (
    <div className="border-t border-color px-4 py-2">
      <button
        onClick={checkout}
        disabled={loading}
        className={`w-full flex items-center justify-center gap-2 
        bg-gradient-to-r from-[var(--from-primary)] to-[var(--to-primary)]
        hover:from-green-600 hover:to-green-700
        text-white py-3 font-semibold rounded-md transition
        disabled:opacity-70 disabled:cursor-not-allowed`}
      >
        {loading ? (
          <>
            <Loader2 className="animate-spin" />
            Processing...
          </>
        ) : (
          <>
            <ArrowRightCircle />
            CHECKOUT — ₹{totalPrice}
          </>
        )}
      </button>
      {openLogin && 
        <LoginPopup
          open={openLogin}
          onClose={() => setOpenLogin(false)}
          email={cartAddress.email}
          phone={cartAddress.phone_no}
          />
      }
      
    </div>
  );
}
