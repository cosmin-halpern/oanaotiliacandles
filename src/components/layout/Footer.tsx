import Link from "next/link";
import { Instagram, Facebook, Mail } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-warm-brown text-cream/80 mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Brand */}
          <div>
            <h3 className="font-display text-2xl font-bold text-cream mb-3">
              Oana Otilia Candles
            </h3>
            <p className="text-sm leading-relaxed text-cream/60">
              Lumânări artizanale handmade, create cu dragoste din ingrediente
              naturale. Fiecare lumânare spune o poveste.
            </p>
            <div className="flex gap-3 mt-5">
              <a
                href="#"
                aria-label="Instagram"
                className="p-2 rounded-full border border-cream/20 hover:border-amber hover:text-amber transition-colors"
              >
                <Instagram className="h-4 w-4" />
              </a>
              <a
                href="#"
                aria-label="Facebook"
                className="p-2 rounded-full border border-cream/20 hover:border-amber hover:text-amber transition-colors"
              >
                <Facebook className="h-4 w-4" />
              </a>
              <a
                href="mailto:comenzi@oanaotiliacandles.ro"
                aria-label="Email"
                className="p-2 rounded-full border border-cream/20 hover:border-amber hover:text-amber transition-colors"
              >
                <Mail className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-widest text-amber mb-4">
              Magazin
            </h4>
            <ul className="space-y-2 text-sm">
              {[
                { href: "/shop", label: "Toate produsele" },
                { href: "/shop?category=casa", label: "Casă & Ambient" },
                { href: "/shop?category=relaxare", label: "Relaxare" },
                { href: "/shop?category=sezon", label: "Colecții Sezoniere" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="hover:text-amber transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Info */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-widest text-amber mb-4">
              Informații
            </h4>
            <ul className="space-y-2 text-sm">
              {[
                { href: "/about", label: "Despre noi" },
                { href: "/shipping", label: "Livrare & Retur" },
                { href: "/privacy", label: "Politica de confidențialitate" },
                { href: "/terms", label: "Termeni și condiții" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="hover:text-amber transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-cream/10 mt-10 pt-6 text-xs text-cream/40 text-center">
          © {new Date().getFullYear()} Oana Otilia Candles. Toate drepturile rezervate.
        </div>
      </div>
    </footer>
  );
}