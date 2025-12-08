"use client"

import { useState } from "react"
import { SidebarWrapper } from "@/components/dashboard/sidebar-wrapper"
import { DashboardProvider } from "@/components/dashboard/dashboard-context"
import { MobileSidebarDrawer } from "@/components/dashboard/mobile-sidebar-drawer"
import { Toaster } from "@/components/ui/sonner"
import Link from "next/link"

export default function BusinessDashboardLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false)

    return (
        <DashboardProvider>
            <div className="flex flex-col md:flex-row h-screen w-full bg-[#0e0e0e] text-white overflow-hidden font-sans">
                {/* Mobile Header */}
                <header className="md:hidden flex items-center justify-between h-14 px-4 border-b border-[#222] bg-[#0e0e0e] shrink-0">
                    <Link href="/" className="flex items-center gap-2">
                        <span className="text-orange-500 font-bold text-xl">⚡</span>
                        <span className="text-white font-bold">CUANBOSS</span>
                    </Link>
                    <button
                        onClick={() => setIsMobileSidebarOpen(true)}
                        className="p-2 text-neutral-400 hover:text-white active:bg-[#222] rounded-lg transition-colors"
                    >
                        <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                    </button>
                </header>

                {/* Mobile Sidebar Drawer */}
                <MobileSidebarDrawer
                    isOpen={isMobileSidebarOpen}
                    onClose={() => setIsMobileSidebarOpen(false)}
                />

                {/* Sidebars (hidden on mobile) */}
                <div className="hidden md:flex">
                    <SidebarWrapper />
                </div>

                {/* Main Content (Rest) */}
                <main className="flex-1 overflow-y-auto bg-[#0e0e0e]">
                    {children}
                </main>
                <Toaster />
            </div>
        </DashboardProvider>
    )
}
