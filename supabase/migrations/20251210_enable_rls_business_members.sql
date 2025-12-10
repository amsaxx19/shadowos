-- Enable RLS on the table
ALTER TABLE business_members ENABLE ROW LEVEL SECURITY;

-- Create policy to allow users to view members of their own business
-- Logic: A user can see a row in business_members IF the business_id of that row 
-- is one of the businesses the user belongs to.
CREATE POLICY "Users can view members of their business"
ON business_members FOR SELECT
TO authenticated
USING (
  business_id IN (
    SELECT business_id 
    FROM business_members 
    WHERE user_id = auth.uid()
  )
);

-- Allow users to insert (e.g. accepting invites) - basic policy, adjust if you need stricter invite logic
CREATE POLICY "Users can insert their own membership"
ON business_members FOR INSERT
TO authenticated
WITH CHECK (user_id = auth.uid());
