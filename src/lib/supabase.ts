// Type definition for artifacts
// Note: Supabase dependency removed - using static JSON data instead
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
