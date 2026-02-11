"use client";

import AuthClientService from "@/services/AuthClientService";
import {Menu,Bell,User,Settings,LogOut,ChevronDown} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useToast } from "../ui/toast/ToastProvider";
import { usePathname, useRouter } from "next/navigation";
import { useGlobalState } from "@/lib/useGlobalState";
import { getPageData } from "@/utils/array";

export default function Navbar({ setMobileOpen, title }) {
  const [profileOpen, setProfileOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const {showToast} = useToast();
  const router = useRouter();
  const ref = useRef(null);
  const {authUser} = useGlobalState();
  const pathName = usePathname();
  const pageData = getPageData(pathName);


  if(!authUser){
    return null;
  }

  const notifications = [
    "New user registered",
    "Server backup completed",
    "Password changed successfully",
  ];

  const isOnline = true; 

  const logoutUser = async  ()=>{
    try {
      const result = await AuthClientService.logout();
      showToast(result, "success");
      router.push("/admin-login");
    }catch(e){
      showToast(e.message)
    }
  }
  // Close dropdowns on outside click
  useEffect(() => {
    const handler = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setProfileOpen(false);
        setNotifOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <header className="h-16 bg-white border-b border-gray-300 flex items-center justify-between px-3">
      {/* LEFT */}
      <div className="flex items-center gap-4">
        <button
          className="md:hidden text-[var(--primary)]"
          onClick={() => setMobileOpen(true)}
        >
          <Menu />
        </button>

        <h2 className="text-lg font-semibold text-[var(--secondary)]">
          {pageData?.name}
        </h2>
      </div>

      <div className="flex items-center md:gap-4" ref={ref}>
        {/* 🔔 Notifications */}
        <div className="relative">
          <button
            onClick={() => {
              setNotifOpen(!notifOpen);
              setProfileOpen(false);
            }}
            className="relative p-2 rounded-full hover:bg-gray- 100 mt-2"
          >
            <Bell ize={24} />

            {notifications.length > 0 && (
              <span
                className="absolute -top-1 -right-1 text-xs text-white rounded-full px-1.5 py-0.5"
                style={{
                  background:
                    "linear-gradient(135deg,var(--from-primary),var(--to-primary))",
                }}
              >
                {notifications.length}
              </span>
            )}
          </button>

          {/* Notification Dropdown */}
          {notifOpen && (
            <div className="absolute right-0 mt-2 w-72 bg-white rounded shadow-lg border z-50">
              <div className="px-4 py-3 border-b border-gray-300 font-semibold text-[var(--secondary)]">
                Notifications
              </div>

              {notifications.length === 0 ? (
                <p className="px-4 py-4 text-sm text-gray-500">
                  No new notifications
                </p>
              ) : (
                notifications.map((item, i) => (
                  <div
                    key={i}
                    className="px-4 py-3 text-sm hover:bg-gray-100 border-gray-300 border-b last:border-none"
                  >
                    {item}
                  </div>
                ))
              )}
            </div>
          )}
        </div>

        {/* 👤 Profile */}
        <div className="relative">
          <button
            onClick={() => {
              setProfileOpen(!profileOpen);
              setNotifOpen(false);
            }}
            className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-100"
          >
            {/* Avatar */}
            <div className="relative">
              <div
                className="w-8 h-8 rounded-full flex items-center justify-center text-white font-semibold"
                style={{
                  background:
                    "linear-gradient(135deg,var(--from-primary),var(--to-primary))",
                }}
              >
                A
              </div>

              {/* 🟢 Online Dot */}
              <span
                className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white
                  ${isOnline ? "bg-green-500" : "bg-gray-400"}
                `}
              />
            </div>

            <span className="hidden sm:block font-medium text-[var(--secondary)]">
              {authUser.full_name}
            </span>

            <ChevronDown size={16} />
          </button>

          {/* Profile Dropdown */}
          {profileOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded shadow-lg border z-50 overflow-hidden">
              <div className="px-4 py-3 border-b border-gray-300">
                <p className="text-sm font-semibold text-[var(--secondary)]">
                  {authUser.full_name}
                </p>
                <p className="text-xs text-gray-500">{authUser.email}</p>
              </div>

              <button className="w-full flex items-center gap-3 px-4 py-2 text-sm hover:bg-gray-100">
                <User size={16} /> Profile
              </button>

              <button className="w-full flex items-center gap-3 px-4 py-2 text-sm hover:bg-gray-100">
                <Settings size={16} /> Settings
              </button>

              <div className="border-t border-gray-300">
                <button onClick={logoutUser} className="w-full flex items-center gap-3 px-4 py-2 text-sm text-red-600 hover:bg-red-50">
                  <LogOut size={16} /> Logout
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
