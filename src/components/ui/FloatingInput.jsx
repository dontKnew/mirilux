"use client";
import { useState } from "react";
import { X, AlertCircle, CheckCircle } from "lucide-react";

export default function FloatingInput({
  label,
  value = "",
  onChange,
  icon: Icon,
  error,
  success = false,
  type = "text",
  readOnly = false
}) {
  const [focused, setFocused] = useState(false);
  if(value==null){
     value = "";
  }
  const isActive = focused || value;

  const borderColor = error
    ? "border-red-500"
    : success
    ? "border-green-700"
    : focused
    ? "border-[var(--secondary)]"
    : "border-gray-300";

  const iconColor = error
    ? "text-red-500"
    : success
    ? "text-green-700"
    : focused
    ? "text-[var(--secondary)]"
    : "text-gray-500";

  return (
    <div className="relative w-full">
      {/* Input wrapper */}
      <div
        className={`relative rounded border-2 px-3 py-2 transition-all ${borderColor}`}
      >
        {/* Left icon */}
        {Icon && (
          <Icon
            size={18}
            className={`absolute left-2 top-1/2 -translate-y-1/2 z-10 ${iconColor}`}
          />
        )}

        {/* Input */}
        <input
          type={type}
          value={value}
          onChange={readOnly ? undefined : onChange}
          readOnly={readOnly}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          className={`w-full bg-transparent outline-none text-gray-800
            ${Icon ? "pl-6" : ""}
          `}
        />

        {/* Right icons */}
        {success && !error && (
          <CheckCircle
            size={18}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-green-700 z-10"
          />
        )}

        {value && !error && !readOnly && !success && (
          <button
            type="button"
            onClick={() => onChange({ target: { value: "" } })}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-10"
          >
            <X size={16} className="text-gray-500" />
          </button>
        )}

        {error && (
          <AlertCircle
            size={18}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-red-500 z-10"
          />
        )}
      </div>

      {/* Floating Label */}
      <label
        className={`absolute px-1 bg-white pointer-events-none z-20 transition-all
        ${
          isActive
            ? "-top-2 left-4 text-xs"
            : "left-[40px] top-1/2 -translate-y-1/2"
        }
        ${error ? "text-red-500" : success ? "text-green-700" :  isActive ? "text-[var(--secondary)]" : "text-gray-400"}
        `}
      >
        {label}*
      </label>

      {/* Error text */}
      {error && (
        <p className="mt-1 text-xs text-red-500">
          {error}
        </p>
      )}
    </div>
  );
}
