import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import ProfileForm from "./profile-form"

export default async function ProfilePage() {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
        redirect("/login")
    }

    // Fetch extended user profile data
    const { data: userProfile } = await supabase
        .from("users")
        .select("*")
        .eq("id", user.id)
        .single()

    // Combine auth user data with profile data
    const userData = {
        id: user.id,
        email: user.email!,
        full_name: userProfile?.full_name || user.user_metadata?.full_name || null,
        username: userProfile?.username || null,
        bio: userProfile?.bio || null,
        phone: userProfile?.phone || null,
    }

    return <ProfileForm user={userData} />
}
