-- Allow PUBLIC insert on orders (for Checkout Page)
create policy "Allow public insert" on public.orders for insert with check (true);

-- Allow PUBLIC update on orders (for Payment Webhook/Action)
create policy "Allow public update" on public.orders for update using (true);

-- Allow PUBLIC insert on ledger (for Payment Webhook/Action)
create policy "Allow public insert" on public.ledger for insert with check (true);

-- Allow PUBLIC update on wallets (for Payment Webhook/Action)
create policy "Allow public update" on public.wallets for update using (true);
