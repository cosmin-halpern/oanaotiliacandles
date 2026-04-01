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
          Numele meu este Oana Otilia și sunt un mic antreprenor din București, creator de lumânări din ceară de soia.
        </p>
        <p>
          Brandul meu s-a născut din convingerea că o lumânare poate fi mai mult decât un simplu obiect decorativ — poate deveni o experiență, o stare, o poveste. Fiecare lumânare este turnată manual, cu grijă și atenție la fiecare detaliu, de la selecția uleiurilor parfumate până la forma și eticheta finală.
        </p>
        <p>
          Pentru mine, fiecare aromă are o emoție, iar fiecare lumânare spune o poveste unică — una care așteaptă să fie descoperită.
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
