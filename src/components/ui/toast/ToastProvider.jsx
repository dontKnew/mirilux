"use client";

import { createContext, useContext, useState } from "react";
import Toast from "./Toast";

const ToastContext = createContext(null);

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  const showToast = (
    message,
    type = "error",
    position = "top-center",
    duration = 3000,
  ) => {
    // console.warn(message, type, "Toast");
    const id = Date.now();

    setToasts((prev) => [
      ...prev,
      { id, type, message, position },
    ]);

    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, duration);
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}

      {toasts.map((toast) => (
        <Toast key={toast.id} {...toast} />
      ))}
    </ToastContext.Provider>
  );
}

export const useToast = () => useContext(ToastContext);
