import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  await prisma.post.deleteMany();
  await prisma.post.createMany({
    data: [
      {
        title: "Selamat Datang di Blog Week 15",
        content: "Ini adalah artikel pertama yang disimpan menggunakan SQLite dan Prisma di Next.js.",
      },
      {
        title: "Deployment ke Vercel dengan SQLite",
        content: "Vercel menjalankan serverless functions di mana SQLite bekerja secara read-only dari file database lokal yang di-push ke GitHub.",
      },
      {
        title: "Materi Front End Programming",
        content: "Praktikum Next.js, Server Actions, App Router, dan Database ORM.",
      },
    ],
  });
  console.log("Seed data created successfully!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
