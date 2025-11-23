'use server'

import { createClient } from "@/lib/supabase/server"
import { headers } from "next/headers"

export async function resetPassword(formData: FormData) {
    const supabase = await createClient()
    const email = formData.get("email") as string
    const origin = (await headers()).get("origin")

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${origin}/login/update-password`,
    })

    if (error) {
        return { error: error.message }
    }

    return { success: "Check your email for the password reset link." }
}
