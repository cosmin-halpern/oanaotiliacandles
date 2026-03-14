import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Politica de confidențialitate",
  description: "Politica de confidențialitate Oana Otilia Candles.",
};

export default function PrivacyPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <h1 className="font-display text-4xl font-bold text-warm-brown mb-8">
        Politica de confidențialitate
      </h1>
      <div className="space-y-6 text-warm-gray text-sm leading-relaxed">
        <p>Ultima actualizare: {new Date().toLocaleDateString("ro-RO")}</p>
        <section>
          <h2 className="font-display text-lg font-semibold text-warm-brown mb-2">Date colectate</h2>
          <p>Colectăm doar datele necesare procesării comenzilor: nume, email, adresă de livrare și număr de telefon. Nu stocăm date de card — plata este procesată securizat prin Stripe.</p>
        </section>
        <section>
          <h2 className="font-display text-lg font-semibold text-warm-brown mb-2">Utilizarea datelor</h2>
          <p>Datele sunt folosite exclusiv pentru procesarea și livrarea comenzilor, și pentru comunicarea legată de comanda ta (email de confirmare, tracking).</p>
        </section>
        <section>
          <h2 className="font-display text-lg font-semibold text-warm-brown mb-2">Cookie-uri</h2>
          <p>Folosim cookie-uri tehnice necesare funcționării site-ului (sesiune, coș de cumpărături). Nu folosim cookie-uri de tracking terțe fără consimțământul tău.</p>
        </section>
        <section>
          <h2 className="font-display text-lg font-semibold text-warm-brown mb-2">Drepturile tale</h2>
          <p>Ai dreptul de a solicita accesul, rectificarea sau ștergerea datelor tale. Contactează-ne la <a href="mailto:comenzi@oanaotiliacandles.ro" className="text-amber hover:underline">comenzi@oanaotiliacandles.ro</a>.</p>
        </section>
      </div>
    </div>
  );
}
