"use client";

import { useState } from "react";
import { Badge } from "@/components/ui/Badge";

const statuses = ["PENDING", "PAID", "PROCESSING", "SHIPPED", "DELIVERED", "CANCELLED"];

interface Props {
  orderId: string;
  currentStatus: string;
  statusLabel: Record<string, string>;
  statusVariant: Record<string, "default" | "success" | "warning" | "danger" | "info">;
}

export function OrderStatusSelect({ orderId, currentStatus, statusLabel, statusVariant }: Props) {
  const [status, setStatus] = useState(currentStatus);
  const [saving, setSaving] = useState(false);

  async function handleChange(e: React.ChangeEvent<HTMLSelectElement>) {
    const newStatus = e.target.value;
    setSaving(true);
    await fetch(`/api/orders/${orderId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: newStatus }),
    });
    setStatus(newStatus);
    setSaving(false);
  }

  return (
    <div className="flex items-center gap-2">
      <Badge variant={statusVariant[status]}>{statusLabel[status]}</Badge>
      <select
        value={status}
        onChange={handleChange}
        disabled={saving}
        className="text-xs border border-amber/20 rounded-lg px-2 py-1 text-warm-brown bg-white focus:outline-none focus:ring-1 focus:ring-amber"
      >
        {statuses.map((s) => (
          <option key={s} value={s}>{statusLabel[s]}</option>
        ))}
      </select>
    </div>
  );
}