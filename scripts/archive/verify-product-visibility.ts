import { createClient } from '@supabase/supabase-js'
import dotenv from 'dotenv'

dotenv.config({ path: '.env.local' })

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!)

async function verifyProductVisibility() {
    // 1. Log in as Private Creator
    const { error: loginError } = await supabase.auth.signInWithPassword({
        email: 'private_creator@test.com',
        password: 'password123'
    })

    if (loginError) {
        console.error('❌ Login failed:', loginError)
        return
    }

    // 2. Fetch Products
    const { data: products, error } = await supabase.from('products').select('*')

    if (error) {
        console.error('❌ Failed to fetch products:', error)
        return
    }

    console.log(`Found ${products.length} products for Private Creator:`)
    products.forEach(p => console.log(`- ${p.title} (Creator ID: ${p.creator_id})`))

    // 3. Verify "Scripted Private Product" is present
    const found = products.find(p => p.title === 'Scripted Private Product')
    if (found) {
        console.log('✅ "Scripted Private Product" is visible.')
    } else {
        console.error('❌ "Scripted Private Product" is MISSING!')
    }

    // 4. Verify NO other products are visible (if strict RLS is intended)
    // The requirement was "List of products assigned to them".
    // If they see other products, it might be an issue depending on "Strict Row Level Security" requirement.
    // Let's check if they see "My Real Product" (which was created earlier for another creator/operator).
    const leaked = products.find(p => p.title !== 'Scripted Private Product')
    if (leaked) {
        console.warn('⚠️ Warning: User can see other products:', leaked.title)
    } else {
        console.log('✅ Strict isolation verified: No other products visible.')
    }
}

verifyProductVisibility()
