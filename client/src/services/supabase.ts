import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://xtqfzfsczggoecjsjggz.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inh0cWZ6ZnNjemdnb2VjanNqZ2d6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTM1MzE0OTgsImV4cCI6MjA2OTEwNzQ5OH0.s77blIAN9LlPfpOURerdWl_KlFxFqme8zo6sUTgqFDU';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export const supabaseConfig = {
  url: supabaseUrl,
  anonKey: supabaseAnonKey,
};

// Supabase service functions
export const supabaseService = {
  // Products
  async getProducts() {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    return data;
  },

  async getProduct(id: string) {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('id', id)
      .single();
    
    if (error) throw error;
    return data;
  },

  async addProduct(product: any) {
    const { data, error } = await supabase
      .from('products')
      .insert([{
        name: product.name,
        description: product.description,
        price: parseFloat(product.price),
        image: product.imageUrl || '',
        category: product.category,
        ingredients: product.ingredients ? [product.ingredients] : [],
        benefits: product.benefits ? [product.benefits] : [],
        usage: product.usage || ''
      }])
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },

  async deleteProduct(id: string) {
    const { error } = await supabase
      .from('products')
      .delete()
      .eq('id', id);
    
    if (error) throw error;
  },

  // Articles
  async getArticles() {
    const { data, error } = await supabase
      .from('articles')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    return data;
  },

  async getArticle(id: string) {
    const { data, error } = await supabase
      .from('articles')
      .select('*')
      .eq('id', id)
      .single();
    
    if (error) throw error;
    return data;
  },

  async addArticle(article: any) {
    const { data, error } = await supabase
      .from('articles')
      .insert([{
        title: article.title,
        content: article.content,
        excerpt: article.content.substring(0, 150) + '...', // إنشاء excerpt من المحتوى
        category: article.category,
        author: 'المدير',
        featured: false
      }])
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },

  async getArticleById(id: string) {
    const { data, error } = await supabase
      .from('articles')
      .select('*')
      .eq('id', id)
      .single();
    
    if (error) throw error;
    return data;
  },

  async deleteArticle(id: string) {
    const { error } = await supabase
      .from('articles')
      .delete()
      .eq('id', id);
    
    if (error) throw error;
  },

  // Consultations
  async createConsultation(consultation: any) {
    const { data, error } = await supabase
      .from('consultations')
      .insert(consultation)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },

  // Memberships
  async createMembership(membership: any) {
    const { data, error } = await supabase
      .from('memberships')
      .insert(membership)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },
};

// Export individual functions for easier use
export const getProducts = supabaseService.getProducts;
export const getProduct = supabaseService.getProduct;
export const addProduct = supabaseService.addProduct;
export const deleteProduct = supabaseService.deleteProduct;
export const getArticles = supabaseService.getArticles;
export const getArticle = supabaseService.getArticle;
export const getArticleById = supabaseService.getArticleById;
export const addArticle = supabaseService.addArticle;
export const deleteArticle = supabaseService.deleteArticle;
