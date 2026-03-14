"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Pencil, Trash2 } from "lucide-react";
import { Modal } from "@/components/ui/Modal";
import { Button } from "@/components/ui/Button";

export function CandleActions({ id }: { id: string }) {
  const router = useRouter();
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleDelete() {
    setLoading(true);
    await fetch(`/api/candles/${id}`, { method: "DELETE" });
    setConfirmOpen(false);
    router.refresh();
  }

  return (
    <>
      <div className="flex items-center gap-2 justify-end">
        <Link
          href={`/admin/candles/${id}`}
          className="p-1.5 rounded-lg text-warm-gray hover:text-amber hover:bg-amber/10 transition-colors"
          title="Editează"
        >
          <Pencil className="h-4 w-4" />
        </Link>
        <button
          onClick={() => setConfirmOpen(true)}
          className="p-1.5 rounded-lg text-warm-gray hover:text-terracotta hover:bg-terracotta/10 transition-colors"
          title="Șterge"
        >
          <Trash2 className="h-4 w-4" />
        </button>
      </div>

      <Modal
        open={confirmOpen}
        onClose={() => setConfirmOpen(false)}
        title="Șterge lumânare"
      >
        <p className="text-warm-gray text-sm mb-6">
          Ești sigur că vrei să ștergi această lumânare? Acțiunea este ireversibilă.
        </p>
        <div className="flex gap-3 justify-end">
          <Button variant="secondary" onClick={() => setConfirmOpen(false)}>
            Anulează
          </Button>
          <Button variant="danger" loading={loading} onClick={handleDelete}>
            Șterge
          </Button>
        </div>
      </Modal>
    </>
  );
}