"use server"

import { createClient } from "@/lib/supabase/server"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"

export async function updateProfile(formData: FormData) {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
        redirect("/login")
    }

    const fullName = formData.get("full_name") as string
    const bio = formData.get("bio") as string
    const username = formData.get("username") as string
    const phone = formData.get("phone") as string

    // Basic validation
    if (!username) {
        return { error: "Username is required" }
    }

    const { error } = await supabase
        .from("users")
        .update({
            full_name: fullName,
            bio: bio,
            username: username,
            phone: phone,
        })
        .eq("id", user.id)

    if (error) {
        console.error("Error updating profile:", error)
        return { error: "Failed to update profile" }
    }

    revalidatePath("/profile")
    return { success: "Profile updated successfully" }
}
