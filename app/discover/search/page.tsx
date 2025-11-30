"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, Star, Filter, ChevronDown, Rocket } from "lucide-react"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { useState, useEffect } from "react"
import { supabase } from "@/lib/supabase/client"

// Mock data fallback in case DB is not running
const MOCK_PRODUCTS = [
    {
        id: '1',
        title: "UK's Top Cookgroup for Resellers",
        description: "Loot Notify Monthly. The best group for reselling sneakers and more.",
        price: 29.99,
        rating: 4.74,
        review_count: 141,
        image_url: "https://images.unsplash.com/photo-1552346154-21d32810aba3?w=800&auto=format&fit=crop&q=60",
        creator_name: "Loot Notify"
    },
    {
        id: '2',
        title: "Beste Deutsche Cookgroup für Reseller",
        description: "VenomCooks Germany. Join the best German cookgroup.",
        price: 35.00,
        rating: 4.91,
        review_count: 78,
        image_url: "https://images.unsplash.com/photo-1607522370275-f14206abe5d3?w=800&auto=format&fit=crop&q=60",
        creator_name: "VenomCooks"
    },
    {
        id: '3',
        title: "Your #1 snkrs resell group",
        description: "Limitless Sneakers. Master the art of sneaker reselling.",
        price: 40.00,
        rating: 5.0,
        review_count: 117,
        image_url: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&auto=format&fit=crop&q=60",
        creator_name: "Limitless Sneakers"
    },
    {
        id: '4',
        title: "All In One UK/EU Resell Group",
        description: "Kaikicks Apprentice AIO. Sneakers, Pokemon, Vinted Monitor.",
        price: 35.00,
        rating: 4.83,
        review_count: 121,
        image_url: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=800&auto=format&fit=crop&q=60",
        creator_name: "Kaikicks"
    },
    {
        id: '5',
        title: "SnipeGang - Free Reselling Group",
        description: "Start your reselling journey for free with SnipeGang.",
        price: 0,
        rating: 4.5,
        review_count: 320,
        image_url: "https://images.unsplash.com/photo-1511556532299-8f662fc26c06?w=800&auto=format&fit=crop&q=60",
        creator_name: "SnipeGang"
    },
    {
        id: '6',
        title: "Sales & Profits Tracker",
        description: "Track your reselling profits with ease.",
        price: 15.00,
        rating: 4.9,
        review_count: 56,
        image_url: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&auto=format&fit=crop&q=60",
        creator_name: "ProfitMaster"
    }
]

