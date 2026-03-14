import type { MetadataRoute } from "next";

const BASE = process.env.NEXTAUTH_URL ?? "https://oanaotiliacandles.ro";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/", disallow: ["/admin", "/api", "/checkout", "/order-success"] },
    ],
    sitemap: `${BASE}/sitemap.xml`,
  };
}