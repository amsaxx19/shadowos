"use client"

import { Input } from "@/components/ui/input"
import { Search, Rocket, Instagram, Twitter, Youtube, X, TrendingUp, GraduationCap, Dumbbell, Coins, PenTool, Banknote, Briefcase, Clapperboard, Zap, Scissors, Building2, Cpu, Laptop, Heart, Gamepad2, UserCheck, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { useState, useRef, useEffect } from "react"
import { useRouter } from "next/navigation"
import { cn } from "@/lib/utils"

import { supabase } from "@/lib/supabase/client"

export default function DiscoverPage() {
    const router = useRouter()
    const [isSearchFocused, setIsSearchFocused] = useState(false)
    const [searchQuery, setSearchQuery] = useState("")
    const [trendingProducts, setTrendingProducts] = useState<any[]>([])
    const [searchResults, setSearchResults] = useState<any[]>([])
    const [isSearching, setIsSearching] = useState(false)
    const [selectedCategory, setSelectedCategory] = useState<any>(null)
    const searchRef = useRef<HTMLDivElement>(null)

    // Live search as user types
    const handleSearchChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const query = e.target.value
        setSearchQuery(query)

        if (query.length > 1) {
            setIsSearching(true)
            try {
                const { data, error } = await supabase
                    .from('products')
                    .select('id, title')
                    .ilike('title', `%${query}%`)
                    .limit(5)

                if (!error && data) {
                    setSearchResults(data)
                }
            } catch (err) {
                console.error('Search error:', err)
            } finally {
                setIsSearching(false)
            }
        } else {
            setSearchResults([])
        }
    }

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault()
        if (searchQuery.trim()) {
            router.push(`/discover/search?q=${encodeURIComponent(searchQuery.trim())}`)
        }
    }

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

    useEffect(() => {
        const fetchTrending = async () => {
            try {
                const { data, error } = await supabase
                    .from('products')
                    .select('id, title, price')
                    .order('created_at', { ascending: false })
                    .limit(5)

                if (error) {
                    console.error('Error fetching trending:', error)
                    return
                }

                if (data && data.length > 0) {
                    setTrendingProducts(data)
                }
            } catch (err) {
                console.error('Unexpected error:', err)
            }
        }
        fetchTrending()
    }, [])

    const tags = [
        "Lihat Tren",
        "Belajar Saham",
        "Tips Affiliate",
        "Cara FYP TikTok",
        "Ide Bisnis 2025",
        "Tutorial Coding",
        "Diet Sehat",
        "Investasi Pemula",
        "Dropshipping",
        "Tools AI Bisnis",
        "Komunitas Lari"
    ]

    const categories = [
        {
            name: "Clipping",
            slug: "clipping",
            icon: Scissors,
            video: "/videos/clipping.mov",
            pills: ["Jasa Klipping", "Clipper Agency", "Video Shorts", "Content Reward"]
        },
        {
            name: "Trading",
            slug: "trading",
            icon: TrendingUp,
            video: "/videos/trading.mov",
            pills: ["Crypto & NFT", "Saham Lokal", "Forex / Gold", "Sinyal VIP"]
        },
        {
            name: "Bisnis",
            slug: "bisnis",
            icon: Briefcase,
            video: "/videos/business.mov",
            pills: ["TikTok Affiliate", "Jastip & Impor", "Dropship", "Ide Usaha"]
        },
        {
            name: "Karir",
            slug: "karir",
            icon: Building2,
            video: "/videos/career.mov",
            pills: ["Lolos BUMN", "Kerja Luar Negeri", "Template CV", "Interview"]
        },
        {
            name: "Teknologi",
            slug: "teknologi",
            icon: Cpu,
            video: "/videos/tech.mov",
            pills: ["Belajar Coding", "Template Excel", "Tools AI", "Bot & SaaS"]
        },
        {
            name: "Lifestyle",
            slug: "lifestyle",
            icon: Heart,
            video: "/videos/lifestyle.mov",
            pills: ["Diet & Gym", "Joki Gaming", "Travel Guide", "Resep Masakan"]
        },
    ]

    return (
        <div className="min-h-screen bg-[#0e0e0e] text-white font-sans flex flex-col overflow-x-hidden">
            {/* Header / Top Bar */}
            <div className="flex items-center justify-end p-4">
                <Link href="/sell" className="bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white font-bold rounded-full px-6 py-2 shadow-lg shadow-orange-500/20 border border-orange-500/50 transition-colors">
                    Mulai Jualan
                </Link>
            </div>

            {/* Main Content */}
            <div className="flex-1 flex flex-col items-center justify-center px-4 pb-20 w-full">
                {/* Marquee Tags Row */}
                <div className="w-full mb-16 overflow-hidden relative group">
                    <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-[#0e0e0e] to-transparent z-10" />
                    <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-[#0e0e0e] to-transparent z-10" />

                    <div className="flex gap-3 animate-scroll whitespace-nowrap hover:pause">
                        {[...tags, ...tags].map((tag, i) => (
                            <div key={i} className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#1c1c1c] border border-[#222] text-neutral-400 hover:text-white hover:border-neutral-500 transition-colors cursor-pointer">
                                <span className="text-sm font-medium">{tag}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Hero Logo & Search */}
                <div className="text-center mb-8 md:mb-16 space-y-6 md:space-y-8 w-full max-w-2xl relative z-10 px-2 md:px-0">
                    <Link href="/" className="flex flex-col items-center gap-2 md:gap-4 cursor-pointer hover:opacity-90 transition-opacity">
                        <div className="h-14 w-14 md:h-20 md:w-20 rounded-xl md:rounded-2xl bg-gradient-to-br from-orange-500 to-red-600 flex items-center justify-center shadow-2xl shadow-orange-500/20">
                            <span className="text-2xl md:text-4xl">⚡</span>
                        </div>
                        <h1 className="text-3xl sm:text-5xl md:text-7xl font-bold tracking-tight text-white">
                            CUAN<span className="text-orange-500">BOSS</span>
                        </h1>
                        <p className="text-base md:text-xl text-neutral-400">
                            The operating system for <span className="text-white font-medium">digital entrepreneurs</span>
                        </p>
                    </Link>

                    <div ref={searchRef} className="relative w-full">
                        <form onSubmit={handleSearch} className="relative group">
                            <div className="absolute -inset-1 bg-gradient-to-r from-orange-600 to-red-600 rounded-xl md:rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-1000"></div>
                            <div className="relative flex items-center bg-[#161616] border border-[#333] rounded-xl md:rounded-2xl p-1.5 md:p-2 shadow-2xl">
                                <Search className="ml-3 md:ml-4 h-5 w-5 md:h-6 md:w-6 text-neutral-500" />
                                <input
                                    type="text"
                                    placeholder="Search products, creators..."
                                    value={searchQuery}
                                    onChange={handleSearchChange}
                                    className="w-full bg-transparent border-none focus:ring-0 outline-none text-base md:text-lg px-3 md:px-4 text-white placeholder:text-neutral-600 h-10 md:h-12"
                                    onFocus={() => setIsSearchFocused(true)}
                                />
                                <div className="hidden md:flex items-center gap-2 mr-2">
                                    <span className="px-2 py-1 rounded bg-[#222] text-xs text-neutral-500 border border-[#333]">⌘K</span>
                                </div>
                            </div>
                        </form>

                        {/* Search Dropdown */}
                        {isSearchFocused && (
                            <div className="absolute top-full left-0 right-0 mt-2 bg-[#161616] border border-[#333] rounded-xl shadow-2xl overflow-hidden z-50 animate-in fade-in zoom-in-95 duration-200">
                                <div className="p-2">
                                    {/* Show search results when typing */}
                                    {searchQuery.length > 1 ? (
                                        <>
                                            <div className="text-xs font-bold text-neutral-500 px-3 py-2 uppercase tracking-wider">Hasil Pencarian</div>
                                            {isSearching ? (
                                                <div className="px-3 py-3 text-neutral-500 text-sm">Mencari...</div>
                                            ) : searchResults.length > 0 ? (
                                                searchResults.map((product) => (
                                                    <Link href={`/product/${product.id}`} key={product.id} className="flex items-center gap-3 px-3 py-3 hover:bg-[#222] rounded-lg cursor-pointer text-neutral-300 hover:text-white transition-colors">
                                                        <Search className="h-4 w-4 text-neutral-500" />
                                                        <span className="truncate">{product.title}</span>
                                                    </Link>
                                                ))
                                            ) : (
                                                <div className="px-3 py-3 text-neutral-500 text-sm">Tidak ditemukan produk untuk "{searchQuery}"</div>
                                            )}
                                        </>
                                    ) : (
                                        <>
                                            <div className="text-xs font-bold text-neutral-500 px-3 py-2 uppercase tracking-wider">Trending Products</div>
                                            {trendingProducts.length > 0 ? (
                                                trendingProducts.map((product) => (
                                                    <Link href={`/discover/search?q=${encodeURIComponent(product.title)}`} key={product.id} className="flex items-center gap-3 px-3 py-3 hover:bg-[#222] rounded-lg cursor-pointer text-neutral-300 hover:text-white transition-colors">
                                                        <TrendingUp className="h-4 w-4 text-orange-500" />
                                                        <span className="truncate">{product.title}</span>
                                                    </Link>
                                                ))
                                            ) : (
                                                <div className="px-3 py-3 text-neutral-500 text-sm">Loading trending products...</div>
                                            )}
                                        </>
                                    )}
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* Categories Grid */}
                <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {categories.map((cat) => (
                        <div
                            key={cat.name}
                            onClick={() => setSelectedCategory(cat)}
                            className="group relative h-[180px] md:h-[200px] rounded-xl md:rounded-2xl overflow-hidden border border-[#222] cursor-pointer hover:border-neutral-500 transition-all duration-300 active:scale-95"
                        >
                            {/* Video Background */}
                            <div className="absolute inset-0 z-0">
                                <video
                                    src={cat.video}
                                    autoPlay
                                    loop
                                    muted
                                    playsInline
                                    className="w-full h-full object-cover opacity-60 group-hover:opacity-80 transition-opacity duration-500"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
                            </div>

                            {/* Content: Title Bottom Left */}
                            <div className="absolute bottom-0 left-0 p-6 z-10 w-full">
                                <h3 className="text-2xl font-bold text-white drop-shadow-lg transform translate-y-0 transition-transform duration-300">
                                    {cat.name}
                                </h3>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Payout Counter */}
                <div className="mt-12 md:mt-20 text-center space-y-2 px-4">
                    <div className="text-xl md:text-2xl lg:text-3xl font-bold text-white tabular-nums">
                        Rp 32.087.269.766
                    </div>
                    <div className="text-sm md:text-lg text-neutral-500 font-normal">telah dibayarkan ke kreator</div>
                </div>
            </div>

            {/* Footer */}
            <footer className="border-t border-[#222] py-6 md:py-8 px-4 md:px-8 mt-auto">
                <div className="max-w-7xl mx-auto flex flex-col items-center gap-6">
                    <div className="flex flex-wrap justify-center gap-4 md:gap-6 text-xs font-medium text-neutral-500">
                        <Link href="#" className="hover:text-white transition-colors">Belajar</Link>
                        <Link href="#" className="hover:text-white transition-colors">Karir</Link>
                        <Link href="#" className="hover:text-white transition-colors">Pers</Link>
                        <Link href="#" className="hover:text-white transition-colors">Brand</Link>
                        <Link href="#" className="hover:text-white transition-colors">Privasi</Link>
                        <Link href="#" className="hover:text-white transition-colors">Syarat & Ketentuan</Link>
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
            {/* Category Expansion Modal */}
            {selectedCategory && (
                <div className="fixed inset-0 z-[100] flex items-end md:items-center justify-center p-4 md:p-6">
                    {/* Backdrop */}
                    <div
                        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
                        onClick={() => setSelectedCategory(null)}
                    />

                    {/* Modal Content */}
                    <div className="relative w-full md:max-w-2xl bg-[#0e0e0e] md:rounded-3xl rounded-t-3xl overflow-hidden shadow-2xl animate-in slide-in-from-bottom-10 fade-in duration-300 border border-[#222]">

                        {/* Header Banner */}
                        <div className="relative h-48 w-full">
                            <video
                                src={selectedCategory.video}
                                autoPlay
                                loop
                                muted
                                playsInline
                                className="w-full h-full object-cover opacity-70"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-[#0e0e0e] via-transparent to-transparent" />

                            {/* Close Button */}
                            <button
                                onClick={() => setSelectedCategory(null)}
                                className="absolute top-4 right-4 p-2 rounded-full bg-black/50 hover:bg-black/70 text-white backdrop-blur-md transition-colors"
                            >
                                <X className="h-5 w-5" />
                            </button>

                            {/* Title */}
                            <div className="absolute bottom-4 left-6">
                                <h2 className="text-3xl font-bold text-white">{selectedCategory.name}</h2>
                            </div>
                        </div>

                        {/* Body Content */}
                        <div className="p-6 space-y-6 max-h-[60vh] overflow-y-auto">

                            {/* Featured Ad - Links to category */}
                            <Link
                                href={`/discover/search?category=${selectedCategory.slug}`}
                                className="bg-[#1c1c1c] border border-[#333] rounded-xl p-4 flex items-center gap-4 hover:bg-[#222] transition-colors"
                            >
                                <div className="h-12 w-12 rounded-lg bg-blue-600/20 flex items-center justify-center text-blue-500">
                                    <Rocket className="h-6 w-6" />
                                </div>
                                <div>
                                    <h4 className="text-sm font-bold text-white">Featured in {selectedCategory.name}</h4>
                                    <p className="text-xs text-neutral-400">Top trending opportunities this week</p>
                                </div>
                                <Button size="sm" variant="outline" className="ml-auto border-[#333] bg-transparent hover:bg-[#333] text-xs">
                                    View
                                </Button>
                            </Link>

                            {/* Sub-niche List */}
                            <div className="grid grid-cols-1 gap-3">
                                {selectedCategory.pills.map((pill: string, i: number) => (
                                    <Link
                                        key={i}
                                        href={`/discover/search?q=${encodeURIComponent(pill)}&category=${selectedCategory.slug}`}
                                        className="flex items-center justify-between p-4 rounded-xl bg-[#161616] border border-[#222] hover:bg-[#222] hover:border-neutral-700 transition-all group"
                                    >
                                        <span className="font-medium text-neutral-200 group-hover:text-white">{pill}</span>
                                        <div className="h-8 w-8 rounded-full bg-[#222] flex items-center justify-center group-hover:bg-[#333] transition-colors">
                                            <ArrowRight className="h-4 w-4 text-neutral-500 group-hover:text-white" />
                                        </div>
                                    </Link>
                                ))}
                            </div>

                            {/* View All in Category */}
                            <Link
                                href={`/discover/search?category=${selectedCategory.slug}`}
                                className="block w-full text-center py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold transition-colors"
                            >
                                View All {selectedCategory.name} Products
                            </Link>
                        </div>

                    </div>
                </div>
            )}
        </div >
    )
}
