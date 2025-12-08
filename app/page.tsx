"use client"

import { Input } from "@/components/ui/input"
import { Search, Rocket, Instagram, Twitter, Youtube, X, TrendingUp, GraduationCap, Dumbbell, Coins, PenTool, Banknote, Briefcase, Clapperboard, Zap, Scissors, Building2, Cpu, Laptop, Heart, Gamepad2, UserCheck, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { useState, useRef, useEffect } from "react"
import { cn } from "@/lib/utils"
import { useRouter } from "next/navigation"
import { User } from "@supabase/supabase-js"

import { supabase } from "@/lib/supabase/client"



const TAGS = [
  { name: "Lihat Tren", icon: <Rocket className="h-3 w-3 text-blue-500" /> },
  { name: "Belajar Saham", icon: <TrendingUp className="h-3 w-3 text-green-500" /> },
  { name: "Tips Affiliate", icon: <Coins className="h-3 w-3 text-yellow-500" /> },
  { name: "Cara FYP TikTok", icon: <Clapperboard className="h-3 w-3 text-pink-500" /> },
  { name: "Ide Bisnis 2025", icon: <Zap className="h-3 w-3 text-orange-500" /> },
  { name: "Tutorial Coding", icon: <Laptop className="h-3 w-3 text-purple-500" /> },
  { name: "Diet Sehat", icon: <Heart className="h-3 w-3 text-red-500" /> },
  { name: "Investasi Pemula", icon: <Banknote className="h-3 w-3 text-emerald-500" /> },
]

const CATEGORIES = [
  {
    name: "Clipping",
    slug: "clipping",
    icon: Scissors,
    video: "/videos/clipping.mp4",
    poster: "/videos/clipping_poster.jpg",
    pills: ["Jasa Klipping", "Clipper Agency", "Video Shorts", "Content Reward"]
  },
  {
    name: "Trading",
    slug: "trading",
    icon: TrendingUp,
    video: "/videos/trading.mp4",
    poster: "/videos/trading_poster.jpg",
    pills: ["Crypto & NFT", "Saham Lokal", "Forex / Gold", "Sinyal VIP"]
  },
  {
    name: "Bisnis",
    slug: "bisnis",
    icon: Briefcase,
    video: "/videos/business.mp4",
    poster: "/videos/business_poster.jpg",
    pills: ["TikTok Affiliate", "Jastip & Impor", "Dropship", "Ide Usaha"]
  },
  {
    name: "Karir",
    slug: "karir",
    icon: Building2,
    video: "/videos/career.mp4",
    poster: "/videos/career_poster.jpg",
    pills: ["Lolos BUMN", "Kerja Luar Negeri", "Template CV", "Interview"]
  },
  {
    name: "Teknologi",
    slug: "teknologi",
    icon: Cpu,
    video: "/videos/tech.mp4",
    poster: "/videos/tech_poster.jpg",
    pills: ["Belajar Coding", "Template Excel", "Tools AI", "Bot & SaaS"]
  },
  {
    name: "Lifestyle",
    slug: "lifestyle",
    icon: Heart,
    video: "/videos/lifestyle.mp4",
    poster: "/videos/lifestyle_poster.jpg",
    pills: ["Diet & Gym", "Joki Gaming", "Travel Guide", "Resep Masakan"]
  },
]

export default function LandingPage() {
  const router = useRouter()
  const [selectedCategory, setSelectedCategory] = useState<any>(null)
  const [isSearchFocused, setIsSearchFocused] = useState(false)
  const [trendingProducts, setTrendingProducts] = useState<any[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [searchResults, setSearchResults] = useState<any[]>([])
  const [isSearching, setIsSearching] = useState(false)
  const [user, setUser] = useState<User | null>(null)
  const searchRef = useRef<HTMLDivElement>(null)

  // Debounced search function
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

  const handleSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      router.push(`/discover/search?q=${encodeURIComponent(searchQuery)}`)
      setIsSearchFocused(false)
    }
  }



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
        } else {
          console.log('No trending products found')
        }
      } catch (err) {
        console.error('Unexpected error:', err)
      }
    }
    fetchTrending()
  }, [])

  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      setUser(user)
    }
    getUser()
  }, [])

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsSearchFocused(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [searchRef])

  return (
    <div className="min-h-screen bg-[#0e0e0e] text-white font-sans flex flex-col overflow-x-hidden">
      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-[#222] bg-[#0e0e0e]/90 backdrop-blur-md h-14 md:h-16 flex items-center px-3 md:px-6 justify-between">
        <Link href="/" className="flex items-center gap-2">
          <span className="text-orange-500 text-xl md:text-2xl font-bold">⚡</span>
        </Link>
        <div className="flex items-center gap-2 md:gap-3">
          {user ? (
            <Link href="/dashboard" className="px-3 py-1.5 md:px-4 md:py-2 text-sm md:text-base text-neutral-400 hover:text-white font-medium transition-colors">
              Dashboard
            </Link>
          ) : (
            <Link href="/login" className="px-3 py-1.5 md:px-4 md:py-2 text-sm md:text-base text-neutral-400 hover:text-white font-medium transition-colors">
              Log in
            </Link>
          )}
          <Link href="/sell" className="bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white text-sm md:text-base font-bold rounded-full shadow-lg shadow-orange-500/20 border border-orange-500/50 px-3 py-1.5 md:px-4 md:py-2 transition-colors">
            Mulai Jualan
          </Link>
        </div>
      </nav>

      {/* Main Content */}
      <div className="flex-1 flex flex-col items-center justify-center px-4 pb-20 w-full">

        {/* Marquee Tags Row */}
        <div className="w-full mb-16 mt-24 max-w-6xl flex items-center gap-4">
          <div className="flex items-center gap-2 text-neutral-400 whitespace-nowrap">
            <Rocket className="h-4 w-4 text-orange-500" />
            <span className="font-medium text-sm">View Trends</span>
          </div>
          <div className="flex-1 overflow-hidden relative group mask-linear-fade">
            <div className="absolute left-0 top-0 bottom-0 w-10 bg-gradient-to-r from-[#0e0e0e] to-transparent z-10" />
            <div className="absolute right-0 top-0 bottom-0 w-10 bg-gradient-to-l from-[#0e0e0e] to-transparent z-10" />

            <div className="flex gap-3 animate-marquee whitespace-nowrap hover:pause will-change-transform">
              {[...TAGS, ...TAGS, ...TAGS].map((tag, i) => (
                <Link key={i} href={`/discover/search?q=${encodeURIComponent(tag.name)}`} className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#1c1c1c] border border-[#222] text-neutral-400 hover:text-white hover:border-neutral-500 transition-colors cursor-pointer">
                  {tag.icon}
                  <span className="text-sm font-medium">{tag.name}</span>
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Hero Logo & Search */}
        <div className="text-center mb-6 md:mb-16 space-y-4 md:space-y-8 w-full max-w-2xl relative z-10 px-2 md:px-4">
          <div className="flex flex-col items-center gap-2 md:gap-4">
            <div className="h-12 w-12 md:h-20 md:w-20 rounded-xl md:rounded-2xl bg-gradient-to-br from-orange-500 to-red-600 flex items-center justify-center shadow-2xl shadow-orange-500/20">
              <span className="text-xl md:text-4xl">⚡</span>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold tracking-tight text-white">
              CUAN<span className="text-orange-500">BOSS</span>
            </h1>
            <p className="text-sm md:text-xl text-neutral-400">
              The operating system for <span className="text-white font-medium">digital entrepreneurs</span>
            </p>
          </div>

          <div ref={searchRef} className="relative w-full">
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-orange-600 to-red-600 rounded-xl md:rounded-2xl blur-sm opacity-20 group-hover:opacity-40 transition duration-1000"></div>
              <div className="relative flex items-center bg-[#161616] border border-[#333] rounded-xl md:rounded-2xl p-1.5 md:p-2 shadow-2xl">
                <Search className="ml-3 md:ml-4 h-5 w-5 md:h-6 md:w-6 text-neutral-500" />
                <input
                  type="text"
                  placeholder="Search products, creators..."
                  className="w-full bg-transparent border-none focus:ring-0 outline-none text-base md:text-lg px-3 md:px-4 text-white placeholder:text-neutral-600 h-10 md:h-12"
                  onFocus={() => setIsSearchFocused(true)}
                  onChange={handleSearchChange}
                  onKeyDown={handleSearch}
                  value={searchQuery}
                />
                <div className="hidden md:flex items-center gap-2 mr-2">
                  <span className="px-2 py-1 rounded bg-[#222] text-xs text-neutral-500 border border-[#333]">⌘K</span>
                </div>
              </div>
            </div>

            {/* Search Dropdown */}
            {isSearchFocused && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-[#161616] border border-[#333] rounded-xl shadow-2xl overflow-hidden z-50 animate-in fade-in zoom-in-95 duration-200 text-left">
                <div className="p-2">
                  {/* Trending Products from DB */}
                  <div className="text-xs font-bold text-neutral-500 px-3 py-2 uppercase tracking-wider">Trending Products</div>
                  {trendingProducts.length > 0 ? (
                    trendingProducts.map((product) => (
                      <Link
                        key={product.id}
                        href={`/discover/search?q=${encodeURIComponent(product.title)}`}
                        className="flex items-center gap-3 px-3 py-3 hover:bg-[#222] rounded-lg cursor-pointer text-neutral-300 hover:text-white transition-colors"
                      >
                        <TrendingUp className="h-4 w-4 text-orange-500" />
                        <span className="truncate">{product.title}</span>
                      </Link>
                    ))
                  ) : (
                    <div className="px-3 py-3 text-neutral-500 text-sm">Loading trending products...</div>
                  )}

                  {/* Search results when typing */}
                  {searchQuery.length > 1 && (
                    <>
                      <div className="text-xs font-bold text-neutral-500 px-3 py-2 uppercase tracking-wider mt-2 border-t border-[#222] pt-3">Hasil Pencarian</div>
                      {isSearching ? (
                        <div className="px-3 py-3 text-neutral-500 text-sm">Mencari...</div>
                      ) : searchResults.length > 0 ? (
                        searchResults.map((product) => (
                          <Link
                            key={product.id}
                            href={`/product/${product.id}`}
                            className="flex items-center gap-3 px-3 py-3 hover:bg-[#222] rounded-lg cursor-pointer text-neutral-300 hover:text-white transition-colors"
                          >
                            <Search className="h-4 w-4 text-neutral-500" />
                            <span>{product.title}</span>
                          </Link>
                        ))
                      ) : (
                        <div className="px-3 py-3 text-neutral-500 text-sm">Tidak ditemukan produk untuk "{searchQuery}"</div>
                      )}
                    </>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Categories Grid */}
        <div className="w-full max-w-6xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 px-2 md:px-0">
          {CATEGORIES.map((cat) => (
            <CategoryCard key={cat.name} category={cat} onClick={() => setSelectedCategory(cat)} />
          ))}
        </div>
      </div>

      {/* Expanded Category Modal */}
      {selectedCategory && (
        <div className="fixed inset-0 z-[100] flex items-end md:items-center justify-center p-0 md:p-4">
          {/* ... modal content ... */}
          <div
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            onClick={() => setSelectedCategory(null)}
          />

          {/* Modal Content */}
          <div className="relative w-full md:max-w-2xl h-[85vh] md:h-auto bg-[#0e0e0e] rounded-t-2xl md:rounded-3xl overflow-hidden shadow-2xl animate-in slide-in-from-bottom-10 fade-in duration-300 border border-[#222]">

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
    </div>
  )
}

function CategoryCard({ category, onClick }: { category: any, onClick: () => void }) {
  const videoRef = useRef<HTMLVideoElement>(null)

  return (
    <div
      onClick={onClick}
      onMouseEnter={() => videoRef.current?.play()}
      onMouseLeave={() => {
        if (videoRef.current) {
          videoRef.current.pause()
          videoRef.current.currentTime = 0
        }
      }}
      className="group relative h-[200px] rounded-2xl overflow-hidden border border-[#222] cursor-pointer hover:border-neutral-500 transition-all duration-300 active:scale-95 will-change-transform"
    >
      {/* Video Background */}
      <div className="absolute inset-0 z-0">
        <video
          ref={videoRef}
          src={category.video}
          poster={category.poster}
          loop
          muted
          playsInline
          preload="none"
          className="w-full h-full object-cover opacity-60 group-hover:opacity-80 transition-opacity duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
      </div>

      {/* Content: Title Bottom Left */}
      <div className="absolute bottom-0 left-0 p-6 z-10 w-full">
        <h3 className="text-2xl font-bold text-white drop-shadow-lg transform translate-y-0 transition-transform duration-300">
          {category.name}
        </h3>
      </div>
    </div>
  )
}
