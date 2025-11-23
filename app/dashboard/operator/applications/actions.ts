"use server"

import { createClient } from "@supabase/supabase-js"
import { createClient as createServerClient } from "@/lib/supabase/server"
import { revalidatePath } from "next/cache"

// Admin client for user creation
const supabaseAdmin = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function approveApplication(applicationId: string, email: string, fullName: string) {
    const supabase = await createServerClient()

    // 1. Create User Account
    const tempPassword = Math.random().toString(36).slice(-8) + "Aa1!" // Simple random password

    // Check if user already exists
    const { data: { users } } = await supabaseAdmin.auth.admin.listUsers()
    const existingUser = users.find(u => u.email === email)

    if (existingUser) {
        console.log(`User ${email} already exists. Skipping creation.`)
    } else {
        const { error: userError } = await supabaseAdmin.auth.admin.createUser({
            email: email,
            password: tempPassword,
            email_confirm: true,
            user_metadata: {
                full_name: fullName,
                role: 'creator'
            }
        })

        if (userError) {
            console.error("Error creating user:", userError)
            throw new Error(`Failed to create user account: ${userError.message}`)
        }
    }

    // 2. Update Application Status
    const { error: updateError } = await supabase
        .from('applications')
        .update({ status: 'approved' })
        .eq('id', applicationId)

    if (updateError) {
        console.error("Error updating application:", updateError)
        // Note: User was created but status update failed. In a real app, we might want to rollback.
        throw new Error("Failed to update application status")
    }

    // 3. (Mock) Send Email
    console.log(`[EMAIL SENT] To: ${email}, Subject: Application Approved! Credentials: ${email} / ${tempPassword}`)

    revalidatePath('/dashboard/operator/applications')
    revalidatePath('/dashboard/operator/users')
}

export async function rejectApplication(applicationId: string) {
    const supabase = await createServerClient()

    const { error } = await supabase
        .from('applications')
        .update({ status: 'rejected' })
        .eq('id', applicationId)

    if (error) {
        console.error("Error rejecting application:", error)
        throw new Error("Failed to reject application")
    }

    revalidatePath('/dashboard/operator/applications')
}
