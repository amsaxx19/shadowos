"use client"

import { Input } from "@/components/ui/input"
import { Search, Rocket, Instagram, Twitter, Youtube, X, TrendingUp, GraduationCap, Dumbbell, Coins, PenTool } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { useState, useRef, useEffect } from "react"
import { cn } from "@/lib/utils"

export default function DiscoverPage() {
    const [isSearchFocused, setIsSearchFocused] = useState(false)
    const searchRef = useRef<HTMLDivElement>(null)

    // Close search dropdown when clicking outside
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
                setIsSearchFocused(false)
            }
        }
        document.addEventListener("mousedown", handleClickOutside)
        return () => document.removeEventListener("mousedown", handleClickOutside)
    }, [])

    const tags = [
        "View Trends",
        "Learn to code in 30 days",
        "Spiritual growth groups",
        "Style guide for men",
        "Writing better essays",
        "Fitness plans",
        "Crypto signals",
        "Dropshipping courses",
        "AI tools for business",
        "Meditation guides",
        "Stock market alerts"
    ]

    const trendingSearches = [
        { icon: Dumbbell, text: "Fitness plans with meal prep" },
        { icon: Rocket, text: "AI tools for small business" },
        { icon: PenTool, text: "Automation software packs" },
        { icon: Coins, text: "NFT flipping secrets" },
        { icon: GraduationCap, text: "Wellness accountability group" },
    ]

    const categories = [
        {
            name: "Trading",
            image: "https://images.unsplash.com/photo-1611974765270-ca1258634369?w=800&auto=format&fit=crop&q=60"
        },
        {
            name: "Sports",
            image: "https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=800&auto=format&fit=crop&q=60"
        },
        {
            name: "Social media",
            image: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=800&auto=format&fit=crop&q=60"
        },
        {
            name: "Clipping",
            image: "https://images.unsplash.com/photo-1516280440614-6697288d5d38?w=800&auto=format&fit=crop&q=60"
        },
        {
            name: "Reselling",
            image: "https://images.unsplash.com/photo-1556740758-90de2929450a?w=800&auto=format&fit=crop&q=60"
        },
        {
            name: "Real estate",
            image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&auto=format&fit=crop&q=60"
        },
    ]

    return (
        <div className="min-h-screen bg-[#0e0e0e] text-white font-sans flex flex-col overflow-x-hidden">
            {/* Header / Top Bar */}
            <div className="flex items-center justify-end p-4">
                <Button className="bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md px-6 h-9 text-sm">
                    Start selling
                </Button>
            </div>

            {/* Main Content */}
            <div className="flex-1 flex flex-col items-center justify-center px-4 pb-20 w-full">

                {/* Marquee Tags Row */}
                <div className="w-full mb-16 overflow-hidden relative group">
                    <div className="flex gap-3 animate-scroll whitespace-nowrap hover:pause">
                        {/* Duplicate tags for seamless loop */}
                        {[...tags, ...tags, ...tags].map((tag, i) => (
                            <button
                                key={i}
                                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[#1c1c1c] border border-[#333] text-xs font-medium text-neutral-400 hover:text-white hover:border-neutral-500 transition-all"
                            >
                                {tag === "View Trends" && <Rocket className="h-3 w-3 text-blue-500" />}
                                {tag}
                            </button>
                        ))}
                    </div>
                    {/* Gradient Fade Edges */}
                    <div className="absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-[#0e0e0e] to-transparent pointer-events-none" />
                    <div className="absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-[#0e0e0e] to-transparent pointer-events-none" />
                </div>

                {/* Hero Logo & Search */}
                <div className="text-center mb-16 space-y-8 w-full max-w-2xl relative z-10">
                    <div className="flex flex-col items-center gap-2">
                        <div className="flex items-center gap-3 text-5xl font-bold tracking-tight">
                            <span className="text-orange-500">⚡</span> CUANBOSS
                        </div>
                        <p className="text-neutral-500 text-lg">Where the internet does business</p>
                    </div>

                    <div ref={searchRef} className="relative w-full">
                        <div className="relative z-20">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-neutral-500" />
                            <Input
                                onFocus={() => setIsSearchFocused(true)}
                                placeholder="Search CUANBOSS..."
                                className="w-full h-12 pl-12 bg-[#1c1c1c] border-[#333] text-white placeholder:text-neutral-500 rounded-xl focus:ring-0 focus:border-neutral-500 text-base"
                            />
                        </div>

                        {/* Search Dropdown */}
                        {isSearchFocused && (
                            <div className="absolute top-full left-0 right-0 mt-2 bg-[#1c1c1c] border border-[#333] rounded-xl shadow-2xl overflow-hidden p-2 z-10 animate-in fade-in zoom-in-95 duration-200">
                                <div className="p-2">
                                    <h3 className="text-xs font-medium text-neutral-500 mb-2 px-2">Trending searches</h3>
                                    <div className="space-y-1">
                                        {trendingSearches.map((item, i) => (
                                            <div key={i} className="flex items-center gap-3 p-2 rounded-lg hover:bg-[#2a2a2a] cursor-pointer group transition-colors">
                                                <item.icon className="h-4 w-4 text-neutral-500 group-hover:text-white" />
                                                <span className="text-sm text-neutral-300 group-hover:text-white">{item.text}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* Categories Grid */}
                <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {categories.map((cat) => (
                        <div
                            key={cat.name}
                            className="group relative h-40 rounded-xl overflow-hidden cursor-pointer border border-[#222]"
                        >
                            {/* Background Image */}
                            <div
                                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                                style={{ backgroundImage: `url(${cat.image})` }}
                            />
                            {/* Overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent group-hover:from-black/90 transition-all" />

                            {/* Text */}
                            <div className="absolute bottom-4 left-4">
                                <h3 className="text-lg font-bold text-white group-hover:translate-x-1 transition-transform">{cat.name}</h3>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Payouts Counter */}
                <div className="mt-24 text-center">
                    <div className="text-xl font-medium text-neutral-500">
                        <span className="text-white font-bold">$2,095,837,524</span> in payouts
                    </div>
                </div>
            </div>

            {/* Footer */}
            <footer className="border-t border-[#222] py-8 px-8 mt-auto">
                <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
                    <div className="flex flex-wrap justify-center gap-6 text-xs font-medium text-neutral-500">
                        <Link href="#" className="hover:text-white transition-colors">Learn</Link>
                        <Link href="#" className="hover:text-white transition-colors">Careers</Link>
                        <Link href="#" className="hover:text-white transition-colors">Press</Link>
                        <Link href="#" className="hover:text-white transition-colors">Brand</Link>
                        <Link href="#" className="hover:text-white transition-colors">Privacy</Link>
                        <Link href="#" className="hover:text-white transition-colors">Terms</Link>
                    </div>
                    <div className="flex gap-6 text-neutral-500">
                        <Youtube className="h-5 w-5 hover:text-white cursor-pointer transition-colors" />
                        <Twitter className="h-5 w-5 hover:text-white cursor-pointer transition-colors" />
                        <Instagram className="h-5 w-5 hover:text-white cursor-pointer transition-colors" />
                        <X className="h-5 w-5 hover:text-white cursor-pointer transition-colors" />
                    </div>
                </div>
            </footer>

            <style jsx global>{`
                @keyframes scroll {
                    0% { transform: translateX(0); }
                    100% { transform: translateX(-50%); }
                }
                .animate-scroll {
                    animation: scroll 40s linear infinite;
                }
                .hover\\:pause:hover {
                    animation-play-state: paused;
                }
            `}</style>
        </div>
    )
}
