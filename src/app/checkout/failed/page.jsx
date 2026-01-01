"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { XCircle } from "lucide-react";

export default function PaymentFailedPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
        className="bg-white max-w-md w-full rounded-2xl shadow-lg p-8 text-center"
      >
        {/* Failed Icon */}
        <motion.div
          initial={{ rotate: -10, scale: 0 }}
          animate={{ rotate: 0, scale: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 120 }}
          className="flex justify-center mb-4"
        >
          <XCircle size={72} className="text-red-500" />
        </motion.div>

        {/* Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-xl font-semibold text-gray-800"
        >
          Payment Failed
        </motion.h1>

        {/* Message */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-sm text-gray-600 mt-2"
        >
          Don’t worry, your money is safe.  
          If any amount was deducted, it will be refunded automatically.
        </motion.p>

        {/* Reason Box */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="bg-red-50 border border-red-100 rounded-lg p-4 mt-5 text-sm text-left"
        >
          <p className="font-medium text-red-600 mb-1">
            Possible reasons:
          </p>
          <ul className="list-disc ml-5 text-gray-600 space-y-1">
            <li>Payment was cancelled</li>
            <li>Bank server issue</li>
            <li>Incorrect card or UPI details</li>
          </ul>
        </motion.div>

        {/* Actions */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9 }}
          className="mt-6 space-y-3"
        >
          <Link
            href="/checkout/payment"
            className="block w-full bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-lg font-semibold"
          >
            Retry Payment
          </Link>

          <Link
            href="/checkout/address"
            className="block w-full border border-gray-300 py-3 rounded-lg font-medium text-gray-700"
          >
            Change Payment Method
          </Link>
        </motion.div>

        {/* Support */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.1 }}
          className="text-xs text-gray-500 mt-5"
        >
          Need help?  
          <span className="text-orange-500 font-medium cursor-pointer ml-1">
            Contact Support
          </span>
        </motion.p>
      </motion.div>
    </div>
  );
}
