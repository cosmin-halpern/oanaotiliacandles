"use client";

import { useState } from "react";
import { ShoppingBag, Check } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { useCart } from "@/lib/cart-context";
import type { Candle } from "@prisma/client";

export function AddToCartButton({ candle }: { candle: Candle }) {
  const { addItem } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  function handleAdd() {
    addItem({
      candleId: candle.id,
      name: candle.name,
      price: candle.price,
      image: candle.images[0] ?? "",
      quantity,
      stock: candle.stock,
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  }

  return (
    <div className="flex gap-3">
      <div className="flex items-center border border-amber/20 rounded-full overflow-hidden">
        <button
          onClick={() => setQuantity((q) => Math.max(1, q - 1))}
          className="px-4 py-2.5 text-warm-gray hover:text-amber transition-colors"
        >
          −
        </button>
        <span className="w-8 text-center text-sm font-medium text-warm-brown">{quantity}</span>
        <button
          onClick={() => setQuantity((q) => Math.min(candle.stock, q + 1))}
          className="px-4 py-2.5 text-warm-gray hover:text-amber transition-colors"
        >
          +
        </button>
      </div>

      <Button onClick={handleAdd} size="lg" className="flex-1">
        {added ? (
          <><Check className="h-4 w-4" /> Adăugat!</>
        ) : (
          <><ShoppingBag className="h-4 w-4" /> Adaugă în coș</>
        )}
      </Button>
    </div>
  );
}