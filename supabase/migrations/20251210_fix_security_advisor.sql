-- Fix "Function Search Path Mutable" security warning
-- Forces the function to look only in the "public" schema for tables/functions,
-- preventing malicious search_path manipulation.
ALTER FUNCTION public.handle_new_user() SET search_path = public;
