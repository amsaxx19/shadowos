"use client"

import { usePathname } from "next/navigation"
import { MainSidebar } from "@/components/dashboard/main-sidebar"
import { BusinessSidebar } from "@/components/dashboard/business-sidebar"

export function SidebarWrapper() {
    const pathname = usePathname()
    const isBusinessDashboard = pathname.startsWith("/dashboard/") && pathname !== "/dashboard"

    // Hide sidebars on full-screen pages and public marketplace pages
    const isFullScreenPage = pathname.includes("/products/create") || pathname.includes("/products/edit")
    const isPublicMarketplace = pathname.startsWith("/discover") || pathname.startsWith("/product/")

    if (isFullScreenPage || isPublicMarketplace) {
        return null
    }

    return (
        <>
            <MainSidebar />
            {isBusinessDashboard && <BusinessSidebar />}
        </>
    )
}
