import { MainSidebar } from "@/components/dashboard/main-sidebar"
import { DashboardProvider } from "@/components/dashboard/dashboard-context"
import { Toaster } from "@/components/ui/sonner"
import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"

export default async function MessagesLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
        redirect("/login")
    }

    return (
        <DashboardProvider>
            <div className="flex h-screen w-full bg-[#0e0e0e] text-white overflow-hidden font-sans">
                {/* Sidebar (240px) */}
                <MainSidebar />

                {/* Main Content (Rest) */}
                <main className="flex-1 overflow-hidden bg-[#0e0e0e]">
                    {children}
                </main>
                <Toaster />
            </div>
        </DashboardProvider>
    )
}
