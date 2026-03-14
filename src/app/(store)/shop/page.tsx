export const dynamic = "force-dynamic";

import { prisma } from "@/lib/prisma";
import { CandleCard } from "@/components/store/CandleCard";

interface ShopPageProps {
  searchParams: Promise<{ category?: string; q?: string }>;
}

export const metadata = {
  title: "Magazin",
  description: "Explorează colecția noastră de lumânări artizanale handmade.",
};

export default async function ShopPage({ searchParams }: ShopPageProps) {
  const { category, q } = await searchParams;

  let candles: Awaited<ReturnType<typeof prisma.candle.findMany<{ include: { category: true } }>>> = [];
  let categories: Awaited<ReturnType<typeof prisma.category.findMany>> = [];
  try {
  [candles, categories] = await Promise.all([
    prisma.candle.findMany({
      where: {
        isActive: true,
        ...(category && {
          category: { slug: category },
        }),
        ...(q && {
          OR: [
            { name: { contains: q, mode: "insensitive" } },
            { description: { contains: q, mode: "insensitive" } },
            { scent: { contains: q, mode: "insensitive" } },
          ],
        }),
      },
      include: { category: true },
      orderBy: [{ isFeatured: "desc" }, { createdAt: "desc" }],
    }),
    prisma.category.findMany({ orderBy: { name: "asc" } }),
  ]);
  } catch {
    // DB not available — show empty state
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-8">
        <h1 className="font-display text-4xl font-bold text-warm-brown">
          {category
            ? categories.find((c) => c.slug === category)?.name ?? "Magazin"
            : "Toate lumânările"}
        </h1>
        <p className="text-warm-gray mt-2 text-sm">
          {candles.length} {candles.length === 1 ? "produs" : "produse"}
        </p>
      </div>

      <div className="flex gap-8">
        {/* Sidebar filters */}
        <aside className="hidden lg:block w-52 flex-shrink-0">
          <div className="sticky top-24">
            <h3 className="text-xs uppercase tracking-widest font-semibold text-warm-gray mb-3">
              Colecții
            </h3>
            <nav className="space-y-1">
              <a
                href="/shop"
                className={`block px-3 py-2 rounded-lg text-sm transition-colors ${
                  !category
                    ? "bg-amber text-white font-medium"
                    : "text-warm-gray hover:text-amber hover:bg-amber/10"
                }`}
              >
                Toate
              </a>
              {categories.map((cat) => (
                <a
                  key={cat.slug}
                  href={`/shop?category=${cat.slug}`}
                  className={`block px-3 py-2 rounded-lg text-sm transition-colors ${
                    category === cat.slug
                      ? "bg-amber text-white font-medium"
                      : "text-warm-gray hover:text-amber hover:bg-amber/10"
                  }`}
                >
                  {cat.name}
                </a>
              ))}
            </nav>
          </div>
        </aside>

        {/* Grid */}
        <div className="flex-1">
          {candles.length === 0 ? (
            <div className="text-center py-20 text-warm-gray">
              <div className="text-5xl mb-4">🕯️</div>
              <p className="font-display text-xl font-semibold text-warm-brown">
                Niciun produs găsit
              </p>
              <p className="mt-2 text-sm">Încearcă altă categorie sau caută alt termen.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
              {candles.map((candle) => (
                <CandleCard key={candle.id} candle={candle} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}