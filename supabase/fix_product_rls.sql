-- FORCE CLEANUP: Drop ALL existing policies on products (Old and New)
DROP POLICY IF EXISTS "Allow read access for authenticated users" ON public.products;
DROP POLICY IF EXISTS "Allow insert for authenticated users" ON public.products;
DROP POLICY IF EXISTS "Operators can see all products" ON public.products;
DROP POLICY IF EXISTS "Creators can see assigned products" ON public.products;
DROP POLICY IF EXISTS "Public Read Products" ON public.products;
DROP POLICY IF EXISTS "Operators full access" ON public.products;
DROP POLICY IF EXISTS "Creators read assigned" ON public.products;

-- 1. Operators: Full Access (Select, Insert, Update, Delete)
CREATE POLICY "Operators full access"
ON public.products
USING (
  EXISTS (SELECT 1 FROM public.users WHERE id = auth.uid() AND role = 'operator')
);

-- 2. Creators: Read ONLY assigned products
CREATE POLICY "Creators read assigned"
ON public.products FOR SELECT
USING (
  creator_id = auth.uid()
);
