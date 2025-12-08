-- Fix Products RLS to allow public/guest access
-- This restores public read access that was removed by fix_product_rls.sql

-- 1. First, drop the restrictive policies
DROP POLICY IF EXISTS "Operators full access" ON public.products;
DROP POLICY IF EXISTS "Creators read assigned" ON public.products;
DROP POLICY IF EXISTS "Public Read Products" ON public.products;
DROP POLICY IF EXISTS "Allow public read" ON public.products;

-- 2. Create PUBLIC READ policy (allows everyone including guests)
CREATE POLICY "Allow public read"
ON public.products FOR SELECT
USING (true);

-- 3. Operators: Full Access (Insert, Update, Delete) - for management
CREATE POLICY "Operators full access"
ON public.products FOR ALL
USING (
  EXISTS (SELECT 1 FROM public.users WHERE id = auth.uid() AND role = 'operator')
);

-- 4. Business owners can manage their products
CREATE POLICY "Business owners manage products"
ON public.products FOR ALL
USING (
  EXISTS (
    SELECT 1 FROM public.businesses 
    WHERE id = products.business_id 
    AND owner_id = auth.uid()
  )
);
