import { MainSidebar } from "@/components/dashboard/main-sidebar"
import { MobileBottomNav } from "@/components/dashboard/mobile-bottom-nav"
import { DashboardProvider } from "@/components/dashboard/dashboard-context"
import { Toaster } from "@/components/ui/sonner"
import { createClient } from "@/lib/supabase/server"

import { BusinessProvider } from "@/components/providers/business-provider"

export default async function DiscoverLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (user) {
        return (
            <DashboardProvider>
                <BusinessProvider>
                    <div className="flex h-screen w-full bg-[#0e0e0e] text-white overflow-hidden font-sans">
                        {/* Sidebar hidden on mobile */}
                        <div className="hidden md:block">
                            <MainSidebar />
                        </div>
                        <main className="flex-1 overflow-y-auto bg-[#0e0e0e] pb-20 md:pb-0">
                            {children}
                        </main>
                        {/* Mobile Bottom Nav */}
                        <MobileBottomNav />
                        <Toaster />
                    </div>
                </BusinessProvider>
            </DashboardProvider>
        )
    }

    // Public Layout for non-authenticated users
    return (
        <BusinessProvider>
            <div className="min-h-screen bg-[#0e0e0e] text-white font-sans flex flex-col">
                <main className="flex-1 pb-20 md:pb-0">
                    {children}
                </main>
                {/* Mobile Bottom Nav for public too */}
                <MobileBottomNav />
                <Toaster />
            </div>
        </BusinessProvider>
    )
}

