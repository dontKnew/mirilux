import Image from "next/image";
import { Star, BadgeCheck } from "lucide-react";
import ProductCardButtons from "./ProductCardButtons";


export default function ProductCard({ product}) {
  return (
    <div>
      
    <div className="bg-white border border-color rounded-sm overflow-hidden shadow-sm hover:shadow-md transition">

      {/* BEST SELLER */}
      
        <span className="absolute bg-[var(--primary)] text-white text-xs font-bold px-3 py-1 rounded-br-lg z-1">
          {product.badge} 
        </span>

      {/* Image */}
      <div className="relative h-50 flex items-center justify-center">
        <Image
          src={`/images/products/${product.image}`}
          alt={product.name}
          width={160}
          height={160}
          className="object-contain hover:scale-120 active:scale-120 transition-transform duration-200 cursor-pointer"
        />
      </div>

      {/* Content */}
      <div className="md:px-4 px-2 pb-4 text-center">
        <h3 className="font-semibold text-sm leading-snug">
          {product.name} - {product.size}
        </h3>
        <p className="text-green-600 text-sm mt-2 line-clamp-2">
          {product.long_name}
        </p>

        {/* <p className="text-sm mt-1">{product.size}</p> */}

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
            ₹ {product.old_price}
          </span>
          <span className="bg-green-200 text-green-700 text-xs px-2 py-1 rounded">
            {product.discount_percentage}% off
          </span>
        </div>
      </div>
      <ProductCardButtons productId={product.id} />
    </div>  
      
    </div>
  );
}
