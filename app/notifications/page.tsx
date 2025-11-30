"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Frown, Store } from "lucide-react"
import Link from "next/link"
import { cn } from "@/lib/utils"

export default function NotificationsPage() {
    const [activeTab, setActiveTab] = useState<'mentions' | 'all'>('mentions')

    return (
        <div className="flex flex-col h-full text-white">
            {/* Header */}
            <div className="p-6 border-b border-[#222]">
                <h1 className="text-xl font-bold mb-6">Notifications</h1>

                {/* Tabs */}
                <div className="flex items-center gap-6 text-sm font-medium">
                    <button
                        onClick={() => setActiveTab('mentions')}
                        className={cn(
                            "pb-2 border-b-2 transition-colors",
                            activeTab === 'mentions'
                                ? "border-blue-600 text-white"
                                : "border-transparent text-neutral-400 hover:text-white"
                        )}
                    >
                        Mentions
                    </button>
                    <button
                        onClick={() => setActiveTab('all')}
                        className={cn(
                            "pb-2 border-b-2 transition-colors",
                            activeTab === 'all'
                                ? "border-blue-600 text-white"
                                : "border-transparent text-neutral-400 hover:text-white"
                        )}
                    >
                        All activity
                    </button>
                </div>
            </div>

            {/* Content */}
            <div className="flex-1 flex flex-col items-center justify-center p-8 text-center">
                {activeTab === 'mentions' && (
                    <div className="max-w-md space-y-6">
                        <div className="h-24 w-24 mx-auto rounded-3xl bg-[#161616] border border-[#222] flex items-center justify-center">
                            <Frown className="h-10 w-10 text-neutral-500" />
                        </div>
                        <div className="space-y-2">
                            <h2 className="text-2xl font-bold">No mentions yet</h2>
                            <p className="text-neutral-400">You have not been mentioned in any whops yet</p>
                        </div>
                        <Link href="/discover">
                            <Button className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-2 h-auto rounded-lg">
                                <Store className="mr-2 h-4 w-4" />
                                Browse marketplace
                            </Button>
                        </Link>
                    </div>
                )}

                {activeTab === 'all' && (
                    <div className="max-w-md space-y-6">
                        <div className="h-24 w-24 mx-auto rounded-3xl bg-[#161616] border border-[#222] flex items-center justify-center">
                            <Frown className="h-10 w-10 text-neutral-500" />
                        </div>
                        <div className="space-y-2">
                            <h2 className="text-2xl font-bold">No mentions yet</h2>
                            <p className="text-neutral-400">Join a whop to get your first notification</p>
                        </div>
                        <Link href="/discover">
                            <Button className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-2 h-auto rounded-lg">
                                <Store className="mr-2 h-4 w-4" />
                                Browse marketplace
                            </Button>
                        </Link>
                    </div>
                )}
            </div>
        </div>
    )
}
