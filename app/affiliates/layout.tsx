import { SidebarWrapper } from "@/components/dashboard/sidebar-wrapper"

import { BusinessProvider } from "@/components/providers/business-provider"
import { MainSidebar } from "@/components/dashboard/main-sidebar"

export default function AffiliatesLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <BusinessProvider>
            <div className="flex h-screen bg-[#0e0e0e]">
                <MainSidebar />
                <main className="flex-1 overflow-y-auto">
                    {children}
                </main>
            </div>
        </BusinessProvider>
    )
}
