"use client"

import { Button } from "@/components/ui/button"
import { Accordion } from "@/components/ui/accordion"
import { CheckCircle2, Zap, Globe, Shield, BarChart3, Users, Layout, CreditCard, ArrowRight, X, Check, Rocket, Lock, Smartphone, BookOpen, Video, Laptop, Briefcase, Ticket, Palette, UserCheck, ShieldCheck, Split, Scissors } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"

const MARQUEE_ITEMS = [
    { name: "Budi", action: "menarik", amount: "Rp 5.000.000", color: "text-green-400" },
    { name: "Siska", action: "menerima order", amount: "+Rp 150.000", color: "text-blue-400" },
    { name: "Deni", action: "mencairkan komisi", amount: "Rp 2.300.000", color: "text-purple-400" },
    { name: "Rina", action: "menjual E-book", amount: "+Rp 99.000", color: "text-green-400" },
    { name: "Aldi", action: "menarik", amount: "Rp 12.500.000", color: "text-green-400" },
    { name: "Maya", action: "menerima order", amount: "+Rp 350.000", color: "text-blue-400" },
]

export default function SellPage() {
    return (
        <div className="min-h-screen bg-[#050505] text-white font-sans overflow-x-hidden selection:bg-purple-500/30 selection:text-purple-200">
            {/* Navbar */}
            <nav className="fixed top-0 left-0 right-0 z-50 border-b border-white/5 bg-[#050505]/80 backdrop-blur-xl h-16 flex items-center px-4 md:px-6 justify-between">
                <Link href="/" className="flex items-center gap-2">
                    <span className="text-blue-500 text-2xl font-bold">⚡</span>
                    <span className="font-bold text-xl tracking-tight">CUAN<span className="text-blue-500">BOSS</span></span>
                </Link>
                <div className="flex items-center gap-3">
                    <Link href="/login">
                        <Button variant="ghost" className="text-neutral-400 hover:text-white font-medium">Log in</Button>
                    </Link>
                    <Link href="/signup">
                        <Button className="bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-full shadow-[0_0_20px_-5px_rgba(37,99,235,0.5)]">
                            Daftar Sekarang
                        </Button>
                    </Link>
                </div>
            </nav>

            {/* 1. HERO SECTION (The Promise) */}
            <section className="pt-32 pb-20 px-4 text-center max-w-5xl mx-auto relative">
                {/* Background Glow - Optimized Blur */}
                <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-blue-600/20 blur-[80px] rounded-full -z-10 opacity-50" />
                <div className="absolute top-40 left-1/2 -translate-x-1/2 w-[400px] h-[400px] bg-purple-600/20 blur-[60px] rounded-full -z-10 opacity-50 mix-blend-screen" />

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                >
                    <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-8 leading-[1.1]">
                        Gak peduli siapa lo, <br />
                        gak peduli latar belakang lo, <br />
                        <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent drop-shadow-[0_0_30px_rgba(59,130,246,0.5)]">
                            lo berhak sukses.
                        </span>
                    </h1>
                    <p className="text-xl md:text-2xl text-neutral-400 mb-10 max-w-3xl mx-auto leading-relaxed font-light">
                        Kelas online, E-book, Komunitas VIP, Software, atau Jasa — apapun keahlianmu, CuanBoss adalah tempat untuk mengubahnya menjadi penghasilan nyata.
                    </p>

                    <Link href="/signup">
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            animate={{ scale: [1, 1.02, 1] }}
                            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                            className="h-20 px-12 text-2xl bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-full shadow-[0_0_50px_-10px_rgba(37,99,235,0.6)] flex items-center gap-3 mx-auto border border-white/10"
                        >
                            Mulai Jualan Gratis Sekarang <ArrowRight className="h-6 w-6" />
                        </motion.button>
                    </Link>

                </motion.div>
            </section>

            {/* 2. THE "FOMO" MARQUEE (The Receipts) */}
            <section className="py-12 border-y border-white/5 bg-white/[0.02] overflow-hidden backdrop-blur-sm">
                <div className="relative flex overflow-x-hidden group">
                    <div className="animate-marquee whitespace-nowrap flex gap-6 py-2">
                        {/* Original Set */}
                        {MARQUEE_ITEMS.map((item, i) => (
                            <div key={i} className="inline-flex items-center gap-3 bg-[#0a0a0a] border border-white/10 px-5 py-3 rounded-xl min-w-[280px]">
                                <div className="h-8 w-8 rounded-full bg-green-500/20 flex items-center justify-center text-green-400">
                                    <Zap className="h-4 w-4 fill-current" />
                                </div>
                                <div className="text-sm">
                                    <span className="text-neutral-300 font-medium">🔔 {item.name}</span> <span className="text-neutral-500">{item.action}</span> <span className={`font-bold ${item.color}`}>{item.amount}</span>
                                </div>
                            </div>
                        ))}
                        {/* Duplicate for infinite scroll */}
                        {MARQUEE_ITEMS.map((item, i) => (
                            <div key={`dup-${i}`} className="inline-flex items-center gap-3 bg-[#0a0a0a] border border-white/10 px-5 py-3 rounded-xl min-w-[280px]">
                                <div className="h-8 w-8 rounded-full bg-green-500/20 flex items-center justify-center text-green-400">
                                    <Zap className="h-4 w-4 fill-current" />
                                </div>
                                <div className="text-sm">
                                    <span className="text-neutral-300 font-medium">🔔 {item.name}</span> <span className="text-neutral-500">{item.action}</span> <span className={`font-bold ${item.color}`}>{item.amount}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* 3. KENAPA CUANBOSS? (The 5-Step Timeline) */}
            <section className="py-32 px-4 max-w-7xl mx-auto relative overflow-hidden">
                <div className="text-center mb-24 relative z-10">
                    <h2 className="text-4xl md:text-5xl font-bold leading-tight mb-6">
                        Kenapa <span className="text-blue-500">CuanBoss?</span>
                    </h2>
                    <p className="text-xl text-neutral-400 max-w-2xl mx-auto">
                        Sistem canggih yang bekerja otomatis buat lo. Fokus berkarya, sisanya biar kami yang urus.
                    </p>
                </div>

                {/* Central Line (Desktop Only) */}
                <div className="hidden md:block absolute left-1/2 top-40 bottom-0 w-px bg-gradient-to-b from-blue-500/0 via-blue-500/20 to-blue-500/0" />

                <div className="space-y-32 relative z-10">

                    {/* ITEM 1: Auto-Split Revenue (Left Text, Right Visual) */}
                    <div className="flex flex-col md:flex-row items-center gap-12 md:gap-24">
                        <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 h-12 w-12 bg-[#050505] border border-blue-500 rounded-full items-center justify-center z-10 shadow-[0_0_20px_rgba(59,130,246,0.5)]">
                            <Split className="h-6 w-6 text-blue-500" />
                        </div>
                        <div className="flex-1 text-center md:text-right md:pr-12">
                            <h3 className="text-3xl md:text-4xl font-bold mb-4 text-blue-400">Auto-Split Revenue</h3>
                            <p className="text-lg text-neutral-400 leading-relaxed">
                                Gak perlu transfer manual satu-satu. Tiap ada transaksi, sistem langsung <strong className="text-white">bagi hasil otomatis</strong> ke partner, investor, atau tim lo.
                            </p>
                        </div>
                        <div className="flex-1 w-full md:pl-12">
                            <div className="relative bg-[#0a0a0a] border border-white/10 rounded-3xl p-8 max-w-sm mx-auto md:mx-0 hover:border-blue-500/30 transition-all group">
                                <div className="absolute inset-0 bg-blue-500/10 blur-[60px] rounded-full opacity-50 group-hover:opacity-100 transition-opacity" />
                                <div className="relative space-y-4">
                                    <div className="bg-[#161616] p-4 rounded-xl border border-white/5 flex justify-between items-center">
                                        <span className="text-neutral-400">Total Transaksi</span>
                                        <span className="text-white font-bold">Rp 1.000.000</span>
                                    </div>
                                    <div className="flex justify-center">
                                        <div className="h-8 w-px bg-white/10" />
                                    </div>
                                    <div className="flex gap-4">
                                        <div className="flex-1 bg-blue-500/10 p-3 rounded-xl border border-blue-500/20 text-center">
                                            <div className="text-xs text-blue-400 mb-1">You (90%)</div>
                                            <div className="font-bold text-white">Rp 900rb</div>
                                        </div>
                                        <div className="flex-1 bg-purple-500/10 p-3 rounded-xl border border-purple-500/20 text-center">
                                            <div className="text-xs text-purple-400 mb-1">Partner (10%)</div>
                                            <div className="font-bold text-white">Rp 100rb</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* ITEM 2: Pembayaran Lokal (Right Text, Left Visual) */}
                    <div className="flex flex-col md:flex-row-reverse items-center gap-12 md:gap-24">
                        <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 h-12 w-12 bg-[#050505] border border-green-500 rounded-full items-center justify-center z-10 shadow-[0_0_20px_rgba(34,197,94,0.5)]">
                            <CreditCard className="h-6 w-6 text-green-500" />
                        </div>
                        <div className="flex-1 text-center md:text-left md:pl-12">
                            <h3 className="text-3xl md:text-4xl font-bold mb-4 text-green-400">Pembayaran Lokal</h3>
                            <p className="text-lg text-neutral-400 leading-relaxed">
                                Terima QRIS, GoPay, OVO, dan VA Bank otomatis via Midtrans. Pembeli senang karena mudah, <strong className="text-white">konversi penjualan naik drastis.</strong>
                            </p>
                        </div>
                        <div className="flex-1 w-full md:pr-12 flex justify-center md:justify-end">
                            <div className="relative bg-[#0a0a0a] border border-white/10 rounded-3xl p-8 max-w-sm w-full hover:border-green-500/30 transition-all group">
                                <div className="absolute inset-0 bg-green-500/10 blur-[60px] rounded-full opacity-50 group-hover:opacity-100 transition-opacity" />
                                <div className="relative flex flex-col gap-3">
                                    {["QRIS", "Bank Transfer", "E-Wallet"].map((method, i) => (
                                        <div key={i} className="flex items-center gap-3 bg-[#161616] p-3 rounded-xl border border-white/5">
                                            <div className="h-8 w-8 rounded-full bg-green-500/20 flex items-center justify-center">
                                                <Check className="h-4 w-4 text-green-500" />
                                            </div>
                                            <span className="text-white font-medium">{method}</span>
                                            <span className="ml-auto text-xs text-green-500 bg-green-500/10 px-2 py-1 rounded-full">Active</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* ITEM 3: Clipper Reward (Left Text, Right Visual) */}
                    <div className="flex flex-col md:flex-row items-center gap-12 md:gap-24">
                        <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 h-12 w-12 bg-[#050505] border border-purple-500 rounded-full items-center justify-center z-10 shadow-[0_0_20px_rgba(168,85,247,0.5)]">
                            <Scissors className="h-6 w-6 text-purple-500" />
                        </div>
                        <div className="flex-1 text-center md:text-right md:pr-12">
                            <h3 className="text-3xl md:text-4xl font-bold mb-4 text-purple-400">Clipper Reward</h3>
                            <p className="text-lg text-neutral-400 leading-relaxed">
                                Punya banyak konten video? Biarkan pasukan clipper yang edit dan upload ulang. <strong className="text-white">Mereka digaji otomatis</strong> berdasarkan views yang mereka dapatkan.
                            </p>
                        </div>
                        <div className="flex-1 w-full md:pl-12">
                            <div className="relative bg-[#0a0a0a] border border-white/10 rounded-3xl p-6 max-w-sm mx-auto md:mx-0 hover:border-purple-500/30 transition-all group">
                                <div className="absolute inset-0 bg-purple-500/10 blur-[60px] rounded-full opacity-50 group-hover:opacity-100 transition-opacity" />
                                <div className="relative space-y-3">
                                    {[
                                        { title: "Video Viral #1", views: "1.2M Views", pay: "Rp 2.5jt" },
                                        { title: "Review Produk", views: "500k Views", pay: "Rp 1.0jt" },
                                    ].map((item, i) => (
                                        <div key={i} className="flex items-center justify-between bg-[#161616] p-4 rounded-xl border border-white/5">
                                            <div>
                                                <div className="text-white text-sm font-medium">{item.title}</div>
                                                <div className="text-xs text-neutral-500">{item.views}</div>
                                            </div>
                                            <div className="text-purple-400 font-bold">{item.pay}</div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* ITEM 4: Affiliate System (Right Text, Left Visual) */}
                    <div className="flex flex-col md:flex-row-reverse items-center gap-12 md:gap-24">
                        <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 h-12 w-12 bg-[#050505] border border-orange-500 rounded-full items-center justify-center z-10 shadow-[0_0_20px_rgba(249,115,22,0.5)]">
                            <Users className="h-6 w-6 text-orange-500" />
                        </div>
                        <div className="flex-1 text-center md:text-left md:pl-12">
                            <h3 className="text-3xl md:text-4xl font-bold mb-4 text-orange-400">Affiliate System</h3>
                            <p className="text-lg text-neutral-400 leading-relaxed">
                                Rekrut ribuan reseller untuk bantu jual produk kamu. <strong className="text-white">Komisi dihitung dan ditransfer otomatis</strong> oleh sistem. Gak ada lagi rekap manual.
                            </p>
                        </div>
                        <div className="flex-1 w-full md:pr-12 flex justify-center md:justify-end">
                            <div className="relative bg-[#0a0a0a] border border-white/10 rounded-3xl p-6 max-w-sm w-full hover:border-orange-500/30 transition-all group">
                                <div className="absolute inset-0 bg-orange-500/10 blur-[60px] rounded-full opacity-50 group-hover:opacity-100 transition-opacity" />
                                <div className="relative space-y-3">
                                    {[
                                        { name: "Andi", profit: "+Rp 500rb", role: "Top Affiliate" },
                                        { name: "Siti", profit: "+Rp 250rb", role: "New Member" },
                                        { name: "Budi", profit: "+Rp 1.2jt", role: "Super Seller" },
                                    ].map((item, i) => (
                                        <div key={i} className="flex items-center gap-4 bg-[#161616] p-4 rounded-xl border border-white/5">
                                            <div className="h-10 w-10 rounded-full bg-orange-500/20 flex items-center justify-center">
                                                <Users className="h-5 w-5 text-orange-400" />
                                            </div>
                                            <div className="flex-1 text-left">
                                                <div className="text-white font-medium">{item.name}</div>
                                                <div className="text-xs text-neutral-500">{item.role}</div>
                                            </div>
                                            <div className="text-green-400 font-bold text-sm">{item.profit}</div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* ITEM 5: Real-Time Analytics (Left Text, Right Visual) */}
                    <div className="flex flex-col md:flex-row items-center gap-12 md:gap-24">
                        <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 h-12 w-12 bg-[#050505] border border-pink-500 rounded-full items-center justify-center z-10 shadow-[0_0_20px_rgba(236,72,153,0.5)]">
                            <BarChart3 className="h-6 w-6 text-pink-500" />
                        </div>
                        <div className="flex-1 text-center md:text-right md:pr-12">
                            <h3 className="text-3xl md:text-4xl font-bold mb-4 text-pink-400">Real-Time Analytics</h3>
                            <p className="text-lg text-neutral-400 leading-relaxed">
                                Pantau omzet, profit bersih, dan performa produk secara live. <strong className="text-white">Data akurat</strong> untuk keputusan bisnis yang lebih cepat.
                            </p>
                        </div>
                        <div className="flex-1 w-full md:pl-12">
                            <div className="relative bg-[#0a0a0a] border border-white/10 rounded-3xl p-8 max-w-sm mx-auto md:mx-0 hover:border-pink-500/30 transition-all group">
                                <div className="absolute inset-0 bg-pink-500/10 blur-[60px] rounded-full opacity-50 group-hover:opacity-100 transition-opacity" />
                                <div className="relative">
                                    <div className="flex items-end justify-between h-32 gap-2">
                                        {[40, 65, 45, 80, 55, 90, 70].map((h, i) => (
                                            <div key={i} className="w-full bg-pink-500/20 rounded-t-lg relative group-hover:bg-pink-500/40 transition-colors" style={{ height: `${h}%` }}>
                                                <div className="absolute top-0 w-full h-1 bg-pink-500 shadow-[0_0_10px_rgba(236,72,153,0.8)]" />
                                            </div>
                                        ))}
                                    </div>
                                    <div className="flex justify-between mt-4 text-xs text-neutral-500 font-mono">
                                        <span>MON</span>
                                        <span>WED</span>
                                        <span>FRI</span>
                                        <span>SUN</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </section>



            {/* 4. BUSINESS MODELS GRID (Whop Style) */}
            {/* 4. APAPUN PRODUK KAMU (Bento Grid Gen Z Style) */}
            <section className="py-32 px-4 max-w-7xl mx-auto">
                <div className="text-center mb-20">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-5xl md:text-7xl font-bold mb-6 tracking-tight"
                    >
                        Jualan <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400">Apa Aja?</span>
                    </motion.h2>
                    <p className="text-xl text-neutral-400">Satu platform, sejuta peluang. Gaspol bisnis digital lo.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 auto-rows-[280px]">
                    {/* Item 1: Kursus (Large) */}
                    <motion.div
                        whileHover={{ scale: 0.98 }}
                        className="md:col-span-2 relative group overflow-hidden rounded-3xl bg-[#0a0a0a] border border-white/10 p-8 flex flex-col justify-between"
                    >
                        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                        <div className="relative z-10">
                            <div className="h-12 w-12 bg-blue-500/20 rounded-full flex items-center justify-center mb-4 text-blue-400">
                                <Video className="h-6 w-6" />
                            </div>
                            <h3 className="text-3xl font-bold text-white mb-2">Kursus & E-book</h3>
                            <p className="text-neutral-400 max-w-sm">Jual ilmu lo dalam bentuk video course, PDF, atau template. Hosting file aman, anti-bajak.</p>
                        </div>
                        {/* Abstract Visual */}
                        <div className="absolute right-0 bottom-0 w-1/2 h-full opacity-30 group-hover:opacity-60 transition-opacity">
                            <div className="absolute bottom-4 right-4 w-48 h-32 bg-blue-500/30 rounded-xl rotate-[-6deg] border border-blue-500/20 backdrop-blur-sm" />
                            <div className="absolute bottom-8 right-8 w-48 h-32 bg-blue-500/30 rounded-xl rotate-[-12deg] border border-blue-500/20 backdrop-blur-sm" />
                        </div>
                    </motion.div>

                    {/* Item 2: Komunitas (Tall) */}
                    <motion.div
                        whileHover={{ scale: 0.98 }}
                        className="md:row-span-2 relative group overflow-hidden rounded-3xl bg-[#0a0a0a] border border-white/10 p-8 flex flex-col"
                    >
                        <div className="absolute inset-0 bg-gradient-to-b from-purple-600/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                        <div className="relative z-10 mb-auto">
                            <div className="h-12 w-12 bg-purple-500/20 rounded-full flex items-center justify-center mb-4 text-purple-400">
                                <Users className="h-6 w-6" />
                            </div>
                            <h3 className="text-3xl font-bold text-white mb-2">Komunitas VIP</h3>
                            <p className="text-neutral-400">Monetisasi grup Telegram/Discord dengan sistem subscription otomatis.</p>
                        </div>
                        {/* Chat Visual */}
                        <div className="relative mt-8 space-y-3 opacity-50 group-hover:opacity-100 transition-opacity">
                            <div className="bg-white/10 p-3 rounded-l-xl rounded-tr-xl w-3/4 ml-auto text-xs">Join VIP Group 🔥</div>
                            <div className="bg-purple-500/20 p-3 rounded-r-xl rounded-tl-xl w-3/4 text-xs text-purple-300">Payment Confirmed! ✅</div>
                            <div className="bg-white/10 p-3 rounded-l-xl rounded-tr-xl w-3/4 ml-auto text-xs">Welcome aboard! 🚀</div>
                        </div>
                    </motion.div>

                    {/* Item 3: Jasa (Standard) */}
                    <motion.div
                        whileHover={{ scale: 0.98 }}
                        className="relative group overflow-hidden rounded-3xl bg-[#0a0a0a] border border-white/10 p-8"
                    >
                        <div className="absolute inset-0 bg-gradient-to-br from-pink-600/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                        <div className="relative z-10">
                            <div className="h-12 w-12 bg-pink-500/20 rounded-full flex items-center justify-center mb-4 text-pink-400">
                                <Briefcase className="h-6 w-6" />
                            </div>
                            <h3 className="text-2xl font-bold text-white mb-2">Jasa & Agency</h3>
                            <p className="text-neutral-400 text-sm">Terima order jasa (Design, Clipping, Writing) dengan manajemen order rapi.</p>
                        </div>
                    </motion.div>

                    {/* Item 4: Software (Standard) */}
                    <motion.div
                        whileHover={{ scale: 0.98 }}
                        className="relative group overflow-hidden rounded-3xl bg-[#0a0a0a] border border-white/10 p-8"
                    >
                        <div className="absolute inset-0 bg-gradient-to-br from-orange-600/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                        <div className="relative z-10">
                            <div className="h-12 w-12 bg-orange-500/20 rounded-full flex items-center justify-center mb-4 text-orange-400">
                                <Laptop className="h-6 w-6" />
                            </div>
                            <h3 className="text-2xl font-bold text-white mb-2">Software & Tools</h3>
                            <p className="text-neutral-400 text-sm">Jual lisensi aplikasi, template Notion, atau Excel spreadsheet.</p>
                        </div>
                    </motion.div>

                    {/* Item 5: Event (Standard) */}
                    <motion.div
                        whileHover={{ scale: 0.98 }}
                        className="relative group overflow-hidden rounded-3xl bg-[#0a0a0a] border border-white/10 p-8"
                    >
                        <div className="absolute inset-0 bg-gradient-to-br from-green-600/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                        <div className="relative z-10">
                            <div className="h-12 w-12 bg-green-500/20 rounded-full flex items-center justify-center mb-4 text-green-400">
                                <Ticket className="h-6 w-6" />
                            </div>
                            <h3 className="text-2xl font-bold text-white mb-2">Event & Webinar</h3>
                            <p className="text-neutral-400 text-sm">Jual tiket acara live zoom atau workshop offline lo.</p>
                        </div>
                    </motion.div>

                    {/* Item 6: Affiliate (Large) */}
                    <motion.div
                        whileHover={{ scale: 0.98 }}
                        className="md:col-span-2 relative group overflow-hidden rounded-3xl bg-[#0a0a0a] border border-white/10 p-8 flex flex-col justify-between"
                    >
                        <div className="absolute inset-0 bg-gradient-to-br from-cyan-600/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                        <div className="relative z-10">
                            <div className="h-12 w-12 bg-cyan-500/20 rounded-full flex items-center justify-center mb-4 text-cyan-400">
                                <BarChart3 className="h-6 w-6" />
                            </div>
                            <h3 className="text-3xl font-bold text-white mb-2">Affiliate Marketing</h3>
                            <p className="text-neutral-400 max-w-sm">Gak punya produk? Santai. Bantu jualin produk creator lain dan dapatkan komisi hingga 50%.</p>
                        </div>
                        {/* Graph Visual */}
                        <div className="absolute right-0 bottom-0 w-1/2 h-32 flex items-end gap-2 px-8 pb-8 opacity-30 group-hover:opacity-60 transition-opacity">
                            {[40, 60, 30, 80, 50, 90, 70].map((h, i) => (
                                <div key={i} className="w-full bg-cyan-500 rounded-t-sm" style={{ height: `${h}%` }} />
                            ))}
                        </div>
                    </motion.div>
                </div>
            </section>



            {/* 5. COMPARISON SECTION (The "Employee vs Entrepreneur" Hook) */}
            <section className="py-32 px-4 max-w-7xl mx-auto">
                <div className="text-center mb-20">
                    <h2 className="text-4xl md:text-6xl font-bold mb-6">Hidup Cuma Sekali, <br />Jangan Salah <span className="text-white">Pilih Jalan.</span></h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                    {/* Tipe 1: Digital Entrepreneur (The Goal) */}
                    <motion.div
                        whileHover={{ scale: 1.02 }}
                        className="relative group overflow-hidden rounded-[2.5rem] border-2 border-blue-500/50 bg-[#0a0a0a] p-8 md:p-12 flex flex-col justify-between min-h-[500px]"
                    >
                        {/* Glowing Background */}
                        <div className="absolute inset-0 bg-blue-600/10 group-hover:bg-blue-600/20 transition-colors duration-500" />
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-1/2 bg-blue-500/20 blur-[100px] rounded-full pointer-events-none" />

                        <div className="relative z-10 mt-8">
                            <div className="h-20 w-20 bg-blue-500 rounded-2xl flex items-center justify-center mb-8 shadow-[0_0_40px_rgba(59,130,246,0.4)]">
                                <Laptop className="h-10 w-10 text-white" />
                            </div>
                            <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">
                                Pebisnis <span className="text-blue-400 underline decoration-blue-500/30 underline-offset-8">Produk Digital</span>
                            </h3>
                            <p className="text-lg text-blue-200/80 mb-8">
                                Kerja keras sekali di awal bikin produk, sisanya menikmati penghasilan otomatis seumur hidup.
                            </p>

                            <ul className="space-y-4">
                                {[
                                    "Penghasilan tidak terbatas",
                                    "Kerja dari mana saja & kapan saja",
                                    "Bangun aset masa depan sendiri",
                                    "Tidur pun rekening tetap terisi"
                                ].map((item, i) => (
                                    <li key={i} className="flex items-center gap-3 text-white font-medium">
                                        <div className="h-6 w-6 rounded-full bg-blue-500/20 flex items-center justify-center shrink-0">
                                            <Check className="h-4 w-4 text-blue-400" />
                                        </div>
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </motion.div>

                    {/* Tipe 2: Corporate Slave (The Trap) */}
                    <motion.div
                        whileHover={{ scale: 1.02 }}
                        className="relative group overflow-hidden rounded-[2.5rem] border border-white/10 bg-[#050505] p-8 md:p-12 flex flex-col justify-between min-h-[500px] opacity-80 hover:opacity-100 transition-opacity"
                    >
                        {/* Dark Background */}
                        <div className="absolute inset-0 bg-red-500/5 group-hover:bg-red-500/10 transition-colors duration-500" />

                        <div className="relative z-10 mt-8">
                            <div className="h-20 w-20 bg-white/5 rounded-2xl flex items-center justify-center mb-8 border border-white/10">
                                <div className="relative">
                                    <Briefcase className="h-10 w-10 text-neutral-500" />
                                    <div className="absolute -top-1 -right-1 h-3 w-3 bg-red-500 rounded-full animate-pulse" />
                                </div>
                            </div>
                            <h3 className="text-3xl md:text-4xl font-bold text-neutral-400 mb-4">
                                Terjebak <span className="text-neutral-600 line-through decoration-red-500/50 decoration-2">Rutinitas</span>
                            </h3>
                            <p className="text-lg text-neutral-500 mb-8">
                                Menukar waktu berharga demi gaji yang numpang lewat. Pergi pagi pulang malam, impian terkubur.
                            </p>

                            <ul className="space-y-4">
                                {[
                                    "Gaji kecil & kenaikan lambat",
                                    "Diatur bos, gak punya kebebasan",
                                    "Rawan PHK kapan saja",
                                    "Capek kerja buat mimpi orang lain"
                                ].map((item, i) => (
                                    <li key={i} className="flex items-center gap-3 text-neutral-500">
                                        <div className="h-6 w-6 rounded-full bg-white/5 flex items-center justify-center shrink-0">
                                            <X className="h-4 w-4 text-neutral-600" />
                                        </div>
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* 6. PRICING SECTION (The No-Brainer Offer) */}
            <section className="py-24 px-4 bg-[#0a0a0a] border-y border-white/5">
                <div className="max-w-4xl mx-auto text-center">
                    <h2 className="text-4xl font-bold mb-12">Mulai Gratis, <span className="text-blue-500">Tanpa Biaya Langganan.</span></h2>

                    <div className="relative bg-[#0f0f0f] border border-white/10 rounded-[3rem] p-8 md:p-16 overflow-hidden max-w-2xl mx-auto hover:border-blue-500/30 transition-all">
                        {/* Gradient Glow */}
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-gradient-to-b from-blue-500/5 to-transparent pointer-events-none" />

                        <div className="relative z-10">
                            <div className="inline-block px-4 py-1 bg-blue-500/10 text-blue-400 rounded-full text-sm font-bold mb-8 border border-blue-500/20">
                                GRATIS UNTUK MEMULAI
                            </div>

                            <div className="flex items-baseline justify-center gap-2 mb-4">
                                <span className="text-7xl md:text-8xl font-bold text-white">Rp 0</span>
                                <span className="text-xl text-neutral-400">/ bulan</span>
                            </div>

                            <p className="text-neutral-400 mb-10">Tanpa biaya langganan. Tanpa kartu kredit.</p>

                            <ul className="space-y-4 mb-12 text-left max-w-xs mx-auto">
                                <li className="flex items-center gap-3 text-lg">
                                    <CheckCircle2 className="h-6 w-6 text-blue-500" /> Unlimited Produk
                                </li>
                                <li className="flex items-center gap-3 text-lg">
                                    <CheckCircle2 className="h-6 w-6 text-blue-500" /> Unlimited Transaksi
                                </li>
                                <li className="flex items-center gap-3 text-lg">
                                    <CheckCircle2 className="h-6 w-6 text-blue-500" /> Akses Semua Fitur PRO
                                </li>
                            </ul>

                            <Link href="/signup">
                                <Button className="w-full h-16 text-xl bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-2xl shadow-xl hover:scale-[1.02] transition-transform">
                                    Buat Akun Gratis
                                </Button>
                            </Link>


                        </div>
                    </div>
                </div>
            </section>

            {/* 7. FAQ (Accordion) */}
            <section className="py-24 px-4 max-w-3xl mx-auto">
                <h2 className="text-4xl font-bold text-center mb-12">Pertanyaan Umum</h2>
                <Accordion
                    className="w-full space-y-4"
                    items={[
                        {
                            id: "item-1",
                            title: "Apakah saya perlu PT/CV?",
                            content: <div className="text-neutral-400 text-base pb-4">Tidak. Perorangan bisa langsung mulai jualan detik ini juga. Cukup daftar pakai email.</div>
                        },
                        {
                            id: "item-2",
                            title: "Kapan dana cair?",
                            content: <div className="text-neutral-400 text-base pb-4">Dana bisa ditarik kapan saja ke rekening bank lokal (BCA, Mandiri, dll) atau E-Wallet. Proses penarikan maksimal 1x24 jam.</div>
                        },
                        {
                            id: "item-3",
                            title: "Apakah ada biaya bulanan?",
                            content: <div className="text-neutral-400 text-base pb-4">TIDAK ADA. 100% Gratis biaya langganan selamanya. Kami hanya profit sharing kecil saat Anda profit.</div>
                        }
                    ]}
                />
            </section>

            {/* Footer */}
            <footer className="py-12 text-center text-neutral-600 text-sm border-t border-white/5 bg-[#050505]">
                <p>&copy; {new Date().getFullYear()} CuanBoss. All rights reserved.</p>
            </footer>

            <style jsx global>{`
                @keyframes marquee {
                    0% { transform: translateX(0); }
                    100% { transform: translateX(-100%); }
                }
                .animate-marquee {
                    animation: marquee 30s linear infinite;
                }
            `}</style>
        </div>
    )
}
