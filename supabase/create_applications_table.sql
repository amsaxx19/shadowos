-- Create applications table
CREATE TABLE IF NOT EXISTS applications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  social_link TEXT,
  follower_count TEXT,
  status TEXT DEFAULT 'pending', -- 'pending', 'approved', 'rejected'
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Enable RLS
ALTER TABLE applications ENABLE ROW LEVEL SECURITY;

-- Create policies
-- Allow public insert (for the Apply page)
CREATE POLICY "Public can insert applications"
  ON applications FOR INSERT
  WITH CHECK (true);

-- Allow operators to view all applications
CREATE POLICY "Operators can view all applications"
  ON applications FOR SELECT
  USING (auth.role() = 'authenticated' AND EXISTS (
    SELECT 1 FROM users WHERE id = auth.uid() AND role = 'operator'
  ));

-- Allow operators to update applications (for Approve/Reject)
CREATE POLICY "Operators can update applications"
  ON applications FOR UPDATE
  USING (auth.role() = 'authenticated' AND EXISTS (
    SELECT 1 FROM users WHERE id = auth.uid() AND role = 'operator'
  ));
