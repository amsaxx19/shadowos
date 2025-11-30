-- Add category column to products
alter table public.products 
add column category text default 'other';

-- Create index for faster filtering
create index idx_products_category on public.products(category);
create index idx_products_title_description on public.products using gin(to_tsvector('english', title || ' ' || coalesce(description, '')));
