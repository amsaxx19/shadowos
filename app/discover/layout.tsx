import { MainSidebar } from "@/components/dashboard/main-sidebar"
import { Button } from "@/components/ui/button"
import { DashboardProvider } from "@/components/dashboard/dashboard-context"
import { Toaster } from "@/components/ui/sonner"
import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"

import { BusinessProvider } from "@/components/providers/business-provider"

export default async function DiscoverLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    // Allow public access
    // if (!user) {
    //     redirect("/login")
    // }

    if (user) {
        return (
            <DashboardProvider>
                <BusinessProvider>
                    <div className="flex h-screen w-full bg-[#0e0e0e] text-white overflow-hidden font-sans">
                        <MainSidebar />
                        <main className="flex-1 overflow-y-auto bg-[#0e0e0e]">
                            {children}
                        </main>
                        <Toaster />
                    </div>
                </BusinessProvider>
            </DashboardProvider>
        )
    }

    // Public Layout for non-authenticated users
    return (
        <div className="min-h-screen bg-[#0e0e0e] text-white font-sans flex flex-col">
            <main className="flex-1">
                {children}
            </main>
            <Toaster />
        </div>
    )
}