export default function SearchPage() {
    const searchParams = useSearchParams()
    const query = searchParams.get('q') || ''
    const [products, setProducts] = useState<any[]>(MOCK_PRODUCTS)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        async function fetchProducts() {
            setLoading(true)
            try {
                const { data, error } = await supabase
                    .from('products')
                    .select('*')
                    .ilike('title', `%${query}%`)

                if (error) throw error
                if (data && data.length > 0) {
                    setProducts(data)
                } else {
                    // Fallback to mock data if no results or error (simulating "Best products" if search empty)
                    setProducts(MOCK_PRODUCTS.filter(p => p.title.toLowerCase().includes(query.toLowerCase())))
                }
            } catch (err) {
                console.error("Failed to fetch products, using mock data", err)
                // Fallback to mock data
                setProducts(MOCK_PRODUCTS.filter(p => p.title.toLowerCase().includes(query.toLowerCase())))
            } finally {
                setLoading(false)
            }
        }

        if (query) {
            fetchProducts()
        } else {
            setProducts(MOCK_PRODUCTS)
            setLoading(false)
        }
    }, [query])

    return (
        <div className="min-h-screen bg-[#0e0e0e] text-white font-sans">
            {/* Navbar */}
            <nav className="border-b border-[#222] bg-[#0e0e0e] sticky top-0 z-50">
                <div className="container mx-auto px-4 h-16 flex items-center gap-4">
                    <Link href="/" className="flex items-center gap-2 mr-4">
                        <span className="text-orange-500 text-2xl font-bold">⚡</span>
                    </Link>

                    <div className="flex-1 max-w-2xl relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-500" />
                        <Input
                            defaultValue={query}
                            className="w-full bg-[#1a1a1a] border-[#333] pl-10 h-10 rounded-lg text-sm focus:ring-1 focus:ring-neutral-500"
                            placeholder="Search..."
                            onKeyDown={(e) => {
                                if (e.key === 'Enter') {
                                    window.location.href = `/discover/search?q=${e.currentTarget.value}`
                                }
                            }}
                        />
                    </div>

                    <div className="flex items-center gap-4 ml-auto">
                        <Link href="#" className="text-sm font-medium text-neutral-400 hover:text-white">API</Link>
                        <Link href="/login" className="text-sm font-medium text-neutral-400 hover:text-white">Sign in</Link>
                        <Button className="bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md px-4 h-9 text-sm">
                            Start selling
                        </Button>
                    </div>
                </div>

                {/* Filters Bar */}
                <div className="border-t border-[#222] bg-[#0e0e0e]">
                    <div className="container mx-auto px-4 h-12 flex items-center gap-6 overflow-x-auto no-scrollbar text-sm font-medium text-neutral-400">
                        <button className="text-white border-b-2 border-white h-full px-1">All</button>
                        <button className="hover:text-white transition-colors whitespace-nowrap">Paid groups</button>
                        <button className="hover:text-white transition-colors whitespace-nowrap">Agencies</button>
                        <button className="hover:text-white transition-colors whitespace-nowrap">Coaching and courses</button>
                        <button className="hover:text-white transition-colors whitespace-nowrap">Physical products</button>
                        <button className="hover:text-white transition-colors whitespace-nowrap">Software</button>
                        <button className="hover:text-white transition-colors whitespace-nowrap">Newsletters</button>
                        <button className="hover:text-white transition-colors whitespace-nowrap">Events</button>
                    </div>
                </div>
            </nav>

            {/* Main Content */}
            <div className="container mx-auto px-4 py-8">
                {/* Related Searches */}
                <div className="flex items-center gap-3 mb-8 text-sm overflow-x-auto no-scrollbar">
                    <span className="text-neutral-500 whitespace-nowrap">Related Searches</span>
                    <div className="flex gap-2">
                        {[
                            "Master sneaker flipping tips",
                            "Start a reselling community",
                            "Learn profit strategies for sneakers",
                            "Join exclusive sneaker flip groups"
                        ].map((tag) => (
                            <div key={tag} className="px-3 py-1.5 rounded-md border border-[#333] bg-[#161616] text-neutral-400 hover:text-white hover:border-neutral-500 cursor-pointer transition-colors whitespace-nowrap flex items-center gap-2">
                                <Search className="h-3 w-3" />
                                {tag}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Results Header */}
                <div className="flex items-center gap-2 mb-6">
                    <div className="h-8 w-8 rounded bg-orange-500/10 flex items-center justify-center text-orange-500">
                        <span className="text-lg">👍</span>
                    </div>
                    <div>
                        <h1 className="text-xl font-bold text-white">Best products</h1>
                        <p className="text-sm text-neutral-500">Based on our <span className="text-blue-500">ranking system</span></p>
                    </div>
                    <span className="ml-2 text-sm text-neutral-600">{products.length} results</span>
                </div>

                {/* Results Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {products.map((product) => (
                        <div key={product.id} className="group bg-[#161616] rounded-xl overflow-hidden hover:bg-[#1f1f1f] transition-colors cursor-pointer">
                            {/* Image */}
                            <div className="aspect-video relative overflow-hidden">
                                <img
                                    src={product.image_url}
                                    alt={product.title}
                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                />
                                {product.price > 0 && (
                                    <div className="absolute bottom-2 right-2 bg-blue-600 text-white text-xs font-bold px-2 py-1 rounded">
                                        ${product.price.toFixed(2)} / month
                                    </div>
                                )}
                                {product.price === 0 && (
                                    <div className="absolute bottom-2 right-2 bg-blue-600 text-white text-xs font-bold px-2 py-1 rounded">
                                        Free
                                    </div>
                                )}
                            </div>

                            {/* Content */}
                            <div className="p-4 space-y-2">
                                <div className="flex items-start justify-between gap-2">
                                    <h3 className="font-bold text-white leading-tight line-clamp-2">{product.title}</h3>
                                </div>

                                <div className="flex items-center gap-2 text-xs text-neutral-400">
                                    <span>{product.creator_name}</span>
                                </div>

                                <div className="flex items-center gap-1 text-yellow-500 text-sm">
                                    <div className="flex">
                                        {[1, 2, 3, 4, 5].map((star) => (
                                            <Star
                                                key={star}
                                                className={`h-3 w-3 ${star <= Math.round(product.rating) ? 'fill-current' : 'text-neutral-600'}`}
                                            />
                                        ))}
                                    </div>
                                    <span className="text-neutral-400 ml-1">{product.rating} ({product.review_count})</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
