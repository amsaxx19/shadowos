"use client"

import { Input } from "@/components/ui/input"
import { Search, Rocket, Instagram, Twitter, Youtube, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function DiscoverPage() {
    const tags = [
        "View Trends",
        "Learn to code in 30 days",
        "Spiritual growth groups",
        "Style guide for men",
        "Writing better essays",
        "Fitness plans",
        "Crypto signals",
        "Dropshipping courses"
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
        <div className="min-h-screen bg-[#0e0e0e] text-white font-sans flex flex-col">
            {/* Header / Top Bar */}
            <div className="flex items-center justify-end p-4">
                <Button className="bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md px-6">
                    Start selling
                </Button>
            </div>

            {/* Main Content */}
            <div className="flex-1 flex flex-col items-center justify-center px-4 pb-20">

                {/* Tags Row */}
                <div className="w-full max-w-6xl mb-12 overflow-x-auto scrollbar-hide">
                    <div className="flex gap-3 pb-2">
                        {tags.map((tag, i) => (
                            <button
                                key={i}
                                className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#1c1c1c] border border-[#333] text-sm text-neutral-400 hover:text-white hover:border-neutral-500 transition-all whitespace-nowrap"
                            >
                                {i === 0 && <Rocket className="h-3 w-3 text-blue-500" />}
                                {tag}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Hero Logo & Search */}
                <div className="text-center mb-12 space-y-6">
                    <div className="flex flex-col items-center gap-2">
                        <div className="flex items-center gap-3 text-5xl font-bold">
                            <span className="text-orange-500">⚡</span> Whop
                        </div>
                        <p className="text-neutral-400 text-lg">Where the internet does business</p>
                    </div>

                    <div className="relative w-full max-w-2xl mx-auto">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-neutral-500" />
                        <Input
                            placeholder="Search Whop..."
                            className="w-full h-12 pl-12 bg-[#1c1c1c] border-[#333] text-white placeholder:text-neutral-500 rounded-xl focus:ring-0 focus:border-neutral-500"
                        />
                    </div>
                </div>

                {/* Categories Grid */}
                <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {categories.map((cat) => (
                        <div
                            key={cat.name}
                            className="group relative h-48 rounded-xl overflow-hidden cursor-pointer border border-[#222]"
                        >
                            {/* Background Image */}
                            <div
                                className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
                                style={{ backgroundImage: `url(${cat.image})` }}
                            />
                            {/* Overlay */}
                            <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-colors" />

                            {/* Text */}
                            <div className="absolute bottom-4 left-4">
                                <h3 className="text-xl font-bold text-white">{cat.name}</h3>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Payouts Counter */}
                <div className="mt-20 text-center">
                    <div className="text-2xl font-bold text-neutral-400">
                        <span className="text-white">$2,079,143,157</span> in payouts
                    </div>
                </div>
            </div>

            {/* Footer */}
            <footer className="border-t border-[#222] py-6 px-8">
                <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
                    <div className="flex gap-6 text-sm text-neutral-500">
                        <Link href="#" className="hover:text-white">Platforms</Link>
                        <Link href="#" className="hover:text-white">Learn</Link>
                        <Link href="#" className="hover:text-white">Careers</Link>
                        <Link href="#" className="hover:text-white">Press</Link>
                        <Link href="#" className="hover:text-white">Brand</Link>
                        <Link href="#" className="hover:text-white">Privacy</Link>
                        <Link href="#" className="hover:text-white">Terms</Link>
                    </div>
                    <div className="flex gap-4 text-neutral-500">
                        <Youtube className="h-5 w-5 hover:text-white cursor-pointer" />
                        <Twitter className="h-5 w-5 hover:text-white cursor-pointer" />
                        <Instagram className="h-5 w-5 hover:text-white cursor-pointer" />
                    </div>
                </div>
            </footer>
        </div>
    )
}
