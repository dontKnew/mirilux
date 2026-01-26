"use client";

import { useCart } from "@/lib/useCart";
import { ArrowLeftCircle, ArrowRightCircle, ArrowUpCircleIcon, Loader2, Send } from "lucide-react";
import { useCart as useCartContext } from "@/context/CartContext";
import { useRouter } from "next/navigation";
import useApiRequest from "@/hooks/useApiRequest";
import { useEffect, useState } from "react";
import { useToast } from "@/components/ui/toast/ToastProvider";
import { useGlobalState } from "@/lib/useGlobalState";
import LoginPopup from "@/components/auth/LoginPopup";
import AuthClientService from "@/services/AuthClientService";
import ButtonLoader from "@/components/ui/buttons/ButtonLoader";

export default function CartFooter({totalPrice }) {
  const hasItems = useCart((s) => s.hasItems());
  const { setIsOpen } = useCartContext();
  const router = useRouter();
  const { send, data, error, loading } = useApiRequest();
  const {showToast} = useToast();
  const {hasAuth, cartAddress} = useGlobalState();
  const [openLogin, setOpenLogin] = useState(false);
  const [hasLogged, setHasLogged] = useState(false);

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
      // showToast("Proceed to Order Booking", "success");
      setIsOpen(false);
      router.push("/checkout/summary");
    }
  };

  useEffect(()=>{
    if(error){
      showToast(error)
      return ;
    }
    if(data){
      // user is not currently login, so process can be login 
      if(!hasAuth){
        if(!data.is_new_user){
           setOpenLogin(true);
        }else {
          // user is new & user login successfull , it will get accessToken
          showToast("Account Created & Proceed to Order Booking", "success");
          AuthClientService.setAccessToken(data.access_token);
          setIsOpen(false);
          router.push("/checkout/summary");
        }
      }else {
        showToast("something is wrong")
      }
    }
  }, [data, error])

  // Listen popup login ok or not yet
  useEffect(()=>{
    if(hasLogged){
      showToast("Login Successfully", "success");
      setIsOpen(false);
      router.push("/checkout/summary");
    }
  }, [hasLogged])

  
  if (!hasItems) return null;

  return (
    <div className="border-t border-color px-4 py-2">
      <ButtonLoader 
      buttonColor="primary"
      loadingText="Processing..." 
      textIcon={<ArrowRightCircle className="h-5" />} 
      text={`CHECKOUT — ₹${totalPrice}`} 
      handleClick={checkout} 
      loading={loading} className="w-full"/>
      
      {openLogin && 
        <LoginPopup
          setHasLogged={setHasLogged}
          open={openLogin}
          onClose={() => setOpenLogin(false)}
          email={cartAddress.email}
          phone={cartAddress.phone_no}
          />
      }
      
    </div>
  );
}
