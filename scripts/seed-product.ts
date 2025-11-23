import { createClient } from '@supabase/supabase-js'
import dotenv from 'dotenv'

dotenv.config({ path: '.env.local' })

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

const supabase = createClient(supabaseUrl, supabaseKey)

async function seedProduct() {
    // 1. Get a user (Creator)
    const { data: users, error: userError } = await supabase
        .from('users')
        .select('id')
        .eq('role', 'creator')
        .limit(1)

    if (userError || !users || users.length === 0) {
        console.error('No creator found. Please seed users first.')
        return
    }

    const creatorId = users[0].id

    // 2. Get an operator
    const { data: operators } = await supabase
        .from('users')
        .select('id')
        .eq('role', 'operator')
        .limit(1)

    const operatorId = operators?.[0]?.id || creatorId // Fallback if no operator

    // 3. Create Product
    const { data: product, error } = await supabase
        .from('products')
        .insert({
            title: 'Test Product for Checkout',
            description: 'This is a test product created by the seed script.',
            price: 150000,
            creator_id: creatorId,
            operator_id: operatorId,
            split_percentage_creator: 80,
            split_percentage_operator: 20
        })
        .select()
        .single()

    if (error) {
        console.error('Error creating product:', error)
        return
    }

    console.log('Product Created:', product)
}

seedProduct()
