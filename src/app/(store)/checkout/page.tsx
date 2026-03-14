"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "@/lib/cart-context";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { formatPrice } from "@/lib/utils";

const schema = z.object({
  name: z.string().min(2, "Minim 2 caractere"),
  email: z.string().email("Email invalid"),
  phone: z.string().min(10, "Telefon invalid"),
  address: z.string().min(5, "Adresă incompletă"),
  city: z.string().min(2, "Oraș invalid"),
  county: z.string().min(2, "Județul este obligatoriu"),
  zip: z.string().min(6, "Cod poștal invalid"),
});

type FormValues = z.infer<typeof schema>;

export default function CheckoutPage() {
  const { cart } = useCart();
  const router = useRouter();
  const [serverError, setServerError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({ resolver: zodResolver(schema) });

  if (cart.items.length === 0) {
    router.replace("/cart");
    return null;
  }

  const shipping = cart.total >= 200 ? 0 : 20;
  const total = cart.total + shipping;

  async function onSubmit(data: FormValues) {
    setServerError("");
    const res = await fetch("/api/checkout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ items: cart.items, customer: data }),
    });

    if (!res.ok) {
      const err = await res.json();
      setServerError(err.error ?? "A apărut o eroare. Încearcă din nou.");
      return;
    }

    const { url } = await res.json();
    window.location.href = url;
  }

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="font-display text-3xl font-bold text-warm-brown mb-8">Finalizare comandă</h1>

      <div className="grid lg:grid-cols-5 gap-10">
        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="lg:col-span-3 space-y-6">
          <div className="bg-white rounded-2xl border border-amber/10 p-6 space-y-4">
            <h2 className="font-display text-lg font-semibold text-warm-brown">Datele tale</h2>
            <Input label="Nume complet" {...register("name")} error={errors.name?.message} />
            <div className="grid grid-cols-2 gap-4">
              <Input label="Email" type="email" {...register("email")} error={errors.email?.message} />
              <Input label="Telefon" type="tel" {...register("phone")} error={errors.phone?.message} />
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-amber/10 p-6 space-y-4">
            <h2 className="font-display text-lg font-semibold text-warm-brown">Adresă de livrare</h2>
            <Input label="Stradă, număr, bloc, apartament" {...register("address")} error={errors.address?.message} />
            <div className="grid grid-cols-2 gap-4">
              <Input label="Oraș" {...register("city")} error={errors.city?.message} />
              <Input label="Județ" {...register("county")} error={errors.county?.message} />
            </div>
            <Input label="Cod poștal" {...register("zip")} error={errors.zip?.message} />
          </div>

          {serverError && (
            <p className="text-sm text-terracotta bg-terracotta/10 rounded-xl px-4 py-3">{serverError}</p>
          )}

          <Button type="submit" size="lg" loading={isSubmitting} className="w-full">
            Plătește {formatPrice(total)}
          </Button>
          <p className="text-center text-xs text-warm-gray">
            Vei fi redirecționat către Stripe pentru plata securizată cu cardul.
          </p>
        </form>

        {/* Summary */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-2xl border border-amber/10 p-6 sticky top-24">
            <h2 className="font-display text-lg font-bold text-warm-brown mb-4">Sumar</h2>
            <div className="space-y-3 mb-4">
              {cart.items.map((item) => (
                <div key={item.candleId} className="flex justify-between text-sm">
                  <span className="text-warm-gray line-clamp-1 flex-1">{item.name} ×{item.quantity}</span>
                  <span className="text-warm-brown font-medium ml-2">{formatPrice(item.price * item.quantity)}</span>
                </div>
              ))}
            </div>
            <div className="border-t border-amber/10 pt-3 space-y-2 text-sm">
              <div className="flex justify-between text-warm-gray">
                <span>Subtotal</span><span>{formatPrice(cart.total)}</span>
              </div>
              <div className="flex justify-between text-warm-gray">
                <span>Livrare</span><span>{shipping === 0 ? "Gratuită" : formatPrice(shipping)}</span>
              </div>
              <div className="flex justify-between font-semibold text-warm-brown text-base pt-1">
                <span>Total</span><span>{formatPrice(total)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}