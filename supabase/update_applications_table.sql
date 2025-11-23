-- Rename social_link to instagram_link
ALTER TABLE applications RENAME COLUMN social_link TO instagram_link;

-- Add tiktok_link column
ALTER TABLE applications ADD COLUMN tiktok_link TEXT;
