'use server'

import { createClient } from "@/lib/supabase/server"

export async function sendOtp(email: string) {
    console.log("sendOtp called with:", email)

    const supabase = await createClient()

    // Check if user already exists in public.users table
    const { data: existingUser } = await supabase
        .from('users')
        .select('email')
        .eq('email', email)
        .maybeSingle()

    if (existingUser) {
        console.log("User already exists:", email)
        return { error: "Email sudah terpakai. Silakan login atau gunakan email lain." }
    }

    const { error } = await supabase.auth.signInWithOtp({
        email,
        options: {
            shouldCreateUser: true, // Allow signup
        }
    })

    if (error) {
        console.error("sendOtp error:", error)
        return { error: error.message }
    }

    console.log("sendOtp success")
    return { success: true }
}

export async function verifyOtp(email: string, token: string) {
    const supabase = await createClient()

    const { data, error } = await supabase.auth.verifyOtp({
        email,
        token,
        type: 'email',
    })

    if (error) {
        return { error: error.message }
    }

    // Check if user profile is complete
    const { data: userProfile } = await supabase
        .from('users')
        .select('full_name, username')
        .eq('id', data.user?.id)
        .single()

    // If profile incomplete (new user), go to onboarding
    if (!userProfile?.full_name || !userProfile?.username) {
        return { success: true, redirectUrl: `/onboarding` }
    }

    // Otherwise check if user has a business
    const { data: businesses } = await supabase
        .from('business_members')
        .select('business_id')
        .eq('user_id', data.user?.id)
        .limit(1)

    if (businesses && businesses.length > 0) {
        return { success: true, redirectUrl: `/dashboard` }
    } else {
        return { success: true, redirectUrl: `/dashboard/create` }
    }
}
