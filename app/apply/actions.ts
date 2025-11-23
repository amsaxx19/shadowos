"use server"

import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"

export async function submitApplication(formData: FormData) {
    const supabase = await createClient()

    const full_name = formData.get("full_name") as string
    const email = formData.get("email") as string
    const instagram_link = formData.get("instagram_link") as string
    const tiktok_link = formData.get("tiktok_link") as string
    const follower_count = formData.get("follower_count") as string

    if (!full_name || !email) {
        throw new Error("Name and Email are required")
    }

    const { error } = await supabase.from("applications").insert({
        full_name,
        email,
        instagram_link,
        tiktok_link,
        follower_count,
        status: "pending"
    })

    if (error) {
        console.error("Error submitting application:", error)
        throw new Error("Failed to submit application")
    }

    redirect("/apply/success")
}
