"use client"

import { Search, Star, X } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { useSearchParams, useRouter } from "next/navigation"
import { useState, useEffect, Suspense } from "react"
import { supabase } from "@/lib/supabase/client"

function SearchContent() {
    const searchParams = useSearchParams()
    const router = useRouter()
    const query = searchParams.get('q') || ""
    const category = searchParams.get('category') || ""

    const [searchInput, setSearchInput] = useState(query)
    const [allProducts, setAllProducts] = useState<any[]>([])
    const [loading, setLoading] = useState(true)
    const [activeTab, setActiveTab] = useState<'best' | 'all'>('best')
    const [isLoggedIn, setIsLoggedIn] = useState(false)

    // Check if user is logged in
    useEffect(() => {
        const checkAuth = async () => {
            const { data: { user } } = await supabase.auth.getUser()
            setIsLoggedIn(!!user)
        }
        checkAuth()
    }, [])

    // Update searchInput when query changes
    useEffect(() => {
        setSearchInput(query)
    }, [query])

    // Fetch products from database
    useEffect(() => {
        const fetchProducts = async () => {
            setLoading(true)
            try {
                let dbQuery = supabase
                    .from('products')
                    .select('*')

                // Search by title if query exists
                if (query) {
                    // Search in title or description
                    dbQuery = dbQuery.or(`title.ilike.%${query}%,description.ilike.%${query}%`)
                }

                // Only filter by category if category param exists and is not empty
                // This makes the search more flexible
                if (category && category !== 'all' && category !== '') {
                    dbQuery = dbQuery.eq('category', category)
                }

                const { data, error } = await dbQuery

                if (error) {
                    console.error("Error fetching products:", error)
                    // If category filter fails, try without it
                    if (category) {
                        const { data: allData } = await supabase
                            .from('products')
                            .select('*')
                            .or(`title.ilike.%${query}%,description.ilike.%${query}%`)
                        setAllProducts(allData || [])
                    } else {
                        setAllProducts([])
                    }
                } else {
                    setAllProducts(data || [])
                }
            } catch (err) {
                console.error("Unexpected error:", err)
                setAllProducts([])
            } finally {
                setLoading(false)
            }
        }

        fetchProducts()
    }, [query, category])

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault()
        if (searchInput.trim()) {
            // Only include query, NOT category - free search
            router.push(`/discover/search?q=${encodeURIComponent(searchInput.trim())}`)
        }
    }

    // Best products = top 5
    const bestProducts = allProducts.slice(0, 5)
    // Display based on active tab
    const displayProducts = activeTab === 'best' ? bestProducts : allProducts

    const relatedSearches = [
        `Master ${query || 'trading'} strategies`,
    ]

    const formatPrice = (price: number, interval?: string) => {
        if (price === 0) return "Gratis"
        const formattedPrice = `Rp ${price.toLocaleString('id-ID')}`
        return interval ? `${formattedPrice} / ${interval}` : formattedPrice
    }

    return (
        <div className="min-h-screen bg-[#0e0e0e] text-white font-sans flex flex-col pb-20">
            {/* Header with Logo & Search */}
            <div className="sticky top-0 bg-[#0e0e0e] z-50 px-4 py-3 border-b border-[#222]">
                <div className="flex items-center gap-3">
                    {/* Logo */}
                    <div
                        onClick={async (e) => {
                            e.preventDefault();
                            const { data: { user } } = await supabase.auth.getUser()
                            window.location.href = user ? "/home" : "/"
                        }}
                        className="flex-shrink-0 cursor-pointer"
                    >
                        <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-orange-500 to-red-600 flex items-center justify-center">
                            <span className="text-lg">⚡</span>
                        </div>
                    </div>

                    {/* Search Bar */}
                    <form onSubmit={handleSearch} className="flex-1">
                        <div className="flex items-center bg-[#1a1a1a] border border-[#333] rounded-full px-4 py-2">
                            <Search className="h-4 w-4 text-neutral-500 mr-2" />
                            <input
                                type="text"
                                value={searchInput}
                                onChange={(e) => setSearchInput(e.target.value)}
                                placeholder="Cari..."
                                className="w-full bg-transparent border-none outline-none text-white placeholder:text-neutral-500 text-sm"
                            />
                            {searchInput && (
                                <button
                                    type="button"
                                    onClick={() => {
                                        setSearchInput('')
                                        router.back() // Go back to previous page
                                    }}
                                    className="ml-2"
                                >
                                    <X className="h-4 w-4 text-neutral-500 hover:text-white" />
                                </button>
                            )}
                        </div>
                    </form>
                </div>
            </div>

            {/* Related Searches */}
            <div className="px-4 py-3 flex items-center gap-2 overflow-x-auto scrollbar-hide">
                <span className="text-xs text-neutral-500 whitespace-nowrap">Pencarian Terkait</span>
                {relatedSearches.map((term, i) => (
                    <Link
                        href={`/discover/search?q=${encodeURIComponent(term)}`}
                        key={i}
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#1c1c1c] border border-[#333] text-xs text-neutral-300 hover:bg-[#222] whitespace-nowrap"
                    >
                        <Search className="h-3 w-3 text-neutral-500" />
                        {term}
                    </Link>
                ))}
            </div>

            {/* Tabs - Now clickable! */}
            <div className="px-4 py-2 flex items-center gap-4 border-b border-[#222]">
                <button
                    onClick={() => setActiveTab('best')}
                    className={`text-sm font-medium pb-2 transition-colors ${activeTab === 'best'
                        ? 'text-white border-b-2 border-white'
                        : 'text-neutral-500 hover:text-neutral-300'
                        }`}
                >
                    Terbaik ({bestProducts.length})
                </button>
                <button
                    onClick={() => setActiveTab('all')}
                    className={`text-sm font-medium pb-2 transition-colors ${activeTab === 'all'
                        ? 'text-white border-b-2 border-white'
                        : 'text-neutral-500 hover:text-neutral-300'
                        }`}
                >
                    Semua ({allProducts.length})
                </button>
            </div>

            {/* Products List */}
            <div className="flex-1 px-4 py-4 space-y-4">
                {loading ? (
                    <div className="flex items-center justify-center py-20">
                        <div className="text-neutral-500">Memuat...</div>
                    </div>
                ) : displayProducts.length > 0 ? (
                    displayProducts.map((product) => (
                        <Link href={`/product/${product.id}`} key={product.id} className="block">
                            <div className="bg-[#161616] border border-[#222] rounded-xl overflow-hidden flex h-32 hover:border-neutral-500 transition-colors">
                                {/* Product Image - Left Side */}
                                <div className="relative w-32 min-w-[128px] h-full bg-[#111]">
                                    <Image
                                        src={product.image_url || "https://images.unsplash.com/photo-1621761191319-c6fb62004040?w=800&auto=format&fit=crop&q=60"}
                                        alt={product.title}
                                        fill
                                        className="object-cover"
                                    />
                                    {/* Price Badge - Bottom Right of Image */}
                                    <div className="absolute bottom-1 right-1 bg-black/60 backdrop-blur-sm text-white text-[10px] font-bold px-1.5 py-0.5 rounded">
                                        {formatPrice(product.price)}
                                    </div>
                                </div>

                                {/* Product Info - Right Side */}
                                <div className="p-3 flex flex-col justify-between flex-1 min-w-0">
                                    <div>
                                        <div className="flex items-start justify-between gap-2">
                                            <h3 className="font-bold text-white text-sm md:text-base leading-snug line-clamp-2">
                                                {product.title}
                                            </h3>
                                        </div>

                                        {product.description && (
                                            <p className="text-neutral-400 text-xs mt-1 line-clamp-1">
                                                {product.description}
                                            </p>
                                        )}
                                    </div>

                                    <div className="flex items-center justify-between mt-2">
                                        {/* Rating */}
                                        <div className="flex items-center gap-1">
                                            <Star className="h-3 w-3 text-orange-500 fill-orange-500" />
                                            <span className="text-xs text-neutral-300 font-medium">4.8</span>
                                            <span className="text-[10px] text-neutral-500">(120)</span>
                                        </div>

                                        {/* Billing Interval Badge */}
                                        {product.billing_interval && product.billing_interval !== 'one_time' && (
                                            <span className="text-[10px] uppercase text-neutral-500 border border-[#333] px-1.5 py-0.5 rounded">
                                                /{product.billing_interval}
                                            </span>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </Link>
                    ))
                ) : (
                    <div className="flex flex-col items-center justify-center py-20 text-center">
                        <div className="h-16 w-16 bg-[#1c1c1c] rounded-full flex items-center justify-center mb-4">
                            <Search className="h-8 w-8 text-neutral-500" />
                        </div>
                        <h2 className="text-lg font-bold text-white mb-2">
                            Tidak ditemukan hasil untuk "{query}"
                        </h2>
                        <p className="text-neutral-500 text-sm max-w-xs">
                            Coba gunakan kata kunci lain atau periksa ejaan Anda.
                        </p>
                    </div>
                )}
            </div>
        </div>
    )
}

export default function SearchPage() {
    return (
        <Suspense fallback={
            <div className="min-h-screen bg-[#0e0e0e] flex items-center justify-center">
                <div className="text-neutral-500">Memuat...</div>
            </div>
        }>
            <SearchContent />
        </Suspense>
    )
}
