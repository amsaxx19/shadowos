"use server"

import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"

export async function completeOnboarding(data: {
    full_name: string
    username: string
    birthday: string
    avatar_url: string
}) {
    const supabase = await createClient()

    // Get current user
    const { data: { user }, error: authError } = await supabase.auth.getUser()

    if (authError || !user) {
        return { error: "Unauthorized" }
    }

    // Check if username is already taken
    const { data: existingUser } = await supabase
        .from('users')
        .select('username')
        .eq('username', data.username)
        .single()

    if (existingUser) {
        return { error: "Username sudah dipakai, pilih yang lain" }
    }

    // Update user profile
    const { error: updateError } = await supabase
        .from('users')
        .update({
            full_name: data.full_name,
            username: data.username,
            bio: data.birthday, // Using bio field temporarily for birthday
            avatar_url: data.avatar_url,
        })
        .eq('id', user.id)

    if (updateError) {
        console.error("Update error:", updateError)
        return { error: "Gagal menyimpan profil" }
    }

    // Check if user has a business
    const { data: businesses } = await supabase
        .from('business_members')
        .select('business_id')
        .eq('user_id', user.id)
        .limit(1)

    if (businesses && businesses.length > 0) {
        return { success: true, redirectUrl: '/dashboard' }
    } else {
        return { success: true, redirectUrl: '/dashboard/create' }
    }
}
