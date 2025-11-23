-- 1. Reset Policies (Drop existing ones to avoid conflicts)
drop policy if exists "Allow read access for authenticated users" on public.products;
drop policy if exists "Allow public read access" on public.products;
drop policy if exists "Allow public insert" on public.orders;
drop policy if exists "Allow public update" on public.orders;
drop policy if exists "Allow public insert" on public.ledger;
drop policy if exists "Allow public update" on public.wallets;
drop policy if exists "Allow read access for authenticated users" on public.users;
drop policy if exists "Allow public read access" on public.users;
drop policy if exists "Allow read access for authenticated users" on public.wallets;
drop policy if exists "Allow public read access" on public.wallets;

-- 2. Products: Allow Public Read
create policy "Public Read Products" on public.products for select using (true);

-- 3. Orders: Allow Public Insert & Update
create policy "Public Insert Orders" on public.orders for insert with check (true);
create policy "Public Update Orders" on public.orders for update using (true);
create policy "Public Read Orders" on public.orders for select using (true);

-- 4. Wallets: Allow Public Read & Update
create policy "Public Read Wallets" on public.wallets for select using (true);
create policy "Public Update Wallets" on public.wallets for update using (true);

-- 5. Ledger: Allow Public Insert & Read
create policy "Public Insert Ledger" on public.ledger for insert with check (true);
create policy "Public Read Ledger" on public.ledger for select using (true);

-- 6. Users: Allow Public Read (for Dashboard)
create policy "Public Read Users" on public.users for select using (true);
