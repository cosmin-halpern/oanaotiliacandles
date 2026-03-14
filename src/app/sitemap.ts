import type { MetadataRoute } from "next";
import { prisma } from "@/lib/prisma";

const BASE = process.env.NEXTAUTH_URL ?? "https://oanaotiliacandles.ro";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  let candles: { slug: string; updatedAt: Date }[] = [];
  try {
    candles = await prisma.candle.findMany({
      where: { isActive: true },
      select: { slug: true, updatedAt: true },
    });
  } catch { /* no db */ }

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: BASE, lastModified: new Date(), changeFrequency: "daily", priority: 1 },
    { url: `${BASE}/shop`, lastModified: new Date(), changeFrequency: "daily", priority: 0.9 },
    { url: `${BASE}/about`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.5 },
  ];

  const candleRoutes: MetadataRoute.Sitemap = candles.map((c) => ({
    url: `${BASE}/shop/${c.slug}`,
    lastModified: c.updatedAt,
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  return [...staticRoutes, ...candleRoutes];
}