"use client";

import { X, AlertCircle } from "lucide-react";

export default function NotchedInput({
  label,
  value,
  onChange,
  icon: Icon,
  error,
  type = "text",
}) {
  return (
    <div className="relative w-full">
      
      {/* Input */}
      <div
        className={`relative rounded-xl border-2 px-4 py-4
        ${
          error
            ? "border-red-500"
            : "border-purple-500 focus-within:border-purple-600"
        }`}
      >
        {/* Left Icon */}
        {Icon && (
          <Icon
            size={18}
            className={`absolute left-4 top-1/2 -translate-y-1/2
            ${error ? "text-red-500" : "text-gray-500"}`}
          />
        )}

        <input
          type={type}
          value={value}
          onChange={onChange}
          className={`w-full bg-transparent outline-none text-sm
            ${Icon ? "pl-8" : ""}
          `}
        />

        {/* Right icon */}
        {value && !error && (
          <button
            type="button"
            onClick={() => onChange({ target: { value: "" } })}
            className="absolute right-4 top-1/2 -translate-y-1/2"
          >
            <X size={16} className="text-gray-500" />
          </button>
        )}

        {error && (
          <AlertCircle
            size={18}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-red-500"
          />
        )}
      </div>

      {/* Border label (NOTCHED) */}
      <span
        className={`absolute -top-2 left-4 px-2 text-xs font-medium bg-white
        ${
          error ? "text-red-500" : "text-purple-500"
        }`}
      >
        {label}
      </span>

      {/* Error text */}
      {error && (
        <p className="mt-1 text-xs text-red-500">
          {error}
        </p>
      )}
    </div>
  );
}
