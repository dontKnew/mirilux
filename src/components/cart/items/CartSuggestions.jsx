import { useCart } from "@/lib/useCart";
import CartItemSuggestion from "./CartItemSuggestion";
import { useEffect, useState } from "react";
import CartItemSuggestionSkeleton from "./CartItemSuggestionSkeleton";

export default function CartSuggestions() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const addItem = useCart((s) => s.addItem);
  const cartIds = useCart((s) => s.getItemIds);
  const addToCart = (id) => {
    addItem(id)
    setProducts((prev) => prev.filter((p) => p.id !== id));
  }
  useEffect(() => {
    setLoading(true);
    fetch("/api/products/suggestions", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ids: cartIds() }),
    })
      .then((res) => res.json())
      .then(setProducts)
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="space-y-4">
        {Array.from({ length: 5 }).map((_, index) => (
          <CartItemSuggestionSkeleton key={index} />
        ))}
      </div>
    );
  }

  if (!loading && products.length === 0) {
      return;
    }
  return (
    <div className="pt-4 border-t border-color">
      <h3 className="font-semibold mb-3">
        You may also like
      </h3>
      <div className="space-y-4">
        {products.map((item) => (
          <CartItemSuggestion
            key={item.id}
            item={item}
            addToCart={addToCart}
          />
        ))}
      </div>
    </div>
  );
}
