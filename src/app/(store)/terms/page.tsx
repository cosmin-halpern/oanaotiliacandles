import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Termeni și condiții",
  description: "Termenii și condițiile de utilizare Oana Otilia Candles.",
};

export default function TermsPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <h1 className="font-display text-4xl font-bold text-warm-brown mb-8">
        Termeni și condiții
      </h1>
      <div className="space-y-6 text-warm-gray text-sm leading-relaxed">
        <p>Ultima actualizare: {new Date().toLocaleDateString("ro-RO")}</p>
        <section>
          <h2 className="font-display text-lg font-semibold text-warm-brown mb-2">Prețuri și plată</h2>
          <p>Toate prețurile sunt exprimate în RON și includ TVA. Plata se face securizat prin card bancar (Stripe). Ne rezervăm dreptul de a modifica prețurile fără notificare prealabilă.</p>
        </section>
        <section>
          <h2 className="font-display text-lg font-semibold text-warm-brown mb-2">Disponibilitate produse</h2>
          <p>Toate produsele sunt realizate manual și în stoc limitat. În cazul în care un produs nu mai este disponibil după plasarea comenzii, te vom contacta pentru a găsi o soluție.</p>
        </section>
        <section>
          <h2 className="font-display text-lg font-semibold text-warm-brown mb-2">Livrare</h2>
          <p>Termenul de livrare este de 1–3 zile lucrătoare. Nu suntem responsabili pentru întârzierile cauzate de serviciile de curierat.</p>
        </section>
        <section>
          <h2 className="font-display text-lg font-semibold text-warm-brown mb-2">Contact</h2>
          <p>Pentru orice nelămurire: <a href="mailto:comenzi@oanaotiliacandles.ro" className="text-amber hover:underline">comenzi@oanaotiliacandles.ro</a></p>
        </section>
      </div>
    </div>
  );
}
