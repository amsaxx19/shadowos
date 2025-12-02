import { Button } from "@/components/ui/button"
import { Search, Star, ChevronDown, Crown } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { createAdminClient } from "@/lib/supabase/admin"
import { SearchHeader } from "./search-header"

export default async function SearchPage({
    searchParams
}: {
    searchParams: Promise<{ q?: string, category?: string }>
}) {
    const { q, category: cat } = await searchParams
    const query = q || ""
    const category = cat || ""

    const supabase = createAdminClient()

    let dbQuery = supabase
        .from('products')
        .select('*')

    if (query) {
        dbQuery = dbQuery.ilike('title', `%${query}%`)
    }

    if (category && category !== 'all') {
        dbQuery = dbQuery.eq('category', category)
    }

    const { data: products, error } = await dbQuery

    if (error) {
        console.error("Error fetching products:", error)
    }

    const relatedSearches = [
        "Belajar Trading Pemula",
        "Signal Crypto VIP",
        "Robot Trading Forex",
        "Indikator Saham",
        "Komunitas Scalping"
    ]

    return (
        <div className="min-h-screen bg-[#0e0e0e] text-white font-sans flex flex-col">
            <SearchHeader initialQuery={query} initialCategory={category} />

            {/* Main Content */}
            <div className="max-w-7xl mx-auto px-4 py-8 w-full">

                {/* Related Searches */}
                <div className="flex items-center gap-3 mb-8 overflow-x-auto pb-2">
                    <span className="text-sm text-neutral-500 whitespace-nowrap">Pencarian Terkait:</span>
                    {relatedSearches.map((term, i) => (
                        <Link
                            href={`/discover/search?q=${encodeURIComponent(term)}`}
                            key={i}
                            className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#1c1c1c] border border-[#333] text-xs text-neutral-300 hover:bg-[#222] cursor-pointer whitespace-nowrap transition-colors"
                        >
                            <Search className="h-3 w-3" />
                            {term}
                        </Link>
                    ))}
                </div>

                {/* Results Header */}
                <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-3">
                        {query.toLowerCase().includes("trading") && <span className="text-2xl">📈</span>}
                        <h1 className="text-2xl font-bold text-white capitalize">{query || "Semua Produk"}</h1>
                        <span className="text-neutral-500 text-sm">{products?.length || 0} hasil</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-neutral-400 cursor-pointer hover:text-white">
                        <span>Urutkan:</span>
                        <span className="text-white font-medium">Paling Relevan</span>
                        <ChevronDown className="h-4 w-4" />
                    </div>
                </div>

                {/* Products Grid or Not Found */}
                {products && products.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {products.map((product) => (
                            <Link href={`/product/${product.id}`} key={product.id} className="group block active:scale-95 transition-transform duration-200">
                                <div className="bg-[#161616] border border-[#222] rounded-xl overflow-hidden hover:border-neutral-600 transition-all duration-300 h-full flex flex-col">
                                    {/* Thumbnail */}
                                    <div className="aspect-video relative bg-neutral-800 overflow-hidden">
                                        {/* Use a placeholder if no image, or the product image */}
                                        <Image
                                            src={product.image_url || "https://images.unsplash.com/photo-1621761191319-c6fb62004040?w=800&auto=format&fit=crop&q=60"}
                                            alt={product.title}
                                            fill
                                            className="object-cover group-hover:scale-105 transition-transform duration-500"
                                        />
                                        {product.is_affiliate_enabled && (
                                            <div className="absolute top-2 left-2 bg-green-600 text-white text-[10px] font-bold px-2 py-1 rounded flex items-center gap-1">
                                                <Crown className="h-3 w-3 fill-current" />
                                                {product.affiliate_percentage}% KOMISI
                                            </div>
                                        )}
                                        {product.price === 0 && (
                                            <div className="absolute top-2 right-2 bg-blue-600 text-white text-[10px] font-bold px-2 py-1 rounded">
                                                GRATIS
                                            </div>
                                        )}
                                    </div>

                                    {/* Content */}
                                    <div className="p-4 flex-1 flex flex-col">
                                        <div className="flex items-center gap-2 mb-2">
                                            <div className="h-5 w-5 rounded-full bg-neutral-700 flex-shrink-0" />
                                            <span className="text-xs text-neutral-400 truncate">Creator</span>
                                        </div>

                                        <h3 className="font-bold text-white mb-2 line-clamp-2 group-hover:text-blue-400 transition-colors">
                                            {product.title}
                                        </h3>

                                        <div className="flex items-center gap-1 mb-4">
                                            <Star className="h-3.5 w-3.5 text-orange-500 fill-orange-500" />
                                            <span className="text-sm font-medium text-white">5.0</span>
                                            <span className="text-xs text-neutral-500">(0)</span>
                                        </div>

                                        <div className="mt-auto pt-3 border-t border-[#222] flex items-center justify-between">
                                            <div className="text-sm font-bold text-white">
                                                {product.price === 0 ? "Gratis" : `Rp ${product.price.toLocaleString('id-ID')}`}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                ) : (
                    <div className="flex flex-col items-center justify-center py-20 text-center">
                        <div className="h-20 w-20 bg-[#1c1c1c] rounded-full flex items-center justify-center mb-6">
                            <Search className="h-10 w-10 text-neutral-500" />
                        </div>
                        <h2 className="text-xl font-bold text-white mb-2">Tidak ditemukan hasil untuk "{query}"</h2>
                        <p className="text-neutral-500 max-w-md">
                            Coba gunakan kata kunci lain atau periksa ejaan Anda.
                        </p>
                        <Link href="/discover">
                            <Button
                                className="mt-6 bg-white text-black hover:bg-neutral-200 font-bold"
                            >
                                Kembali ke Discover
                            </Button>
                        </Link>
                    </div>
                )}
            </div>
        </div>
    )
}
