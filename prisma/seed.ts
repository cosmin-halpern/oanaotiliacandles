import "dotenv/config";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  // Create admin user
  const hashedPassword = await bcrypt.hash(
    process.env.ADMIN_PASSWORD ?? "admin123",
    12
  );

  const admin = await prisma.user.upsert({
    where: { email: process.env.ADMIN_EMAIL ?? "admin@example.com" },
    update: {},
    create: {
      email: process.env.ADMIN_EMAIL ?? "admin@example.com",
      password: hashedPassword,
      name: "Admin",
    },
  });

  console.log("✅ Admin user created:", admin.email);

  // Seed categories
  const categories = [
    { name: "Relaxare", slug: "relaxare", description: "Arome calmante pentru momente de liniște" },
    { name: "Romantism", slug: "romantism", description: "Parfumuri senzuale pentru seri speciale" },
    { name: "Casă & Ambient", slug: "casa", description: "Arome proaspete pentru orice cameră" },
    { name: "Colecții Sezoniere", slug: "sezon", description: "Ediții limitate pentru fiecare anotimp" },
  ];

  for (const cat of categories) {
    await prisma.category.upsert({
      where: { slug: cat.slug },
      update: {},
      create: cat,
    });
  }

  console.log("✅ Categories seeded");

  // Seed sample candles
  const relaxareCategory = await prisma.category.findUnique({ where: { slug: "relaxare" } });

  await prisma.candle.upsert({
    where: { slug: "lavanda-si-vanilie" },
    update: {},
    create: {
      name: "Lavandă & Vanilie",
      slug: "lavanda-si-vanilie",
      description:
        "O combinație delicată de lavandă franțuzească și vanilie cremoasă. Perfectă pentru un ritual de seară relaxant.",
      price: 89,
      stock: 15,
      images: [],
      scent: "Lavandă, Vanilie, Mosc alb",
      size: "200ml",
      weight: 200,
      burnTime: "40-45 ore",
      isFeatured: true,
      categoryId: relaxareCategory?.id,
    },
  });

  console.log("✅ Sample candles seeded");
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());