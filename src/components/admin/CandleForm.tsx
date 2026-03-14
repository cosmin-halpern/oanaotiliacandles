"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { CldUploadWidget } from "next-cloudinary";
import Image from "next/image";
import { X, ImagePlus } from "lucide-react";

const schema = z.object({
  name: z.string().min(2, "Minim 2 caractere"),
  description: z.string().min(10, "Minim 10 caractere"),
  price: z.number().positive("Prețul trebuie să fie pozitiv"),
  stock: z.number().int().min(0, "Stocul nu poate fi negativ"),
  scent: z.string().optional(),
  size: z.string().optional(),
  weight: z.number().optional(),
  burnTime: z.string().optional(),
  categoryId: z.string().optional(),
  isActive: z.boolean(),
  isFeatured: z.boolean(),
});

type FormValues = z.infer<typeof schema>;

interface CandleFormProps {
  initialData?: FormValues & { id?: string; images?: string[] };
  categories: { id: string; name: string }[];
}

export function CandleForm({ initialData, categories }: CandleFormProps) {
  const router = useRouter();
  const [images, setImages] = useState<string[]>(initialData?.images ?? []);
  const [serverError, setServerError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: initialData?.name ?? "",
      description: initialData?.description ?? "",
      price: initialData?.price ?? 0,
      stock: initialData?.stock ?? 0,
      scent: initialData?.scent ?? "",
      size: initialData?.size ?? "",
      weight: initialData?.weight,
      burnTime: initialData?.burnTime ?? "",
      categoryId: initialData?.categoryId ?? "",
      isActive: initialData?.isActive ?? true,
      isFeatured: initialData?.isFeatured ?? false,
    },
  });

  async function onSubmit(data: FormValues) {
    setServerError("");
    const payload = { ...data, images };
    const isEdit = !!initialData?.id;

    const res = await fetch(
      isEdit ? `/api/candles/${initialData.id}` : "/api/candles",
      {
        method: isEdit ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      }
    );

    if (!res.ok) {
      const err = await res.json();
      setServerError(err.error ?? "A apărut o eroare.");
      return;
    }

    router.push("/admin/candles");
    router.refresh();
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
      {/* Images */}
      <div className="bg-white rounded-2xl border border-amber/10 p-6">
        <h2 className="font-display text-lg font-semibold text-warm-brown mb-4">Imagini</h2>
        <div className="flex flex-wrap gap-3">
          {images.map((url, i) => (
            <div key={url} className="relative w-24 h-24 rounded-xl overflow-hidden group">
              <Image src={url} alt={`Imagine ${i + 1}`} fill className="object-cover" />
              <button
                type="button"
                onClick={() => setImages(images.filter((_, idx) => idx !== i))}
                className="absolute inset-0 bg-warm-brown/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center"
              >
                <X className="h-5 w-5 text-white" />
              </button>
            </div>
          ))}

          <CldUploadWidget
            uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET ?? "candles_unsigned"}
            onSuccess={(result) => {
              const info = result.info;
              if (info && typeof info === "object" && !Array.isArray(info) && "secure_url" in info) {
                setImages((prev) => [...prev, (info as { secure_url: string }).secure_url]);
              }
            }}
          >
            {({ open }) => (
              <button
                type="button"
                onClick={() => open()}
                className="w-24 h-24 rounded-xl border-2 border-dashed border-amber/30 hover:border-amber flex flex-col items-center justify-center gap-1 text-warm-gray hover:text-amber transition-colors"
              >
                <ImagePlus className="h-5 w-5" />
                <span className="text-xs">Adaugă</span>
              </button>
            )}
          </CldUploadWidget>
        </div>
      </div>

      {/* Basic info */}
      <div className="bg-white rounded-2xl border border-amber/10 p-6 space-y-4">
        <h2 className="font-display text-lg font-semibold text-warm-brown">Informații de bază</h2>
        <Input label="Nume" {...register("name")} error={errors.name?.message} />
        <div>
          <label className="text-sm font-medium text-warm-brown block mb-1.5">Descriere</label>
          <textarea
            {...register("description")}
            rows={4}
            className="w-full rounded-xl border border-amber/20 hover:border-amber/40 bg-white px-4 py-2.5 text-sm text-warm-brown placeholder:text-warm-gray/60 focus:outline-none focus:ring-2 focus:ring-amber focus:border-transparent transition-colors"
            placeholder="Descrie lumânarea..."
          />
          {errors.description && <p className="text-xs text-terracotta mt-1">{errors.description.message}</p>}
        </div>
        <div className="grid grid-cols-2 gap-4">
          <Input label="Preț (RON)" type="number" step="0.01" {...register("price", { valueAsNumber: true })} error={errors.price?.message} />
          <Input label="Stoc (bucăți)" type="number" {...register("stock", { valueAsNumber: true })} error={errors.stock?.message} />
        </div>
        <div>
          <label className="text-sm font-medium text-warm-brown block mb-1.5">Categorie</label>
          <select
            {...register("categoryId")}
            className="w-full rounded-xl border border-amber/20 bg-white px-4 py-2.5 text-sm text-warm-brown focus:outline-none focus:ring-2 focus:ring-amber"
          >
            <option value="">Fără categorie</option>
            {categories.map((c) => (
              <option key={c.id} value={c.id}>{c.name}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Details */}
      <div className="bg-white rounded-2xl border border-amber/10 p-6 space-y-4">
        <h2 className="font-display text-lg font-semibold text-warm-brown">Detalii produs</h2>
        <Input label="Note de parfum (ex: Lavandă, Vanilie, Mosc alb)" {...register("scent")} />
        <div className="grid grid-cols-3 gap-4">
          <Input label="Mărime (ex: 200ml)" {...register("size")} />
          <Input label="Greutate (g)" type="number" step="0.1" {...register("weight", { valueAsNumber: true })} />
          <Input label="Timp ardere (ex: 40-45 ore)" {...register("burnTime")} />
        </div>
      </div>

      {/* Visibility */}
      <div className="bg-white rounded-2xl border border-amber/10 p-6 space-y-3">
        <h2 className="font-display text-lg font-semibold text-warm-brown">Vizibilitate</h2>
        <label className="flex items-center gap-3 cursor-pointer">
          <input type="checkbox" {...register("isActive")} className="w-4 h-4 accent-amber" />
          <span className="text-sm text-warm-brown">Activ (vizibil în magazin)</span>
        </label>
        <label className="flex items-center gap-3 cursor-pointer">
          <input type="checkbox" {...register("isFeatured")} className="w-4 h-4 accent-amber" />
          <span className="text-sm text-warm-brown">Produse populare (afișat pe homepage)</span>
        </label>
      </div>

      {serverError && (
        <p className="text-sm text-terracotta bg-terracotta/10 rounded-xl px-4 py-3">{serverError}</p>
      )}

      <div className="flex gap-3 justify-end">
        <Button type="button" variant="secondary" onClick={() => router.back()}>
          Anulează
        </Button>
        <Button type="submit" loading={isSubmitting}>
          {initialData?.id ? "Salvează modificările" : "Adaugă lumânare"}
        </Button>
      </div>
    </form>
  );
}