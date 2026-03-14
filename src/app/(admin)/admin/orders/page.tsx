import { prisma } from "@/lib/prisma";
import { formatPrice } from "@/lib/utils";
import { Badge } from "@/components/ui/Badge";
import { OrderStatusSelect } from "@/components/admin/OrderStatusSelect";

export const dynamic = "force-dynamic";

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

export default async function OrdersPage() {
  let orders: Awaited<ReturnType<typeof prisma.order.findMany<{ include: { items: true } }>>> = [];
  try {
    orders = await prisma.order.findMany({
      include: { items: true },
      orderBy: { createdAt: "desc" },
    });
  } catch { /* no db */ }

  return (
    <div>
      <div className="mb-8">
        <h1 className="font-display text-3xl font-bold text-warm-brown">Comenzi</h1>
        <p className="text-warm-gray text-sm mt-1">{orders.length} comenzi totale</p>
      </div>

      <div className="bg-white rounded-2xl border border-amber/10 overflow-hidden">
        {orders.length === 0 ? (
          <div className="text-center py-16 text-warm-gray">
            <div className="text-5xl mb-3">📦</div>
            <p className="font-display text-lg font-semibold text-warm-brown">Nicio comandă încă</p>
          </div>
        ) : (
          <table className="w-full text-sm">
            <thead className="bg-cream-dark border-b border-amber/10">
              <tr>
                <th className="text-left px-5 py-3 text-xs uppercase tracking-wider text-warm-gray font-semibold">Nr. comandă</th>
                <th className="text-left px-5 py-3 text-xs uppercase tracking-wider text-warm-gray font-semibold">Client</th>
                <th className="text-left px-5 py-3 text-xs uppercase tracking-wider text-warm-gray font-semibold">Data</th>
                <th className="text-left px-5 py-3 text-xs uppercase tracking-wider text-warm-gray font-semibold">Produse</th>
                <th className="text-left px-5 py-3 text-xs uppercase tracking-wider text-warm-gray font-semibold">Total</th>
                <th className="text-left px-5 py-3 text-xs uppercase tracking-wider text-warm-gray font-semibold">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-amber/5">
              {orders.map((order) => (
                <tr key={order.id} className="hover:bg-cream/50 transition-colors">
                  <td className="px-5 py-4 font-medium text-warm-brown">{order.orderNumber}</td>
                  <td className="px-5 py-4">
                    <p className="text-warm-brown">{order.customerName}</p>
                    <p className="text-xs text-warm-gray">{order.customerEmail}</p>
                  </td>
                  <td className="px-5 py-4 text-warm-gray">
                    {new Date(order.createdAt).toLocaleDateString("ro-RO")}
                  </td>
                  <td className="px-5 py-4 text-warm-gray">{order.items.length} buc.</td>
                  <td className="px-5 py-4 font-semibold text-warm-brown">{formatPrice(order.total)}</td>
                  <td className="px-5 py-4">
                    <OrderStatusSelect
                      orderId={order.id}
                      currentStatus={order.status}
                      statusLabel={statusLabel}
                      statusVariant={statusVariant}
                    />
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