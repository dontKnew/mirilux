"use client";
import { useState } from "react";
import { X, AlertCircle } from "lucide-react";

export default function FloatingInput({
  label,
  value,
  onChange,
  icon: Icon,
  error,
  type = "text",
}) {
  const [focused, setFocused] = useState(false);
  const isActive = focused || value;

  return (
    <div className="relative w-full">
      
      {/* Input wrapper */}
      <div
        className={`relative rounded border-2 px-3 py-2 transition-all
        ${
          error
            ? "border-red-500" : focused
            ? "border-[var(--secondary)]"
            : "border-gray-300"
        }`}
      >
        {/* Left icon – ALWAYS VISIBLE */}
        {Icon && (
          <Icon
            size={18 }
            className={`absolute left-2 top-1/2 -translate-y-1/2 z-10
            ${
              error
                ? "text-red-500" : focused
                ? "text-[var(--secondary)]"
                : "text-gray-500"
            }`}
          />
        )}

        {/* Input */}
        <input
          type={type}
          value={value}
          onChange={onChange}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          className={`w-full bg-transparent outline-none text-gray-800
            ${Icon ? "pl-5" : ""}
          `}
        />

        {/* Right clear icon */}
        {value && !error && (
          <button
            type="button"
            onClick={() => onChange({ target: { value: "" } })}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-10"
          >
            <X size={16} className="text-gray-500" />
          </button>
        )}

        {/* Error icon */}
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
            ? "-top-2 left-4 text-xs text-[var(--secondary)]"
            : "left-[40px] top-1/2 -translate-y-1/2 text-gray-400"
        }
        ${error && "text-red-500"}
        `}
      >
        {label}
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
