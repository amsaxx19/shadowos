import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function seedApplication() {
    console.log('Seeding dummy application...');

    const { data, error } = await supabase
        .from('partnership_applications')
        .insert([
            {
                name: 'Budi Santoso',
                email: 'budi@example.com',
                social_link: 'instagram.com/budisantoso',
                followers_count: '150000',
                reason: 'Saya konten kreator edukasi bisnis. Ingin join ShadowOS.',
                status: 'pending'
            },
            {
                name: 'Siti Aminah',
                email: 'siti@example.com',
                social_link: 'tiktok.com/@siti_cooking',
                followers_count: '500000',
                reason: 'Masak-masak viral. Butuh produk panci premium.',
                status: 'pending'
            }
        ])
        .select();

    if (error) {
        console.error('Error seeding application:', error);
    } else {
        console.log('Seeded applications:', data);
    }
}

seedApplication();
