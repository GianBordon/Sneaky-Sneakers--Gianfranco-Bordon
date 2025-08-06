import { createClient } from '@supabase/supabase-js';

// Environment variables
const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Store client in memory (singleton pattern)
let supabaseInstance = null;

/**
 * Create a Supabase client
 * @returns {Object} - The Supabase client
 */
export const createSupabaseClient = () => {
  try {
    if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
      throw new Error('Supabase environment variables not configured');
    }
    
    return createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
      auth: {
        autoRefreshToken: true,
        persistSession: true,
        detectSessionInUrl: true
      }
    });
  } catch (error) {
    console.error('Error creating Supabase client:', error);
    throw error;
  }
};

/**
 * Get Supabase client (singleton)
 * @returns {Object} - The Supabase client
 */
export const getSupabase = () => {
  if (!supabaseInstance) {
    supabaseInstance = createSupabaseClient();
    console.log('✅ Supabase client initialized successfully');
  }
  return supabaseInstance;
};

// Export for backward compatibility
export const getSecureSupabase = getSupabase; 