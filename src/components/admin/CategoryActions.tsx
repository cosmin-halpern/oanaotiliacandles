"use client";

import { useState } from "react";
import { Trash2 } from "lucide-react";

interface Props {
  id: string;
  name: string;
  candleCount: number;
}

export function CategoryActions({ id, name, candleCount }: Props) {
  const [confirm, setConfirm] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleDelete() {
    setLoading(true);
    await fetch(`/api/categories/${id}`, { method: "DELETE" });
    window.location.reload();
  }

  return (
    <>
      <button
        onClick={() => setConfirm(true)}
        className="p-2 rounded-lg text-warm-gray hover:text-terracotta hover:bg-terracotta/10 transition-colors"
        title="Șterge"
      >
        <Trash2 className="h-4 w-4" />
      </button>

      {confirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-white rounded-2xl p-6 max-w-sm w-full mx-4 shadow-xl">
            <h3 className="font-display text-lg font-bold text-warm-brown mb-2">
              Șterge categoria
            </h3>
            <p className="text-warm-gray text-sm mb-1">
              Ești sigur că vrei să ștergi <strong>{name}</strong>?
            </p>
            {candleCount > 0 && (
              <p className="text-terracotta text-sm mb-4">
                Atenție: {candleCount} lumânări din această categorie vor rămâne fără categorie.
              </p>
            )}
            <div className="flex gap-3 mt-4">
              <button
                onClick={() => setConfirm(false)}
                className="flex-1 px-4 py-2 rounded-xl border border-amber/20 text-warm-gray text-sm hover:bg-cream transition-colors"
              >
                Anulează
              </button>
              <button
                onClick={handleDelete}
                disabled={loading}
                className="flex-1 px-4 py-2 rounded-xl bg-terracotta text-white text-sm font-medium hover:bg-terracotta/90 transition-colors disabled:opacity-50"
              >
                {loading ? "Se șterge..." : "Șterge"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}