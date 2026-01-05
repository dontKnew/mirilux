"use client";
import { useCart } from "@/lib/useCart";
import ButtonAddToCart from "@/components/ui/buttons/ButtonAddToCart";
import ButtonBuyNow from "@/components/ui/buttons/ButtonBuyNow";
import { useCart as CartContext } from "@/context/CartContext";

export default function ProductCardButtons({ productId }) {
  const { setIsOpen } = CartContext();
  const addItem = useCart((s) => s.addItem);
  const isInCart = useCart((s) => s.items.some(i => i.id === productId));

  const handleBuyNow = () => {
    if (!isInCart) {
      addItem(productId); 
    }
    setIsOpen(true); 
  };

  return (
    <div className="flex gap-2 m-1 mt-0">
      <ButtonAddToCart handleAdd={() => addItem(productId)} isInCart={isInCart} />
      <ButtonBuyNow handleBuyNow={handleBuyNow} />
    </div>
  );
}
