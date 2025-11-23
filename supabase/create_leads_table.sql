-- Create leads table
CREATE TABLE IF NOT EXISTS leads (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  social_link TEXT,
  status TEXT DEFAULT 'DM Sent', -- 'DM Sent', 'Negotiating', 'Closed', 'Rejected'
  notes TEXT,
  operator_id UUID REFERENCES auth.users(id) DEFAULT auth.uid(),
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Enable RLS
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Operators can view their own leads"
  ON leads FOR SELECT
  USING (auth.uid() = operator_id);

CREATE POLICY "Operators can insert their own leads"
  ON leads FOR INSERT
  WITH CHECK (auth.uid() = operator_id);

CREATE POLICY "Operators can update their own leads"
  ON leads FOR UPDATE
  USING (auth.uid() = operator_id);

CREATE POLICY "Operators can delete their own leads"
  ON leads FOR DELETE
  USING (auth.uid() = operator_id);
