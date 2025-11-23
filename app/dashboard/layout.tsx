import { Sidebar } from "@/components/dashboard/sidebar"
import { Toaster } from "@/components/ui/sonner"
import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"

export default async function DashboardLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
        redirect("/login")
    }

    const role = (user.user_metadata.role as "operator" | "creator") || "creator"

    return (
        <div className="flex h-screen overflow-hidden bg-[#0055D4]">
            <Sidebar role={role} />
            <main className="flex-1 overflow-y-auto px-8 pt-8 pb-8">
                {children}
            </main>
            <Toaster />
        </div>
    )
}
