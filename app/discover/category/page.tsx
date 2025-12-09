"use client"

import { Search, ChevronRight, X, Star } from "lucide-react"
import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"
import { useState, useEffect, Suspense } from "react"

// Category data with subcategories - menggunakan pills yang asli
const categoryData: Record<string, {
    name: string,
    video: string,
    subcategories: string[],
    featuredTitle: string,
    featuredDesc: string
}> = {
    "clipping": {
        name: "Clipping",
        video: "/videos/clipping.mov",
        subcategories: ["Jasa Klipping", "Clipper Agency", "Video Shorts", "Content Reward"],
        featuredTitle: "Jadi Clipper Profesional",
        featuredDesc: "Hasilkan jutaan dari klipping konten viral"
    },
    "trading": {
        name: "Trading",
        video: "/videos/trading.mov",
        subcategories: ["Crypto & NFT", "Saham Lokal", "Forex / Gold", "Sinyal VIP"],
        featuredTitle: "Master Day Trading",
        featuredDesc: "Belajar trading dengan mentor berpengalaman"
    },
    "bisnis": {
        name: "Bisnis",
        video: "/videos/business.mov",
        subcategories: ["TikTok Affiliate", "Jastip & Impor", "Dropship", "Ide Usaha"],
        featuredTitle: "Mulai Bisnis Online",
        featuredDesc: "Panduan lengkap memulai bisnis dari nol"
    },
    "karir": {
        name: "Karir",
        video: "/videos/career.mov",
        subcategories: ["Lolos BUMN", "Kerja Luar Negeri", "Template CV", "Interview"],
        featuredTitle: "Raih Karir Impian",
        featuredDesc: "Tips dan trik lolos seleksi perusahaan top"
    },
    "teknologi": {
        name: "Teknologi",
        video: "/videos/tech.mov",
        subcategories: ["Belajar Coding", "Template Excel", "Tools AI", "Bot & SaaS"],
        featuredTitle: "Kuasai Teknologi",
        featuredDesc: "Skill tech yang dicari perusahaan"
    },
    "lifestyle": {
        name: "Lifestyle",
        video: "/videos/lifestyle.mov",
        subcategories: ["Diet & Gym", "Joki Gaming", "Travel Guide", "Resep Masakan"],
        featuredTitle: "Upgrade Lifestyle",
        featuredDesc: "Tips hidup sehat dan produktif"
    }
}

