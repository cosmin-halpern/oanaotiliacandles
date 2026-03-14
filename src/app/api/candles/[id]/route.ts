import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { generateSlug } from "@/lib/utils";

type Params = { params: Promise<{ id: string }> };

export async function PUT(req: Request, { params }: Params) {
  const session = await auth();
  if (!session) return NextResponse.json({ error: "Neautorizat" }, { status: 401 });

  const { id } = await params;
  const body = await req.json();
  const { name, description, price, stock, scent, size, weight, burnTime, categoryId, isActive, isFeatured, images } = body;

  const candle = await prisma.candle.update({
    where: { id },
    data: {
      name,
      slug: generateSlug(name),
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

  return NextResponse.json(candle);
}

export async function DELETE(_req: Request, { params }: Params) {
  const session = await auth();
  if (!session) return NextResponse.json({ error: "Neautorizat" }, { status: 401 });

  const { id } = await params;
  await prisma.candle.delete({ where: { id } });
  return NextResponse.json({ success: true });
}