import { createClient } from '@supabase/supabase-js'
import dotenv from 'dotenv'

dotenv.config({ path: '.env.local' })

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

async function verifyState() {
    console.log("--- USERS ---")
    const { data: users, error: usersError } = await supabase.from('users').select('*')
    if (usersError) console.error(usersError)
    else console.table(users.map(u => ({ id: u.id, email: u.email, role: u.role })))

    console.log("\n--- PRODUCTS ---")
    const { data: products, error: productsError } = await supabase.from('products').select('*').order('created_at', { ascending: false })
    if (productsError) console.error(productsError)
    else console.table(products.map(p => ({ id: p.id, title: p.title, operator: p.operator_id })))

    console.log("\n--- WALLETS ---")
    const { data: wallets, error: walletsError } = await supabase.from('wallets').select('*')
    if (walletsError) console.error(walletsError)
    else console.table(wallets)
}

verifyState()
