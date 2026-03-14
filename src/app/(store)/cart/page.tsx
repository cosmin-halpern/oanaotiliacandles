"use client";

import Link from "next/link";
import Image from "next/image";
import { Minus, Plus, Trash2 } from "lucide-react";
import { useCart } from "@/lib/cart-context";
import { Button, buttonVariants } from "@/components/ui/Button";
import { formatPrice } from "@/lib/utils";

export default function CartPage() {
  const { cart, removeItem, updateQuantity } = useCart();

  if (cart.items.length === 0) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-24 text-center">
        <div className="text-6xl mb-6">🛒</div>
        <h1 className="font-display text-3xl font-bold text-warm-brown mb-3">
          Coșul tău este gol
        </h1>
        <p className="text-warm-gray mb-8">
          Descoperă lumânările noastre artizanale și adaugă-le în coș.
        </p>
        <Link href="/shop" className={buttonVariants("primary", "md")}>
          Mergi la magazin
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="font-display text-3xl font-bold text-warm-brown mb-8">
        Coșul tău
      </h1>

      <div className="grid lg:grid-cols-3 gap-10">
        {/* Items */}
        <div className="lg:col-span-2 space-y-4">
          {cart.items.map((item) => (
            <div
              key={item.candleId}
              className="flex gap-4 bg-white rounded-2xl p-4 border border-amber/10"
            >
              {/* Image */}
              <div className="relative w-20 h-20 rounded-xl overflow-hidden bg-cream-dark flex-shrink-0">
                {item.image ? (
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div className="flex items-center justify-center h-full text-2xl">🕯️</div>
                )}
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <h3 className="font-display font-semibold text-warm-brown line-clamp-1">
                  {item.name}
                </h3>
                <p className="text-amber font-medium mt-0.5">
                  {formatPrice(item.price)}
                </p>
              </div>

              {/* Quantity */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => updateQuantity(item.candleId, item.quantity - 1)}
                  className="p-1.5 rounded-full border border-amber/20 hover:border-amber hover:text-amber transition-colors"
                >
                  <Minus className="h-3 w-3" />
                </button>
                <span className="w-6 text-center text-sm font-medium">
                  {item.quantity}
                </span>
                <button
                  onClick={() =>
                    updateQuantity(item.candleId, Math.min(item.quantity + 1, item.stock))
                  }
                  className="p-1.5 rounded-full border border-amber/20 hover:border-amber hover:text-amber transition-colors"
                >
                  <Plus className="h-3 w-3" />
                </button>
              </div>

              {/* Subtotal + remove */}
              <div className="flex flex-col items-end justify-between">
                <button
                  onClick={() => removeItem(item.candleId)}
                  className="text-warm-gray hover:text-terracotta transition-colors"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
                <p className="font-semibold text-warm-brown">
                  {formatPrice(item.price * item.quantity)}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Summary */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-2xl border border-amber/10 p-6 sticky top-24">
            <h2 className="font-display text-xl font-bold text-warm-brown mb-4">
              Sumar comandă
            </h2>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between text-warm-gray">
                <span>Subtotal</span>
                <span>{formatPrice(cart.total)}</span>
              </div>
              <div className="flex justify-between text-warm-gray">
                <span>Livrare</span>
                <span>{cart.total >= 200 ? "Gratuită" : formatPrice(20)}</span>
              </div>
              <div className="border-t border-amber/10 pt-2 mt-2 flex justify-between font-semibold text-warm-brown">
                <span>Total</span>
                <span>
                  {formatPrice(cart.total >= 200 ? cart.total : cart.total + 20)}
                </span>
              </div>
            </div>
            {cart.total < 200 && (
              <p className="text-xs text-warm-gray mt-3 bg-cream-dark rounded-lg p-2">
                Adaugă {formatPrice(200 - cart.total)} pentru livrare gratuită!
              </p>
            )}
            <Link
              href="/checkout"
              className={buttonVariants("primary", "lg", "w-full mt-5")}
            >
              Continuă la plată
            </Link>
            <Link
              href="/shop"
              className="block text-center text-sm text-warm-gray hover:text-amber mt-3 transition-colors"
            >
              ← Continuă cumpărăturile
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}