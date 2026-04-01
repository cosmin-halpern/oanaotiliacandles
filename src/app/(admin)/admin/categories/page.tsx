export const dynamic = "force-dynamic";

import { prisma } from "@/lib/prisma";
import { CategoryActions } from "@/components/admin/CategoryActions";

export const metadata = { title: "Categorii" };

export default async function CategoriesPage() {
  const categories = await prisma.category.findMany({
    include: { _count: { select: { candles: true } } },
    orderBy: { name: "asc" },
  });

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-display text-3xl font-bold text-warm-brown">Categorii</h1>
          <p className="text-warm-gray text-sm mt-1">{categories.length} categorii</p>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-amber/10 overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-cream-dark text-warm-gray">
            <tr>
              <th className="text-left px-6 py-3 font-medium">Nume</th>
              <th className="text-left px-6 py-3 font-medium">Slug</th>
              <th className="text-left px-6 py-3 font-medium">Lumânări</th>
              <th className="px-6 py-3" />
            </tr>
          </thead>
          <tbody className="divide-y divide-amber/5">
            {categories.map((cat) => (
              <tr key={cat.id} className="hover:bg-cream/50 transition-colors">
                <td className="px-6 py-4 font-medium text-warm-brown">{cat.name}</td>
                <td className="px-6 py-4 text-warm-gray font-mono text-xs">{cat.slug}</td>
                <td className="px-6 py-4 text-warm-gray">{cat._count.candles}</td>
                <td className="px-6 py-4 text-right">
                  <CategoryActions id={cat.id} name={cat.name} candleCount={cat._count.candles} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
