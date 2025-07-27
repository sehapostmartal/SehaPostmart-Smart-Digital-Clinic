import { Client } from 'pg';
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
  type InsertMembership
} from "@shared/schema";

// PostgreSQL client setup
import { Client } from 'pg';
import type { Product, Article, Consultation, Membership, InsertProduct, InsertArticle, InsertConsultation, InsertMembership } from "@shared/schema";

function createClient() {
  const databaseUrl = process.env.DATABASE_URL;
  if (!databaseUrl) {
    throw new Error('DATABASE_URL environment variable is not set');
  }
  return new Client({ connectionString: databaseUrl });
}

export const storage = {
  // Products
  async getProducts(): Promise<Product[]> {
    const client = createClient();
    try {
      await client.connect();
      const result = await client.query('SELECT * FROM products ORDER BY created_at DESC');
      return result.rows.map(row => ({
        ...row,
        id: row.id.toString(),
        price: row.price?.toString() || '0',
        imageUrl: row.image_url,
        isFeatured: row.is_featured,
        createdAt: row.created_at
      }));
    } finally {
      await client.end();
    }
  },

  async getProduct(id: string): Promise<Product | null> {
    const client = createClient();
    try {
      await client.connect();
      const result = await client.query('SELECT * FROM products WHERE id = $1', [id]);
      if (result.rows.length === 0) return null;

      const row = result.rows[0];
      return {
        ...row,
        id: row.id.toString(),
        price: row.price?.toString() || '0',
        imageUrl: row.image_url,
        createdAt: row.created_at
      };
    } finally {
      await client.end();
    }
  },

  async createProduct(product: InsertProduct): Promise<Product> {
    const client = createClient();
    try {
      await client.connect();
      const result = await client.query(
        `INSERT INTO products (name, description, price, category, image_url, benefits, usage, ingredients, is_featured)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
         RETURNING *`,
        [
          product.name,
          product.description,
          product.price,
          product.category,
          product.imageUrl,
          product.benefits,
          product.usage,
          product.ingredients,
          product.isFeatured || false
        ]
      );

      const row = result.rows[0];
      return {
        ...row,
        id: row.id.toString(),
        price: row.price?.toString() || '0',
        imageUrl: row.image_url,
        isFeatured: row.is_featured,
        createdAt: row.created_at
      };
    } finally {
      await client.end();
    }
  },

  async deleteProduct(id: string): Promise<void> {
    const client = createClient();
    try {
      await client.connect();
      await client.query('DELETE FROM products WHERE id = $1', [id]);
    } finally {
      await client.end();
    }
  },

  // Articles
  async getArticles(): Promise<Article[]> {
    const client = createClient();
    try {
      await client.connect();
      const result = await client.query('SELECT * FROM articles ORDER BY created_at DESC');
      return result.rows.map(row => ({
        ...row,
        id: row.id.toString(),
        createdAt: row.created_at,
        excerpt: row.content?.substring(0, 150) + '...' || '',
        readTime: '5 دقائق',
        featured: 'false'
      }));
    } finally {
      await client.end();
    }
  },

  async getArticle(id: string): Promise<Article | null> {
    const client = createClient();
    try {
      await client.connect();
      const result = await client.query('SELECT * FROM articles WHERE id = $1', [id]);
      if (result.rows.length === 0) return null;

      const row = result.rows[0];
      return {
        ...row,
        id: row.id.toString(),
        createdAt: row.created_at,
        excerpt: row.content?.substring(0, 150) + '...' || '',
        readTime: '5 دقائق',
        featured: 'false'
      };
    } finally {
      await client.end();
    }
  },

  async createArticle(article: InsertArticle): Promise<Article> {
    const client = createClient();
    try {
      await client.connect();
      const result = await client.query(
        `INSERT INTO articles (title, content, category, image, excerpt, featured)
         VALUES ($1, $2, $3, $4, $5, $6)
         RETURNING *`,
        [
          article.title,
          article.content,
          article.category,
          article.imageUrl,
          article.excerpt,
          article.featured || 'false'
        ]
      );

      const row = result.rows[0];
      return {
        ...row,
        id: row.id.toString(),
        createdAt: row.created_at,
        imageUrl: row.image,
        excerpt: row.excerpt,
        readTime: '5 دقائق',
        featured: row.featured
      };
    } finally {
      await client.end();
    }
  },

  async deleteArticle(id: string): Promise<void> {
    const client = createClient();
    try {
      await client.connect();
      await client.query('DELETE FROM articles WHERE id = $1', [id]);
    } finally {
      await client.end();
    }
  },

  // Placeholder methods for other entities (implement as needed)
  async getConsultations(): Promise<Consultation[]> {
    return [];
  },

  async createConsultation(consultation: InsertConsultation): Promise<Consultation> {
    throw new Error('Not implemented');
  },

  async getMemberships(): Promise<Membership[]> {
    return [];
  },

  async createMembership(membership: InsertMembership): Promise<Membership> {
    throw new Error('Not implemented');
  },

  async getUsers(): Promise<User[]> {
    return [];
  },

  async createUser(user: InsertUser): Promise<User> {
    throw new Error('Not implemented');
  }
};