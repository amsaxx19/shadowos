"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, Rocket, Menu, X, Globe, Twitter, Instagram, Youtube } from "lucide-react"
import Link from "next/link"
import { useState } from "react"
import { motion } from "framer-motion"

export default function LandingPage() {
  const [isSearchFocused, setIsSearchFocused] = useState(false)

  return (
    <div className="min-h-screen bg-[#0e0e0e] text-white font-sans selection:bg-orange-500 selection:text-white">
      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-[#222] bg-[#0e0e0e] h-16 flex items-center px-4 md:px-6 gap-4">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 mr-4">
          <span className="text-orange-500 text-2xl font-bold">⚡</span>
        </Link>

        {/* View Trends & Pills (Desktop) */}
        <div className="hidden md:flex items-center gap-2 flex-1 overflow-hidden mask-gradient-right relative">
          <div className="flex items-center gap-2 animate-marquee whitespace-nowrap">
            <Button variant="ghost" className="text-blue-400 hover:text-blue-300 hover:bg-[#1a1a1a] gap-2 text-sm font-medium whitespace-nowrap">
              <Rocket className="h-4 w-4" />
              View Trends
            </Button>
            {[
              "Style guide for men",
              "How to get customers without ads",
              "Automation software packs",
              "Cooking clubs online",
              "AI agents marketplace",
              "Startup founder masterminds"
            ].map((label) => (
              <div key={label} className="flex items-center justify-center px-4 py-2 rounded-lg bg-[#1a1a1a] border border-[#222] hover:bg-[#222] cursor-pointer transition-colors whitespace-nowrap text-sm text-neutral-400">
                <Search className="h-3 w-3 mr-2 text-neutral-600" />
                {label}
              </div>
            ))}
            {/* Duplicate for seamless loop */}
            <Button variant="ghost" className="text-blue-400 hover:text-blue-300 hover:bg-[#1a1a1a] gap-2 text-sm font-medium whitespace-nowrap ml-4">
              <Rocket className="h-4 w-4" />
              View Trends
            </Button>
            {[
              "Style guide for men",
              "How to get customers without ads",
              "Automation software packs",
              "Cooking clubs online",
              "AI agents marketplace",
              "Startup founder masterminds"
            ].map((label) => (
              <div key={`${label}-duplicate`} className="flex items-center justify-center px-4 py-2 rounded-lg bg-[#1a1a1a] border border-[#222] hover:bg-[#222] cursor-pointer transition-colors whitespace-nowrap text-sm text-neutral-400">
                <Search className="h-3 w-3 mr-2 text-neutral-600" />
                {label}
              </div>
            ))}
          </div>
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-4 ml-auto shrink-0">
          <Link href="#" className="hidden md:block text-sm font-medium text-neutral-400 hover:text-white">API</Link>
          <Link href="/login" className="hidden md:block text-sm font-medium text-neutral-400 hover:text-white">Sign in</Link>
          <Link href="/dashboard/creator">
            <Button className="bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md px-4 h-9 text-sm">
              Start selling
            </Button>
          </Link>
          <Button variant="ghost" size="icon" className="text-neutral-400 hover:text-white">
            <Menu className="h-5 w-5" />
          </Button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-900/20 via-[#0a0a0a] to-[#0a0a0a]" />

        <div className="relative z-10 max-w-5xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-cyan-300">
                CUANBOSS
              </span>
              <br />
              <span className="text-white">Platform Bisnis Digital</span>
            </h1>

            <p className="text-xl text-neutral-400 mb-8 max-w-2xl mx-auto">
              Jual produk digital, kelola affiliate, dan bangun komunitas dalam satu platform.
              Tanpa biaya bulanan.
            </p>

            {/* Search Bar */}
            <div className="w-full max-w-2xl relative group z-50 mx-auto">
              <div className="absolute inset-0 bg-white/5 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative">
                <div className="flex items-center bg-[#1a1a1a] border border-[#333] rounded-full px-6 h-14 transition-all hover:border-neutral-600 focus-within:border-neutral-500 focus-within:ring-1 focus-within:ring-neutral-500">
                  <Search className="h-5 w-5 text-neutral-500 mr-3" />
                  <Input
                    className="border-0 bg-transparent text-lg placeholder:text-neutral-500 focus-visible:ring-0 focus-visible:ring-offset-0 h-full w-full p-0"
                    placeholder="Search CUANBOSS..."
                    onFocus={() => setIsSearchFocused(true)}
                    onBlur={() => setTimeout(() => setIsSearchFocused(false), 200)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        window.location.href = `/discover/search?q=${e.currentTarget.value}`
                      }
                    }}
                  />
                </div>

                {/* Trending Searches Dropdown */}
                {isSearchFocused && (
                  <div className="absolute top-full left-0 right-0 mt-2 bg-[#1a1a1a] border border-[#333] rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200 text-left">
                    <div className="p-4">
                      <h3 className="text-xs font-medium text-neutral-500 uppercase tracking-wider mb-3 px-2">Trending searches</h3>
                      <div className="space-y-1">
                        {[
                          "Sneaker resell groups",
                          "Build your own SaaS",
                          "Prediction markets 101",
                          "Style guide for men",
                          "How to get customers without ads"
                        ].map((term) => (
                          <Link
                            key={term}
                            href={`/discover/search?q=${term}`}
                            className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-[#222] text-neutral-300 hover:text-white transition-colors group/item"
                          >
                            <Rocket className="h-4 w-4 text-neutral-600 group-hover/item:text-blue-500 transition-colors" />
                            <span>{term}</span>
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Category Grid */}
      <section className="py-8 px-6 max-w-5xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { title: "Trading", image: "bg-gradient-to-br from-blue-900 to-blue-800" },
            { title: "Sports", image: "bg-gradient-to-br from-orange-900 to-red-900" },
            { title: "Social media", image: "bg-gradient-to-br from-pink-900 to-purple-900" },
            { title: "Clipping", image: "bg-gradient-to-br from-green-900 to-emerald-900" },
            { title: "Reselling", image: "bg-gradient-to-br from-yellow-900 to-orange-900" },
            { title: "Real estate", image: "bg-gradient-to-br from-indigo-900 to-violet-900" },
          ].map((cat) => (
            <div key={cat.title} className={`group relative h-48 rounded-2xl overflow-hidden cursor-pointer ${cat.image}`}>
              {/* Overlay */}
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors" />

              {/* Content */}
              <div className="absolute bottom-0 left-0 p-4 w-full bg-gradient-to-t from-black/80 to-transparent">
                <h3 className="text-white font-bold text-lg">{cat.title}</h3>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Payout Counter */}
      <section className="py-24 text-center">
        <div className="text-5xl md:text-6xl font-bold text-white/90 tracking-tight mb-2">
          $2,087,269,766
        </div>
        <p className="text-neutral-500 text-lg">
          in payouts
        </p>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-[#222] bg-[#0e0e0e] px-6">
        <div className="container mx-auto flex flex-col md:flex-row justify-between items-end gap-8">
          <div className="flex flex-wrap gap-6 text-sm font-medium text-neutral-500">
            <Link href="#" className="hover:text-white transition-colors">Platforms</Link>
            <Link href="#" className="hover:text-white transition-colors">Learn</Link>
            <Link href="#" className="hover:text-white transition-colors">Careers</Link>
            <Link href="#" className="hover:text-white transition-colors">Press</Link>
            <Link href="#" className="hover:text-white transition-colors">Brand</Link>
            <Link href="#" className="hover:text-white transition-colors">Privacy</Link>
            <Link href="#" className="hover:text-white transition-colors">Terms</Link>
          </div>

          <div className="flex gap-4 text-neutral-500">
            <Youtube className="h-5 w-5 hover:text-white cursor-pointer transition-colors" />
            <Twitter className="h-5 w-5 hover:text-white cursor-pointer transition-colors" />
            <Instagram className="h-5 w-5 hover:text-white cursor-pointer transition-colors" />
          </div>
        </div>
      </footer>
    </div>
  )
}
