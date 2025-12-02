"use client"

import { Button } from "@/components/ui/button"
import { Accordion } from "@/components/ui/accordion"
import { CheckCircle2, Zap, Globe, Shield, BarChart3, Users, Layout, CreditCard } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export default function SellPage() {
    return (
        <div className="min-h-screen bg-[#0e0e0e] text-white font-sans">
            {/* Navbar */}
            <nav className="fixed top-0 left-0 right-0 z-50 border-b border-[#222] bg-[#0e0e0e]/80 backdrop-blur-xl h-16 flex items-center px-4 md:px-6 justify-between">
                <Link href="/" className="flex items-center gap-2">
                    <span className="text-orange-500 text-2xl font-bold">⚡</span>
                    <span className="font-bold text-xl tracking-tight">CUAN<span className="text-orange-500">BOSS</span></span>
                </Link>
                <div className="flex items-center gap-3">
                    <Link href="/login">
                        <Button variant="ghost" className="text-neutral-400 hover:text-white font-medium">Log in</Button>
                    </Link>
                    <Link href="/signup">
                        <Button className="bg-orange-600 hover:bg-orange-700 text-white font-bold rounded-full">
                            Daftar Sekarang
                        </Button>
                    </Link>
                </div>
            </nav>

            {/* Hero Section */}
            <section className="pt-32 pb-20 px-4 text-center max-w-5xl mx-auto">
                <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6 leading-tight">
                    Misi kami adalah memberikan <br />
                    <span className="text-orange-500">penghasilan berkelanjutan</span> <br />
                    bagi semua orang.
                </h1>
                <p className="text-xl text-neutral-400 mb-10 max-w-2xl mx-auto">
                    Grup berbayar, kursus, software, layanan agensi — apapun yang Anda jual, CuanBoss adalah tempat terbaik untuk memulai bisnis digital Anda.
                </p>
                <Link href="/signup">
                    <Button className="h-14 px-8 text-lg bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-full shadow-[0_0_40px_-10px_rgba(37,99,235,0.5)] hover:shadow-[0_0_60px_-10px_rgba(37,99,235,0.6)] transition-all duration-300 transform hover:-translate-y-1">
                        Mulai Jualan
                    </Button>
                </Link>
                <p className="mt-4 text-sm text-neutral-500">Tidak perlu kartu kredit • Gratis untuk memulai</p>
            </section>

            {/* Video Placeholder */}
            <section className="px-4 mb-24">
                <div className="max-w-5xl mx-auto aspect-video bg-[#161616] rounded-3xl border border-[#222] overflow-hidden relative group">
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="h-20 w-20 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300 cursor-pointer">
                            <div className="ml-1 w-0 h-0 border-t-[12px] border-t-transparent border-l-[20px] border-l-white border-b-[12px] border-b-transparent"></div>
                        </div>
                    </div>
                    {/* Placeholder for video thumbnail */}
                    <div className="absolute inset-0 -z-10 bg-gradient-to-t from-black/80 to-transparent" />
                    <div className="absolute bottom-8 left-8 text-left">
                        <h3 className="text-3xl font-bold mb-2">Kamu bisa pakai <span className="text-orange-500">CuanBoss</span></h3>
                        <p className="text-neutral-300">Platform all-in-one untuk kreator Indonesia</p>
                    </div>
                </div>
            </section>

            {/* Stats Section */}
            <section className="py-20 border-y border-[#222] bg-[#0a0a0a]">
                <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
                    <div>
                        <div className="text-4xl md:text-5xl font-bold text-yellow-500 mb-2">Rp 32T+</div>
                        <div className="text-neutral-400">Total Pembayaran ke Kreator</div>
                    </div>
                    <div>
                        <div className="text-4xl md:text-5xl font-bold text-blue-500 mb-2">156.496</div>
                        <div className="text-neutral-400">Penjual Aktif</div>
                    </div>
                    <div>
                        <div className="text-4xl md:text-5xl font-bold text-green-500 mb-2">12.186.803</div>
                        <div className="text-neutral-400">Pengguna Terdaftar</div>
                    </div>
                </div>
            </section>

            {/* Business Models */}
            <section className="py-24 px-4 max-w-7xl mx-auto">
                <h2 className="text-4xl font-bold text-center mb-16">Model Bisnis yang Didukung</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-[#161616] border border-[#222] p-8 rounded-3xl hover:border-neutral-600 transition-colors">
                        <div className="h-14 w-14 bg-blue-600 rounded-2xl flex items-center justify-center mb-6">
                            <Layout className="h-7 w-7 text-white" />
                        </div>
                        <h3 className="text-xl font-bold mb-2">Kursus & Coaching</h3>
                        <p className="text-neutral-400">Jual kelas online, e-book, atau sesi mentoring 1-on-1 dengan mudah.</p>
                    </div>
                    <div className="bg-[#161616] border border-[#222] p-8 rounded-3xl hover:border-neutral-600 transition-colors">
                        <div className="h-14 w-14 bg-purple-600 rounded-2xl flex items-center justify-center mb-6">
                            <Users className="h-7 w-7 text-white" />
                        </div>
                        <h3 className="text-xl font-bold mb-2">Komunitas Berbayar</h3>
                        <p className="text-neutral-400">Monetisasi grup Telegram, Discord, atau WhatsApp Anda secara otomatis.</p>
                    </div>
                    <div className="bg-[#161616] border border-[#222] p-8 rounded-3xl hover:border-neutral-600 transition-colors">
                        <div className="h-14 w-14 bg-green-600 rounded-2xl flex items-center justify-center mb-6">
                            <Zap className="h-7 w-7 text-white" />
                        </div>
                        <h3 className="text-xl font-bold mb-2">Software & SaaS</h3>
                        <p className="text-neutral-400">Jual lisensi software, tools, atau akses API dengan sistem lisensi bawaan.</p>
                    </div>
                </div>
            </section>

            {/* Pricing Section */}
            <section className="py-24 px-4 bg-[#111]">
                <div className="max-w-6xl mx-auto bg-gradient-to-br from-yellow-400 to-orange-500 rounded-[3rem] p-8 md:p-16 flex flex-col md:flex-row items-center gap-12 text-black">
                    <div className="flex-1 space-y-6">
                        <div className="inline-block px-4 py-2 bg-black/10 rounded-full font-bold text-sm">BIAYA TRANSPARAN</div>
                        <h2 className="text-5xl md:text-6xl font-bold">Gratis untuk memulai.</h2>
                        <div className="space-y-2">
                            <div className="text-7xl font-bold">Rp 0 <span className="text-2xl font-medium opacity-60">/ bulan</span></div>
                            <p className="text-xl font-medium opacity-80">Hanya 3% + Rp 2.000 per transaksi</p>
                        </div>
                        <Link href="/signup">
                            <Button className="h-14 px-8 bg-white text-black hover:bg-neutral-100 font-bold rounded-full text-lg mt-4">
                                Mulai Jualan Gratis
                            </Button>
                        </Link>
                    </div>
                    <div className="flex-1 w-full max-w-md bg-black/5 backdrop-blur-sm rounded-3xl p-8 border border-black/10">
                        <ul className="space-y-4">
                            <li className="flex items-center gap-3 font-medium text-lg">
                                <CheckCircle2 className="h-6 w-6" /> Terima pembayaran lokal (QRIS, VA)
                            </li>
                            <li className="flex items-center gap-3 font-medium text-lg">
                                <CheckCircle2 className="h-6 w-6" /> Sistem Afiliasi Otomatis
                            </li>
                            <li className="flex items-center gap-3 font-medium text-lg">
                                <CheckCircle2 className="h-6 w-6" /> Halaman Toko Kustom
                            </li>
                            <li className="flex items-center gap-3 font-medium text-lg">
                                <CheckCircle2 className="h-6 w-6" /> Analytics Lengkap
                            </li>
                            <li className="flex items-center gap-3 font-medium text-lg">
                                <CheckCircle2 className="h-6 w-6" /> Pencairan Dana Harian
                            </li>
                        </ul>
                    </div>
                </div>
            </section>

            {/* FAQ Section */}
            <section className="py-24 px-4 max-w-3xl mx-auto">
                <h2 className="text-4xl font-bold text-center mb-12">Pertanyaan yang Sering Diajukan</h2>
                <Accordion
                    className="w-full space-y-4"
                    items={[
                        {
                            id: "item-1",
                            title: "Apa saja yang bisa saya jual di CuanBoss?",
                            content: <div className="text-neutral-400 text-base pb-4">Hampir semua produk digital! Mulai dari kursus online, e-book, template, software, akses grup komunitas (Discord/Telegram), hingga jasa freelance.</div>
                        },
                        {
                            id: "item-2",
                            title: "Berapa biaya untuk menggunakan CuanBoss?",
                            content: <div className="text-neutral-400 text-base pb-4">Gratis! Tidak ada biaya bulanan. Kami hanya mengenakan biaya platform sebesar 3% + Rp 2.000 untuk setiap transaksi yang berhasil. Anda hanya membayar jika Anda menghasilkan uang.</div>
                        },
                        {
                            id: "item-3",
                            title: "Bagaimana sistem pembayarannya?",
                            content: <div className="text-neutral-400 text-base pb-4">CuanBoss mendukung berbagai metode pembayaran lokal Indonesia seperti QRIS, Virtual Account (BCA, Mandiri, BNI, BRI), dan E-Wallet (GoPay, OVO, ShopeePay).</div>
                        },
                        {
                            id: "item-4",
                            title: "Apakah saya perlu keahlian coding?",
                            content: <div className="text-neutral-400 text-base pb-4">Sama sekali tidak. CuanBoss dirancang untuk kemudahan penggunaan. Anda bisa membuat halaman toko yang profesional dalam hitungan menit tanpa menulis satu baris kode pun.</div>
                        }
                    ]}
                />
            </section>

            {/* Footer CTA */}
            <section className="py-24 px-4 text-center">
                <h2 className="text-5xl md:text-7xl font-bold mb-8 tracking-tight">Siap untuk <br /><span className="text-orange-500">Cuan Besar?</span></h2>
                <Link href="/signup">
                    <Button className="h-16 px-10 text-xl bg-white text-black hover:bg-neutral-200 font-bold rounded-full">
                        Gabung CuanBoss Sekarang
                    </Button>
                </Link>
            </section>

        </div>
    )
}
