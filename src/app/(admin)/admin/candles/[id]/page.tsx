import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import { CandleForm } from "@/components/admin/CandleForm";

export const dynamic = "force-dynamic";

export default async function EditCandlePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  let candle;
  let categories: { id: string; name: string }[] = [];

  try {
    [candle, categories] = await Promise.all([
      prisma.candle.findUnique({ where: { id } }),
      prisma.category.findMany({ orderBy: { name: "asc" } }),
    ]);
  } catch { /* no db */ }

  if (!candle) notFound();

  return (
    <div>
      <h1 className="font-display text-3xl font-bold text-warm-brown mb-8">
        Editează: {candle.name}
      </h1>
      <CandleForm
        categories={categories}
        initialData={{
          id: candle.id,
          name: candle.name,
          description: candle.description,
          price: candle.price,
          stock: candle.stock,
          scent: candle.scent ?? "",
          size: candle.size ?? "",
          weight: candle.weight ?? undefined,
          burnTime: candle.burnTime ?? "",
          categoryId: candle.categoryId ?? "",
          isActive: candle.isActive,
          isFeatured: candle.isFeatured,
          images: candle.images,
        }}
      />
    </div>
  );
}