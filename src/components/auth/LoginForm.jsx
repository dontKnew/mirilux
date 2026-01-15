"use client";

import { useEffect, useRef, useState } from "react";
import { Mail, Phone, Lock } from "lucide-react";
import FloatingInput from "@/components/ui/FloatingInput";
import { LOGIN_METHODS } from "@/data/constant";
import useApiRequest from "@/hooks/useApiRequest";
import { useToast } from "../ui/toast/ToastProvider";

export default function LoginForm({ method, email, phone, autoSendOtp, setAutoSendOtp }) {
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState("");
  const { send, data, error, loading } = useApiRequest();
  const [emailOtpToken, setEmailOtpToken] = useState(null);
  const { showToast } = useToast();
  const [hasLogin, setHasLogin] = useState(false);
  const [isReSendOtp, setIsReSendOtp] = useState(false);


  // Auto Sen Otp
  const hasSentOtpRef = useRef(false);
  useEffect(() => {
    if ( method === LOGIN_METHODS.EMAIL_OTP && autoSendOtp && !hasSentOtpRef.current) { 
        hasSentOtpRef.current = true; sendOtp();
    }
  }, [method, autoSendOtp]);


  const sendOtp = () => {
    setIsReSendOtp(true)
    showToast("OTP Sending...", "success");
    send("/login/otp/email", { email, emailOtpToken }); // emailOtpToken for re-send otp same
  }

  const loginResponse = (response) => {
    setHasLogin(false)
    showToast("Login Successfully!", "success")
  }
  const otpSendResponse = (response) => {
    if (method == LOGIN_METHODS.EMAIL_OTP) {
      showToast("OTP Send Successfully", "success");
      setEmailOtpToken(response)
    }
  }

  useEffect(() => {
    if (data) {
      if (hasLogin) {
        loginResponse(data);
      }
      if(isReSendOtp){
          otpSendResponse(data);
      }

      setIsReSendOtp(false)
      setHasLogin(false);
    }
  }, [data])

  useEffect(() => {
    if (error) {
      showToast(error)
    }
  }, [error])

  const handleSubmit = async (e) => {
    e.preventDefault();
    setHasLogin(true);
    send("/login", { method, email, phone, password, otp, emailOtpToken });
  }

  return (
    <form className="space-y-5" onSubmit={handleSubmit}>
      {method === LOGIN_METHODS.EMAIL_OTP && (
        <>
          <p className="md:text-base text-sm text-[var(--primary)]">Didn’t receive the OTP? Please check your spam folder</p>
        </>
      )}

      {/* EMAIL */}
      {(method === LOGIN_METHODS.EMAIL_OTP ||
        method === LOGIN_METHODS.EMAIL_PASSWORD) && (
          <FloatingInput
            label="Email Address"
            value={email}
            readOnly
            icon={Mail}
          />
        )}

      {/* OTP */}
      {method === LOGIN_METHODS.EMAIL_OTP && (
        <div className="flex gap-3 justify-center">
          <FloatingInput
            label="Enter Verification Code"
            type="number"
            inputMode="numeric"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            icon={Lock}
          />
          <button
            disabled={loading}
            onClick={() => sendOtp()}
            type="button"
            className="w-[175px] rounded-xl px-2 text-white
            bg-gradient-to-r from-[var(--from-secondary)] to-[var(--to-secondary)]
            hover:opacity-90 transition"
          >
            Resend Code
          </button>
        </div>
      )}

      {/* PHONE */}
      {method === LOGIN_METHODS.PHONE_PASSWORD && (
        <FloatingInput
          label="Phone Number"
          value={phone}
          readOnly
          icon={Phone}
        />
      )}

      {/* PASSWORD */}
      {method !== LOGIN_METHODS.EMAIL_OTP && (
        <FloatingInput
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          icon={Lock}
        />
      )}

      {/* ACTION */}
      <button
        type="submit"
        disabled={loading}
        className="w-full rounded-xl py-3 text-white font-semibold
        bg-gradient-to-r from-[var(--from-primary)] to-[var(--to-primary)]
        hover:opacity-90 transition"
      >
        {method === LOGIN_METHODS.EMAIL_OTP ? "Login Account" : "Login Account"}
      </button>
    </form>
  );
}
