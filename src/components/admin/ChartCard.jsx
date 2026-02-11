"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const data = [
  { day: "Mon", users: 400 },
  { day: "Tue", users: 700 },
  { day: "Wed", users: 500 },
  { day: "Thu", users: 900 },
  { day: "Fri", users: 1200 },
  { day: "Sat", users: 800 },
  { day: "Sun", users: 600 },
];

export default function ChartCard() {
  return (
    <div className="bg-white rounded-xl p-6 shadow-sm h-[320px]">
      <h3 className="font-semibold text-[var(--secondary)] mb-4">
        Weekly Users
      </h3>

      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <XAxis dataKey="day" />
          <YAxis />
          <Tooltip />
          <Line
            dataKey="users"
            stroke="var(--primary)"
            strokeWidth={3}
            type="monotone"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
