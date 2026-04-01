import { put } from "@vercel/blob";
import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";

export async function POST(req: Request) {
  const session = await auth();
  if (!session) return NextResponse.json({ error: "Neautorizat" }, { status: 401 });

  const form = await req.formData();
  const file = form.get("file") as File;

  if (!file) return NextResponse.json({ error: "Niciun fișier" }, { status: 400 });

  const allowedTypes = ["image/jpeg", "image/png", "image/webp", "image/avif"];
  if (!allowedTypes.includes(file.type)) {
    return NextResponse.json({ error: "Tip de fișier nepermis" }, { status: 400 });
  }

  const blob = await put(`candles/${Date.now()}-${file.name}`, file, {
    access: "public",
  });

  return NextResponse.json({ url: blob.url });
}