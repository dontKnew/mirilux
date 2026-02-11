"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import PriceDetails from "@/components/checkout/PriceDetails";
import { motion, AnimatePresence } from "framer-motion";
import {Wallet, Smartphone, QrCode, CreditCard, Building2, Lock, ChevronDown, Send, ArrowRightCircle} from "lucide-react";
import useApiRequest from "@/hooks/useApiRequest";
import { useToast } from "@/components/ui/toast/ToastProvider";
import { useParams, useRouter } from "next/navigation";
import { PAYMENT_COLLECTED_BY, PAYMENT_METHOD } from "@/data/constant";
import ButtonLoader from "@/components/ui/buttons/ButtonLoader";
import Script from 'next/script';


export default function Page() {
  const [selected, setSelected] = useState(null);
  const [priceData, setPriceData] = useState();
  const [gatewayOrder, setGatewayOrder] = useState();
  const {data, send, send2, error, loading, setLoading} = useApiRequest();
  const {showToast} = useToast();
  const {token} = useParams();
  const router = useRouter();

  const handleToggle = (key) => {
    setSelected((prev) => (prev === key ? null : key));
  };

  useEffect(()=>{
    if(token){
      send("/auth/order", {order_token:token}); 
    }
  }, [token])


  const handlePlaceOrder = async ()=>{
      if(!token){
        showToast("Order token not found");
        return ; 
      }
      if(gatewayOrder){
          processRazorPayment(gatewayOrder);
      }
      setLoading(true);
      try {
        const response = await send2("/auth/order/payment", {payment_method:selected, order_token:token});
        if(!response){
            showToast("Something is wrong, Try again!");
        }
        if(response.payment_method==PAYMENT_METHOD.COD){
            showToast("Order placed successfully!", "success");
            router.push("/checkout/success/"+token)
          }else{
            setGatewayOrder(response);
            showToast("Payment Processing...", "success");
            await processRazorPayment(response);
          }
      }catch(err){
        showToast(err.message);
      }finally{
        setLoading(false)
      }
  }

  useEffect(()=>{
    if(error){
      showToast(error)
    }
    if(data){
      if(data.has_paid){
          showToast("Order payment already paid", "success");
          router.push("/checkout/success/"+token) 
      }else {
        setPriceData(data.priceData);  
      }
    }
  }, [data, error])

const verifyPaymentStatus = async (responeData)=>{
  // const responeData =  {razorpay_payment_id: 'pay_SAsPDM4eTPHNb5', razorpay_order_id: 'order_SAs7n1BWWTVRpc', razorpay_signature: '56d4d5b233f4800adb5b3e7b88d6d17165651d224457674b6ad903557b871797'};
    try {
      await send2("/auth/order/payment/verify", {order_token:token, collected_by:PAYMENT_COLLECTED_BY.RAZOREPAY, gateway_response:responeData})
      showToast("Order placed successfully!", "success");
      router.push("/checkout/success/"+token)
    }catch(e){
      const message_error = e?.message ||  "Something is wrong";
      showToast(message_error);
    }
}

const processRazorPayment = async (order) => {
    let method = order?.payment_method.toLowerCase();
    method = method.replace(" ", "");
    const options = {
      key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
      amount: order.amount,
      currency: order.currency,
      name: "MiriLuxe",
      order_id: order.order_id_gateway,
      handler: async function (response) {
        showToast("We are verifying payment status");
        // {razorpay_payment_id: 'pay_SAsPDM4eTPHNb5', razorpay_order_id: 'order_SAs7n1BWWTVRpc', razorpay_signature: '56d4d5b233f4800adb5b3e7b88d6d17165651d224457674b6ad903557b871797'}
        await verifyPaymentStatus(response);
      },
      config: {
        display: {
          blocks: {
            banks: {
              name: "MiriLux Gateway",
              instruments: [
                {
                  method: method
                },
              ],
            },
          },
          sequence: ["block.banks"],
          preferences: { show_default_blocks: false },
        },
      },

      modal: {
        ondismiss: function () {
          // alert("Payment popup closed");
        }
      }
    };
    const paymentObject = new window.Razorpay(options);
    paymentObject.on('payment.failed', function (response) {
      console.warn(response, "payment failed");
    });
    paymentObject.open();
  };


  return (
    <div className="grid md:grid-cols-3 gap-3">
      <Script src="https://checkout.razorpay.com/v1/checkout.js" />
      {/* LEFT */}
      <div className="md:col-span-2 bg-white rounded-xl md:p-4 space-y-4 md:mt-0 mt-4">
        <h2 className="text-lg font-semibold">Choose Payment Method</h2>

        <Accordion
          open={selected === PAYMENT_METHOD.COD}
          onClick={() => handleToggle(PAYMENT_METHOD.COD)}
          icon={<Wallet className="text-green-600" />}
          title="Cash on Delivery"
        >
          <>
          <p className="text-sm text-gray-500">Pay when you receive the product</p>
          <ButtonLoader handleClick={handlePlaceOrder}  loading={loading} className="w-full" buttonColor="success" textIcon={<ArrowRightCircle className="h-5" />} text="Place Order" />
          </>
        </Accordion>

        <Accordion
          open={selected === PAYMENT_METHOD.UPI}
          onClick={() => handleToggle(PAYMENT_METHOD.UPI)}
          icon={<Wallet className="text-green-600" />}
          title="UPI ( Recommended )"
        >
          <>
          <p className="text-sm text-gray-500">Make Payment Online to Confirm Order</p>
          <ButtonLoader handleClick={handlePlaceOrder}  loading={loading} className="w-full" buttonColor="primary" textIcon={<ArrowRightCircle className="h-5" />} text={`Pay Now ₹ ${priceData?.total_amount}`} />
          </>
        </Accordion>

        <Accordion
          open={selected === PAYMENT_METHOD.CARD}
          onClick={() => handleToggle(PAYMENT_METHOD.CARD)}
          icon={<Wallet className="text-green-600" />}
          title="Debit / Credit / ATM Card"
        >
          <>
          <p className="text-sm text-gray-500">Make Payment Online to Confirm Order</p>
          <ButtonLoader handleClick={handlePlaceOrder}  loading={loading} className="w-full" buttonColor="primary" textIcon={<ArrowRightCircle className="h-5" />} text={`Pay Now ₹ ${priceData?.total_amount}`} />
          </>
        </Accordion>

        <Accordion
          open={selected === PAYMENT_METHOD.NET_BANKING}
          onClick={() => handleToggle(PAYMENT_METHOD.NET_BANKING)}
          icon={<Wallet className="text-green-600" />}
          title="Net Banking"
        >
          <>
          <p className="text-sm text-gray-500">Make Payment Online to Confirm Order</p>
          <ButtonLoader handleClick={handlePlaceOrder}  loading={loading} className="w-full" buttonColor="primary" textIcon={<ArrowRightCircle className="h-5" />} text={`Pay Now ₹ ${priceData?.total_amount}`} />
          </>
        </Accordion>
        
      </div>

      {/* RIGHT */}
      <div className="bg-white rounded-xl md:p-4 p-0 h-fit">
        <PriceDetails priceData={priceData} />
      </div>
    </div>
  );
}

