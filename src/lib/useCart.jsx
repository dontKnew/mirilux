"use client";
import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useCart = create(
  persist(
    (set, get) => ({
      items: [], // [{ id, qty }]

      // ➕ Add item
      addItem: (id, qty = 1) =>
        set((state) => {
          const found = state.items.find((i) => i.id === id);

          if (found) {
            return {
              items: state.items.map((i) =>
                i.id === id ? { ...i, qty: i.qty + qty } : i
              ),
            };
          }

          return {
            items: [...state.items, { id, qty }],
          };
        }),

      // 🔄 Update quantity
      updateQty: (id, qty) =>
        set((state) => ({
          items: state.items.map((i) =>
            i.id === id ? { ...i, qty } : i
          ),
        })),

      // ❌ Remove item
      removeItem: (id) =>
        set((state) => ({
          items: state.items.filter((i) => i.id !== id),
        })),

      // 🧹 Clear cart
      clearCart: () => set({ items: [] }),

      getItemIds: () => get().items.map((item) => item.id),

      hasItems: () => get().items.length > 0,
      
      isInCart: (id) => {
        return get().items.some((item) => item.id === id);
      },
      getTotalItems: () => {
        return get().items.reduce((total, item) => total + item.qty, 0);
      },
    }),
    {
      name: "cart",
    }
  )
);
