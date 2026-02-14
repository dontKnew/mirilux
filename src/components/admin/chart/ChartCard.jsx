"use client";

import { useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

export default function ChartCard({title="", dataViews, dataKey}) {
  const [view, setView] = useState("monthly");

  return (
    <div className="bg-white rounded shadow-sm p-2 md:p-6 md:ps-0 ps-0 ">
      <div className="flex md:flex-row flex-col gap-2 justify-between mb-4 md:ps-4 ps-4">
        <h2 className="font-semibold text-[var(--secondary)]">
          {title} Analytics
        </h2>
        
        <div className="flex bg-gray-100 p-1 rounded-lg md:w-fit  w-full md:justify-end justify-center">
          {["weekly", "monthly", "yearly"].map((type) => (
            <button
              key={type}
              onClick={() => setView(type)}
              className={`px-3 py-1 text-sm font-medium rounded-md transition-all ${
                view === type
                  ? "bg-white text-black shadow-sm"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              {type.charAt(0).toUpperCase() + type.slice(1)}
            </button>
          ))}
        </div>
      </div>
      <div className="h-[250px] w-100%">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={dataViews[view]}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
            <XAxis 
              dataKey="label" 
              axisLine={false} 
              tickLine={false} 
              tick={{ fill: '#9ca3af', fontSize: 12 }}
              dy={10}
            />
            <YAxis 
              axisLine={false} 
              tickLine={false} 
              tick={{ fill: '#9ca3af', fontSize: 12 }}
            />
            <Tooltip 
              contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
            />
            <Line
              dataKey={dataKey}
              stroke="var(--primary)"
              strokeWidth={3}
              dot={{ r: 4, fill: "var(--primary)" }}
              activeDot={{ r: 6 }}
              type="monotone"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}