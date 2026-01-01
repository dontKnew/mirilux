"use client";

import { useState } from "react";
import CartItem from "./CartItem";

const INITIAL_CART = [
  {
    id: 1,
    name: "CEO Man Perfume",
    size: "100ml",
    price: 485,
    image: "/images/products/p1.png",
    qty: 1,
  },
  {
    id: 2,
    name: "White Oud",
    size: "100ml",
    price: 565,
    image: "/images/products/p4.png",
    qty: 1,
  },
];

export default function CartItems() {
  const [cartItems, setCartItems] = useState(INITIAL_CART);

  /* ➕ INCREASE QTY */
  const increaseQty = (id) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, qty: item.qty + 1 }
          : item
      )
    );
  };

  /* ➖ DECREASE QTY (min 1) */
  const decreaseQty = (id) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id && item.qty > 1
          ? { ...item, qty: item.qty - 1 }
          : item
      )
    );
  };

  /* ❌ REMOVE ITEM */
  const removeFromCart = (id) => {
    setCartItems((prev) =>
      prev.filter((item) => item.id !== id)
    );
  };

  if (cartItems.length === 0) {
    return (
      <p className="text-center text-sm text-gray-500 py-6">
        Your cart is empty
      </p>
    );
  }

  return (
    <div className="space-y-5">
      {cartItems.map((item) => (
        <CartItem
          key={item.id}
          item={item}
          onIncrease={increaseQty}
          onDecrease={decreaseQty}
          onRemove={removeFromCart}
        />
      ))}
    </div>
  );
}
