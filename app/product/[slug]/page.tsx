import { createAdminClient } from '@/lib/supabase/admin'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Check, Star, ChevronLeft, Globe, Twitter, Instagram, Youtube, MessageCircle, ChevronDown } from 'lucide-react'
import CheckoutButton from './checkout-button'
import Link from 'next/link'
import { ReviewForm } from '@/components/product/review-form'

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
    const supabase = createAdminClient()
    const { slug } = await params

    const { data: product, error } = await supabase
        .from('products')
        .select('*, users:creator_id(full_name)')
        .eq('id', slug)
        .single()

    if (error || !product) {
        return notFound()
    }

    // Fetch Reviews
    const { data: reviews } = await supabase
        .from('reviews')
        .select('*, users(full_name)')
        .eq('product_id', slug)
        .order('created_at', { ascending: false })

    // Fetch Member Count (Orders)
    const { count: memberCount } = await supabase
        .from('orders')
        .select('*', { count: 'exact', head: true })
        .eq('product_id', slug)
        .eq('status', 'paid')

    const features = [
        "Trading Live Harian - #1 Di Dunia",
        "Sinyal Day Trade & Swing Real Time",
        "Kelas Mingguan & Giveaway",
        "Perpustakaan Video Edukasi Lengkap",
        "Komunitas Kolaboratif & Suportif"
    ]

    const faqs = product.faqs || []

    const averageRating = reviews && reviews.length > 0
        ? reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length
        : 0

    return (
        <div className="min-h-screen bg-[#0a0a0a] text-white font-sans selection:bg-blue-500/30">
            {/* Header */}
            <header className="sticky top-0 z-50 border-b border-white/5 bg-[#0a0a0a]/80 backdrop-blur-xl">
                <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
                    <Link href="/home" className="flex items-center gap-2 text-sm font-medium text-neutral-400 hover:text-white transition-colors">
                        <ChevronLeft className="h-4 w-4" />
                        Kembali
                    </Link>
                    <div className="flex items-center gap-4">
                        <Button variant="ghost" className="text-neutral-400 hover:text-white hover:bg-white/5">
                            Masuk
                        </Button>
                    </div>
                </div>
            </header>

            <main className="max-w-7xl mx-auto px-4 py-8 md:py-12">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">

                    {/* LEFT COLUMN (Content) */}
                    <div className="lg:col-span-2 space-y-12">

                        {/* Hero Section */}
                        <div className="space-y-6">
                            <div className="aspect-video relative rounded-3xl overflow-hidden bg-neutral-900 border border-white/10 shadow-2xl">
                                {product.image_url ? (
                                    <Image
                                        src={product.image_url}
                                        alt={product.title}
                                        fill
                                        className="object-cover"
                                    />
                                ) : (
                                    <div className="flex items-center justify-center h-full text-neutral-500 bg-gradient-to-br from-neutral-900 to-neutral-800">
                                        <span className="text-lg font-medium">Tidak Ada Preview</span>
                                    </div>
                                )}
                            </div>

                            <div className="space-y-4">
                                <h1 className="text-4xl md:text-5xl font-bold tracking-tight">{product.title}</h1>
                                <div className="flex items-center gap-2 text-yellow-500">
                                    <div className="flex">
                                        {[1, 2, 3, 4, 5].map((_, i) => (
                                            <Star key={i} className={`h-5 w-5 ${i < Math.round(averageRating) ? "fill-current" : "text-neutral-600"}`} />
                                        ))}
                                    </div>
                                    <span className="text-neutral-400 text-sm ml-2">{averageRating.toFixed(1)} ({reviews?.length || 0}) • Trading</span>
                                </div>
                                <p className="text-lg text-neutral-300 leading-relaxed">
                                    {product.description || "Tetap tenang dan biarkan kami menavigasi pasar untuk Anda. Saksikan trading paling konsisten, menyeluruh, dan transparan di dunia. Bergabunglah dengan komunitas trading terbaik yang peduli dengan kesuksesan Anda di dalam dan di luar grafik."}
                                </p>
                            </div>
                        </div>

                        {/* Features */}
                        <div className="space-y-6">
                            <h2 className="text-2xl font-bold">Fitur</h2>
                            <div className="grid gap-4">
                                {features.map((feature, i) => (
                                    <div key={i} className="flex items-center gap-3 p-4 rounded-xl bg-neutral-900/50 border border-white/5">
                                        <div className="h-6 w-6 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-500 shrink-0">
                                            <Check className="h-4 w-4" />
                                        </div>
                                        <span className="font-medium">{feature}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Reviews */}
                        {reviews && reviews.length > 0 && (
                            <div className="space-y-6">
                                <div className="flex items-center justify-between">
                                    <h2 className="text-2xl font-bold">Ulasan</h2>
                                    <div className="flex items-center gap-2 text-yellow-500">
                                        <Star className="h-5 w-5 fill-current" />
                                        <span className="font-bold text-white">{averageRating.toFixed(2)}</span>
                                        <span className="text-neutral-500 text-sm">dari 5</span>
                                    </div>
                                </div>
                                <div className="grid gap-4">
                                    {reviews.map((review, i) => (
                                        <div key={i} className="p-6 rounded-2xl bg-neutral-900/50 border border-white/5 space-y-4">
                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center gap-3">
                                                    <div className="h-10 w-10 rounded-full bg-neutral-800 flex items-center justify-center font-bold text-neutral-400">
                                                        {review.users?.full_name?.[0] || 'U'}
                                                    </div>
                                                    <span className="font-semibold">{review.users?.full_name || 'Pengguna'}</span>
                                                </div>
                                                <div className="flex text-yellow-500">
                                                    {[...Array(review.rating)].map((_, j) => (
                                                        <Star key={j} className="h-4 w-4 fill-current" />
                                                    ))}
                                                </div>
                                            </div>
                                            <p className="text-neutral-300 leading-relaxed">{review.comment}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Add Review Button (Always visible to allow simulation) */}
                        <div className="pt-4">
                            <ReviewForm productId={product.id} />
                        </div>

                        {/* Creator Profile */}
                        <div className="space-y-6">
                            <h2 className="text-2xl font-bold">Tentang Kreator</h2>
                            <div className="p-8 rounded-3xl bg-neutral-900/50 border border-white/5 space-y-6">
                                <div className="flex items-center gap-4">
                                    <div className="h-16 w-16 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-2xl font-bold">
                                        {product.users?.full_name?.[0] || 'C'}
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-bold">{product.users?.full_name || 'Kreator'}</h3>
                                        <p className="text-neutral-400">@creator • Bergabung Mei 2023</p>
                                    </div>
                                    <Button variant="outline" className="ml-auto border-white/10 hover:bg-white/5">
                                        Lihat profil
                                    </Button>
                                </div>
                                <p className="text-neutral-300">
                                    Motto kami adalah belajar dan menghasilkan. Kami di sini untuk membantu Anda membuka potensi penuh Anda dan mencapai profitabilitas yang konsisten. Waktu Anda adalah SEKARANG!
                                </p>
                                <div className="flex gap-4">
                                    {[Instagram, Twitter, Youtube, Globe].map((Icon, i) => (
                                        <div key={i} className="h-10 w-10 rounded-full bg-white/5 flex items-center justify-center text-neutral-400 hover:text-white hover:bg-white/10 cursor-pointer transition-colors">
                                            <Icon className="h-5 w-5" />
                                        </div>
                                    ))}
                                </div>
                                <div className="relative">
                                    <input
                                        type="text"
                                        placeholder="Kirim pesan ke kreator..."
                                        className="w-full bg-black/30 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-blue-500 transition-colors"
                                    />
                                    <div className="absolute right-3 top-3 p-1 bg-white/10 rounded-full cursor-pointer hover:bg-white/20">
                                        <MessageCircle className="h-4 w-4" />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* FAQ */}
                        {faqs.length > 0 && (
                            <div className="space-y-6">
                                <h2 className="text-2xl font-bold">Tanya Jawab (FAQ)</h2>
                                <div className="space-y-2">
                                    {faqs.map((faq: any, i: number) => (
                                        <div key={i} className="p-4 rounded-xl bg-neutral-900/30 border border-white/5 space-y-2 cursor-pointer hover:bg-neutral-900/50 transition-colors">
                                            <div className="flex items-center justify-between font-medium">
                                                {faq.question}
                                                <ChevronDown className="h-5 w-5 text-neutral-500" />
                                            </div>
                                            <p className="text-neutral-400 text-sm">{faq.answer}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                    </div>

                    {/* RIGHT COLUMN (Sticky Buy Card) */}
                    <div className="relative">
                        <div className="sticky top-24 space-y-6">
                            <Card className="bg-[#1a1a1a] border-white/10 p-6 rounded-3xl shadow-2xl overflow-hidden relative">
                                {/* Gradient Glow */}
                                <div className="absolute -top-20 -right-20 w-40 h-40 bg-blue-500/20 blur-3xl rounded-full pointer-events-none" />

                                <div className="space-y-6 relative z-10">
                                    <div>
                                        <div className="flex items-baseline gap-1">
                                            <span className="text-3xl font-bold text-white">
                                                {new Intl.NumberFormat('id-ID', {
                                                    style: 'currency',
                                                    currency: 'IDR',
                                                    maximumFractionDigits: 0
                                                }).format(product.price)}
                                            </span>
                                            <span className="text-neutral-400">/ bulan</span>
                                        </div>
                                        <p className="text-xs text-neutral-500 mt-1">+ Rp 5.000 biaya awal</p>
                                    </div>

                                    <CheckoutButton product={product} />

                                    <div className="flex items-center justify-center gap-2 text-xs text-neutral-500 font-medium">
                                        <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
                                        Bergabung dengan {memberCount || 0} member
                                    </div>
                                </div>
                            </Card>

                            <div className="p-6 rounded-3xl bg-neutral-900/30 border border-white/5 flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="h-10 w-10 rounded-xl bg-purple-500/20 flex items-center justify-center text-purple-500">
                                        <Star className="h-5 w-5 fill-current" />
                                    </div>
                                    <div>
                                        <p className="font-bold text-sm">ShadowOS</p>
                                        <div className="flex items-center gap-1 text-xs text-green-500">
                                            <span className="px-1.5 py-0.5 rounded bg-green-500/20">20% reward</span>
                                        </div>
                                    </div>
                                </div>
                                <Button variant="outline" size="sm" className="h-8 text-xs border-white/10">
                                    Jadi afiliasi
                                </Button>
                            </div>
                        </div>
                    </div>

                </div>
            </main>

            {/* Sticky Mobile Footer (Visible only on small screens) */}
            <div className="lg:hidden fixed bottom-0 left-0 right-0 p-4 bg-[#0a0a0a] border-t border-white/10 z-50 pb-8">
                <div className="flex items-center gap-4">
                    <div className="flex-1">
                        <p className="text-sm font-bold text-white">
                            {new Intl.NumberFormat('id-ID', {
                                style: 'currency',
                                currency: 'IDR',
                                maximumFractionDigits: 0
                            }).format(product.price)}
                            <span className="text-neutral-400 font-normal"> / bulan</span>
                        </p>
                    </div>
                    <div className="w-1/2">
                        <CheckoutButton product={product} />
                    </div>
                </div>
            </div>
        </div>
    )
}
