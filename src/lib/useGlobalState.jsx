"use client";
import { create } from "zustand";
const EMPTY_ADDRESS = {
  full_name: null,
  phone_no: null,
  email: null,
  address_line: null,
  city: null,
  state: null,
  pincode: null,
  country: null
};

export const useGlobalState = create((set, get) => ({
  cartAddress: EMPTY_ADDRESS,

  hasAuth: false,
  authUser: null,

  setCartAddress: (cartAddress) =>
    set({ cartAddress }),

  clearCartAddress: () =>
    set({ cartAddress: EMPTY_ADDRESS }),

  setAuthUser: (authUser) =>
    set({ hasAuth: true, authUser }),
  
  isCartAddress:()=>{
      const { cartAddress } = get();
     for (const [key, value] of Object.entries(cartAddress)) {
        if (!value || value=="") {
          return true;
        }
      }
      return false;
  },
  clearAuth: () =>
    set({ hasAuth: false, authUser: null }),
}));
