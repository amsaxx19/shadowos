import { createClient } from '@supabase/supabase-js'
import dotenv from 'dotenv'

// Load env from .env.local
dotenv.config({ path: '.env.local' })

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!

if (!supabaseUrl || !supabaseServiceKey) {
    console.error('Error: NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY not found in .env.local')
    process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseServiceKey, {
    auth: {
        autoRefreshToken: false,
        persistSession: false
    }
})

async function seedProducts() {
    try {
        console.log('Connected to Supabase.')

        // Get a user ID (creator)
        const { data: users, error: userError } = await supabase.from('users').select('id').limit(1)
        if (userError || !users || users.length === 0) {
            console.error('No users found. Please sign up a user first.', userError)
            process.exit(1)
        }
        const userId = users[0].id

        // Get a business ID
        const { data: businesses, error: bizError } = await supabase.from('businesses').select('id').limit(1)
        let businessId = null
        if (businesses && businesses.length > 0) {
            businessId = businesses[0].id
        }

        // Insert products
        const products = [
            {
                title: 'Test Software Product',
                description: 'A great software for testing search.',
                price: 100,
                category: 'software',
                creator_id: userId,
                operator_id: userId,
                business_id: businessId,
                split_percentage_creator: 100,
                split_percentage_operator: 0,
                is_affiliate_enabled: true,
                affiliate_percentage: 20
            },
            {
                title: 'Test Course Product',
                description: 'Learn how to test search.',
                price: 50,
                category: 'courses',
                creator_id: userId,
                operator_id: userId,
                business_id: businessId,
                split_percentage_creator: 100,
                split_percentage_operator: 0,
                is_affiliate_enabled: false,
                affiliate_percentage: 0
            }
        ]

        const { error: insertError } = await supabase.from('products').insert(products)

        if (insertError) {
            console.error('Error seeding products:', insertError)
            process.exit(1)
        }

        console.log('Seeded products successfully!')

    } catch (err) {
        console.error('Error seeding products:', err)
        process.exit(1)
    }
}

seedProducts()
