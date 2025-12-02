"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"
import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"
import { cn } from "@/lib/utils"
import { supabase } from "@/lib/supabase/client"
import { useEffect, useState } from "react"
import { User } from "@supabase/supabase-js"

export function SearchHeader({
    initialQuery,
    initialCategory
}: {
    initialQuery: string
    initialCategory: string
}) {
    const router = useRouter()
    const [user, setUser] = useState<User | null>(null)

    useEffect(() => {
        const getUser = async () => {
            const { data: { user } } = await supabase.auth.getUser()
            setUser(user)
        }
        getUser()
    }, [])

    const tabs = [
        { id: "all", label: "Semua" },
        { id: "paid_groups", label: "Grup Berbayar" },
        { id: "courses", label: "Kursus & Coaching" },
        { id: "software", label: "Software" },
        { id: "community", label: "Komunitas" },
        { id: "other", label: "Lainnya" },
    ]

    const handleSearch = (term: string) => {
        const params = new URLSearchParams()
        if (term) params.set("q", term)
        if (initialCategory && initialCategory !== "all") params.set("category", initialCategory)
        router.push(`/discover/search?${params.toString()}`)
    }

    const handleTabChange = (tabId: string) => {
        const params = new URLSearchParams()
        if (initialQuery) params.set("q", initialQuery)
        if (tabId !== "all") params.set("category", tabId)
        router.push(`/discover/search?${params.toString()}`)
    }

    return (
        <div className="sticky top-0 z-50 bg-[#0e0e0e] border-b border-[#222]">
            <div className="max-w-7xl mx-auto px-4 h-16 flex items-center gap-4">
                <Link href="/discover" className="flex items-center gap-2 text-xl font-bold mr-4">
                    <span className="text-orange-500">⚡</span> CUANBOSS
                </Link>

                <div className="flex-1 max-w-2xl relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-500" />
                    <Input
                        defaultValue={initialQuery}
                        onKeyDown={(e) => {
                            if (e.key === "Enter") {
                                handleSearch(e.currentTarget.value)
                            }
                        }}
                        className="w-full bg-[#1c1c1c] border-[#333] text-white pl-10 h-10 rounded-full focus:ring-0 focus:border-neutral-500"
                    />
                </div>

                <div className="ml-auto flex items-center gap-3">
                    {/* DEBUG: Temporary Indicator */}
                    <div className="text-xs text-neutral-500 mr-2 border border-neutral-800 px-2 py-1 rounded">
                        {user ? `Logged in: ${user.email}` : "Mode: Guest"}
                    </div>

                    {user ? (
                        <div className="flex items-center gap-2">
                            <Link href="/dashboard">
                                <Button variant="ghost" className="text-neutral-400 hover:text-white font-medium">
                                    Dashboard
                                </Button>
                            </Link>
                            <Button
                                variant="ghost"
                                className="text-red-500 hover:text-red-400 hover:bg-red-500/10 font-medium"
                                onClick={async () => {
                                    await supabase.auth.signOut()
                                    window.location.reload()
                                }}
                            >
                                Logout
                            </Button>
                        </div>
                    ) : (
                        <Link href="/login">
                            <Button variant="ghost" className="text-neutral-400 hover:text-white font-medium">
                                Log in
                            </Button>
                        </Link>
                    )}
                    <Link href="/sell">
                        <Button className="bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white font-medium rounded-md px-4 h-9 text-sm shadow-lg shadow-orange-500/20 border border-orange-500/50">
                            Mulai Jualan
                        </Button>
                    </Link>
                </div>
            </div>

            {/* Filter Tabs */}
            <div className="max-w-7xl mx-auto px-4 overflow-x-auto scrollbar-hide">
                <div className="flex items-center gap-6 h-12 text-sm font-medium text-neutral-400">
                    {tabs.map(tab => (
                        <button
                            key={tab.id}
                            onClick={() => handleTabChange(tab.id)}
                            className={cn(
                                "h-full border-b-2 transition-colors whitespace-nowrap px-1",
                                (initialCategory === tab.id || (initialCategory === "" && tab.id === "all"))
                                    ? "text-white border-white"
                                    : "border-transparent hover:text-white"
                            )}
                        >
                            {tab.label}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    )
}
