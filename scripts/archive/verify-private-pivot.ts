import { createClient } from '@supabase/supabase-js'
import dotenv from 'dotenv'

dotenv.config({ path: '.env.local' })

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!)

async function verifyPrivatePivot() {
    // 1. Verify Private Creator exists
    const { data: creator } = await supabase.from('users').select('*').eq('email', 'private_creator@test.com').single()

    if (!creator) {
        console.error('❌ Private Creator not found!')
        return
    }
    console.log('✅ Private Creator found:', creator.id)

    // 2. Create Product assigned to this creator
    // We need to be logged in as Operator to create product (RLS)
    const { error: loginError } = await supabase.auth.signInWithPassword({
        email: 'operator_retry_1763703040@test.com',
        password: 'password123'
    })

    if (loginError) {
        console.error('❌ Operator login failed:', loginError)
        return
    }

    const { data: product, error: productError } = await supabase
        .from('products')
        .insert({
            title: 'Scripted Private Product',
            description: 'Created via verification script',
            price: 75000,
            split_percentage_creator: 60,
            split_percentage_operator: 40,
            operator_id: (await supabase.auth.getUser()).data.user?.id,
            creator_id: creator.id
        })
        .select()
        .single()

    if (productError) {
        console.error('❌ Failed to create product:', productError)
    } else {
        console.log('✅ Product created successfully:', product.title)
        console.log('   Assigned to Creator ID:', product.creator_id)
    }
}

verifyPrivatePivot()
