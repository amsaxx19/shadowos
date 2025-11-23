-- Allow INSERT on products (needed for seeding and operator dashboard)
create policy "Allow insert for authenticated users" on public.products for insert with check (auth.role() = 'authenticated');

-- Allow INSERT on orders (needed for simulation)
create policy "Allow insert for authenticated users" on public.orders for insert with check (auth.role() = 'authenticated');

-- Allow INSERT on ledger (needed for simulation)
create policy "Allow insert for authenticated users" on public.ledger for insert with check (auth.role() = 'authenticated');

-- Allow UPDATE on wallets (needed for simulation)
create policy "Allow update for authenticated users" on public.wallets for update using (auth.role() = 'authenticated');

-- Allow INSERT on users (needed for seed script manual fix)
create policy "Allow insert for authenticated users" on public.users for insert with check (auth.role() = 'authenticated');

-- Allow UPDATE on users (just in case)
create policy "Allow update for authenticated users" on public.users for update using (auth.role() = 'authenticated');
