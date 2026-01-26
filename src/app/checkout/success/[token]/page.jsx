  "use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { CheckCircle } from "lucide-react";
import BrandName from "@/components/ui/BrandName";
import { useParams } from "next/navigation";
import { useToast } from "@/components/ui/toast/ToastProvider";
import useApiRequest from "@/hooks/useApiRequest";
import { useEffect, useState } from "react";

export default function CheckoutSuccessPage() {
  const {data, send, send2, error, loading} = useApiRequest();
  const {showToast} = useToast();
  const {token} = useParams();
  const [order, setOrder]   = useState();

    useEffect(()=>{
        if(token){
          send("/auth/order", {order_token:token}); 
        }
      }, [token])

    useEffect(()=>{
        if(error){
          showToast(error)
        }
        if(data){
          setOrder(data);
          // showToast("Token Validated", "success")
        }
    }, [data, error])

  if(!order){
    return ;
  }
  return (
    <div className="bg-gray-50 flex items-center justify-center md:px-4 px-0 py-3">
      
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="md:bg-white max-w-md w-full rounded shadow-lg md:p-8 p-0 text-center"
      >
        {/* Success Icon */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.3, type: "spring", stiffness: 120 }}
          className="flex justify-center mb-4"
        >
          <CheckCircle size={72} className="text-green-500" />
        </motion.div>

        {/* Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-2xl font-semibold text-gray-800"
        >
          Order Placed Successfully!
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="text-sm text-gray-600 mt-2"
        >
          Thank you for shopping with <span className="font-medium"><BrandName /></span>
        </motion.p>

        {/* Order Info */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="bg-gray-50 rounded-lg p-4 mt-6 text-sm"
        >
          <div className="flex justify-between mb-1">
            <span className="text-gray-500">Order ID</span>
            <span className="font-medium">{order.order_number}</span>
          </div>
          <div className="flex md:flex-row flex-column justify-between">
            <span className="text-gray-500">Order Status</span>
            <span className="font-medium">Confirmed</span>
          </div>
        </motion.div>

        {/* Info */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="text-sm text-gray-500 mt-4"
        >
          We’ve sent order details to your  Email.
        </motion.p>

        {/* Actions */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="mt-6 space-y-3"
        >
          <Link
            href="/track-order"
            className="block w-full bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-lg font-semibold"
          >
            Track Order
          </Link>

          <Link
            href="/"
            className="block w-full border border-gray-300 py-3 rounded-lg font-medium text-gray-700"
          >
            Continue Shopping
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
}
