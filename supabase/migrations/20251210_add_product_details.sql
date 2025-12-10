-- Add image_url column for product cover images
ALTER TABLE products ADD COLUMN IF NOT EXISTS image_url TEXT;

-- Add features column for list of product features (stored as JSON array)
ALTER TABLE products ADD COLUMN IF NOT EXISTS features JSONB DEFAULT '[]'::jsonb;
