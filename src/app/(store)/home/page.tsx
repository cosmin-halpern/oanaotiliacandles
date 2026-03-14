export const dynamic = "force-dynamic";

import Link from "next/link";
import { buttonVariants } from "@/components/ui/Button";
import { prisma } from "@/lib/prisma";
import { CandleCard } from "@/components/store/CandleCard";

export default async function HomePage() {
  let featuredCandles: Awaited<ReturnType<typeof prisma.candle.findMany<{ include: { category: true } }>>> = [];
  try {
    featuredCandles = await prisma.candle.findMany({
      where: { isFeatured: true, isActive: true },
      include: { category: true },
      take: 4,
      orderBy: { createdAt: "desc" },
    });
  } catch {
    // DB not available — show empty state
  }

  const categories = [
    { name: "Relaxare", slug: "relaxare", emoji: "🌿", desc: "Lavandă, Mușețel, Ceai verde" },
    { name: "Romantism", slug: "romantism", emoji: "🌹", desc: "Trandafir, Iasomie, Santal" },
    { name: "Casă & Ambient", slug: "casa", emoji: "🏡", desc: "Vanilie, Scorțișoară, Cedru" },
    { name: "Sezon", slug: "sezon", emoji: "🍂", desc: "Colecții limitate" },
  ];

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-cream min-h-[85vh] flex items-center">
        <div className="absolute inset-0 bg-gradient-to-br from-amber/5 via-transparent to-sage/10" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <p className="text-amber text-sm uppercase tracking-widest font-medium mb-4">
              Handmade cu dragoste
            </p>
            <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl font-bold text-warm-brown leading-tight">
              Lumânări care
              <br />
              <span className="text-amber">povestesc</span>
            </h1>
            <p className="mt-6 text-lg text-warm-gray max-w-md leading-relaxed">
              Fiecare lumânare este creată manual din ceară naturală de soia și
              uleiuri esențiale pure. Un ritual de liniște pentru casa ta.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/shop" className={buttonVariants("primary", "lg")}>
                Descoperă colecția
              </Link>
              <Link href="/about" className={buttonVariants("outline", "lg")}>
                Povestea noastră
              </Link>
            </div>
            <div className="mt-10 flex gap-8">
              {[
                { value: "100%", label: "Ceară naturală" },
                { value: "50+", label: "Arome unice" },
                { value: "40h+", label: "Timp de ardere" },
              ].map((stat) => (
                <div key={stat.label}>
                  <p className="font-display text-2xl font-bold text-amber">{stat.value}</p>
                  <p className="text-xs text-warm-gray mt-0.5">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
          {/* Placeholder for hero image */}
          <div className="hidden lg:flex items-center justify-center">
            <div className="w-80 h-80 rounded-full bg-gradient-to-br from-amber/20 to-terracotta/10 flex items-center justify-center text-8xl">
              🕯️
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-20 bg-cream-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-display text-3xl font-bold text-warm-brown text-center mb-2">
            Colecțiile noastre
          </h2>
          <p className="text-warm-gray text-center mb-10 text-sm">
            Găsește aroma perfectă pentru fiecare moment
          </p>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {categories.map((cat) => (
              <Link
                key={cat.slug}
                href={`/shop?category=${cat.slug}`}
                className="group bg-cream rounded-2xl p-6 text-center hover:shadow-md transition-all duration-300 border border-amber/10 hover:border-amber/30"
              >
                <div className="text-4xl mb-3">{cat.emoji}</div>
                <h3 className="font-display font-semibold text-warm-brown group-hover:text-amber transition-colors">
                  {cat.name}
                </h3>
                <p className="text-xs text-warm-gray mt-1">{cat.desc}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured products */}
      {featuredCandles.length > 0 && (
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between mb-10">
              <div>
                <h2 className="font-display text-3xl font-bold text-warm-brown">
                  Cele mai iubite
                </h2>
                <p className="text-warm-gray text-sm mt-1">Alegerile preferate ale clienților noștri</p>
              </div>
              <Link
                href="/shop"
                className="text-amber text-sm font-medium hover:underline hidden sm:block"
              >
                Vezi toate →
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {featuredCandles.map((candle) => (
                <CandleCard key={candle.id} candle={candle} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* About strip */}
      <section className="bg-warm-brown text-cream py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-display text-3xl font-bold mb-4">
            De ce lumânările noastre?
          </h2>
          <p className="text-cream/70 leading-relaxed mb-10">
            Folosim exclusiv ceară de soia naturală, uleiuri esențiale pure și
            fitiluri din bumbac. Fără parafină, fără parfumuri sintetice.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {[
              { icon: "🌱", title: "Ingrediente naturale", desc: "Ceară de soia 100% pură" },
              { icon: "✋", title: "Handmade", desc: "Turnate manual, cu atenție la detalii" },
              { icon: "📦", title: "Livrare gratuită", desc: "La comenzi peste 200 RON" },
            ].map((item) => (
              <div key={item.title} className="bg-cream/5 rounded-2xl p-5">
                <div className="text-3xl mb-2">{item.icon}</div>
                <h3 className="font-semibold text-cream">{item.title}</h3>
                <p className="text-cream/60 text-sm mt-1">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}