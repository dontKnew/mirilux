"use client"
import Link from "next/link";
import CartItems from "@/components/cart/items/CartItems";
import AddressPreview from "@/components/checkout/AddressPreview";
import PriceDetails from "@/components/checkout/PriceDetails";
import { useEffect, useState } from "react";
import useApiRequest from "@/hooks/useApiRequest";
import { useToast } from "@/components/ui/toast/ToastProvider";
import { useGlobalState } from "@/lib/useGlobalState";
import { useCart } from "@/lib/useCart";
import { useRouter } from "next/navigation";
import ButtonLoader from "@/components/ui/buttons/ButtonLoader";


export default function SummaryPage() {
  const [priceData, setPriceData] = useState(null);
  const {send, data, error, loading} = useApiRequest();
  const {showToast} = useToast();
  const {cartAddress, clearCartAddress} = useGlobalState();
  const {items, clearCart} = useCart();
  const router = useRouter();
  const handlePlaceOrder = ()=>{
    send("/auth/order/create", {cartAddress, cartItems:items});
  }
  useEffect(()=>{
    if(error){
        showToast(error);
    }
    if(data){
        showToast("Order Placed, Please complete the payment", "success");
        const order_token = data;
        clearCart();
        router.push("/checkout/payment/"+order_token);
    }
  }, [data, error])
  return (
    <div className="grid md:grid-cols-3 md:gap-6 gap-0">
      <div className="md:col-span-2 bg-white md:px-6 px-1 py-2 rounded-xl">
        <p className="my-2 py-1 rounded text-center bg-[var(--secondary)]/10 text-[var(--secondary)]">Expected Delivery by 2-3 Days </p>
        <AddressPreview />
        <div>
          <h2 className="text-lg mb-3">Product Details : </h2>
            <CartItems setPriceData={setPriceData} />
        </div>
      </div>

      <div className="bg-white md:px-6 px-1 md:py-4 rounded-xl sticky top-28 h-fit">
        <PriceDetails priceData={priceData} />
        <div className="md:mt-5 bg-white md:relative col-span-2 md:py-0 py-2 items-center fixed bottom-0 left-0 w-full gap-4 flex justify-center">
          <Link href={"/"}><ButtonLoader text="Cancel"  className={`w-[140px]`} /></Link>
          <ButtonLoader loading={loading} handleClick={handlePlaceOrder} text="Confirm" buttonColor="success" className={`w-[140px]`} />
        </div>
      </div>

    </div>
  );
}
