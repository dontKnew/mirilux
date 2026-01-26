"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import PriceDetails from "@/components/checkout/PriceDetails";
import { motion, AnimatePresence } from "framer-motion";
import {Wallet, Smartphone, QrCode, CreditCard, Building2, Lock, ChevronDown, Send, ArrowRightCircle} from "lucide-react";
import useApiRequest from "@/hooks/useApiRequest";
import { useToast } from "@/components/ui/toast/ToastProvider";
import { useParams, useRouter } from "next/navigation";
import { PAYMENT_METHOD } from "@/data/constant";
import ButtonLoader from "@/components/ui/buttons/ButtonLoader";

export default function Page() {
  const [selected, setSelected] = useState(null);
  const [upiTab, setUpiTab] = useState("apps");
  const [priceData, setPriceData] = useState();
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
      setLoading(true);
      try {
        const response = await send2("/auth/order/payment", {payment_method:PAYMENT_METHOD.COD, order_token:token});
        showToast("Order placed successfully!", "success");
        router.push("/checkout/success/"+token)
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
      // showToast("Payment Fetched..", "success")
      setPriceData(data.priceData); 
    }
  }, [data, error])

  return (
    <div className="grid md:grid-cols-3 gap-3">
      {/* LEFT */}
      <div className="md:col-span-2 bg-white rounded-xl md:p-4 space-y-4 md:mt-0 mt-4">
        <h2 className="text-lg font-semibold">Choose Payment Method</h2>

        
        {/* ================== COD ================== */}
        <Accordion
          open={selected === "cod"}
          onClick={() => handleToggle("cod")}
          icon={<Wallet className="text-green-600" />}
          title="Cash on Delivery"
        >
          <>
          <p className="text-sm text-gray-500">Pay when you receive the product</p>
          <ButtonLoader handleClick={handlePlaceOrder}  loading={loading} className="w-full" buttonColor="success" textIcon={<ArrowRightCircle className="h-5" />} text="Place Order" />
          </>
        </Accordion>

        {/* ================== CARD (Disabled) ================== */}
        <DisabledRow icon={<CreditCard />} title="UPI (Recommended)" />

        {/* ================== UPI ================== */}
        {/* <Accordion
          open={selected === "upi"}
          onClick={() => handleToggle("upi")}
          icon={<Wallet className="text-orange-500" />}
          title="UPI (Recommended)"
          subtitle="Pay with any UPI app"
        >
          <div className="text-sm text-green-700 bg-green-50 px-3 py-2 rounded-lg">
            ✔ Secure payment • Supports all UPI apps
          </div>

          <div className="flex gap-3 mt-3">
            <Tab active={upiTab === "apps"} onClick={() => setUpiTab("apps")}>
              UPI Apps
            </Tab>
            <Tab active={upiTab === "qr"} onClick={() => setUpiTab("qr")}>
              QR Code
            </Tab>
          </div>

          <AnimatePresence mode="wait">
            {upiTab === "apps" && (
              <motion.div
                key="apps"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="grid grid-cols-3 gap-4 mt-4"
              >
                <UPIApp label="PhonePe" />
                <UPIApp label="Google Pay" />
                <UPIApp label="Paytm" />
              </motion.div>
            )}

            {upiTab === "qr" && (
              <motion.div
                key="qr"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="flex flex-col items-center mt-4 gap-2"
              >
                <div className="w-40 h-40 bg-gray-100 rounded-xl flex items-center justify-center">
                  <QrCode size={70} className="text-gray-400" />
                </div>
                <p className="text-sm text-gray-500">
                  Scan using any UPI app
                </p>
              </motion.div>
            )}
          </AnimatePresence>

          <Link
            href="/checkout/success"
            className="block mt-5 w-full text-center bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-lg font-medium"
          >
            Pay Now ₹1,515
          </Link>
        </Accordion> */}

        
        {/* ================== CARD (Disabled) ================== */}
        <DisabledRow icon={<CreditCard />} title="Debit / Credit / ATM Card" />

        {/* ================== NET BANKING (Disabled) ================== */}
        <DisabledRow icon={<Building2 />} title="Net Banking" />

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
