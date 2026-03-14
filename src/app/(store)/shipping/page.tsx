import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Livrare & Retur",
  description: "Informații despre livrare și politica de retur Oana Otilia Candles.",
};

export default function ShippingPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <h1 className="font-display text-4xl font-bold text-warm-brown mb-8">Livrare & Retur</h1>

      <div className="space-y-8">
        {[
          {
            title: "Livrare",
            items: [
              "Livrăm prin curier rapid în toată România (1–3 zile lucrătoare).",
              "Cost livrare: 20 RON.",
              "Livrare gratuită la comenzi de peste 200 RON.",
              "Vei primi un email cu numărul de tracking după expediere.",
            ],
          },
          {
            title: "Retur",
            items: [
              "Produsele pot fi returnate în 14 zile de la primire, dacă nu au fost folosite.",
              "Lumânările deschise sau parțial arse nu pot fi returnate.",
              "Costul returului este suportat de client.",
              "Rambursarea se face în 5–7 zile lucrătoare după primirea produsului.",
            ],
          },
          {
            title: "Produse deteriorate",
            items: [
              "Dacă ai primit un produs deteriorat, contactează-ne în 48h la contact@oanaotiliacandles.ro cu o fotografie.",
              "Vom înlocui produsul fără costuri suplimentare.",
            ],
          },
        ].map((section) => (
          <div key={section.title}>
            <h2 className="font-display text-xl font-semibold text-warm-brown mb-3">{section.title}</h2>
            <ul className="space-y-2">
              {section.items.map((item) => (
                <li key={item} className="flex gap-2 text-warm-gray text-sm">
                  <span className="text-amber mt-0.5">•</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}