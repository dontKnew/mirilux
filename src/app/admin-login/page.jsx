"use client";

import BrandName from "@/components/ui/BrandName";
import { useToast } from "@/components/ui/toast/ToastProvider";
import { LOGIN_METHODS } from "@/data/constant";
import useApiRequest from "@/hooks/useApiRequest";
import { useGlobalState } from "@/lib/useGlobalState";
import AuthClientService from "@/services/AuthClientService";
import { Eye, EyeOff, Lock, Mail } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const {send2, data, error, loading} = useApiRequest();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const {showToast} = useToast();
  const { hasAuth, hasAuthChecked, authUser } = useGlobalState();

  const router = useRouter();
  useEffect(() => {
    if (hasAuthChecked && hasAuth) {
        router.push("/admin");
    }
  }, [hasAuth, hasAuthChecked, router]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if(!email){
        showToast("Email is required");
      }
      if(!password){
        showToast("Password is required");
      }
      const respnose = await send2("/login", { method:LOGIN_METHODS.EMAIL_PASSWORD, email, password });
      await AuthClientService.setAccessToken(respnose);
    }catch(e){
      showToast(e.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg overflow-hidden">
        <div
          className="p-6 text-white"
          style={{
            background:
              "linear-gradient(135deg,var(--from-secondary),var(--to-secondary))",
          }}
        >
          <h1 className="text-2xl font-bold !text-white">Login Account</h1>
          <p className="text-sm text-white/80 mt-1">
            Sign in to your dashboard
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          <div>
            <label className="text-sm font-medium text-[var(--secondary)]">
              Email
            </label>
            <div className="relative mt-1">
              <Mail
                size={18}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="admin@example.com"
                className="w-full pl-10 pr-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label className="text-sm font-medium text-[var(--secondary)]">
              Password
            </label>
            <div className="relative mt-1">
              <Lock
                size={18}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              />
              <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type={showPassword ? "text" : "password"}
                required
                placeholder="••••••••"
                className="w-full pl-10 pr-10 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          {/* Remember + Forgot */}
          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center gap-2">
              <input type="checkbox" />
              Remember me
            </label>
            <button
              type="button"
              className="text-[var(--primary)] hover:underline"
            >
              Forgot password?
            </button>
          </div>

          {/* Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-2 rounded-lg text-white font-medium transition disabled:opacity-60"
            style={{
              background:
                "linear-gradient(135deg,var(--from-primary),var(--to-primary))",
            }}
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>

        {/* Footer */}
        <div className="px-6 pb-6 text-center text-sm text-gray-500">
          © {new Date().getFullYear()}  <BrandName /> Panel
        </div>
      </div>
    </div>
  );
}
