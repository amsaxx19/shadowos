-- Create businesses table
create table if not exists businesses (
  id uuid default gen_random_uuid() primary key,
  owner_id uuid references auth.users(id) on delete cascade not null,
  name text not null,
  slug text unique not null,
  logo_url text,
  currency text default 'USD',
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Create business_members table
create table if not exists business_members (
  id uuid default gen_random_uuid() primary key,
  business_id uuid references businesses(id) on delete cascade not null,
  user_id uuid references auth.users(id) on delete cascade not null,
  role text check (role in ('owner', 'admin', 'editor', 'viewer')) default 'viewer',
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  unique(business_id, user_id)
);

-- Add current_business_id to users table (public profile table if exists, or just rely on auth metadata, but usually we want a public users table for this)
-- Assuming we might not have a public 'users' table mirroring auth.users yet, let's check. 
-- If we strictly follow the plan: "Update users table". I'll assume there is a public users table or I should create one/update auth.users via a trigger? 
-- The plan said "Update users (Existing)". Let's check if 'users' table exists in previous migrations.
-- Checking previous migrations... 20251128_add_customer_details.sql only touched 'orders'.
-- I'll create a public 'users' table if it doesn't exist, or just add the column if it does.
-- Safest bet: Create a public profiles/users table if not exists.

create table if not exists users (
  id uuid references auth.users(id) on delete cascade primary key,
  email text,
  full_name text,
  avatar_url text,
  current_business_id uuid references businesses(id) on delete set null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS
alter table businesses enable row level security;
alter table business_members enable row level security;
alter table users enable row level security;

-- Policies (Simplified for now)
create policy "Users can view businesses they are members of"
  on businesses for select
  using (
    exists (
      select 1 from business_members
      where business_members.business_id = businesses.id
      and business_members.user_id = auth.uid()
    )
    or owner_id = auth.uid()
  );

create policy "Users can view members of their businesses"
  on business_members for select
  using (
    exists (
      select 1 from business_members as bm
      where bm.business_id = business_members.business_id
      and bm.user_id = auth.uid()
    )
  );

create policy "Users can view their own profile"
  on users for select
  using (auth.uid() = id);

create policy "Users can update their own profile"
  on users for update
  using (auth.uid() = id);

-- Trigger to create user profile on signup
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.users (id, email, full_name, avatar_url)
  values (new.id, new.email, new.raw_user_meta_data->>'full_name', new.raw_user_meta_data->>'avatar_url');
  return new;
end;
$$ language plpgsql security definer;

-- Drop trigger if exists to avoid error on repeated runs
drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();