/* ================== Components ================== */
function Accordion({ open, onClick, icon, title, subtitle, children }) {
  return (
    <div className={`border rounded ${open && "border-orange-500"}`}>
      <button
        onClick={onClick}
        className="w-full flex justify-between items-center md:p-4 px-2 py-4"
      >
        <div className="flex gap-3 text-left">
          {icon}
          <div>
            <p className="font-medium">{title}</p>
          </div>
        </div>

        <motion.div
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.25 }}
        >
          <ChevronDown />
        </motion.div>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="px-4 pb-4 overflow-hidden space-y-4"
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function Tab({ active, children, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 rounded-lg text-sm ${
        active
          ? "bg-orange-100 text-orange-600"
          : "bg-gray-100 text-gray-600"
      }`}
    >
      {children}
    </button>
  );
}

function UPIApp({ label }) {
  return (
    <div className="flex flex-col items-center gap-2 cursor-pointer hover:scale-105 transition">
      <div className="w-14 h-14 bg-gray-100 rounded-full flex items-center justify-center">
        <Smartphone />
      </div>
      <span className="text-xs">{label}</span>
    </div>
  );
}

function DisabledRow({ icon, title }) {
  return (
    <div className="border rounded p-4 bg-gray-50 text-gray-400 flex justify-between items-center cursor-not-allowed">
      <div className="flex items-center gap-3">
        {icon}
        <span>{title}</span>
      </div>
      <Lock size={16} />
    </div>
  );
}

