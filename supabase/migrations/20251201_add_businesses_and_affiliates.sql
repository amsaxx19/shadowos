-- Create businesses table
create table public.businesses (
  id uuid default uuid_generate_v4() primary key,
  owner_id uuid references public.users(id) not null,
  name text not null,
  slug text not null unique,
  logo_url text,
  currency text default 'IDR',
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS for businesses
alter table public.businesses enable row level security;

-- Policies for businesses
create policy "Users can view their own businesses"
  on public.businesses for select
  using (auth.uid() = owner_id);

create policy "Users can create businesses"
  on public.businesses for insert
  with check (auth.uid() = owner_id);

create policy "Users can update their own businesses"
  on public.businesses for update
  using (auth.uid() = owner_id);

-- Add business_id to products
alter table public.products 
add column business_id uuid references public.businesses(id);

-- Add affiliate columns to products
alter table public.products 
add column is_affiliate_enabled boolean default false,
add column affiliate_percentage integer default 0 check (affiliate_percentage >= 0 and affiliate_percentage <= 100);

-- Update RLS for products to check business ownership (optional but good practice)
-- For now, existing policies rely on creator_id/operator_id which is fine.
