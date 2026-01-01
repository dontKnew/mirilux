"use client";

import { Search } from "lucide-react";

export default function ProductFilterBar({
  search,
  setSearch,
  sort,
  setSort,
  totalResults,
}) {
  return (
    <div className="flex gap-3 items-center justify-between mb-4">
      <div className="relative w-full md:max-w-sm">
        <Search
          size={18}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
        />
        <input
          type="text"
          placeholder="Search..."
          // value={search}
          // onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-10 pr-4 py-2.5 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
        />
      </div>

      {/* SORT */}
      <div className="w-full md:w-auto">
        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          className="w-full md:w-[220px] border rounded-lg px-3 py-2.5 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
        >
          <option value="newest">Newest</option>
          <option value="oldest">Oldest</option>
          <option value="popular">Popular</option>
          <option value="price_low">Price: Low to High</option>
          <option value="price_high">Price: High to Low</option>
        </select>
      </div>
    </div>
  );
}
