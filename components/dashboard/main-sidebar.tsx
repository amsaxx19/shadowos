"use client"

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
    Search,
    Plus,
    Menu,
    HelpCircle
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { useBusiness } from "@/components/providers/business-provider"

export function MainSidebar() {
    const pathname = usePathname()
    const { activeBusiness, businesses: userBusinesses } = useBusiness()

    // Check if we are in a business dashboard context (e.g. /dashboard/[id])
    // But NOT just /dashboard (which is the user home)
    const isBusinessDashboard = pathname.startsWith("/dashboard/") && pathname !== "/dashboard"

    const dashboardHref = activeBusiness ? `/dashboard/${activeBusiness.id}/home` : (userBusinesses.length > 0 ? `/dashboard/${userBusinesses[0].id}/home` : "/dashboard")

    const mainLinks = [
        { href: "/dashboard", label: "Home", icon: Home },
        { href: "/discover", label: "Discover", icon: Compass },
        { href: "/messages", label: "Messages", icon: MessageCircle, badge: 1 },
        { href: "/notifications", label: "Notifications", icon: Bell },
        { href: dashboardHref, label: "Dashboard", icon: LayoutDashboard },
        { href: "/affiliates", label: "Affiliates", icon: Ticket },
        { href: "/profile", label: "Profile", icon: User },
    ]

    // Use real businesses if available, otherwise fallback (or empty)
    const displayBusinesses = userBusinesses.length > 0 ? userBusinesses.map(b => ({
        name: b.name,
        initials: b.name.substring(0, 2).toUpperCase(),
        href: `/dashboard/${b.id}/home`
    })) : [
        { name: "CUANBOSS Inc.", initials: "CB", href: dashboardHref },
    ]

    if (isBusinessDashboard) {
        return (
            <div className="flex h-full w-[70px] flex-col border-r border-[#222] bg-[#0e0e0e] text-neutral-400 z-20 items-center">
                {/* Header: Logo Icon Only - Matches h-16 of full sidebar */}
                <div className="flex h-16 w-full items-center justify-center mb-2">
                    <span className="text-orange-500 font-bold text-2xl">⚡</span>
                </div>

                {/* Icons Navigation - Matches space-y-1 of full sidebar */}
                <nav className="space-y-1 flex flex-col items-center w-full px-2">
                    {mainLinks.map((link) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            className={cn(
                                "flex items-center justify-center h-10 w-10 rounded-md transition-all duration-200 relative group",
                                pathname === link.href || (link.label === "Dashboard" && pathname.includes("/dashboard/operator"))
                                    ? "bg-[#222] text-white"
                                    : "text-neutral-400 hover:text-white hover:bg-[#161616]"
                            )}
                        >
                            <link.icon className="h-5 w-5" />
                            {/* Tooltip on hover */}
                            <span className="absolute left-12 bg-[#222] text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-50 pointer-events-none border border-[#333]">
                                {link.label}
                            </span>
                            {link.badge && (
                                <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-red-500 text-[9px] font-bold text-white flex items-center justify-center border-2 border-[#0e0e0e]">
                                    {link.badge}
                                </span>
                            )}
                        </Link>
                    ))}
                </nav>

                <div className="flex-1" />

                {/* Footer Icons */}
                <div className="space-y-4 flex flex-col items-center w-full mt-auto">
                    <button className="h-10 w-10 flex items-center justify-center hover:text-white transition-colors">
                        <Menu className="h-5 w-5" />
                    </button>
                    <button className="h-10 w-10 flex items-center justify-center hover:text-white transition-colors">
                        <HelpCircle className="h-5 w-5" />
                    </button>
                </div>
            </div>
        )
    }

    return (
        <div className="flex h-full w-[240px] flex-col border-r border-[#222] bg-[#0e0e0e] text-neutral-400 z-20">
            {/* Header: Logo */}
            <div className="flex h-16 items-center px-6">
                <div className="flex items-center gap-2 text-white font-bold text-xl">
                    <span className="text-orange-500">⚡</span> CUANBOSS
                </div>
            </div>

            <div className="flex-1 overflow-auto py-2 px-3 space-y-6">
                {/* Main Navigation */}
                <nav className="space-y-1">
                    {mainLinks.map((link) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            className={cn(
                                "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-all duration-200",
                                pathname === link.href || (link.label === "Dashboard" && pathname.includes("/dashboard/operator"))
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

                {/* YOUR WHOPS */}
                <div>
                    <div className="flex items-center justify-between px-3 mb-2">
                        <span className="text-[11px] font-bold text-neutral-500 uppercase tracking-wider">
                            BISNIS ANDA
                        </span>
                        <Search className="h-4 w-4 text-neutral-500 cursor-pointer hover:text-white" />
                    </div>
                    <nav className="space-y-1">
                        {displayBusinesses.map((biz) => (
                            <Link
                                key={biz.name}
                                href={biz.href}
                                className="flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-neutral-400 hover:text-white hover:bg-[#161616] transition-all"
                            >
                                <div className="h-8 w-8 rounded-md bg-[#222] flex items-center justify-center text-xs font-bold text-neutral-300 border border-[#333]">
                                    {biz.initials}
                                </div>
                                <span className="truncate">{biz.name}</span>
                            </Link>
                        ))}

                        <button className="flex w-full items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-neutral-400 hover:text-white hover:bg-[#161616] transition-all">
                            <div className="h-8 w-8 rounded-md bg-[#161616] flex items-center justify-center border border-[#333]">
                                <Plus className="h-4 w-4" />
                            </div>
                            <span>New business</span>
                        </button>
                    </nav>
                </div>
            </div>

            {/* Footer */}
            <div className="p-4 border-t border-[#222]">
                <div className="flex items-center justify-between text-neutral-400">
                    <button className="flex items-center gap-2 hover:text-white transition-colors">
                        <Menu className="h-5 w-5" />
                        <span className="text-sm font-medium">Menu</span>
                    </button>
                    <HelpCircle className="h-5 w-5 hover:text-white cursor-pointer transition-colors" />
                </div>
            </div>
        </div>
    )
}
