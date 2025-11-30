"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { LayoutDashboard, Package, Users, Wallet, LogOut, FileText, Receipt, Settings, Megaphone } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { supabase } from "@/lib/supabase/client"

interface SidebarProps {
    role: "operator" | "creator"
}

export function Sidebar({ role }: SidebarProps) {
    const pathname = usePathname()

    // TOP SECTION: General Navigation
    const generalLinks = [
        { href: "/", label: "Home", icon: LayoutDashboard },
        { href: "/discover", label: "Marketplace", icon: Package }, // Was "Jelajah"
        { href: "/messages", label: "Messages", icon: Megaphone }, // Placeholder
        { href: "/notifications", label: "Notifications", icon: Receipt }, // Placeholder icon
    ]

    // BOTTOM SECTION: Business Navigation (Role specific)
    const operatorLinks = [
        { href: "/dashboard/operator", label: "Dashboard", icon: LayoutDashboard },
        { href: "/dashboard/operator/products", label: "Produk", icon: Package },
        { href: "/dashboard/operator/creators", label: "Afiliasi", icon: Users },
        { href: "/dashboard/operator/applications", label: "Daftar Pengajuan", icon: FileText },
        { href: "/dashboard/operator/withdrawals", label: "Pencairan Dana", icon: Receipt },
    ]

    const creatorLinks = [
        { href: "/dashboard/creator", label: "Dashboard", icon: LayoutDashboard },
        { href: "/dashboard/creator/products", label: "Produk Saya", icon: Package },
        { href: "/dashboard/creator/wallet", label: "Dompet Saya", icon: Wallet },
        { href: "/dashboard/creator/marketing", label: "Bahan Promosi", icon: Megaphone },
        { href: "/dashboard/creator/settings", label: "Pengaturan", icon: Settings },
    ]

    const businessLinks = role === "operator" ? operatorLinks : creatorLinks

    return (
        // 1. Visual Style: Dark Black/Charcoal Background (#0f0f0f)
        <div className="flex h-full w-64 flex-col border-r border-neutral-800 bg-[#0f0f0f] text-neutral-400 shadow-xl z-20 relative">

            {/* 3. Logo: Minimalist White */}
            <div className="flex h-16 items-center px-6">
                <div className="flex items-center gap-2">
                    <div className="h-8 w-8 rounded-lg bg-white flex items-center justify-center text-black shadow-md">
                        <LayoutDashboard className="h-5 w-5" />
                    </div>
                    <span className="text-lg font-bold tracking-tight text-white">
                        ShadowOS
                    </span>
                </div>
            </div>

            <div className="flex-1 overflow-auto py-4 px-3 space-y-8">
                {/* TOP SECTION: General Navigation */}
                <nav className="grid items-start gap-1">
                    {generalLinks.map((link) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            className={cn(
                                "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-all duration-200",
                                pathname === link.href
                                    ? "bg-neutral-800 text-white" // 4. Active State: Subtle Dark Gray
                                    : "text-neutral-400 hover:text-white hover:bg-neutral-900"
                            )}
                        >
                            <link.icon className={cn("h-5 w-5", pathname === link.href ? "text-white" : "text-neutral-400")} />
                            {link.label}
                        </Link>
                    ))}
                </nav>

                {/* BOTTOM SECTION: Your Business */}
                <div>
                    <div className="px-3 mb-2 text-xs font-bold text-neutral-500 uppercase tracking-wider">
                        BISNIS SAYA
                    </div>
                    <nav className="grid items-start gap-1">
                        {businessLinks.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                className={cn(
                                    "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-all duration-200",
                                    pathname === link.href
                                        ? "bg-neutral-800 text-white"
                                        : "text-neutral-400 hover:text-white hover:bg-neutral-900"
                                )}
                            >
                                <link.icon className={cn("h-5 w-5", pathname === link.href ? "text-white" : "text-neutral-400")} />
                                {link.label}
                            </Link>
                        ))}
                    </nav>

                    {/* + New Business Button */}
                    <div className="mt-2 px-1">
                        <Button variant="ghost" className="w-full justify-start gap-2 text-neutral-400 hover:text-white hover:bg-neutral-900 px-2">
                            <div className="h-5 w-5 rounded bg-neutral-800 flex items-center justify-center border border-neutral-700">
                                <span className="text-xs font-bold">+</span>
                            </div>
                            New Business
                        </Button>
                    </div>
                </div>
            </div>

            {/* 3. User Profile: Sticky Footer */}
            <div className="border-t border-neutral-800 p-4 bg-[#0f0f0f]">
                <div className="flex items-center gap-3 w-full p-2 rounded-md hover:bg-neutral-900 cursor-pointer transition-colors">
                    <div className="h-8 w-8 rounded-full bg-neutral-700 flex items-center justify-center overflow-hidden">
                        <Users className="h-4 w-4 text-neutral-400" />
                    </div>
                    <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-white truncate">User Profile</p>
                        <p className="text-xs text-neutral-500 truncate capitalize">{role}</p>
                    </div>
                    <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-neutral-400 hover:text-white"
                        onClick={async () => {
                            await supabase.auth.signOut()
                            window.location.href = '/'
                        }}
                    >
                        <LogOut className="h-4 w-4" />
                    </Button>
                </div>
            </div>
        </div>
    )
}
