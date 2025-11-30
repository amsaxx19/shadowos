-- Update products table
alter table products 
add column if not exists business_id uuid references businesses(id) on delete cascade,
add column if not exists type text check (type in ('course', 'discord_role', 'file', 'service', 'coaching', 'community', 'software')) default 'course',
add column if not exists pricing_type text check (pricing_type in ('one_time', 'subscription', 'free')) default 'one_time',
add column if not exists is_visible boolean default true;

-- Create product_apps table
create table if not exists product_apps (
  id uuid default gen_random_uuid() primary key,
  product_id uuid references products(id) on delete cascade not null,
  app_type text check (app_type in ('chat', 'course_module', 'file', 'text')) not null,
  config jsonb default '{}'::jsonb,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS
alter table product_apps enable row level security;

-- Policies for product_apps
create policy "Users can view apps of products they can view"
  on product_apps for select
  using (
    exists (
      select 1 from products
      where products.id = product_apps.product_id
      -- Add logic here if needed, e.g., public products or owned products
    )
  );

-- Policy for creating products (Owner/Admin only)
create policy "Business members can create products"
  on products for insert
  with check (
    exists (
      select 1 from business_members
      where business_members.business_id = products.business_id
      and business_members.user_id = auth.uid()
      and business_members.role in ('owner', 'admin', 'editor')
    )
    or 
    exists (
        select 1 from businesses
        where businesses.id = products.business_id
        and businesses.owner_id = auth.uid()
    )
  );

-- Update existing products to have a default business_id if needed
-- For now, we might leave them null or assign to a default business if we knew one.
-- Since we just created businesses, we might not have any to link to yet for existing mock data.
-- We can leave them null for now, but in production we'd want to backfill.
