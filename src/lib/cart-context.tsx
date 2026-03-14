"use client";

import { createContext, useContext, useEffect, useReducer } from "react";
import type { Cart, CartItem } from "@/types";

type CartAction =
  | { type: "ADD_ITEM"; item: CartItem }
  | { type: "REMOVE_ITEM"; candleId: string }
  | { type: "UPDATE_QUANTITY"; candleId: string; quantity: number }
  | { type: "CLEAR_CART" };

function cartReducer(state: Cart, action: CartAction): Cart {
  switch (action.type) {
    case "ADD_ITEM": {
      const existing = state.items.find(
        (i) => i.candleId === action.item.candleId
      );
      let items: CartItem[];
      if (existing) {
        items = state.items.map((i) =>
          i.candleId === action.item.candleId
            ? { ...i, quantity: Math.min(i.quantity + action.item.quantity, i.stock) }
            : i
        );
      } else {
        items = [...state.items, action.item];
      }
      return { items, total: calcTotal(items) };
    }
    case "REMOVE_ITEM": {
      const items = state.items.filter((i) => i.candleId !== action.candleId);
      return { items, total: calcTotal(items) };
    }
    case "UPDATE_QUANTITY": {
      const items = state.items
        .map((i) =>
          i.candleId === action.candleId
            ? { ...i, quantity: action.quantity }
            : i
        )
        .filter((i) => i.quantity > 0);
      return { items, total: calcTotal(items) };
    }
    case "CLEAR_CART":
      return { items: [], total: 0 };
    default:
      return state;
  }
}

function calcTotal(items: CartItem[]): number {
  return items.reduce((sum, i) => sum + i.price * i.quantity, 0);
}

const STORAGE_KEY = "ooc_cart";

function loadCart(): Cart {
  if (typeof window === "undefined") return { items: [], total: 0 };
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : { items: [], total: 0 };
  } catch {
    return { items: [], total: 0 };
  }
}

interface CartContextValue {
  cart: Cart;
  addItem: (item: CartItem) => void;
  removeItem: (candleId: string) => void;
  updateQuantity: (candleId: string, quantity: number) => void;
  clearCart: () => void;
  itemCount: number;
}

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, dispatch] = useReducer(cartReducer, { items: [], total: 0 }, loadCart);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(cart));
  }, [cart]);

  const itemCount = cart.items.reduce((sum, i) => sum + i.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        cart,
        addItem: (item) => dispatch({ type: "ADD_ITEM", item }),
        removeItem: (candleId) => dispatch({ type: "REMOVE_ITEM", candleId }),
        updateQuantity: (candleId, quantity) =>
          dispatch({ type: "UPDATE_QUANTITY", candleId, quantity }),
        clearCart: () => dispatch({ type: "CLEAR_CART" }),
        itemCount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside CartProvider");
  return ctx;
}