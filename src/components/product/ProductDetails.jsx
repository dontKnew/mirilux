import { ProductService } from "@/services/ProductService";
import { Zap, Truck, ShieldCheck, Banknote, Star, ThumbsUp, ThumbsDown, BanknoteIcon } from "lucide-react";
import ProductGallery from "@/components/product/ProductGallery";
import ProductCardButtons from "@/components/product/ProductCardButtons";
import Container from "../layout/Container";

const REVIEWS_TO_SHOW = 4;

export default async function ProductDetails({ slug }) {
  const product = await ProductService.getProduct(slug, "slug");
  // console.warn("Product Details:", product);
  return (
    
      <Container py={4}>
        <div className="grid grid-cols-1 md:grid-cols-5 md:gap-10">
          {/* LEFT – PRODUCT GALLERY (FIXED) */}
          <div className="md:col-span-2">
            <div className="md:sticky md:top-24">
              <ProductGallery images={product.images} />
            </div>
          </div>
            
            
            {/* RIGHT – Product Info */}
            <div className="space-y-6 col-span-3">
              {/* Title */}
              <div>
                 <p className="text-green-600 text-sm line-clamp-2">
                  {product.long_name}
                </p>
                <h1 className="flex items-center gap-2 md:text-3xl text-xl">
                  {product.name} - {product.size}
                </h1>
              </div>

              {/* Price */}
              <div className="flex items-center gap-4">
                <span className="text-3xl font-bold text-green-600">₹ {product.price}</span>
                <span className="line-through text-gray-400">₹ {product.old_price}</span>
                <span className="bg-red-100 text-red-600 px-3 py-1 rounded-full text-sm font-semibold">{product.discount_percentage}% OFF</span>
              </div>

              {/* Description */}
              <p className="text-gray-600">
                {product.description}
              </p>

              
              {/* Trust Badges */}
              <div className="flex flex-wrap gap-4">
                <Badge icon={<Truck size={18} />} text="Fastest Delivery" />
                <Badge icon={<ShieldCheck size={18} />} text="100% Original" />
                <Badge icon={<Banknote size={18} />} text="Cash on Delivery" />
                <Badge icon={<BanknoteIcon size={18} />} text="Secure Payment" />
              </div>
              

              {/* Highlights */}
              <ul className="space-y-2 grid grid-cols-1 md:grid-cols-2">
                {product.highlights.map((highlight, index) => (
                  <li key={index} className="flex items-start gap-2 text-[var(--secondary)]">
                    <Zap size={16} className=" mt-1" />1
                    <span>{highlight}</span>
                  </li>
                ))}
              </ul>
              <ProductCardButtons productId={21} />

              {/* Accordion */}
              <details className="border rounded p-4 mt-4" open>
                <summary className="font-semibold cursor-pointer">FAQs</summary>
                <div className="mt-3 space-y-2 text-gray-600">
                  {product.faqs.map((faq, index) => (
                    <div key={index}>
                      <p className="font-medium">{faq.question}</p>
                      <p>{faq.answer}</p>
                    </div>
                  ))}
                </div>
              </details>

              {/* Reviews */}
              <div
                className="border-t pt-6 group"
                data-expanded="false"
              >
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-bold">Ratings & Reviews</h2>
                  <button className="bg-[var(--primary)] text-white border px-4 py-2 rounded-lg">
                    Rate Product
                  </button>
                </div>

                {product.product_reviews.map((review, index) => (
                  <div
                    key={index}
                    className={`
                      mb-4
                      ${index >= REVIEWS_TO_SHOW
                        ? "hidden group-[data-expanded=true]:block"
                        : ""}
                    `}
                  >
                    <ReviewCard review={review} />
                  </div>
                ))}
              </div>

            </div>
          </div>
          </Container>
  );
}



function Badge({ icon, text }) {
  return (
    <div className="flex items-center gap-2 border px-4 py-2 rounded-full text-sm">
      {icon}
      <span>{text}</span>
    </div>
  );
}

function ReviewCard({ review }) {
  return (
    <div className="border-b border-gray-300  py-3 mb-2 flex justify-between  items-center">
      <div>
        <div className="flex items-center gap-3">
        <img src="/images/usericon.png" width={100} height={100} className="w-13 h-13 rounded-full bg-gray-200" />
        <div>
          <p className="font-semibold flex items-center gap-1">{review?.name || "Anonymous"} 
            {review?.is_verified && <ShieldCheck size={14} className="text-blue-500" />}
          </p>
          <div className="flex">
            {/* {review.rating = 4} */}
            {[...Array(5)].map((_, i) => (
              <Star 
                key={i}
                size={16}
                className={`${
                  i < (review?.rating || 5) ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
                }`}
              />
            ))}
            
          </div>

        </div>
      </div>
      <p className="text-gray-600 mt-3 text-sm">
        {review?.comment || "Great product! Highly recommend to everyone."}
      </p>
      </div>
    <div className="flex gap-3 mt-3">
  {/* LIKE */}
  <button
    className="
      flex items-center gap-1 px-3 py-1.5 rounded-full
      text-gray-500
      hover:text-green-600 hover:bg-green-50
      active:scale-95
      transition-all duration-200
    "
  >
    <ThumbsUp size={16} />
    <span className="text-sm font-medium">{review?.likes || 0}</span>
  </button>

  {/* DISLIKE */}
  <button
    className="
      flex items-center gap-1 px-3 py-1.5 rounded-full
      text-gray-500
      hover:text-red-600 hover:bg-red-50
      active:scale-95
      transition-all duration-200
    "
  >
    <ThumbsDown size={16} />
    <span className="text-sm font-medium">{review?.dislikes || 0}</span>
  </button>
</div>

    </div>

  );
}
