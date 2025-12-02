import { BusinessProvider } from "@/components/providers/business-provider"
import { MainSidebar } from "@/components/dashboard/main-sidebar"

export default function ProfileLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <BusinessProvider>
            <div className="flex h-screen overflow-hidden bg-[#0a0a0a] text-white">
                <MainSidebar />
                <main className="flex-1 overflow-y-auto">
                    {children}
                </main>
            </div>
        </BusinessProvider>
    )
}
