import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { generateSlug } from "@/lib/utils";

export async function POST(req: Request) {
  const session = await auth();
  if (!session) return NextResponse.json({ error: "Neautorizat" }, { status: 401 });

  const body = await req.json();
  const { name, description, price, stock, scent, size, weight, burnTime, categoryId, isActive, isFeatured, images } = body;

  const slug = generateSlug(name);

  const candle = await prisma.candle.create({
    data: {
      name,
      slug,
      description,
      price,
      stock,
      scent: scent || null,
      size: size || null,
      weight: weight || null,
      burnTime: burnTime || null,
      categoryId: categoryId || null,
      isActive,
      isFeatured,
      images: images ?? [],
    },
  });

  return NextResponse.json(candle, { status: 201 });
}