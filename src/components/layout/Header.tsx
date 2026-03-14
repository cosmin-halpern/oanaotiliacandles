"use client";

import Link from "next/link";
import { ShoppingBag, Menu, X } from "lucide-react";
import { useState } from "react";
import { useCart } from "@/lib/cart-context";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "/shop", label: "Magazin" },
  { href: "/shop?category=relaxare", label: "Relaxare" },
  { href: "/shop?category=casa", label: "Casă" },
  { href: "/about", label: "Despre noi" },
];

export function Header() {
  const { itemCount } = useCart();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-cream/95 backdrop-blur-sm border-b border-amber/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <span className="font-display text-xl font-bold text-warm-brown tracking-wide">
              Oana Otilia
            </span>
            <span className="hidden sm:inline text-amber text-xs uppercase tracking-widest font-medium">
              Candles
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm text-warm-gray hover:text-amber transition-colors duration-200"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-3">
            <Link
              href="/cart"
              className="relative p-2 text-warm-brown hover:text-amber transition-colors"
              aria-label="Coș de cumpărături"
            >
              <ShoppingBag className="h-5 w-5" />
              {itemCount > 0 && (
                <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-amber text-white text-[10px] font-bold flex items-center justify-center">
                  {itemCount > 9 ? "9+" : itemCount}
                </span>
              )}
            </Link>

            {/* Mobile menu button */}
            <button
              className="md:hidden p-2 text-warm-brown"
              onClick={() => setMobileOpen((v) => !v)}
              aria-label="Meniu"
            >
              {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile nav */}
      <div
        className={cn(
          "md:hidden overflow-hidden transition-all duration-300",
          mobileOpen ? "max-h-64" : "max-h-0"
        )}
      >
        <nav className="px-4 pb-4 flex flex-col gap-3 border-t border-amber/10 pt-3">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className="text-sm text-warm-gray hover:text-amber py-1"
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}