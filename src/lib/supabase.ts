import { createClient } from '@supabase/supabase-js';

// Get environment variables with fallbacks
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 
                   import.meta.env.SUPABASE_URL || 
                   'https://cmloioogvxaucawwipwt.supabase.co';

const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 
                       import.meta.env.SUPABASE_ANON_KEY || 
                       'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNtbG9pb29ndnhhdWNhd3dpcHd0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjEyNDc5MzYsImV4cCI6MjA3NjgyMzkzNn0.-Xr-ti1-1nUA2pL0Ga2QOStZ9Rj3FmpYM9roiH5TP70';

// Validate environment variables
if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Missing Supabase environment variables');
  throw new Error('Supabase configuration is missing');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type Artifact = {
  id: string;
  title: string;
  artist: string;
  year: string;
  description: string;
  image_url: string;
  category: string;
  color_theme: string;
  display_order: number;
  created_at: string;
};
