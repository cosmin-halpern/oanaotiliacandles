"use client";

import Link from "next/link";
import { CheckCircle } from "lucide-react";
import { buttonVariants } from "@/components/ui/Button";
import { useEffect } from "react";
import { useCart } from "@/lib/cart-context";

export default function OrderSuccessPage() {
  const { clearCart } = useCart();

  useEffect(() => {
    clearCart();
  }, [clearCart]);

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <CheckCircle className="h-16 w-16 text-sage mx-auto mb-5" />
        <h1 className="font-display text-3xl font-bold text-warm-brown mb-3">
          Comandă plasată cu succes!
        </h1>
        <p className="text-warm-gray mb-2">
          Mulțumim pentru comandă. Vei primi un email de confirmare în câteva minute.
        </p>
        <p className="text-warm-gray text-sm mb-8">
          Pregătim lumânările tale cu dragoste. 🕯️
        </p>
        <Link href="/shop" className={buttonVariants("primary", "lg")}>
          Continuă cumpărăturile
        </Link>
      </div>
    </div>
  );
}