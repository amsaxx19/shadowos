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

    const operatorLinks = [
        { href: "/dashboard/operator", label: "Ringkasan", icon: LayoutDashboard },
        { href: "/dashboard/operator/products", label: "Produk", icon: Package },
        { href: "/dashboard/operator/creators", label: "Mitra Creator", icon: Users },
        { href: "/dashboard/operator/applications", label: "Daftar Pengajuan", icon: FileText },
        { href: "/dashboard/operator/withdrawals", label: "Pencairan Dana", icon: Receipt },
    ]

    const creatorLinks = [
        { href: "/dashboard/creator", label: "Ringkasan", icon: LayoutDashboard },
        { href: "/dashboard/creator/products", label: "Produk Saya", icon: Package },
        { href: "/dashboard/creator/wallet", label: "Dompet Saya", icon: Wallet },
        { href: "/dashboard/creator/marketing", label: "Bahan Promosi", icon: Megaphone },
        { href: "/dashboard/creator/settings", label: "Pengaturan", icon: Settings },
    ]

    const links = role === "operator" ? operatorLinks : creatorLinks

    return (
        <div className="flex h-full w-64 flex-col border-r border-blue-100 bg-white shadow-xl z-20 relative">
            <div className="flex h-16 items-center border-b border-blue-50 px-6 bg-white">
                <div className="flex items-center gap-2">
                    <div className="h-8 w-8 rounded-lg bg-[#0055D4] flex items-center justify-center text-white shadow-md">
                        <LayoutDashboard className="h-5 w-5" />
                    </div>
                    <span className="text-lg font-bold tracking-tight text-blue-950">
                        ShadowOS
                    </span>
                </div>
                <span className="ml-auto rounded-full bg-blue-50 border border-blue-100 px-2 py-0.5 text-[10px] font-bold text-blue-600 uppercase tracking-wider">
                    {role}
                </span>
            </div>
            <div className="flex-1 overflow-auto py-6">
                <nav className="grid items-start px-4 text-sm font-medium gap-1.5">
                    {links.map((link) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            className={cn(
                                "flex items-center gap-3 rounded-lg px-3 py-2.5 transition-all duration-200",
                                pathname === link.href
                                    ? "bg-[#0055D4] text-white shadow-md shadow-blue-500/20 font-semibold"
                                    : "text-blue-500 hover:text-blue-700 hover:bg-blue-50"
                            )}
                        >
                            <link.icon className={cn("h-4 w-4", pathname === link.href ? "text-white" : "text-blue-400")} />
                            {link.label}
                        </Link>
                    ))}
                </nav>
            </div>
            <div className="border-t border-blue-50 p-4 bg-blue-50/30">
                <Button
                    variant="ghost"
                    className="w-full justify-start gap-2 text-blue-500 hover:text-red-600 hover:bg-red-50"
                    onClick={async () => {
                        await supabase.auth.signOut()
                        window.location.href = '/'
                    }}
                >
                    <LogOut className="h-4 w-4" />
                    Keluar
                </Button>
            </div>
        </div>
    )
}
