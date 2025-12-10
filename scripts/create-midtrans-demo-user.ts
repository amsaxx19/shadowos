/**
 * Script to create the Midtrans demo user in Supabase.
 * Run with: npx tsx scripts/create-midtrans-demo-user.ts
 * 
 * Requires SUPABASE_SERVICE_ROLE_KEY in .env.local
 */

import { createClient } from '@supabase/supabase-js'
import * as dotenv from 'dotenv'
import path from 'path'

// Load environment variables from .env.local
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') })

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL
const SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY

const DEMO_EMAIL = 'midtrans-demo@shadowos.com'
const DEMO_PASSWORD = 'MidtransVerify123!'

async function main() {
    if (!SUPABASE_URL || !SERVICE_ROLE_KEY) {
        console.error('❌ Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY')
        process.exit(1)
    }

    const supabase = createClient(SUPABASE_URL, SERVICE_ROLE_KEY, {
        auth: {
            autoRefreshToken: false,
            persistSession: false,
        },
    })

    console.log('🚀 Creating Midtrans demo user...')

    // Create user in Supabase Auth
    const { data: authUser, error: authError } = await supabase.auth.admin.createUser({
        email: DEMO_EMAIL,
        password: DEMO_PASSWORD,
        email_confirm: true, // Skip email verification
        user_metadata: {
            display_name: 'Midtrans Reviewer',
            role: 'operator', // Give them operator access
        },
    })

    if (authError) {
        // If user already exists, we can update instead
        if (authError.message.includes('already exists') || authError.message.includes('duplicate')) {
            console.log('⚠️  User already exists, attempting to update password...')

            // Get user by email
            const { data: existingUsers } = await supabase.auth.admin.listUsers()
            const existingUser = existingUsers?.users.find(u => u.email === DEMO_EMAIL)

            if (existingUser) {
                const { error: updateError } = await supabase.auth.admin.updateUserById(existingUser.id, {
                    password: DEMO_PASSWORD,
                    email_confirm: true,
                })

                if (updateError) {
                    console.error('❌ Failed to update user:', updateError.message)
                    process.exit(1)
                }

                console.log('✅ User password updated successfully!')
            }
        } else {
            console.error('❌ Failed to create user:', authError.message)
            process.exit(1)
        }
    } else {
        console.log('✅ Auth user created:', authUser.user?.id)

        // Insert into public.users table
        const { error: insertError } = await supabase
            .from('users')
            .upsert({
                id: authUser.user?.id,
                email: DEMO_EMAIL,
                display_name: 'Midtrans Reviewer',
                role: 'operator',
            }, { onConflict: 'id' })

        if (insertError) {
            console.warn('⚠️  Could not insert into public.users:', insertError.message)
        } else {
            console.log('✅ User inserted into public.users table')
        }
    }

    console.log('\n📋 Demo Credentials:')
    console.log('   Email:', DEMO_EMAIL)
    console.log('   Password:', DEMO_PASSWORD)
    console.log('\n🎉 Done! You can now share these credentials with Midtrans.')
}

main()
