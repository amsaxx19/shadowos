import { createClient } from '@supabase/supabase-js'
import dotenv from 'dotenv'

dotenv.config({ path: '.env.local' })

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
const supabase = createClient(supabaseUrl, supabaseKey)

async function checkUsers() {
    const { data: users, error } = await supabase.from('users').select('*')

    if (error) {
        console.error('Error fetching users:', error)
        return
    }

    console.log('Users found:', users.length)

    // Log in as operator to see withdrawals
    await supabase.auth.signInWithPassword({
        email: 'operator_retry_1763703040@test.com',
        password: 'password123'
    })

    const { data: withdrawal } = await supabase.from('withdrawals').select('*').eq('id', 'db95b71e-2c6c-4691-b010-3f9122fecf4a').single()
    console.log(`Withdrawal Status: ${withdrawal?.status}`)
}

checkUsers()
