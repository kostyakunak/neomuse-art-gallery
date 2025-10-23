import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

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
