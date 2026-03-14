import { prisma } from "@/lib/prisma";
import { Package, ShoppingBag, TrendingUp, AlertCircle } from "lucide-react";
import Link from "next/link";
import { formatPrice } from "@/lib/utils";
import { Badge } from "@/components/ui/Badge";

export const dynamic = "force-dynamic";

async function getStats() {
  try {
    const [totalCandles, totalOrders, recentOrders, lowStock] = await Promise.all([
      prisma.candle.count({ where: { isActive: true } }),
      prisma.order.count(),
      prisma.order.findMany({
        take: 5,
        orderBy: { createdAt: "desc" },
        include: { items: true },
      }),
      prisma.candle.findMany({
        where: { stock: { lte: 3 }, isActive: true },
        select: { id: true, name: true, stock: true },
      }),
    ]);

    const revenue = await prisma.order.aggregate({
      where: { status: { in: ["PAID", "SHIPPED", "DELIVERED"] } },
      _sum: { total: true },
    });

    return { totalCandles, totalOrders, recentOrders, lowStock, revenue: revenue._sum.total ?? 0 };
  } catch {
    return { totalCandles: 0, totalOrders: 0, recentOrders: [], lowStock: [], revenue: 0 };
  }
}

const statusVariant: Record<string, "default" | "success" | "warning" | "danger" | "info"> = {
  PENDING: "warning",
  PAID: "info",
  PROCESSING: "info",
  SHIPPED: "success",
  DELIVERED: "success",
  CANCELLED: "danger",
};

const statusLabel: Record<string, string> = {
  PENDING: "În așteptare",
  PAID: "Plătit",
  PROCESSING: "În procesare",
  SHIPPED: "Expediat",
  DELIVERED: "Livrat",
  CANCELLED: "Anulat",
};

export default async function AdminDashboard() {
  const { totalCandles, totalOrders, recentOrders, lowStock, revenue } = await getStats();

  const stats = [
    { label: "Lumânări active", value: totalCandles, icon: Package, color: "text-amber" },
    { label: "Total comenzi", value: totalOrders, icon: ShoppingBag, color: "text-sage" },
    { label: "Venituri totale", value: formatPrice(revenue), icon: TrendingUp, color: "text-terracotta" },
  ];

  return (
    <div>
      <h1 className="font-display text-3xl font-bold text-warm-brown mb-8">Dashboard</h1>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-8">
        {stats.map((s) => (
          <div key={s.label} className="bg-white rounded-2xl border border-amber/10 p-6">
            <div className="flex items-center justify-between mb-3">
              <p className="text-sm text-warm-gray">{s.label}</p>
              <s.icon className={`h-5 w-5 ${s.color}`} />
            </div>
            <p className="font-display text-3xl font-bold text-warm-brown">{s.value}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent orders */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-amber/10 p-6">
          <div className="flex items-center justify-between mb-5">
            <h2 className="font-display text-lg font-semibold text-warm-brown">Comenzi recente</h2>
            <Link href="/admin/orders" className="text-sm text-amber hover:underline">
              Vezi toate →
            </Link>
          </div>
          {recentOrders.length === 0 ? (
            <p className="text-warm-gray text-sm py-6 text-center">Nicio comandă încă.</p>
          ) : (
            <div className="space-y-3">
              {recentOrders.map((order) => (
                <div key={order.id} className="flex items-center justify-between py-2 border-b border-amber/5 last:border-0">
                  <div>
                    <p className="text-sm font-medium text-warm-brown">{order.orderNumber}</p>
                    <p className="text-xs text-warm-gray">{order.customerName}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <Badge variant={statusVariant[order.status]}>
                      {statusLabel[order.status]}
                    </Badge>
                    <span className="text-sm font-medium text-warm-brown">
                      {formatPrice(order.total)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Low stock */}
        <div className="bg-white rounded-2xl border border-amber/10 p-6">
          <div className="flex items-center gap-2 mb-5">
            <AlertCircle className="h-4 w-4 text-terracotta" />
            <h2 className="font-display text-lg font-semibold text-warm-brown">Stoc redus</h2>
          </div>
          {lowStock.length === 0 ? (
            <p className="text-warm-gray text-sm py-6 text-center">Stocuri OK 👍</p>
          ) : (
            <div className="space-y-3">
              {lowStock.map((c) => (
                <div key={c.id} className="flex items-center justify-between">
                  <p className="text-sm text-warm-brown line-clamp-1">{c.name}</p>
                  <Badge variant={c.stock === 0 ? "danger" : "warning"}>
                    {c.stock === 0 ? "Epuizat" : `${c.stock} buc`}
                  </Badge>
                </div>
              ))}
            </div>
          )}
          <Link
            href="/admin/candles"
            className="block mt-5 text-sm text-amber hover:underline text-center"
          >
            Gestionează stocul →
          </Link>
        </div>
      </div>
    </div>
  );
}