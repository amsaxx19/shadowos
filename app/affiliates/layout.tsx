import { SidebarWrapper } from "@/components/dashboard/sidebar-wrapper"

export default function AffiliatesLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <div className="flex h-screen w-full bg-[#0e0e0e] text-white overflow-hidden font-sans">
            <SidebarWrapper />
            <main className="flex-1 overflow-y-auto bg-[#0e0e0e]">
                {children}
            </main>
        </div>
    )
}
