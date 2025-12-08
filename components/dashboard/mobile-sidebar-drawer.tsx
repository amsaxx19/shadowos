"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
    Home,
    Compass,
    MessageCircle,
    Bell,
    LayoutDashboard,
    Ticket,
    User,
    X,
    Plus,
    ChevronRight,
    Settings,
    CreditCard,
    Package,
    Users,
    Receipt,
    Wallet
} from "lucide-react"
import { cn } from "@/lib/utils"
import { useBusiness } from "@/components/providers/business-provider"

interface MobileSidebarDrawerProps {
    isOpen: boolean
    onClose: () => void
}

export function MobileSidebarDrawer({ isOpen, onClose }: MobileSidebarDrawerProps) {
    const pathname = usePathname()
    const { activeBusiness, businesses: userBusinesses, isLoading } = useBusiness()

    // Close on route change
    useEffect(() => {
        onClose()
    }, [pathname, onClose])

    // Prevent scroll when open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden'
        } else {
            document.body.style.overflow = ''
        }
        return () => {
            document.body.style.overflow = ''
        }
    }, [isOpen])

    const dashboardHref = activeBusiness
        ? `/dashboard/${activeBusiness.id}/home`
        : (userBusinesses.length > 0 ? `/dashboard/${userBusinesses[0].id}/home` : "/dashboard")

    const mainLinks = [
        { href: "/home", label: "Home", icon: Home },
        { href: "/discover", label: "Discover", icon: Compass },
        { href: "/messages", label: "Messages", icon: MessageCircle, badge: 1 },
        { href: "/notifications", label: "Notifications", icon: Bell },
        { href: dashboardHref, label: "Dashboard", icon: LayoutDashboard },
        { href: "/affiliates", label: "Affiliates", icon: Ticket },
        { href: "/profile", label: "Profile", icon: User },
    ]

    // Business-specific links (only show when in business dashboard)
    const isBusinessDashboard = pathname.startsWith("/dashboard/") && pathname !== "/dashboard"
    const businessId = isBusinessDashboard ? pathname.split("/")[2] : null

    const businessLinks = businessId ? [
        { href: `/dashboard/${businessId}/home`, label: "Overview", icon: LayoutDashboard },
        { href: `/dashboard/${businessId}/products`, label: "Products", icon: Package },
        { href: `/dashboard/${businessId}/users`, label: "Customers", icon: Users },
        { href: `/dashboard/${businessId}/invoices`, label: "Invoices", icon: Receipt },
        { href: `/dashboard/${businessId}/payments`, label: "Payments", icon: CreditCard },
        { href: `/dashboard/${businessId}/payouts`, label: "Payouts", icon: Wallet },
        { href: `/dashboard/${businessId}/store`, label: "Settings", icon: Settings },
    ] : []

    const displayBusinesses = userBusinesses.map(b => ({
        name: b.name,
        initials: b.name.substring(0, 2).toUpperCase(),
        href: `/dashboard/${b.id}/home`
    }))

    return (
        <>
            {/* Backdrop */}
            <div
                className={cn(
                    "fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] transition-opacity duration-300 md:hidden",
                    isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
                )}
                onClick={onClose}
            />

            {/* Drawer */}
            <div
                className={cn(
                    "fixed top-0 left-0 h-full w-[280px] bg-[#0e0e0e] border-r border-[#222] z-[101] transform transition-transform duration-300 ease-out md:hidden overflow-y-auto",
                    isOpen ? "translate-x-0" : "-translate-x-full"
                )}
            >
                {/* Header */}
                <div className="flex items-center justify-between h-14 px-4 border-b border-[#222]">
                    <Link href="/" className="flex items-center gap-2" onClick={onClose}>
                        <span className="text-orange-500 font-bold text-xl">⚡</span>
                        <span className="text-white font-bold">CUANBOSS</span>
                    </Link>
                    <button
                        onClick={onClose}
                        className="p-2 text-neutral-400 hover:text-white transition-colors"
                    >
                        <X className="h-5 w-5" />
                    </button>
                </div>

                {/* Content */}
                <div className="p-4 space-y-6">
                    {/* Main Navigation */}
                    <nav className="space-y-1">
                        {mainLinks.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                className={cn(
                                    "flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium transition-all",
                                    pathname === link.href || (link.label === "Dashboard" && pathname.includes("/dashboard/"))
                                        ? "bg-[#222] text-white"
                                        : "text-neutral-400 hover:text-white hover:bg-[#161616]"
                                )}
                            >
                                <link.icon className="h-5 w-5" />
                                <span className="flex-1">{link.label}</span>
                                {link.badge && (
                                    <span className="flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white">
                                        {link.badge}
                                    </span>
                                )}
                            </Link>
                        ))}
                    </nav>

                    {/* Business Links (when in business dashboard) */}
                    {isBusinessDashboard && businessLinks.length > 0 && (
                        <div>
                            <div className="px-3 mb-2">
                                <span className="text-[11px] font-bold text-neutral-500 uppercase tracking-wider">
                                    MANAGE BUSINESS
                                </span>
                            </div>
                            <nav className="space-y-1">
                                {businessLinks.map((link) => (
                                    <Link
                                        key={link.href}
                                        href={link.href}
                                        className={cn(
                                            "flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium transition-all",
                                            pathname === link.href
                                                ? "bg-blue-600/20 text-blue-400 border border-blue-600/30"
                                                : "text-neutral-400 hover:text-white hover:bg-[#161616]"
                                        )}
                                    >
                                        <link.icon className="h-5 w-5" />
                                        <span className="flex-1">{link.label}</span>
                                        <ChevronRight className="h-4 w-4 opacity-50" />
                                    </Link>
                                ))}
                            </nav>
                        </div>
                    )}

                    {/* Your Businesses */}
                    <div>
                        <div className="px-3 mb-2">
                            <span className="text-[11px] font-bold text-neutral-500 uppercase tracking-wider">
                                BISNIS ANDA
                            </span>
                        </div>
                        <nav className="space-y-1">
                            {isLoading ? (
                                <div className="flex items-center gap-3 px-3 py-3">
                                    <div className="h-10 w-10 rounded-xl bg-[#222] animate-pulse" />
                                    <div className="h-4 w-24 rounded bg-[#222] animate-pulse" />
                                </div>
                            ) : (
                                displayBusinesses.map((biz) => (
                                    <Link
                                        key={biz.name}
                                        href={biz.href}
                                        className="flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium text-neutral-400 hover:text-white hover:bg-[#161616] transition-all"
                                    >
                                        <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center text-xs font-bold text-white">
                                            {biz.initials}
                                        </div>
                                        <span className="truncate flex-1">{biz.name}</span>
                                        <ChevronRight className="h-4 w-4 opacity-50" />
                                    </Link>
                                ))
                            )}
                            <Link
                                href="/dashboard/create"
                                className="flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium text-neutral-400 hover:text-white hover:bg-[#161616] transition-all"
                            >
                                <div className="h-10 w-10 rounded-xl bg-[#161616] flex items-center justify-center border border-[#333] border-dashed">
                                    <Plus className="h-5 w-5" />
                                </div>
                                <span>New business</span>
                            </Link>
                        </nav>
                    </div>
                </div>
            </div>
        </>
    )
}
