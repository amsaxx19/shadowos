import { BusinessProvider } from "@/components/providers/business-provider"
import { MainSidebar } from "@/components/dashboard/main-sidebar"
import { MobileBottomNav } from "@/components/dashboard/mobile-bottom-nav"

export default function HomeLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <BusinessProvider>
            <div className="flex h-screen overflow-hidden bg-[#0a0a0a] text-white">
                {/* Sidebar - show icon version on mobile, full on desktop */}
                <MainSidebar />
                <main className="flex-1 overflow-y-auto pb-20 md:pb-0">
                    {children}
                </main>
                {/* Mobile Bottom Nav */}
                <MobileBottomNav />
            </div>
        </BusinessProvider>
    )
}

