-- ROBUST FIX: Drop ALL existing policies on wallets to ensure no "Allow All" leaks remain.
DO $$ 
DECLARE 
    r RECORD; 
BEGIN 
    FOR r IN (SELECT policyname FROM pg_policies WHERE tablename = 'wallets' AND schemaname = 'public') LOOP 
        EXECUTE 'DROP POLICY IF EXISTS "' || r.policyname || '" ON "public"."wallets";'; 
    END LOOP; 
END $$;

-- Enable RLS (Just in case)
ALTER TABLE "public"."wallets" ENABLE ROW LEVEL SECURITY;

-- Create Strict Policy: Users can ONLY see their own wallet
CREATE POLICY "Users can only view own wallet" 
ON "public"."wallets" 
FOR SELECT 
USING (auth.uid() = user_id);

-- Note: Service Role (Admin) always bypasses RLS, so no extra policy needed for it.
