import prisma from "../src/lib/prisma";

async function main() {
  // TODO: Add your seed data here
  console.log("🌱 Seed completed");
}

main()
  .catch((e) => {
    console.error("❌ Seed failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
