/*
  # Virtual Museum - Artifacts Collection

  ## Overview
  Creates a database schema for storing virtual museum artifacts with rich metadata
  and image URLs for an interactive 3D gallery experience.

  ## New Tables
  
  ### `artifacts`
  Stores information about museum artifacts/art pieces
  - `id` (uuid, primary key) - Unique identifier for each artifact
  - `title` (text) - Name of the artifact
  - `artist` (text) - Creator/artist name
  - `year` (text) - Year of creation
  - `description` (text) - Detailed description of the artifact
  - `image_url` (text) - URL to the artifact image
  - `category` (text) - Category/type of artifact (painting, sculpture, digital, etc.)
  - `color_theme` (text) - Dominant color for UI theming
  - `created_at` (timestamptz) - Timestamp of record creation
  - `display_order` (integer) - Order for displaying artifacts

  ## Security
  
  ### Row Level Security (RLS)
  - RLS is enabled on the `artifacts` table
  - Public read access is granted since this is a portfolio showcase
  - Only authenticated users can modify data (for future admin panel)

  ## Indexes
  - Index on `category` for filtering
  - Index on `display_order` for sorting

  ## Notes
  - Image URLs will point to Pexels stock photos
  - Color themes are used for gradient overlays and card styling
  - Public read access is appropriate for a portfolio piece
*/

-- Create artifacts table
CREATE TABLE IF NOT EXISTS artifacts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  artist text NOT NULL,
  year text NOT NULL,
  description text NOT NULL,
  image_url text NOT NULL,
  category text NOT NULL DEFAULT 'art',
  color_theme text NOT NULL DEFAULT '#3b82f6',
  display_order integer NOT NULL DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE artifacts ENABLE ROW LEVEL SECURITY;

-- Allow public read access for showcase
CREATE POLICY "Anyone can view artifacts"
  ON artifacts
  FOR SELECT
  TO anon
  USING (true);

-- Allow authenticated users to manage artifacts
CREATE POLICY "Authenticated users can insert artifacts"
  ON artifacts
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update artifacts"
  ON artifacts
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can delete artifacts"
  ON artifacts
  FOR DELETE
  TO authenticated
  USING (true);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_artifacts_category ON artifacts(category);
CREATE INDEX IF NOT EXISTS idx_artifacts_display_order ON artifacts(display_order);