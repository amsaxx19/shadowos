-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- Users table (extends auth.users)
create table public.users (
  id uuid references auth.users not null primary key,
  email text not null,
  full_name text,
  username text unique,
  bio text,
  phone text,
  avatar_url text,
  role text check (role in ('operator', 'creator')) not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Wallets table
create table public.wallets (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references public.users(id) not null unique,
  balance numeric default 0 not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Products table
create table public.products (
  id uuid default uuid_generate_v4() primary key,
  title text not null,
  description text,
  price numeric not null,
  creator_id uuid references public.users(id) not null,
  operator_id uuid references public.users(id) not null,
  split_percentage_creator integer not null check (split_percentage_creator >= 0 and split_percentage_creator <= 100),
  split_percentage_operator integer not null check (split_percentage_operator >= 0 and split_percentage_operator <= 100),
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Orders table
create table public.orders (
  id uuid default uuid_generate_v4() primary key,
  product_id uuid references public.products(id) not null,
  amount numeric not null,
  customer_email text,
  status text default 'pending' not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Ledger table (Immutable record of transactions)
create table public.ledger (
  id uuid default uuid_generate_v4() primary key,
  order_id uuid references public.orders(id),
  wallet_id uuid references public.wallets(id) not null,
  amount numeric not null, -- Positive for credit, negative for debit
  type text check (type in ('sale_revenue', 'withdrawal')) not null,
  description text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Withdrawals table
create table public.withdrawals (
  id uuid default uuid_generate_v4() primary key,
  wallet_id uuid references public.wallets(id) not null,
  amount numeric not null,
  status text default 'pending' check (status in ('pending', 'approved', 'rejected')) not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- RLS Policies (Basic for now)
alter table public.users enable row level security;
alter table public.wallets enable row level security;
alter table public.products enable row level security;
alter table public.orders enable row level security;
alter table public.ledger enable row level security;
alter table public.withdrawals enable row level security;

-- Allow read access to authenticated users for demo purposes
create policy "Allow read access for authenticated users" on public.users for select using (auth.role() = 'authenticated');
create policy "Allow read access for authenticated users" on public.wallets for select using (auth.role() = 'authenticated');
create policy "Allow read access for authenticated users" on public.products for select using (auth.role() = 'authenticated');
create policy "Allow read access for authenticated users" on public.orders for select using (auth.role() = 'authenticated');
create policy "Allow read access for authenticated users" on public.ledger for select using (auth.role() = 'authenticated');
create policy "Allow read access for authenticated users" on public.withdrawals for select using (auth.role() = 'authenticated');

-- Allow INSERT/UPDATE access for authenticated users (Required for app to work)
create policy "Allow insert for authenticated users" on public.products for insert with check (auth.role() = 'authenticated');
create policy "Allow insert for authenticated users" on public.orders for insert with check (auth.role() = 'authenticated');
create policy "Allow insert for authenticated users" on public.ledger for insert with check (auth.role() = 'authenticated');
create policy "Allow update for authenticated users" on public.wallets for update using (auth.role() = 'authenticated');
create policy "Allow insert for authenticated users" on public.users for insert with check (auth.role() = 'authenticated');
create policy "Allow update for authenticated users" on public.users for update using (auth.role() = 'authenticated');

-- Function to handle new user signup
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.users (id, email, full_name, role)
  values (new.id, new.email, new.raw_user_meta_data->>'full_name', new.raw_user_meta_data->>'role');
  
  insert into public.wallets (user_id)
  values (new.id);
  
  return new;
end;
$$ language plpgsql security definer;

  -- Trigger for new user
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- Add FAQs to products
alter table public.products add column faqs jsonb default '[]'::jsonb;

-- Reviews table
create table public.reviews (
  id uuid default uuid_generate_v4() primary key,
  product_id uuid references public.products(id) not null,
  user_id uuid references public.users(id) not null,
  rating integer not null check (rating >= 1 and rating <= 5),
  comment text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- RLS for Reviews
alter table public.reviews enable row level security;
create policy "Allow read access for public" on public.reviews for select using (true);
create policy "Allow insert for authenticated users" on public.reviews for insert with check (auth.role() = 'authenticated');
