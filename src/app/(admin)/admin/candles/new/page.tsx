import { prisma } from "@/lib/prisma";
import { CandleForm } from "@/components/admin/CandleForm";

export const dynamic = "force-dynamic";

export default async function NewCandlePage() {
  let categories: { id: string; name: string }[] = [];
  try {
    categories = await prisma.category.findMany({ orderBy: { name: "asc" } });
  } catch { /* no db */ }

  return (
    <div>
      <h1 className="font-display text-3xl font-bold text-warm-brown mb-8">
        Adaugă lumânare
      </h1>
      <CandleForm categories={categories} />
    </div>
  );
}