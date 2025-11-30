import { SidebarWrapper } from "@/components/dashboard/sidebar-wrapper"
import { DashboardProvider } from "@/components/dashboard/dashboard-context"
import { Toaster } from "@/components/ui/sonner"

export default function BusinessDashboardLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <DashboardProvider>
            <div className="flex h-screen w-full bg-[#0e0e0e] text-white overflow-hidden font-sans">
                {/* Sidebars */}
                <SidebarWrapper />

                {/* Main Content (Rest) */}
                <main className="flex-1 overflow-y-auto bg-[#0e0e0e]">
                    {children}
                </main>
                <Toaster />
            </div>
        </DashboardProvider>
    )
}
