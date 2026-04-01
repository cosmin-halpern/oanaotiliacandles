"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";

export default function LoginPage() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const form = new FormData(e.currentTarget);
    const result = await signIn("credentials", {
      email: form.get("email"),
      password: form.get("password"),
      redirect: false,
    });

    if (result?.error || result?.ok === false) {
      setError("Email sau parolă incorectă.");
      setLoading(false);
    } else {
      setTimeout(() => {
        window.location.href = "/admin";
      }, 500);
    }
  }

  return (
    <div className="min-h-screen bg-cream flex items-center justify-center p-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <h1 className="font-display text-3xl font-bold text-warm-brown">
            Oana Otilia
          </h1>
          <p className="text-warm-gray text-sm mt-1">Panou de administrare</p>
        </div>

        <div className="bg-white rounded-2xl border border-amber/10 p-8 shadow-sm">
          <h2 className="font-display text-xl font-semibold text-warm-brown mb-6">
            Autentificare
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              label="Email"
              name="email"
              type="email"
              required
              autoComplete="email"
              placeholder="admin@example.com"
            />
            <Input
              label="Parolă"
              name="password"
              type="password"
              required
              autoComplete="current-password"
              placeholder="••••••••"
            />

            {error && (
              <p className="text-sm text-terracotta bg-terracotta/10 rounded-xl px-4 py-2">
                {error}
              </p>
            )}

            <Button type="submit" loading={loading} className="w-full mt-2">
              Intră în cont
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}