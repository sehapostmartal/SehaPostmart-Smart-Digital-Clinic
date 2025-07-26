import { storage } from "./storage";
import { sampleProducts, sampleArticles } from "../client/src/data/sampleData";

async function seedDatabase() {
  console.log("Starting database seeding...");

  try {
    // Seed products
    console.log("Seeding products...");
    for (const product of sampleProducts) {
      const { createdAt, ...productData } = product;
      await storage.createProduct({
        ...productData,
        // Keep price as string since schema expects string
        price: product.price
      });
    }
    console.log(`✓ Seeded ${sampleProducts.length} products`);

    // Seed articles
    console.log("Seeding articles...");
    for (const article of sampleArticles) {
      const { createdAt, ...articleData } = article;
      await storage.createArticle(articleData);
    }
    console.log(`✓ Seeded ${sampleArticles.length} articles`);

    console.log("Database seeding completed successfully!");
  } catch (error) {
    console.error("Error seeding database:", error);
    process.exit(1);
  }
}

// Run if called directly (ES modules check)
if (import.meta.url === `file://${process.argv[1]}`) {
  seedDatabase().then(() => {
    console.log("Seed script completed");
    process.exit(0);
  });
}

export { seedDatabase };