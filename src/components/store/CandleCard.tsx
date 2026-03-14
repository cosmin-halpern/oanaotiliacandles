"use client";

import Link from "next/link";
import Image from "next/image";
import { ShoppingBag } from "lucide-react";
import type { CandleWithCategory } from "@/types";
import { formatPrice } from "@/lib/utils";
import { useCart } from "@/lib/cart-context";

interface CandleCardProps {
  candle: CandleWithCategory;
}

export function CandleCard({ candle }: CandleCardProps) {
  const { addItem } = useCart();
  const mainImage = candle.images[0];

  function handleAddToCart(e: React.MouseEvent) {
    e.preventDefault();
    addItem({
      candleId: candle.id,
      name: candle.name,
      price: candle.price,
      image: mainImage ?? "",
      quantity: 1,
      stock: candle.stock,
    });
  }

  return (
    <Link
      href={`/shop/${candle.slug}`}
      className="group relative bg-white rounded-2xl overflow-hidden border border-amber/10 hover:border-amber/30 hover:shadow-lg transition-all duration-300"
    >
      {/* Image */}
      <div className="relative aspect-square bg-cream-dark overflow-hidden">
        {mainImage ? (
          <Image
            src={mainImage}
            alt={candle.name}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            className="object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="flex items-center justify-center h-full text-6xl">
            🕯️
          </div>
        )}
        {candle.stock === 0 && (
          <div className="absolute inset-0 bg-warm-brown/40 flex items-center justify-center">
            <span className="bg-white text-warm-brown text-xs font-semibold px-3 py-1 rounded-full">
              Stoc epuizat
            </span>
          </div>
        )}
        {candle.isFeatured && candle.stock > 0 && (
          <div className="absolute top-2 left-2">
            <span className="bg-amber text-white text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wide">
              Popular
            </span>
          </div>
        )}
      </div>

      {/* Info */}
      <div className="p-4">
        {candle.category && (
          <p className="text-[10px] text-warm-gray uppercase tracking-widest mb-1">
            {candle.category.name}
          </p>
        )}
        <h3 className="font-display font-semibold text-warm-brown group-hover:text-amber transition-colors line-clamp-1">
          {candle.name}
        </h3>
        {candle.scent && (
          <p className="text-xs text-warm-gray mt-0.5 line-clamp-1">{candle.scent}</p>
        )}
        <div className="flex items-center justify-between mt-3">
          <p className="font-semibold text-warm-brown">{formatPrice(candle.price)}</p>
          {candle.stock > 0 && (
            <button
              onClick={handleAddToCart}
              className="p-2 rounded-full bg-amber/10 text-amber hover:bg-amber hover:text-white transition-colors"
              aria-label="Adaugă în coș"
            >
              <ShoppingBag className="h-4 w-4" />
            </button>
          )}
        </div>
      </div>
    </Link>
  );
}