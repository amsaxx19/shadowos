"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import {
    Home,
    ShoppingBag,
    Link as LinkIcon,
    Store,
    Users,
    CreditCard,
    FileText,
    DollarSign,
    Target,
    Ticket,
    Share2,
    Plus,
    Search,
    ChevronDown
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { useBusiness } from "@/components/providers/business-provider"

interface SidebarLink {
    href: string
    label: string
    icon: any
    badge?: string
}

export function BusinessSidebar() {
    const pathname = usePathname()
    const { activeBusiness, businesses, switchBusiness } = useBusiness()

    const generalLinks: SidebarLink[] = [
        { href: `/dashboard/${activeBusiness?.id}/home`, label: "Home", icon: Home },
        { href: `/dashboard/${activeBusiness?.id}/products`, label: "Products", icon: ShoppingBag },
        { href: `/dashboard/${activeBusiness?.id}/checkout-links`, label: "Checkout links", icon: LinkIcon },
        { href: `/dashboard/${activeBusiness?.id}/store`, label: "My store", icon: Store },
    ]

    const userLinks: SidebarLink[] = [
        { href: `/dashboard/${activeBusiness?.id}/users`, label: "Users", icon: Users },
    ]

    const paymentLinks: SidebarLink[] = [
        { href: `/dashboard/${activeBusiness?.id}/payments`, label: "Payments", icon: CreditCard },
        { href: `/dashboard/${activeBusiness?.id}/invoices`, label: "Invoices", icon: FileText },
        { href: `/dashboard/${activeBusiness?.id}/payouts`, label: "Payouts", icon: DollarSign },
    ]

    const marketingLinks: SidebarLink[] = [
        { href: `/dashboard/${activeBusiness?.id}/tracking`, label: "Tracking links", icon: Target },
        { href: `/dashboard/${activeBusiness?.id}/promo-codes`, label: "Promo codes", icon: Ticket },
        { href: `/dashboard/${activeBusiness?.id}/affiliates`, label: "Affiliates", icon: Share2 },
    ]

    if (!activeBusiness) return null

    return (
        <div className="flex h-full w-[240px] flex-col border-r border-[#222] bg-[#0e0e0e] text-neutral-400">
            {/* Header */}
            <div className="flex h-16 items-center justify-between px-4 border-b border-[#222]">
                <div className="relative group">
                    <button className="flex items-center gap-2 hover:text-white transition-colors text-left">
                        <div className="h-6 w-6 rounded bg-[#222] flex items-center justify-center border border-[#333] text-[10px] font-bold text-white overflow-hidden">
                            {activeBusiness.logo_url ? (
                                <img src={activeBusiness.logo_url} alt={activeBusiness.name} className="h-full w-full object-cover" />
                            ) : (
                                activeBusiness.name.substring(0, 2).toUpperCase()
                            )}
                        </div>
                        <span className="text-sm font-bold text-white truncate max-w-[100px]">{activeBusiness.name}</span>
                        <ChevronDown className="h-4 w-4" />
                    </button>

                    {/* Business Switcher Dropdown */}
                    <div className="absolute top-full left-0 mt-2 w-56 bg-[#1a1a1a] border border-[#333] rounded-lg shadow-xl overflow-hidden hidden group-focus-within:block z-50">
                        <div className="p-2 space-y-1">
                            <div className="px-2 py-1 text-xs font-medium text-neutral-500 uppercase">Switch Business</div>
                            {businesses.map((biz) => (
                                <button
                                    key={biz.id}
                                    onClick={() => switchBusiness(biz.id)}
                                    className={cn(
                                        "flex items-center gap-3 w-full px-2 py-2 rounded-md text-sm transition-colors",
                                        activeBusiness.id === biz.id ? "bg-[#222] text-white" : "text-neutral-400 hover:text-white hover:bg-[#222]"
                                    )}
                                >
                                    <div className="h-5 w-5 rounded bg-[#333] flex items-center justify-center text-[8px] font-bold text-white">
                                        {biz.name.substring(0, 2).toUpperCase()}
                                    </div>
                                    <span className="truncate">{biz.name}</span>
                                </button>
                            ))}
                            <div className="border-t border-[#333] my-1" />
                            <button className="flex items-center gap-3 w-full px-2 py-2 rounded-md text-sm text-neutral-400 hover:text-white hover:bg-[#222]">
                                <Plus className="h-4 w-4" />
                                <span>Create new business</span>
                            </button>
                        </div>
                    </div>
                </div>

                <div className="flex items-center gap-1">
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-neutral-400 hover:text-white">
                        <Search className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8 bg-blue-600 text-white hover:bg-blue-700 rounded-md">
                        <Plus className="h-4 w-4" />
                    </Button>
                </div>
            </div>

            <div className="flex-1 overflow-auto py-4 px-2 space-y-6">
                {/* General */}
                <div>
                    <div className="px-2 mb-2 text-[11px] font-bold text-neutral-500 uppercase tracking-wider">
                        GENERAL
                    </div>
                    <nav className="space-y-0.5">
                        {generalLinks.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                className={cn(
                                    "flex items-center gap-3 rounded-md px-2 py-1.5 text-sm font-medium transition-all duration-200",
                                    pathname.startsWith(link.href)
                                        ? "bg-[#222] text-white"
                                        : "text-neutral-400 hover:text-white hover:bg-[#161616]"
                                )}
                            >
                                <link.icon className="h-4 w-4" />
                                <span className="flex-1">{link.label}</span>
                                {link.badge && (
                                    <span className="px-1.5 py-0.5 rounded bg-blue-600 text-[10px] font-bold text-white">
                                        {link.badge}
                                    </span>
                                )}
                            </Link>
                        ))}
                    </nav>
                </div>

                {/* User Management */}
                <div>
                    <div className="px-2 mb-2 text-[11px] font-bold text-neutral-500 uppercase tracking-wider flex items-center gap-1 cursor-pointer hover:text-neutral-300">
                        USER MANAGEMENT <ChevronDown className="h-3 w-3" />
                    </div>
                    <nav className="space-y-0.5">
                        {userLinks.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                className={cn(
                                    "flex items-center gap-3 rounded-md px-2 py-1.5 text-sm font-medium transition-all duration-200",
                                    pathname.startsWith(link.href)
                                        ? "bg-[#222] text-white"
                                        : "text-neutral-400 hover:text-white hover:bg-[#161616]"
                                )}
                            >
                                <link.icon className="h-4 w-4" />
                                <span>{link.label}</span>
                            </Link>
                        ))}
                    </nav>
                </div>

                {/* Payments */}
                <div>
                    <div className="px-2 mb-2 text-[11px] font-bold text-neutral-500 uppercase tracking-wider flex items-center gap-1 cursor-pointer hover:text-neutral-300">
                        PAYMENTS <ChevronDown className="h-3 w-3" />
                    </div>
                    <nav className="space-y-0.5">
                        {paymentLinks.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                className={cn(
                                    "flex items-center gap-3 rounded-md px-2 py-1.5 text-sm font-medium transition-all duration-200",
                                    pathname.startsWith(link.href)
                                        ? "bg-[#222] text-white"
                                        : "text-neutral-400 hover:text-white hover:bg-[#161616]"
                                )}
                            >
                                <link.icon className="h-4 w-4" />
                                <span>{link.label}</span>
                            </Link>
                        ))}
                    </nav>
                </div>

                {/* Marketing */}
                <div>
                    <div className="px-2 mb-2 text-[11px] font-bold text-neutral-500 uppercase tracking-wider flex items-center gap-1 cursor-pointer hover:text-neutral-300">
                        MARKETING <ChevronDown className="h-3 w-3" />
                    </div>
                    <nav className="space-y-0.5">
                        {marketingLinks.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                className={cn(
                                    "flex items-center gap-3 rounded-md px-2 py-1.5 text-sm font-medium transition-all duration-200",
                                    pathname.startsWith(link.href)
                                        ? "bg-[#222] text-white"
                                        : "text-neutral-400 hover:text-white hover:bg-[#161616]"
                                )}
                            >
                                <link.icon className="h-4 w-4" />
                                <span>{link.label}</span>
                            </Link>
                        ))}
                    </nav>
                </div>

                {/* Apps */}
                <div>
                    <div className="px-2 mb-2 text-[11px] font-bold text-neutral-500 uppercase tracking-wider flex items-center gap-1 cursor-pointer hover:text-neutral-300">
                        APPS <ChevronDown className="h-3 w-3" />
                    </div>
                    <button className="flex w-full items-center gap-3 rounded-md px-2 py-1.5 text-sm font-medium text-neutral-400 hover:text-white hover:bg-[#161616] transition-all">
                        <div className="h-4 w-4 rounded-full border border-neutral-500 flex items-center justify-center">
                            <Plus className="h-3 w-3" />
                        </div>
                        <span>Add</span>
                    </button>
                </div>
            </div>
        </div>
    )
}
