"use client"

import { usePathname } from "next/navigation"
import { MainSidebar } from "@/components/dashboard/main-sidebar"
import { BusinessSidebar } from "@/components/dashboard/business-sidebar"

export function SidebarWrapper() {
    const pathname = usePathname()
    const isBusinessDashboard = pathname.startsWith("/dashboard/") && pathname !== "/dashboard"

    return (
        <>
            <MainSidebar />
            {isBusinessDashboard && <BusinessSidebar />}
        </>
    )
}
