-- Create products table
create table if not exists products (
  id uuid default gen_random_uuid() primary key,
  title text not null,
  description text,
  price numeric not null,
  currency text default 'USD',
  rating numeric default 0,
  review_count integer default 0,
  image_url text,
  creator_name text,
  category text,
  tags text[],
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS
alter table products enable row level security;

-- Create policy to allow public read access
create policy "Public products are viewable by everyone"
  on products for select
  using (true);

-- Insert seed data
insert into products (title, description, price, rating, review_count, image_url, creator_name, category, tags)
values
  ('UK''s Top Cookgroup for Resellers', 'Loot Notify Monthly. The best group for reselling sneakers and more.', 29.99, 4.74, 141, 'https://images.unsplash.com/photo-1552346154-21d32810aba3?w=800&auto=format&fit=crop&q=60', 'Loot Notify', 'Reselling', ARRAY['Sneaker', 'Resell', 'Cookgroup']),
  ('Beste Deutsche Cookgroup für Reseller', 'VenomCooks Germany. Join the best German cookgroup.', 35.00, 4.91, 78, 'https://images.unsplash.com/photo-1607522370275-f14206abe5d3?w=800&auto=format&fit=crop&q=60', 'VenomCooks', 'Reselling', ARRAY['Sneaker', 'Resell', 'Germany']),
  ('Your #1 snkrs resell group', 'Limitless Sneakers. Master the art of sneaker reselling.', 40.00, 5.0, 117, 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&auto=format&fit=crop&q=60', 'Limitless Sneakers', 'Reselling', ARRAY['Sneaker', 'Nike', 'Resell']),
  ('All In One UK/EU Resell Group', 'Kaikicks Apprentice AIO. Sneakers, Pokemon, Vinted Monitor.', 35.00, 4.83, 121, 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=800&auto=format&fit=crop&q=60', 'Kaikicks', 'Reselling', ARRAY['Sneaker', 'Pokemon', 'Vinted']),
  ('SnipeGang - Free Reselling Group', 'Start your reselling journey for free with SnipeGang.', 0, 4.5, 320, 'https://images.unsplash.com/photo-1511556532299-8f662fc26c06?w=800&auto=format&fit=crop&q=60', 'SnipeGang', 'Reselling', ARRAY['Sneaker', 'Free', 'Community']),
  ('Sales & Profits Tracker', 'Track your reselling profits with ease.', 15.00, 4.9, 56, 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&auto=format&fit=crop&q=60', 'ProfitMaster', 'Software', ARRAY['Finance', 'Tracking', 'Business']),
  ('Mastering Excel 2025', 'Become an Excel wizard in 30 days.', 149.00, 4.9, 230, 'https://images.unsplash.com/photo-1543269865-cbf427effbad?w=800&auto=format&fit=crop&q=60', 'Excel Wizard', 'Course', ARRAY['Education', 'Excel', 'Productivity']),
  ('VIP Crypto Signals', 'Get the best crypto signals daily.', 499.00, 4.8, 89, 'https://images.unsplash.com/photo-1621761191319-c6fb62004040?w=800&auto=format&fit=crop&q=60', 'Crypto King', 'Trading', ARRAY['Crypto', 'Signals', 'Finance']),
  ('Jasa Edit CapCut', 'Professional video editing services for TikTok.', 50.00, 5.0, 45, 'https://images.unsplash.com/photo-1574717432707-c6780568320a?w=800&auto=format&fit=crop&q=60', 'Editor Pro', 'Clipping', ARRAY['Video', 'Editing', 'Service']),
  ('React JS Zero to Hero', 'Complete React course for beginners.', 299.00, 4.9, 512, 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&auto=format&fit=crop&q=60', 'Code Master', 'Course', ARRAY['Coding', 'React', 'Web Dev']);
