// This file is prepared for future Supabase integration
// Currently using sample data, will be replaced with actual Supabase calls

export const supabaseConfig = {
  url: import.meta.env.VITE_SUPABASE_URL || '',
  anonKey: import.meta.env.VITE_SUPABASE_ANON_KEY || '',
};

// Placeholder functions for future Supabase integration
export const supabaseService = {
  // Products
  async getProducts() {
    // TODO: Replace with Supabase query
    // return supabase.from('products').select('*')
    throw new Error('Supabase not configured yet');
  },

  async getProduct(id: string) {
    // TODO: Replace with Supabase query
    // return supabase.from('products').select('*').eq('id', id).single()
    throw new Error('Supabase not configured yet');
  },

  // Articles
  async getArticles() {
    // TODO: Replace with Supabase query
    // return supabase.from('articles').select('*').order('created_at', { ascending: false })
    throw new Error('Supabase not configured yet');
  },

  async getArticle(id: string) {
    // TODO: Replace with Supabase query
    // return supabase.from('articles').select('*').eq('id', id).single()
    throw new Error('Supabase not configured yet');
  },

  // Consultations
  async createConsultation(consultation: any) {
    // TODO: Replace with Supabase query
    // return supabase.from('consultations').insert(consultation)
    throw new Error('Supabase not configured yet');
  },

  // Memberships
  async createMembership(membership: any) {
    // TODO: Replace with Supabase query
    // return supabase.from('memberships').insert(membership)
    throw new Error('Supabase not configured yet');
  },
};
