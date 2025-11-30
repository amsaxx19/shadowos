'use server'

import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"

export async function sendOtp(email: string) {
    const supabase = await createClient()

    const { error } = await supabase.auth.signInWithOtp({
        email,
        options: {
            shouldCreateUser: true, // Allow signup
            // emailRedirectTo: '...' // Not needed for OTP code flow usually, but good for magic link
        }
    })

    if (error) {
        return { error: error.message }
    }

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

    // Check if user has a business
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