function CategoryContent() {
    const searchParams = useSearchParams()
    const router = useRouter()
    const categorySlug = searchParams.get('category') || ''
    const searchQuery = searchParams.get('q') || ''

    const [query, setQuery] = useState(searchQuery)
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const category = categoryData[categorySlug]

    // Check if user is logged in
    useEffect(() => {
        const checkAuth = async () => {
            const { data: { user } } = await (await import('@/lib/supabase/client')).supabase.auth.getUser()
            setIsLoggedIn(!!user)
        }
        checkAuth()
    }, [])

    // If no valid category, redirect to discover
    useEffect(() => {
        if (categorySlug && !category) {
            router.push('/discover')
        }
    }, [categorySlug, category, router])

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault()
        if (query.trim()) {
            // Free search without category filter
            router.push(`/discover/search?q=${encodeURIComponent(query.trim())}`)
        }
    }

    if (!category) {
        return (
            <div className="min-h-screen bg-[#0e0e0e] flex items-center justify-center">
                <div className="text-neutral-500">Memuat...</div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-[#0e0e0e] text-white font-sans flex flex-col pb-20">
            {/* Header with Logo */}
            <div className="text-center py-6">
                <div
                    onClick={async () => {
                        const { data: { user } } = await (await import('@/lib/supabase/client')).supabase.auth.getUser()
                        window.location.href = user ? "/home" : "/"
                    }}
                    className="flex flex-col items-center gap-2 cursor-pointer"
                >
                    <div className="flex items-center gap-2">
                        <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-orange-500 to-red-600 flex items-center justify-center">
                            <span className="text-lg">⚡</span>
                        </div>
                        <h1 className="text-xl font-bold tracking-tight text-white">
                            CUAN<span className="text-orange-500">BOSS</span>
                        </h1>
                    </div>
                    <p className="text-neutral-400 text-xs">
                        Tempat bisnis digital berkembang
                    </p>
                </div>
            </div>

            {/* Search Bar */}
            <div className="px-4 mb-6">
                <form onSubmit={handleSearch}>
                    <div className="flex items-center bg-[#1a1a1a] border border-[#333] rounded-full px-4 py-3">
                        <Search className="h-5 w-5 text-neutral-500 mr-3" />
                        <input
                            type="text"
                            placeholder="Cari di CUANBOSS..."
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            className="w-full bg-transparent border-none outline-none text-white placeholder:text-neutral-500 text-base"
                        />
                    </div>
                </form>
            </div>

            {/* Category Banner */}
            <div className="px-4 mb-6">
                <div className="relative aspect-[2/1] rounded-xl overflow-hidden">
                    {/* Close button - go back */}
                    <button
                        onClick={() => router.back()}
                        className="absolute top-3 right-3 z-20 p-1.5 rounded-full bg-black/50 hover:bg-black/70 transition-colors"
                    >
                        <X className="h-5 w-5 text-white" />
                    </button>

                    {/* Video Background */}
                    <video
                        src={category.video}
                        autoPlay
                        loop
                        muted
                        playsInline
                        className="absolute inset-0 w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

                    {/* Category Name */}
                    <div className="absolute bottom-4 left-4">
                        <h2 className="text-2xl font-bold text-white drop-shadow-lg">
                            {category.name}
                        </h2>
                    </div>
                </div>
            </div>

            {/* Featured Card */}
            <div className="px-4 mb-6">
                <Link
                    href={`/discover/search?q=${encodeURIComponent(category.featuredTitle)}`}
                    className="flex items-center gap-4 bg-[#1a1a1a] border border-[#333] rounded-xl p-3 hover:bg-[#222] transition-colors"
                >
                    {/* Thumbnail */}
                    <div className="relative h-16 w-28 rounded-lg overflow-hidden flex-shrink-0">
                        <video
                            src={category.video}
                            autoPlay
                            loop
                            muted
                            playsInline
                            className="absolute inset-0 w-full h-full object-cover"
                        />
                    </div>

                    {/* Info */}
                    <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-white text-sm truncate">{category.featuredTitle}</h3>
                        <div className="flex items-center gap-2 mt-1">
                            <Star className="h-3 w-3 text-yellow-500 fill-yellow-500" />
                            <span className="text-xs text-neutral-400">4.89</span>
                            <span className="text-xs text-neutral-500">• Ad</span>
                        </div>
                    </div>

                    {/* View Button */}
                    <span className="text-blue-500 text-sm font-medium">View</span>
                </Link>
            </div>

            {/* Subcategories List */}
            <div className="px-4 space-y-2">
                {category.subcategories.map((sub) => (
                    <Link
                        key={sub}
                        href={`/discover/search?q=${encodeURIComponent(sub)}`}
                        className="flex items-center justify-between p-4 bg-[#1a1a1a] border border-[#333] rounded-xl hover:bg-[#222] transition-colors"
                    >
                        <span className="font-medium text-white">{sub}</span>
                        <ChevronRight className="h-5 w-5 text-neutral-500" />
                    </Link>
                ))}
            </div>
        </div>
    )
}

export default function CategoryPage() {
    return (
        <Suspense fallback={
            <div className="min-h-screen bg-[#0e0e0e] flex items-center justify-center">
                <div className="text-neutral-500">Memuat...</div>
            </div>
        }>
            <CategoryContent />
        </Suspense>
    )
}
