"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState, useEffect } from "react"
import {
    Home,
    Compass,
    LayoutDashboard,
    Bell,
    User
} from "lucide-react"
import { cn } from "@/lib/utils"
import { useBusiness } from "@/components/providers/business-provider"
import { supabase } from "@/lib/supabase/client"

export function MobileBottomNav() {
    const pathname = usePathname()
    const { activeBusiness, businesses: userBusinesses } = useBusiness()
    const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null)

    // Check if user is logged in
    useEffect(() => {
        const checkAuth = async () => {
            const { data: { user } } = await supabase.auth.getUser()
            setIsLoggedIn(!!user)
        }
        checkAuth()
    }, [])

    const dashboardHref = activeBusiness
        ? `/dashboard/${activeBusiness.id}/home`
        : (userBusinesses.length > 0 ? `/dashboard/${userBusinesses[0].id}/home` : "/dashboard")

    const navItems = [
        { href: "/home", label: "Home", icon: Home },
        { href: "/discover", label: "Discover", icon: Compass },
        { href: dashboardHref, label: "Dashboard", icon: LayoutDashboard, matchPath: "/dashboard" },
        { href: "/notifications", label: "Notifikasi", icon: Bell },
        { href: "/profile", label: "Profil", icon: User },
    ]

    // Hide on certain pages
    const hiddenPaths = ["/login", "/signup", "/dashboard/create", "/checkout"]
    const shouldHide = hiddenPaths.some(path => pathname.startsWith(path))

    // Hide for guest users on product pages
    const isProductPage = pathname.startsWith("/product")
    const isGuestOnProductPage = isProductPage && isLoggedIn === false

    if (shouldHide || !isLoggedIn) return null

    // Don't render until we know login status (prevents flash)
    if (isLoggedIn === null) return null

    return (
        <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-[#0e0e0e] border-t border-[#222] safe-area-inset-bottom">
            <div className="flex items-center justify-around h-16 px-2">
                {navItems.map((item) => {
                    const isActive = pathname === item.href ||
                        (item.matchPath && pathname.startsWith(item.matchPath))

                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={cn(
                                "flex flex-col items-center justify-center gap-1 flex-1 py-2 transition-colors",
                                isActive
                                    ? "text-white"
                                    : "text-neutral-500 active:text-white"
                            )}
                        >
                            <item.icon className={cn(
                                "h-5 w-5 transition-transform",
                                isActive && "scale-110"
                            )} />
                            <span className={cn(
                                "text-[10px] font-medium",
                                isActive && "text-white"
                            )}>
                                {item.label}
                            </span>
                        </Link>
                    )
                })}
            </div>
        </nav>
    )
}
