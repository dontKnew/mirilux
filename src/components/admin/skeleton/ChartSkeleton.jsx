import React from "react";

export default function ChartSkeleton() {
  return (
    <div className="bg-white rounded shadow-sm h-[380px] p-6 animate-pulse">
      {/* Header Skeleton */}
      <div className="flex justify-between items-center mb-8">
        <div className="h-5 w-32 bg-gray-200 rounded-md"></div>
        <div className="flex space-x-2">
          <div className="h-8 w-16 bg-gray-100 rounded-lg"></div>
          <div className="h-8 w-16 bg-gray-100 rounded-lg"></div>
          <div className="h-8 w-16 bg-gray-100 rounded-lg"></div>
        </div>
      </div>

      <div className="relative h-[250px] w-full flex items-end justify-between px-2">
        {/* Y-Axis Labels Skeleton */}
        <div className="absolute left-0 top-0 h-full flex flex-col justify-between py-2">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-3 w-8 bg-gray-100 rounded"></div>
          ))}
        </div>

        <div className="ml-10 w-full h-full flex items-end justify-around pb-8 border-l border-b border-gray-50">
          {[1, 2, 3, 4, 5, 6, 7].map((i) => (
            <div
              key={i}
              className="w-[10%] bg-gray-100 rounded-t-lg transition-all"
              style={{
                height: `${Math.floor(Math.random() * 60) + 20}%`, // Random height for natural look
              }}
            ></div>
          ))}
        </div>
      </div>

      <div className="flex justify-around ml-10 mt-4">
        {[1, 2, 3, 4, 5, 6, 7].map((i) => (
          <div key={i} className="h-3 w-8 bg-gray-50 rounded"></div>
        ))}
      </div>
    </div>
  );
}