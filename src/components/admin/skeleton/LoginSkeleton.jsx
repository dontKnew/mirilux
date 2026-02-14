import React from "react";

export default function LoginSkeleton() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg overflow-hidden animate-pulse">
        
        {/* Header Skeleton */}
        <div className="p-6 bg-gray-200 h-28 flex flex-col justify-center">
          <div className="h-7 w-40 bg-gray-300 rounded-md mb-2"></div>
          <div className="h-4 w-56 bg-gray-300/60 rounded-md"></div>
        </div>

        {/* Form Skeleton */}
        <div className="p-6 space-y-6">
          
          {/* Email Field */}
          <div className="space-y-2">
            <div className="h-4 w-12 bg-gray-200 rounded"></div>
            <div className="h-10 w-full bg-gray-100 rounded-lg border border-gray-100"></div>
          </div>

          {/* Password Field */}
          <div className="space-y-2">
            <div className="h-4 w-20 bg-gray-200 rounded"></div>
            <div className="h-10 w-full bg-gray-100 rounded-lg border border-gray-100"></div>
          </div>

          {/* Remember + Forgot */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="h-4 w-4 bg-gray-200 rounded"></div>
              <div className="h-4 w-24 bg-gray-100 rounded"></div>
            </div>
            <div className="h-4 w-28 bg-gray-100 rounded"></div>
          </div>

          {/* Button Skeleton */}
          <div className="h-10 w-full bg-gray-200 rounded-lg mt-4"></div>

          {/* Footer Skeleton */}
          <div className="pt-4 flex justify-center">
            <div className="h-4 w-48 bg-gray-50 rounded"></div>
          </div>
        </div>
      </div>
    </div>
  );
}