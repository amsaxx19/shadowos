-- Allow authenticated users (Creators) to insert withdrawal requests
create policy "Allow insert for authenticated users" on public.withdrawals for insert with check (auth.role() = 'authenticated');

-- Allow authenticated users (Operators) to update withdrawal requests (Approve/Reject)
create policy "Allow update for authenticated users" on public.withdrawals for update using (auth.role() = 'authenticated');
