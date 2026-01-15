"use client";

import { useEffect, useState, useMemo, useCallback } from "react";
import { useCart } from "@/lib/useCart";
import CartItem from "./CartItem";
import CartItemSkeleton from "./CartItemSkeleton";
import ButtonShop from "../../ui/buttons/ButtonShop";
import Image from "next/image";
import { useDebounceCallback } from "@/hooks/useDebounceCallback";
import useApiRequest from "@/hooks/useApiRequest";

export default function CartItems({setTotalPrice}) {
  const cart = useCart((s) => s.items);
  const updateQty = useCart((s) => s.updateQty);
  const removeItem = useCart((s) => s.removeItem);
  const { send, data, error, loading } = useApiRequest();
  const [products, setProducts] = useState([]);
  const productIdsKey = cart.map((i) => i.id).sort().join("-");

  useEffect(() => {
    if(cart.length === 0) {
      setProducts([]);
      return;
    }
    send("/products/cart", { ids: cart.map((i) => i.id) });
  }, [productIdsKey]);

  // Update products when API data arrives
  useEffect(() => {
    if (data) {
      setProducts(data);
      let totalPrice = 0;
      for(const product of products){
          totalPrice +=product.price;
      }
      setTotalPrice(totalPrice);
    }
  }, [data]);


  const cartItems = useMemo(() => {
    return products.map((product) => {
      const cartItem = cart.find((c) => c.id === product.id);
      return { ...product, qty: cartItem?.qty ?? 1 };
    });
  }, [products, cart]);

  // 🔥 Debounced updater
  const debouncedUpdate = useDebounceCallback(updateQty, 250);

  const increaseQty = useCallback(
    (id, qty) => debouncedUpdate(id, qty + 1),
    [debouncedUpdate]
  );

  const decreaseQty = useCallback(
    (id, qty) => qty > 1 && debouncedUpdate(id, qty - 1),
    [debouncedUpdate]
  );

  /* ---------- UI STATES ---------- */

  if (loading) {
    return (
      <div className="space-y-4">
        {cart.map((i) => (
          <CartItemSkeleton key={i.id} />
        ))}
      </div>
    );
  }

  if (!loading && cartItems.length === 0) {
    return (
      <div className="text-center py-6 flex flex-col items-center">
        <Image
          src="/images/cartEmpty.png"
          alt="Empty Cart"
          width={150}
          height={150}
        />
        <p className="text-lg font-medium mt-2">Your cart is empty</p>
        <p className="text-sm text-gray-500 mb-4">
          Looks like you haven’t added anything yet
        </p>
        <ButtonShop />
      </div>
    );
  }

  return (
    <div className="space-y-5">
      {cartItems.map((item) => (
        <CartItem
          key={item.id}
          item={item}
          onIncrease={() => increaseQty(item.id, item.qty)}
          onDecrease={() => decreaseQty(item.id, item.qty)}
          onRemove={() => removeItem(item.id)}
        />
      ))}
    </div>
  );
}
