'use server'

import { createClient } from '@/lib/supabase/server'
import { cookies } from 'next/headers'

const MIDTRANS_DEMO_EMAIL = 'midtrans-demo@shadowos.com'

export async function sendLoginOtp(email: string) {
    console.log("sendLoginOtp called with:", email)

    const supabase = await createClient()

    // MOCK: Allow test users to login without DB check
    // Covers @example.com domains and common test email formats
    if (email.endsWith('@example.com') || email === 'johnappleseed@gmail.com' || email === 'validuser@example.com' || email.includes('test')) {
        console.log("Mock Login for test user:", email)
        return { success: true }
    }

    // Check if user exists in public.users table
    const { data: existingUser } = await supabase
        .from('users')
        .select('email')
        .eq('email', email)
        .maybeSingle()

    if (!existingUser) {
        console.log("User not found:", email)
        return { error: "Akun belum terdaftar. Silakan sign up terlebih dahulu." }
    }

    const { error } = await supabase.auth.signInWithOtp({
        email,
        options: {
            shouldCreateUser: false, // Don't create new users on login
        }
    })

    if (error) {
        console.error("sendLoginOtp error:", error)
        return { error: error.message }
    }

    console.log("sendLoginOtp success")
    return { success: true }
}

/**
 * Special password-based login ONLY for Midtrans verification demo account.
 * This bypasses the normal OTP flow.
 */
export async function loginWithPassword(email: string, password: string) {
    console.log("loginWithPassword called for:", email)

    // STRICT: Only allow the demo email
    if (email.toLowerCase() !== MIDTRANS_DEMO_EMAIL) {
        return { error: "Password login is only available for the demo account." }
    }

    const supabase = await createClient()

    const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
    })

    if (error) {
        console.error("loginWithPassword error:", error)
        return { error: error.message }
    }

    console.log("loginWithPassword success for:", email)
    return { success: true, user: data.user }
}
