import { createClient } from '@supabase/supabase-js'
import dotenv from 'dotenv'

dotenv.config({ path: '.env.local' })

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!)

async function seedWithdrawal() {
    // 1. Log in as creator
    const { error: loginError } = await supabase.auth.signInWithPassword({
        email: 'creator_retry_1763703040@test.com',
        password: 'password123'
    })

    if (loginError) {
        console.error('Login failed:', loginError)
        return
    }

    // 2. Get a creator wallet (now authenticated)
    const { data: user } = await supabase.auth.getUser()
    const { data: wallet } = await supabase.from('wallets').select('id').eq('user_id', user.user?.id).single()

    if (!wallet) {
        console.error('No creator wallet found')
        return
    }

    // 2. Insert pending withdrawal
    const { data, error } = await supabase.from('withdrawals').insert({
        wallet_id: wallet.id,
        amount: 50000,
        status: 'pending'
    }).select().single()

    if (error) {
        console.error('Failed to seed withdrawal:', error)
    } else {
        console.log(`Seeded pending withdrawal ID: ${data.id} for amount 50000`)
    }
}

seedWithdrawal()
