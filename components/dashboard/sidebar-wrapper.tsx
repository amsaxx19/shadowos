"use client"

import { usePathname } from "next/navigation"
import { MainSidebar } from "@/components/dashboard/main-sidebar"
import { BusinessSidebar } from "@/components/dashboard/business-sidebar"

export function SidebarWrapper() {
    const pathname = usePathname()
    const isBusinessDashboard = pathname.startsWith("/dashboard/") && pathname !== "/dashboard"

    // Hide sidebars on full-screen pages like create product
    const isFullScreenPage = pathname.includes("/products/create") || pathname.includes("/products/edit")

    if (isFullScreenPage) {
        return null
    }

    return (
        <>
            <MainSidebar />
            {isBusinessDashboard && <BusinessSidebar />}
        </>
    )
}
