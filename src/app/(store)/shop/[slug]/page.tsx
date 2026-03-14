import type { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import Image from "next/image";
import { formatPrice } from "@/lib/utils";
import { Badge } from "@/components/ui/Badge";
import { AddToCartButton } from "@/components/store/AddToCartButton";

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  try {
    const candle = await prisma.candle.findUnique({ where: { slug }, select: { name: true, description: true, images: true } });
    if (!candle) return {};
    return {
      title: candle.name,
      description: candle.description.slice(0, 160),
      openGraph: {
        title: candle.name,
        description: candle.description.slice(0, 160),
        images: candle.images[0] ? [{ url: candle.images[0] }] : [],
      },
    };
  } catch {
    return {};
  }
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  let candle;
  try {
    candle = await prisma.candle.findUnique({
      where: { slug, isActive: true },
      include: { category: true },
    });
  } catch { /* no db */ }

  if (!candle) notFound();

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="grid lg:grid-cols-2 gap-12">
        {/* Images */}
        <div className="space-y-3">
          <div className="relative aspect-square rounded-2xl overflow-hidden bg-cream-dark">
            {candle.images[0] ? (
              <Image
                src={candle.images[0]}
                alt={candle.name}
                fill
                className="object-cover"
                priority
              />
            ) : (
              <div className="flex items-center justify-center h-full text-8xl">🕯️</div>
            )}
          </div>
          {candle.images.length > 1 && (
            <div className="grid grid-cols-4 gap-2">
              {candle.images.slice(1).map((img, i) => (
                <div key={i} className="relative aspect-square rounded-xl overflow-hidden bg-cream-dark">
                  <Image src={img} alt={`${candle.name} ${i + 2}`} fill className="object-cover" />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Info */}
        <div>
          {candle.category && (
            <p className="text-amber text-xs uppercase tracking-widest font-medium mb-2">
              {candle.category.name}
            </p>
          )}
          <h1 className="font-display text-4xl font-bold text-warm-brown mb-3">
            {candle.name}
          </h1>

          {/* Scent notes */}
          {candle.scent && (
            <div className="flex flex-wrap gap-2 mb-4">
              {candle.scent.split(",").map((note) => (
                <Badge key={note} variant="default">{note.trim()}</Badge>
              ))}
            </div>
          )}

          <p className="font-display text-3xl font-bold text-amber mb-6">
            {formatPrice(candle.price)}
          </p>

          <p className="text-warm-gray leading-relaxed mb-6">{candle.description}</p>

          {/* Details */}
          <div className="grid grid-cols-3 gap-3 mb-8">
            {candle.burnTime && (
              <div className="bg-cream-dark rounded-xl p-3 text-center">
                <p className="text-xs text-warm-gray mb-1">Timp ardere</p>
                <p className="text-sm font-semibold text-warm-brown">{candle.burnTime}</p>
              </div>
            )}
            {candle.size && (
              <div className="bg-cream-dark rounded-xl p-3 text-center">
                <p className="text-xs text-warm-gray mb-1">Volum</p>
                <p className="text-sm font-semibold text-warm-brown">{candle.size}</p>
              </div>
            )}
            {candle.weight && (
              <div className="bg-cream-dark rounded-xl p-3 text-center">
                <p className="text-xs text-warm-gray mb-1">Greutate</p>
                <p className="text-sm font-semibold text-warm-brown">{candle.weight}g</p>
              </div>
            )}
          </div>

          {candle.stock === 0 ? (
            <div className="bg-terracotta/10 text-terracotta rounded-xl px-5 py-3 text-sm font-medium text-center">
              Stoc epuizat momentan
            </div>
          ) : (
            <AddToCartButton candle={candle} />
          )}

          <p className="text-xs text-warm-gray mt-4 text-center">
            🌱 Ceară naturală de soia · ✋ Handmade · 📦 Livrare gratuită peste 200 RON
          </p>
        </div>
      </div>
    </div>
  );
}