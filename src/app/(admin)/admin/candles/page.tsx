import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { Plus } from "lucide-react";
import { buttonVariants } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { formatPrice } from "@/lib/utils";
import { CandleActions } from "@/components/admin/CandleActions";

export const dynamic = "force-dynamic";

export default async function CandlesPage() {
  let candles: Awaited<ReturnType<typeof prisma.candle.findMany<{ include: { category: true } }>>> = [];
  try {
    candles = await prisma.candle.findMany({
      include: { category: true },
      orderBy: { createdAt: "desc" },
    });
  } catch {
    // DB not available
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-display text-3xl font-bold text-warm-brown">Lumânări</h1>
          <p className="text-warm-gray text-sm mt-1">{candles.length} produse</p>
        </div>
        <Link href="/admin/candles/new" className={buttonVariants("primary", "md")}>
          <Plus className="h-4 w-4" />
          Adaugă lumânare
        </Link>
      </div>

      <div className="bg-white rounded-2xl border border-amber/10 overflow-hidden">
        {candles.length === 0 ? (
          <div className="text-center py-16 text-warm-gray">
            <div className="text-5xl mb-3">🕯️</div>
            <p className="font-display text-lg font-semibold text-warm-brown">Nicio lumânare adăugată</p>
            <p className="text-sm mt-1">Adaugă primul produs pentru a începe.</p>
          </div>
        ) : (
          <table className="w-full text-sm">
            <thead className="bg-cream-dark border-b border-amber/10">
              <tr>
                <th className="text-left px-5 py-3 text-xs uppercase tracking-wider text-warm-gray font-semibold">Produs</th>
                <th className="text-left px-5 py-3 text-xs uppercase tracking-wider text-warm-gray font-semibold">Categorie</th>
                <th className="text-left px-5 py-3 text-xs uppercase tracking-wider text-warm-gray font-semibold">Preț</th>
                <th className="text-left px-5 py-3 text-xs uppercase tracking-wider text-warm-gray font-semibold">Stoc</th>
                <th className="text-left px-5 py-3 text-xs uppercase tracking-wider text-warm-gray font-semibold">Status</th>
                <th className="px-5 py-3" />
              </tr>
            </thead>
            <tbody className="divide-y divide-amber/5">
              {candles.map((candle) => (
                <tr key={candle.id} className="hover:bg-cream/50 transition-colors">
                  <td className="px-5 py-4">
                    <div>
                      <p className="font-medium text-warm-brown">{candle.name}</p>
                      {candle.scent && <p className="text-xs text-warm-gray mt-0.5">{candle.scent}</p>}
                    </div>
                  </td>
                  <td className="px-5 py-4 text-warm-gray">
                    {candle.category?.name ?? "—"}
                  </td>
                  <td className="px-5 py-4 font-medium text-warm-brown">
                    {formatPrice(candle.price)}
                  </td>
                  <td className="px-5 py-4">
                    <span className={candle.stock <= 3 ? "text-terracotta font-semibold" : "text-warm-brown"}>
                      {candle.stock}
                    </span>
                  </td>
                  <td className="px-5 py-4">
                    <Badge variant={candle.isActive ? "success" : "default"}>
                      {candle.isActive ? "Activ" : "Inactiv"}
                    </Badge>
                    {candle.isFeatured && (
                      <Badge variant="warning" className="ml-1">Popular</Badge>
                    )}
                  </td>
                  <td className="px-5 py-4">
                    <CandleActions id={candle.id} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}