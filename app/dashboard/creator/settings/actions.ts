'use server'

import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import { revalidatePath } from "next/cache"

export async function updatePassword(formData: FormData) {
    const supabase = await createClient()

    const password = formData.get("password") as string
    const confirmPassword = formData.get("confirmPassword") as string

    if (password !== confirmPassword) {
        return { error: "Passwords do not match" }
    }

    if (password.length < 6) {
        return { error: "Password must be at least 6 characters" }
    }

    const { error } = await supabase.auth.updateUser({
        password: password
    })

    if (error) {
        return { error: error.message }
    }

    revalidatePath("/dashboard/creator/settings")
    return { success: "Password updated successfully" }
}

export async function updateBankDetails(formData: FormData) {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
        return { error: "Not authenticated" }
    }

    const bankName = formData.get("bankName") as string
    const accountNumber = formData.get("accountNumber") as string
    const accountHolderName = formData.get("accountHolderName") as string

    if (!bankName || !accountNumber || !accountHolderName) {
        return { error: "All fields are required" }
    }

    const { error } = await supabase
        .from('users')
        .update({
            bank_name: bankName,
            account_number: accountNumber,
            account_holder_name: accountHolderName
        })
        .eq('id', user.id)

    if (error) {
        return { error: error.message }
    }

    revalidatePath("/dashboard/creator/settings")
    return { success: "Bank details updated successfully" }
}

export async function getBankDetails() {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) return null

    const { data } = await supabase
        .from('users')
        .select('bank_name, account_number, account_holder_name')
        .eq('id', user.id)
        .single()

    return data
}
