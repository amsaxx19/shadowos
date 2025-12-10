"use client"

import { Search, TrendingUp } from "lucide-react"
import Link from "next/link"
import { useState, useRef, useEffect } from "react"
import { useRouter } from "next/navigation"

import { supabase } from "@/lib/supabase/client"

// Category data with videos - original categories
const categories = [
    { name: "Clipping", slug: "clipping", video: "/videos/clipping.mov" },
    { name: "Trading", slug: "trading", video: "/videos/trading.mov" },
    { name: "Bisnis", slug: "bisnis", video: "/videos/business.mov" },
    { name: "Karir", slug: "karir", video: "/videos/career.mov" },
    { name: "Teknologi", slug: "teknologi", video: "/videos/tech.mov" },
    { name: "Lifestyle", slug: "lifestyle", video: "/videos/lifestyle.mov" },
]

export default function DiscoverPage() {
    const router = useRouter()
    const [isSearchFocused, setIsSearchFocused] = useState(false)
    const [searchQuery, setSearchQuery] = useState("")
    const [trendingProducts, setTrendingProducts] = useState<any[]>([])
    const [searchResults, setSearchResults] = useState<any[]>([])
    const [isSearching, setIsSearching] = useState(false)
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const searchRef = useRef<HTMLDivElement>(null)

    // Animated payout counter
    const [payoutAmount, setPayoutAmount] = useState(2155382486)

    // Check if user is logged in
    useEffect(() => {
        const checkAuth = async () => {
            const { data: { user } } = await supabase.auth.getUser()
            setIsLoggedIn(!!user)
        }
        checkAuth()
    }, [])

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

                if (!error && data && data.length > 0) {
                    setTrendingProducts(data)
                }
            } catch (err) {
                console.error('Unexpected error:', err)
            }
        }
        fetchTrending()
    }, [])

    // Animate payout counter
    useEffect(() => {
        const interval = setInterval(() => {
            setPayoutAmount(prev => prev + Math.floor(Math.random() * 100) + 10)
        }, 2000)
        return () => clearInterval(interval)
    }, [])

    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
        }).format(amount * 15000)
    }

    return (
        <div className="min-h-screen bg-[#0e0e0e] text-white font-sans flex flex-col">
            {/* Header */}
            <div className="flex items-center justify-end p-4">
                <Link
                    href="/sell"
                    className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-semibold rounded-full px-5 py-2 text-sm transition-all shadow-lg shadow-orange-500/20"
                >
                    Mulai Jualan
                </Link>
            </div>

            {/* Main Content */}
            <div className="flex-1 flex flex-col items-center px-4 pb-24">
                {/* Logo & Tagline */}
                <div className="text-center mb-6 mt-4">
                    <div
                        onClick={async () => {
                            const { data: { user } } = await supabase.auth.getUser()
                            window.location.href = user ? "/dashboard" : "/"
                        }}
                        className="flex flex-col items-center gap-3 cursor-pointer"
                    >
                        <div className="flex items-center gap-2">
                            <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-orange-500 to-red-600 flex items-center justify-center">
                                <span className="text-xl">⚡</span>
                            </div>
                            <h1 className="text-3xl font-bold tracking-tight">
                                CUAN<span className="text-orange-500">BOSS</span>
                            </h1>
                        </div>
                        <p className="text-neutral-400 text-sm">
                            Tempat bisnis digital berkembang
                        </p>
                    </div>
                </div>

                {/* Search Bar */}
                <div ref={searchRef} className="relative w-full max-w-md mb-8">
                    <form onSubmit={handleSearch}>
                        <div className="flex items-center bg-[#1a1a1a] border border-[#333] rounded-full px-4 py-3">
                            <Search className="h-5 w-5 text-neutral-500 mr-3" />
                            <input
                                type="text"
                                placeholder="Cari di CUANBOSS..."
                                value={searchQuery}
                                onChange={handleSearchChange}
                                className="w-full bg-transparent border-none outline-none text-white placeholder:text-neutral-500 text-base"
                                onFocus={() => setIsSearchFocused(true)}
                            />
                        </div>
                    </form>

                    {/* Search Dropdown */}
                    {isSearchFocused && (
                        <div className="absolute top-full left-0 right-0 mt-2 bg-[#161616] border border-[#333] rounded-2xl shadow-2xl overflow-hidden z-50 animate-in fade-in duration-200">
                            <div className="p-2">
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
                                        <div className="text-xs font-bold text-neutral-500 px-3 py-2 uppercase tracking-wider">Produk Trending</div>
                                        {trendingProducts.length > 0 ? (
                                            trendingProducts.map((product) => (
                                                <Link href={`/discover/search?q=${encodeURIComponent(product.title)}`} key={product.id} className="flex items-center gap-3 px-3 py-3 hover:bg-[#222] rounded-lg cursor-pointer text-neutral-300 hover:text-white transition-colors">
                                                    <TrendingUp className="h-4 w-4 text-orange-500" />
                                                    <span className="truncate">{product.title}</span>
                                                </Link>
                                            ))
                                        ) : (
                                            <div className="px-3 py-3 text-neutral-500 text-sm">Memuat produk trending...</div>
                                        )}
                                    </>
                                )}
                            </div>
                        </div>
                    )}
                </div>

                {/* Category Grid - 2 columns with video backgrounds */}
                <div className="w-full max-w-lg grid grid-cols-2 gap-2 mb-10">
                    {categories.map((cat) => (
                        <Link
                            key={cat.slug}
                            href={`/discover/category?category=${cat.slug}`}
                            className="relative aspect-[16/10] rounded-lg overflow-hidden group"
                        >
                            {/* Video Background */}
                            <video
                                src={cat.video}
                                autoPlay
                                loop
                                muted
                                playsInline
                                className="absolute inset-0 w-full h-full object-cover"
                            />
                            {/* Gradient overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

                            {/* Category Name - On top of video */}
                            <div className="absolute bottom-0 left-0 p-3">
                                <h3 className="text-base font-bold text-white drop-shadow-lg">
                                    {cat.name}
                                </h3>
                            </div>

                            {/* Hover effect */}
                            <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                        </Link>
                    ))}
                </div>

                {/* Payout Counter */}
                <div className="text-center space-y-1">
                    <div className="text-2xl font-bold text-white tabular-nums">
                        {formatCurrency(payoutAmount)}
                    </div>
                    <div className="text-sm text-neutral-500">telah dibayarkan ke kreator</div>
                </div>
            </div>

            {/* Footer Links */}
            <footer className="py-6 px-4">
                <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm text-neutral-500">
                    <Link href="#" className="hover:text-white transition-colors">Belajar</Link>
                    <Link href="#" className="hover:text-white transition-colors">Karir</Link>
                    <Link href="#" className="hover:text-white transition-colors">Pers</Link>
                    <Link href="#" className="hover:text-white transition-colors">Brand</Link>
                    <Link href="/privacy" className="hover:text-white transition-colors">Privasi</Link>
                    <Link href="/terms" className="hover:text-white transition-colors">Syarat</Link>
                </div>
            </footer>
        </div>
    )
}
