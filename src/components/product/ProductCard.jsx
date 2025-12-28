import Image from "next/image";
import { Star, BadgeCheck } from "lucide-react";
import { ButtonAddToCart, ButtonAddToCart2, ButtonBuyNow, ButtonBuyNow2 } from "../ui/buttons";


export default function ProductCard({ product}) {
  return (
    <div>
    <div className="bg-white border border-gray-300 rounded-sm overflow-hidden shadow-sm hover:shadow-md transition">

      {/* BEST SELLER */}
      
        <span className="absolute bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-br-lg">
          {product.badge} 
        </span>

      {/* Image */}
      <div className="relative h-50 flex items-center justify-center">
        <Image
          src={product.image}
          alt={product.title}
          width={160}
          height={200}
          className="object-contain"
        />
      </div>

      {/* Content */}
      <div className="px-4 pb-4 text-center">
        <h3 className="font-semibold text-sm leading-snug">
          {product.title}
        </h3>

        <p className="text-green-600 text-sm mt-2 line-clamp-2">
          {product.description}
        </p>

        <p className="text-sm mt-1">{product.size}</p>

        {/* Rating & Reviews */}
          <div className="flex items-center justify-center gap-2 mt-2 text-sm">

            {/* Star + Rating */}
            <div className="flex items-center gap-1">
              <Star size={14} className="text-yellow-400 fill-yellow-400" />
              <span className="gray">{product.rating}</span>
            </div>

            {/* Verified Reviews */}
            <div className="flex items-center">
              <BadgeCheck size={18} className="fill-[var(--secondary)] text-white" />
              <span className="text-sm gray">
                {product.reviews} Reviews
              </span>
            </div>

          </div>

        {/* Price */}
        <div className="flex items-center justify-center gap-3 mt-3">
          <span className="text-lg ">₹ {product.price}</span>
          <span className="line-through text-gray-400">
            ₹ {product.mrp}
          </span>
          <span className="bg-green-200 text-green-700 text-xs px-2 py-1 rounded">
            {product.discount}% off
          </span>
        </div>
      </div>
      <div className="flex gap-2 m-1 mt-0">
        <ButtonAddToCart />
        <ButtonBuyNow2 />
      </div>
    </div>  
      
    </div>
  );
}
