'use server'

import { createClient } from '@/lib/supabase/server'

export async function sendLoginOtp(email: string) {
    console.log("sendLoginOtp called with:", email)

    const supabase = await createClient()

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
