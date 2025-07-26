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
  users,
  products,
  articles,
  consultations,
  memberships 
} from "@shared/schema";
import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import { eq } from 'drizzle-orm';

// Create database connection
const connectionString = process.env.DATABASE_URL;
if (!connectionString) {
  throw new Error('DATABASE_URL environment variable is required');
}

const client = postgres(connectionString);
const db = drizzle(client);

export interface IStorage {
  // User methods
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Product methods
  getProducts(): Promise<Product[]>;
  getProduct(id: string): Promise<Product | undefined>;
  createProduct(product: InsertProduct): Promise<Product>;
  
  // Article methods
  getArticles(): Promise<Article[]>;
  getArticle(id: string): Promise<Article | undefined>;
  createArticle(article: InsertArticle): Promise<Article>;
  
  // Consultation methods
  getConsultations(): Promise<Consultation[]>;
  createConsultation(consultation: InsertConsultation): Promise<Consultation>;
  
  // Membership methods
  getMemberships(): Promise<Membership[]>;
  createMembership(membership: InsertMembership): Promise<Membership>;
}

export class DatabaseStorage implements IStorage {
  // User methods
  async getUser(id: string): Promise<User | undefined> {
    const result = await db.select().from(users).where(eq(users.id, id));
    return result[0];
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const result = await db.select().from(users).where(eq(users.username, username));
    return result[0];
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const result = await db.insert(users).values(insertUser).returning();
    return result[0];
  }

  // Product methods
  async getProducts(): Promise<Product[]> {
    return await db.select().from(products);
  }

  async getProduct(id: string): Promise<Product | undefined> {
    const result = await db.select().from(products).where(eq(products.id, id));
    return result[0];
  }

  async createProduct(insertProduct: InsertProduct): Promise<Product> {
    const result = await db.insert(products).values(insertProduct).returning();
    return result[0];
  }

  // Article methods
  async getArticles(): Promise<Article[]> {
    return await db.select().from(articles);
  }

  async getArticle(id: string): Promise<Article | undefined> {
    const result = await db.select().from(articles).where(eq(articles.id, id));
    return result[0];
  }

  async createArticle(insertArticle: InsertArticle): Promise<Article> {
    const result = await db.insert(articles).values(insertArticle).returning();
    return result[0];
  }

  // Consultation methods
  async getConsultations(): Promise<Consultation[]> {
    return await db.select().from(consultations);
  }

  async createConsultation(insertConsultation: InsertConsultation): Promise<Consultation> {
    const result = await db.insert(consultations).values(insertConsultation).returning();
    return result[0];
  }

  // Membership methods
  async getMemberships(): Promise<Membership[]> {
    return await db.select().from(memberships);
  }

  async createMembership(insertMembership: InsertMembership): Promise<Membership> {
    const result = await db.insert(memberships).values(insertMembership).returning();
    return result[0];
  }
}

export const storage = new DatabaseStorage();
