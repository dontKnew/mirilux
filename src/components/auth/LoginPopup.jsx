"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Phone, KeyRound, ArrowLeft } from "lucide-react";
import Popup from "@/components/ui/Popup";
import LoginForm from "./LoginForm";
import { useToast } from "../ui/toast/ToastProvider";
import { LOGIN_METHODS } from "@/data/constant";

export default function LoginPopup({open,onClose,email,phone, setHasLogged}) {
  const [step, setStep] = useState(1);
  const [method, setMethod] = useState(null);
  const [autoSendOtp, setAutoSendOtp] = useState(null);
  const [emailOtpToken, setEmailOtpToken] = useState(null);

  const goStep2 = async (m) => {
    if(autoSendOtp==null){
      setAutoSendOtp(true)
    }
    setMethod(m);
    setStep(2);
  };

  const resetAndClose = () => {
    setStep(1);
    setMethod(null);
    onClose();
  };

  return (
    <Popup
      isOpen={open}
      onClose={resetAndClose}
      title={step === 1 ? "Login Required" : "Secure Login"}
    >
      <AnimatePresence mode="wait">
        {/* STEP 1 */}
        {step === 1 && (
          <motion.div
            key="step1"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="space-y-5"
          >
            {/* <h2 className="mb-0 text-lg">Login Authentication</h2> */}
            <p className="text-[var(--primary)] leading-relaxed">
              Account found. Please log in to continue order booking
            </p>

            <ActionButton
              icon={Mail}
              text="Login with Email/OTP"
              onClick={() => goStep2(LOGIN_METHODS.EMAIL_OTP)}
            />

            <ActionButton
              icon={KeyRound}
              text="Login with Email/Password"
              onClick={() => goStep2(LOGIN_METHODS.EMAIL_PASSWORD)}
            />

            <ActionButton
              icon={Phone}
              text="Login with Phone/Password"
              onClick={() => goStep2(LOGIN_METHODS.PHONE_PASSWORD)}
            />

            <button
              onClick={resetAndClose}
              className="w-full  text-red-600 hover:underline"
            >
              Cancel, I will change Email/Phone
            </button>
          </motion.div>
        )}

        {/* STEP 2 */}
        {step === 2 && (
          <motion.div
            key="step2"
            initial={{ opacity: 0, x: 16 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -16 }}
            className="space-y-4"
          >
            <button
              onClick={() => setStep(1)}
              className="text-gray-500 hover:underline"
            >
              <div className="flex gap-1 items-center">
                <ArrowLeft size={18} /> Back
              </div>
            </button>

            <LoginForm
              setEmailOtpToken={setEmailOtpToken}
              emailOtpToken={emailOtpToken}
              setHasLogged={setHasLogged}
              autoSendOtp={autoSendOtp}
              setAutoSendOtp={setAutoSendOtp}
              method={method}
              email={email}
              phone={phone}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </Popup>
  );
}

/* Button UI */
function ActionButton({ icon: Icon, text, onClick }) {
  return (
    <button
      onClick={onClick}
      className="flex items-center gap-3 w-full rounded-xl border md:px-4 px-2 py-3 hover:bg-gray-50 transition">
      <Icon size={20} className="text-[var(--secondary)]" />
      <span className="font-medium">{text}</span>
    </button>
  );
}
