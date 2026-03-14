import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Despre noi",
  description: "Povestea din spatele lumânărilor artizanale Oana Otilia Candles.",
};

export default function AboutPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <p className="text-amber text-sm uppercase tracking-widest font-medium mb-3">Povestea noastră</p>
      <h1 className="font-display text-4xl font-bold text-warm-brown mb-6">
        Lumânări create cu inimă
      </h1>
      <div className="prose prose-lg text-warm-gray space-y-5">
        <p>
          Totul a început cu o pasiune pentru miresme și dorința de a transforma orice cameră
          într-un spațiu de liniște. Fiecare lumânare pe care o creăm este turnată manual,
          cu atenție la fiecare detaliu — de la alegerea parfumului până la eticheta finală.
        </p>
        <p>
          Folosim exclusiv ceară naturală de soia, uleiuri esențiale pure și fitiluri din bumbac
          netratat. Fără parafină, fără parfumuri sintetice, fără compromisuiri.
        </p>
        <p>
          Credem că o lumânare bună poate transforma o seară obișnuită într-un ritual.
          Fie că e pentru relaxare, pentru o cină romantică sau pur și simplu pentru a umple
          casa cu un parfum minunat — lumânările noastre sunt acolo.
        </p>
      </div>

      <div className="mt-12 grid grid-cols-3 gap-6 text-center">
        {[
          { value: "100%", label: "Ingrediente naturale" },
          { value: "Handmade", label: "Fiecare lumânare în parte" },
          { value: "România", label: "Produs local" },
        ].map((item) => (
          <div key={item.label} className="bg-cream-dark rounded-2xl p-5">
            <p className="font-display text-2xl font-bold text-amber">{item.value}</p>
            <p className="text-sm text-warm-gray mt-1">{item.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
