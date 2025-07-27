import { Client } from "pg";
import {
  type User,
  type InsertUser,
  type Product,
  type InsertProduct,
  type Article,
  type InsertArticle,
  type Consultation,
  type InsertConsultation,
  type Membership,
  type InsertMembership,
} from "../../shared/types"; // تم تصحيح المسار هنا أيضًا

function createClient() {
  const databaseUrl = process.env.DATABASE_URL;
  if (!databaseUrl) {
    throw new Error("DATABASE_URL environment variable is not set");
  }
  return new Client({ connectionString: databaseUrl });
}

export const storage = {
  // --- Products ---
  async getProducts(): Promise<Product[]> {
    const client = createClient();
    try {
      await client.connect();
      const result = await client.query(
        "SELECT * FROM products ORDER BY created_at DESC",
      );
      return result.rows;
    } finally {
      await client.end();
    }
  },

  async getProduct(id: number): Promise<Product | null> {
    const client = createClient();
    try {
      await client.connect();
      const result = await client.query(
        "SELECT * FROM products WHERE id = $1",
        [id],
      );
      return result.rows.length > 0 ? result.rows[0] : null;
    } finally {
      await client.end();
    }
  },

  async addProduct(
    productData: Omit<Product, "id" | "created_at">,
  ): Promise<Product> {
    const client = createClient();
    try {
      await client.connect();
      const {
        name,
        category,
        price,
        description,
        benefits,
        usage,
        ingredients,
        imageUrl,
        is_featured,
      } = productData;
      const query = `
        INSERT INTO products (name, category, price, description, benefits, usage, ingredients, "imageUrl", is_featured)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
        RETURNING *;
      `;
      const values = [
        name,
        category,
        price,
        description,
        benefits,
        usage,
        ingredients,
        imageUrl,
        is_featured || false,
      ];
      const result = await client.query(query, values);
      return result.rows[0];
    } finally {
      await client.end();
    }
  },

  async deleteProduct(id: number): Promise<void> {
    const client = createClient();
    try {
      await client.connect();
      await client.query("DELETE FROM products WHERE id = $1", [id]);
    } finally {
      await client.end();
    }
  },

  async getFeaturedProducts(): Promise<Product[]> {
    const client = createClient();
    try {
      await client.connect();
      const query = "SELECT * FROM products WHERE is_featured = true LIMIT 6";
      const result = await client.query(query);
      return result.rows;
    } finally {
      await client.end();
    }
  },

  async getRelatedProducts(productId: number): Promise<Product[]> {
    const client = createClient();
    try {
      await client.connect();
      const query = `
        SELECT * FROM products
        WHERE category = (SELECT category FROM products WHERE id = $1)
        AND id != $1
        LIMIT 4;
      `;
      const result = await client.query(query, [productId]);
      return result.rows;
    } finally {
      await client.end();
    }
  },

  // --- Articles ---
  async getArticles(): Promise<Article[]> {
    const client = createClient();
    try {
      await client.connect();
      const result = await client.query(
        "SELECT * FROM articles ORDER BY date DESC",
      );
      return result.rows;
    } finally {
      await client.end();
    }
  },

  async getArticle(id: number): Promise<Article | null> {
    const client = createClient();
    try {
      await client.connect();
      const result = await client.query(
        "SELECT * FROM articles WHERE id = $1",
        [id],
      );
      return result.rows.length > 0 ? result.rows[0] : null;
    } finally {
      await client.end();
    }
  },

  async addArticle(
    articleData: Omit<Article, "id" | "created_at" | "date">,
  ): Promise<Article> {
    const client = createClient();
    try {
      await client.connect();
      const { title, category, content, imageUrl } = articleData;
      const query = `
        INSERT INTO articles (title, category, content, "imageUrl", date)
        VALUES ($1, $2, $3, $4, NOW())
        RETURNING *;
      `;
      const values = [title, category, content, imageUrl];
      const result = await client.query(query, values);
      return result.rows[0];
    } finally {
      await client.end();
    }
  },

  async deleteArticle(id: number): Promise<void> {
    const client = createClient();
    try {
      await client.connect();
      await client.query("DELETE FROM articles WHERE id = $1", [id]);
    } finally {
      await client.end();
    }
  },

  // --- Other Entities (Placeholders) ---
  async createConsultation(
    consultation: InsertConsultation,
  ): Promise<Consultation> {
    throw new Error("Not implemented");
  },

  async createMembership(membership: InsertMembership): Promise<Membership> {
    throw new Error("Not implemented");
  },

  async createUser(user: InsertUser): Promise<User> {
    throw new Error("Not implemented");
  },
};
