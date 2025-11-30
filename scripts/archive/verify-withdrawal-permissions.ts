import { createClient } from '@supabase/supabase-js'
import dotenv from 'dotenv'

dotenv.config({ path: '.env.local' })

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!)

async function test() {
    // 1. Sign in as creator
    const { data: { session }, error: loginError } = await supabase.auth.signInWithPassword({
        email: 'creator_retry_1763703040@test.com',
        password: 'password123'
    })

    if (loginError) {
        console.error('Login failed:', loginError)
        return
    }
    console.log('Logged in as Creator')

    // 2. Get Wallet ID
    const { data: wallet } = await supabase.from('wallets').select('id').eq('user_id', session?.user.id).single()
    if (!wallet) {
        console.error('Wallet not found')
        return
    }

    // 3. Try to insert withdrawal
    const { error } = await supabase.from('withdrawals').insert({
        wallet_id: wallet.id,
        amount: 100,
        status: 'pending'
    })

    if (error) {
        console.error('Insert failed:', error)
    } else {
        console.log('Insert successful!')
    }
}

test()
