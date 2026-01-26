"use client";

import { useEffect, useRef, useState } from "react";
import { Mail, Phone, Lock } from "lucide-react";
import FloatingInput from "@/components/ui/FloatingInput";
import { LOGIN_METHODS } from "@/data/constant";
import useApiRequest from "@/hooks/useApiRequest";
import { useToast } from "../ui/toast/ToastProvider";
import AuthClientService from "@/services/AuthClientService";

export default function LoginForm({ method, email, phone, autoSendOtp, setAutoSendOtp, setHasLogged, emailOtpToken, setEmailOtpToken }) {
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState("");
  const { send, send2, data, error, loading } = useApiRequest();
  const { showToast } = useToast();
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

  const otpSendResponse = (response) => {
    if (method == LOGIN_METHODS.EMAIL_OTP) {
      showToast("OTP Send Successfully", "success");
      // console.warn(response, "response empty token");
      setEmailOtpToken(response)
    }
  }

  useEffect(() => {
    if (data) {
      if(isReSendOtp){
          otpSendResponse(data);
      }
      setIsReSendOtp(false);
    }
  }, [data])

  useEffect(() => {
    if (error) {
      showToast(error)
    }
  }, [error])

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const respnose = await send2("/login", { method, email, phone, password, otp, emailOtpToken });
      setHasLogged(true)
      AuthClientService.setAccessToken(respnose);
      showToast("Login Successfully!", "success")
    }catch(e){
      showToast(e.message);
    }
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
            type="button"
            disabled={loading}
            onClick={sendOtp}
            className="w-[175px] rounded-xl px-2 text-white
              bg-gradient-to-r from-[var(--from-secondary)] to-[var(--to-secondary)]
              hover:opacity-90 transition disabled:opacity-50"
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
          hover:opacity-90 transition disabled:opacity-50"
      >
        Login Account
      </button>
    </form>
  );
}
