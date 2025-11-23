"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { ArrowRight, Check, Globe, LayoutDashboard, LineChart, ShieldCheck, Wallet } from "lucide-react"
import Link from "next/link"
import { useState } from "react"
import { motion } from "framer-motion"

export default function LandingPage() {
  const [followers, setFollowers] = useState(10000)
  const [conversion, setConversion] = useState(2)
  const productPrice = 99000 // IDR
  const estimatedIncome = Math.floor(followers * (conversion / 100) * productPrice)

  return (
    <div className="min-h-screen bg-white text-zinc-900 font-sans selection:bg-brand-blue selection:text-white">
      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-white/10 bg-brand-blue/95 backdrop-blur-md text-white">
        <div className="container mx-auto flex h-16 items-center justify-between px-6">
          <div className="flex items-center gap-2 font-bold text-xl tracking-tight">
            <div className="h-8 w-8 rounded-lg bg-white text-brand-blue flex items-center justify-center">
              <LayoutDashboard className="h-5 w-5" />
            </div>
            ShadowOS
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-blue-100">
            <Link href="#features" className="hover:text-white transition-colors">Fitur</Link>
            <Link href="#calculator" className="hover:text-white transition-colors">Kalkulator</Link>
            <Link href="#faq" className="hover:text-white transition-colors">FAQ</Link>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/login">
              <Button variant="ghost" className="text-white hover:bg-white/10 hover:text-white">
                Login Partner
              </Button>
            </Link>
            <Link href="/apply">
              <Button className="bg-white text-brand-blue hover:bg-blue-50 font-bold shadow-lg border-0">
                Ajukan Partnership
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-24 pb-16 md:pt-32 md:pb-24 overflow-hidden bg-brand-blue text-white selection:bg-white selection:text-brand-blue">
        {/* Dynamic Background Elements */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          {/* Noise Texture */}
          <div className="absolute inset-0 opacity-[0.15] mix-blend-overlay bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>

          {/* Spotlight Glows */}
          <div className="absolute top-[-20%] left-[-10%] w-[80%] h-[80%] bg-blue-400/30 rounded-full blur-[120px] mix-blend-screen animate-pulse-slow" />
          <div className="absolute bottom-[-20%] right-[-10%] w-[80%] h-[80%] bg-indigo-500/30 rounded-full blur-[120px] mix-blend-screen animate-pulse-slow delay-1000" />

          {/* Grid Pattern */}
          <div className="absolute inset-0 opacity-20"
            style={{
              backgroundImage: "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)",
              backgroundSize: "50px 50px"
            }}
          />
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left Column: Text */}
            <div className="text-left">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-sm font-medium text-blue-50 backdrop-blur-md border border-white/20 mb-8 shadow-lg shadow-blue-900/20"
              >
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-200 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
                </span>
                Limited Spot: Batch 3 Open Now
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="text-5xl md:text-7xl font-bold tracking-tight mb-6 leading-tight drop-shadow-2xl"
              >
                Ubah Followers Jadi <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-blue-100 to-blue-200 filter drop-shadow-lg">Income Pasif.</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="text-xl text-blue-100 max-w-xl mb-10 leading-relaxed font-medium"
              >
                Kami bangun sistem bisnis digital Anda. Anda fokus bikin konten, kami urus produk, website, dan penjualannya. <span className="text-white font-bold">Tanpa pusing teknis.</span>
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="flex flex-row items-center gap-4"
              >
                <Link href="/apply">
                  <Button size="lg" className="h-16 px-10 text-xl bg-white text-brand-blue hover:bg-blue-50 font-bold shadow-2xl shadow-blue-900/40 rounded-full transition-all hover:scale-105 hover:shadow-blue-900/50 border-2 border-transparent hover:border-blue-100">
                    Ajukan Partnership
                  </Button>
                </Link>
                <Link href="/login">
                  <Button size="lg" variant="ghost" className="h-16 px-8 text-lg text-white hover:bg-white/10 font-bold rounded-full border border-white/20 backdrop-blur-sm">
                    Login Partner
                  </Button>
                </Link>
              </motion.div>
            </div>

            {/* Right Column: 3D Glass Dashboard */}
            <motion.div
              initial={{ opacity: 0, x: 100, rotateY: -20 }}
              animate={{ opacity: 1, x: 0, rotateY: -10 }}
              transition={{ duration: 1, delay: 0.3, type: "spring" }}
              className="relative perspective-1000 hidden lg:block"
              style={{ perspective: "1000px" }}
            >
              <div className="relative rounded-3xl border border-white/20 bg-gradient-to-br from-white/10 to-white/5 p-2 shadow-2xl backdrop-blur-2xl transform rotate-y-12 hover:rotate-y-0 transition-transform duration-700 ease-out">
                <div className="rounded-2xl bg-black/20 overflow-hidden shadow-inner border border-white/10">
                  {/* Mock Dashboard Header */}
                  <div className="flex items-center justify-between border-b border-white/5 bg-white/5 px-6 py-4">
                    <div className="flex gap-2">
                      <div className="h-3 w-3 rounded-full bg-red-500/80" />
                      <div className="h-3 w-3 rounded-full bg-yellow-500/80" />
                      <div className="h-3 w-3 rounded-full bg-green-500/80" />
                    </div>
                    <div className="h-6 w-32 rounded-full bg-white/10" />
                  </div>
                  {/* Mock Dashboard Content (Glass Mode) */}
                  <div className="p-8 grid gap-6">
                    <div className="grid grid-cols-2 gap-6">
                      <div className="col-span-2 h-56 rounded-2xl bg-gradient-to-br from-blue-600/80 to-indigo-600/80 p-8 text-white shadow-lg border border-white/10 relative overflow-hidden group">
                        <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                        <div className="text-blue-100 text-sm mb-2 font-medium">Total Revenue</div>
                        <div className="text-5xl font-bold tracking-tight">Rp 150 Juta</div>
                        <div className="mt-8 h-16 w-full bg-white/10 rounded-xl backdrop-blur-md border border-white/10 flex items-end pb-2 px-2 gap-1">
                          {[40, 60, 45, 70, 50, 80, 65, 90].map((h, i) => (
                            <div key={i} style={{ height: `${h}%` }} className="flex-1 bg-white/40 rounded-sm hover:bg-white/60 transition-colors" />
                          ))}
                        </div>
                      </div>
                      <div className="h-40 rounded-2xl bg-white/5 p-6 shadow-lg border border-white/10 backdrop-blur-md hover:bg-white/10 transition-colors">
                        <div className="text-blue-200 text-xs mb-2 uppercase tracking-wider">Penjualan Bulan Ini</div>
                        <div className="text-2xl font-bold text-white">Rp 45 Juta</div>
                        <div className="mt-4 h-2 w-full bg-white/10 rounded-full overflow-hidden">
                          <div className="h-full w-[70%] bg-green-400 rounded-full shadow-[0_0_10px_rgba(74,222,128,0.5)]" />
                        </div>
                      </div>
                      <div className="h-40 rounded-2xl bg-white/5 p-6 shadow-lg border border-white/10 backdrop-blur-md hover:bg-white/10 transition-colors">
                        <div className="text-blue-200 text-xs mb-2 uppercase tracking-wider">Konversi</div>
                        <div className="text-2xl font-bold text-white">5.3%</div>
                        <div className="mt-4 flex gap-1.5">
                          <div className="h-10 w-3 bg-blue-500 rounded-full" />
                          <div className="h-7 w-3 bg-blue-500/50 rounded-full" />
                          <div className="h-12 w-3 bg-blue-400 rounded-full" />
                          <div className="h-5 w-3 bg-blue-500/30 rounded-full" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* Glow Effect */}
              <div className="absolute -inset-20 -z-10 bg-blue-500/40 blur-[100px] rounded-full animate-pulse-slow" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <section className="py-10 border-b border-zinc-100 bg-white">
        <div className="container mx-auto px-6 text-center">
          <p className="text-sm font-medium text-zinc-500 mb-6">DIPERCAYA OLEH TOP CREATOR INDONESIA</p>
          <div className="flex flex-wrap justify-center gap-8 md:gap-16 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
            {/* Mock Logos */}
            <div className="h-8 w-24 bg-zinc-200 rounded animate-pulse" />
            <div className="h-8 w-24 bg-zinc-200 rounded animate-pulse" />
            <div className="h-8 w-24 bg-zinc-200 rounded animate-pulse" />
            <div className="h-8 w-24 bg-zinc-200 rounded animate-pulse" />
            <div className="h-8 w-24 bg-zinc-200 rounded animate-pulse" />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 bg-zinc-50">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <h2 className="text-3xl md:text-4xl font-bold text-zinc-900 mb-4">Kenapa Partner Sama Kami?</h2>
            <p className="text-lg text-zinc-600">
              Kami bukan sekedar tool. Kami adalah partner bisnis digital Anda.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="border-none shadow-xl shadow-zinc-200/50 hover:-translate-y-1 transition-transform duration-300">
              <CardHeader>
                <div className="h-12 w-12 rounded-xl bg-blue-100 text-brand-blue flex items-center justify-center mb-4">
                  <Globe className="h-6 w-6" />
                </div>
                <CardTitle className="text-xl">Sistem Terima Beres</CardTitle>
              </CardHeader>
              <CardContent className="text-zinc-600">
                Gak perlu sewa hosting, beli domain, atau coding. Kami siapkan landing page konversi tinggi & sistem pembayaran otomatis untuk Anda.
              </CardContent>
            </Card>
            <Card className="border-none shadow-xl shadow-zinc-200/50 hover:-translate-y-1 transition-transform duration-300">
              <CardHeader>
                <div className="h-12 w-12 rounded-xl bg-purple-100 text-purple-600 flex items-center justify-center mb-4">
                  <LineChart className="h-6 w-6" />
                </div>
                <CardTitle className="text-xl">Strategi Penjualan</CardTitle>
              </CardHeader>
              <CardContent className="text-zinc-600">
                Bingung cara jualan? Tim kami siapkan naskah promosi, funnel marketing, dan strategi pricing yang sudah terbukti cuan.
              </CardContent>
            </Card>
            <Card className="border-none shadow-xl shadow-zinc-200/50 hover:-translate-y-1 transition-transform duration-300">
              <CardHeader>
                <div className="h-12 w-12 rounded-xl bg-green-100 text-green-600 flex items-center justify-center mb-4">
                  <ShieldCheck className="h-6 w-6" />
                </div>
                <CardTitle className="text-xl">Transparansi Total</CardTitle>
              </CardHeader>
              <CardContent className="text-zinc-600">
                Pantau setiap rupiah yang masuk secara real-time lewat dashboard khusus partner. Tarik dana kapan saja ke rekening bank lokal.
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Calculator Section */}
      <section id="calculator" className="py-24 bg-white overflow-hidden">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center gap-16">
            <div className="flex-1">
              <h2 className="text-3xl md:text-4xl font-bold text-zinc-900 mb-6">
                Hitung Potensi Income Anda
              </h2>
              <p className="text-lg text-zinc-600 mb-8">
                Dengan asumsi harga produk rata-rata Rp 99.000 dan konversi standar industri. Lihat berapa banyak yang bisa Anda hasilkan.
              </p>

              <div className="space-y-8" style={{ "--primary": "#2563EB", "--muted": "#E4E4E7" } as React.CSSProperties}>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <Label className="text-base font-medium">Jumlah Followers</Label>
                    <span className="font-bold text-brand-blue">{followers.toLocaleString()}</span>
                  </div>
                  <Slider
                    value={[followers]}
                    onValueChange={(v) => setFollowers(v[0])}
                    min={1000}
                    max={1000000}
                    step={1000}
                    className="py-4"
                  />
                </div>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <Label className="text-base font-medium">Konversi Pembelian (%)</Label>
                    <span className="font-bold text-brand-blue">{conversion}%</span>
                  </div>
                  <Slider
                    value={[conversion]}
                    onValueChange={(v) => setConversion(v[0])}
                    min={0.1}
                    max={10}
                    step={0.1}
                    className="py-4"
                  />
                </div>
              </div>
            </div>

            <div className="flex-1 w-full">
              <div className="relative rounded-2xl bg-brand-blue p-10 text-white shadow-2xl shadow-blue-900/20 overflow-hidden">
                <div className="absolute top-0 right-0 -mt-10 -mr-10 h-40 w-40 rounded-full bg-white/10 blur-3xl" />
                <div className="absolute bottom-0 left-0 -mb-10 -ml-10 h-40 w-40 rounded-full bg-white/10 blur-3xl" />

                <div className="relative z-10 text-center">
                  <p className="text-blue-100 font-medium mb-2">Potensi Income Bulanan</p>
                  <div className="text-5xl md:text-6xl font-bold mb-6 tracking-tight">
                    Rp {estimatedIncome.toLocaleString('id-ID')}
                  </div>
                  <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm backdrop-blur-sm">
                    <Wallet className="h-4 w-4" />
                    <span>Tanpa Modal Awal. Murni Bagi Hasil.</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-zinc-900 text-white text-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-20 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20"></div>
        <div className="container mx-auto px-6 relative z-10">
          <h2 className="text-3xl md:text-5xl font-bold mb-8">Siap Jadi Partner?</h2>
          <p className="text-xl text-zinc-400 max-w-2xl mx-auto mb-10">
            Kami sangat selektif. Kami hanya mencari creator yang serius ingin membangun bisnis jangka panjang, bukan skema cepat kaya.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link href="/apply">
              <Button size="lg" className="h-14 px-8 text-lg bg-brand-blue hover:bg-blue-600 text-white font-bold rounded-full">
                Ajukan Partnership Sekarang
              </Button>
            </Link>
          </div>
          <p className="mt-6 text-sm text-zinc-500">
            Limited slots available for this month.
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-white border-t border-zinc-100">
        <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2 font-bold text-xl text-zinc-900">
            <div className="h-8 w-8 rounded-lg bg-brand-blue text-white flex items-center justify-center">
              <LayoutDashboard className="h-5 w-5" />
            </div>
            ShadowOS
          </div>
          <div className="text-sm text-zinc-500">
            © 2025 ShadowOS. All rights reserved.
          </div>
          <div className="flex gap-6 text-sm font-medium text-zinc-600">
            <Link href="#" className="hover:text-brand-blue">Terms</Link>
            <Link href="#" className="hover:text-brand-blue">Privacy</Link>
            <Link href="#" className="hover:text-brand-blue">Contact</Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
