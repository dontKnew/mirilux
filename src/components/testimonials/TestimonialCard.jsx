import Image from "next/image";
import { Star, Quote } from "lucide-react";

export default function TestimonialCard({ data }) {
  return (
    <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-md transition flex flex-col h-full">

      {/* Quote Icon */}
      <Quote
        size={32}
        className="text-[var(--primary)] opacity-20 mb-3"
      />

      {/* Review (FIXED HEIGHT) */}
      <p className="text-gray-700 text-sm leading-relaxed min-h-[96px]">
        “{data.review}”
      </p>

      <div className="flex border-t border-gray-300 justify-between items-center pt-3">
      

      {/* User Info */}
      <div className="flex items-center gap-3 ">
        {/* Profile Image */}
        <Image
          src={'/images/usericon.png'}
          alt={data.name}
          width={40}
          height={40}
          className="rounded-full object-cover"
        />

        <div>
          <p className="font-semibold text-sm">{data.name}</p>
          <p className="text-xs text-gray-500">{data.city}, India</p>
        </div>
      </div>
        {/* Rating */}
      <div className="flex gap-1">
        {Array.from({ length: data.rating }).map((_, i) => (
          <Star
            key={i}
            size={16}
            className="text-yellow-400 fill-yellow-400"
          />
        ))}
      </div>
      </div>

    </div>
  );
}
