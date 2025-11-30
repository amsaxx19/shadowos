import { BusinessProvider } from "@/components/providers/business-provider"
import { MainSidebar } from "@/components/dashboard/main-sidebar"

export default function NotificationsLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <BusinessProvider>
            <div className="flex h-screen w-full bg-[#0e0e0e]">
                <MainSidebar />
                <main className="flex-1 overflow-auto">
                    {children}
                </main>
            </div>
        </BusinessProvider>
    )
}
