import { createAdminClient } from '@/lib/supabase/admin'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Check, Star, ChevronLeft, Globe, Twitter, Instagram, Youtube, MessageCircle, ChevronDown } from 'lucide-react'
import CheckoutButton from '@/components/product/checkout-button'
import Link from 'next/link'
import { ReviewForm } from '@/components/product/review-form'
import StickyActionBar from '@/components/product/sticky-action-bar'

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

    // Get features from product data (stored as JSON array or empty array)
    const features = product.features || []

    // Get FAQs from product data
    const faqs = product.faqs || []

    // Determine pricing display based on pricing_type or price
    const pricingType = product.pricing_type || 'one-time'
    const isFree = product.price === 0 || pricingType === 'free'
    const isRecurring = pricingType === 'recurring'

    const averageRating = reviews && reviews.length > 0
        ? reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length
        : 0

    // Get category label
    const categoryLabels: Record<string, string> = {
        'trading': 'Trading & Investasi',
        'bisnis': 'Bisnis & Uang',
        'sosmed': 'Media Sosial',
        'karir': 'Karir & Pekerjaan',
        'teknologi': 'Teknologi & Tools',
        'lifestyle': 'Lifestyle & Hobi',
    }
    const categoryLabel = categoryLabels[product.category] || product.category || 'Produk'

    return (
        <div className="min-h-screen bg-[#0a0a0a] text-white font-sans selection:bg-blue-500/30">
            {/* Header */}
            <header className="sticky top-0 z-50 border-b border-white/5 bg-[#0a0a0a]/80 backdrop-blur-xl">
                <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
                    <Link href="/discover" className="flex items-center gap-2 text-sm font-medium text-neutral-400 hover:text-white transition-colors">
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

            <main className="max-w-[1400px] mx-auto px-4 py-8 md:py-12 pb-32 lg:pb-12">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10">

                    {/* MAIN CONTENT AREA (Span 9) */}
                    <div className="lg:col-span-9 space-y-12">

                        {/* TOP SECTION: Gallery + Header Info */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-9 gap-8">
                            {/* Gallery (Span 4 of 9) */}
                            <div className="lg:col-span-4 space-y-6">
                                <div className="aspect-[4/3] relative rounded-3xl overflow-hidden bg-[#111] border border-white/10 shadow-2xl">
                                    {product.image_url ? (
                                        <Image
                                            src={product.image_url}
                                            alt={product.title}
                                            fill
                                            className="object-cover"
                                        />
                                    ) : (
                                        <div className="flex items-center justify-center h-full text-neutral-500 bg-gradient-to-br from-[#1a1a1a] to-[#0a0a0a]">
                                            <span className="text-lg font-medium">Tidak Ada Preview</span>
                                        </div>
                                    )}
                                </div>
                                {/* Placeholder for thumbnails if we had them */}
                                <div className="grid grid-cols-4 gap-3">
                                    {[1, 2, 3, 4].map((i) => (
                                        <div key={i} className={`aspect-square rounded-xl bg-[#111] border ${i === 1 ? 'border-blue-500' : 'border-white/5'} cursor-pointer hover:border-white/20 transition-colors`} />
                                    ))}
                                </div>
                            </div>

                            {/* Info (Span 5 of 9) */}
                            <div className="lg:col-span-5 space-y-6">
                                {/* Header Info */}
                                <div className="space-y-4">
                                    {/* Creator Badge */}
                                    <div className="flex items-center gap-3">
                                        <div className="h-8 w-8 rounded-full bg-blue-600 flex items-center justify-center text-xs font-bold ring-2 ring-[#0a0a0a]">
                                            {product.users?.full_name?.[0] || 'C'}
                                        </div>
                                        <div className="flex items-center gap-1.5">
                                            <span className="font-semibold text-sm">{product.users?.full_name || 'Kreator'}</span>
                                            <div className="h-3.5 w-3.5 rounded-full bg-blue-500 flex items-center justify-center">
                                                <Check className="h-2 w-2 text-white" />
                                            </div>
                                        </div>
                                    </div>

                                    <h1 className="text-4xl md:text-5xl font-black tracking-tight text-white leading-[1.1]">{product.title}</h1>

                                    <div className="flex items-center gap-4 text-sm">
                                        <div className="flex items-center gap-1 text-yellow-400">
                                            <Star className="h-4 w-4 fill-current" />
                                            <span className="font-bold">{averageRating.toFixed(1)}</span>
                                            <span className="text-neutral-500">({reviews?.length || 0} reviews)</span>
                                        </div>
                                        <div className="h-1 w-1 rounded-full bg-neutral-700" />
                                        <span className="text-neutral-400">{categoryLabel}</span>
                                    </div>
                                </div>

                                {/* Description */}
                                <div className="prose prose-invert prose-sm max-w-none text-neutral-300">
                                    <p className="text-lg leading-relaxed">{product.description || "Bergabunglah dengan komunitas eksklusif kami dan dapatkan akses ke konten premium."}</p>
                                </div>
                            </div>
                        </div>

                        {/* SECTIONS BELOW (Full Width of Span 9) */}
                        <div className="space-y-16">

                            {/* Features List */}
                            {features.length > 0 && (
                                <div className="space-y-6">
                                    <h3 className="text-2xl font-bold text-white">Inside you get</h3>
                                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        {features.map((feature: string, i: number) => (
                                            <li key={i} className="flex items-start gap-3 text-neutral-300 bg-neutral-900/20 p-4 rounded-xl border border-white/5">
                                                <div className="mt-1 h-5 w-5 rounded-full bg-blue-500/20 flex items-center justify-center shrink-0">
                                                    <Check className="h-3 w-3 text-blue-500" />
                                                </div>
                                                <span className="font-medium">{feature}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}

                            {/* Reviews */}
                            {reviews && reviews.length > 0 && (
                                <div className="space-y-6 pt-8 border-t border-white/5">
                                    <div className="flex items-center justify-between">
                                        <h3 className="text-2xl font-bold text-white">What members say</h3>
                                        <div className="flex items-center gap-1 text-yellow-400">
                                            <span className="font-bold text-xl">{averageRating.toFixed(1)}</span>
                                            <div className="flex">
                                                {[...Array(5)].map((_, i) => (
                                                    <Star key={i} className={`h-4 w-4 ${i < Math.round(averageRating) ? "fill-current" : "text-neutral-700"}`} />
                                                ))}
                                            </div>
                                            <span className="text-neutral-500 text-sm ml-2">{reviews.length} reviews</span>
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        {reviews.slice(0, 4).map((review, i) => (
                                            <div key={i} className="bg-[#111] p-6 rounded-2xl border border-white/5 space-y-3">
                                                <div className="flex items-center gap-3">
                                                    <div className="h-10 w-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center font-bold text-white">
                                                        {review.users?.full_name?.[0] || 'U'}
                                                    </div>
                                                    <div>
                                                        <p className="font-bold text-sm text-white">{review.users?.full_name}</p>
                                                        <div className="flex text-yellow-500 text-[10px]">
                                                            {[...Array(5)].map((_, j) => (
                                                                <Star key={j} className={`h-3 w-3 ${j < review.rating ? "fill-current" : "text-neutral-800"}`} />
                                                            ))}
                                                        </div>
                                                    </div>
                                                </div>
                                                <p className="text-sm text-neutral-300 leading-relaxed">"{review.comment}"</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* About Creator */}
                            <div className="space-y-6 pt-8 border-t border-white/5">
                                <h2 className="text-2xl font-bold">About the creator</h2>
                                <div className="flex flex-col sm:flex-row gap-8 items-start">
                                    <div className="h-24 w-24 shrink-0 rounded-full bg-blue-600 flex items-center justify-center text-3xl font-bold ring-4 ring-[#1a1a1a]">
                                        {product.users?.full_name?.[0] || 'C'}
                                    </div>
                                    <div className="space-y-4 flex-1">
                                        <div>
                                            <div className="flex items-center gap-2">
                                                <h3 className="text-2xl font-bold">{product.users?.full_name || 'Kreator'}</h3>
                                                <div className="h-5 w-5 rounded-full bg-blue-500 flex items-center justify-center">
                                                    <Check className="h-3 w-3 text-white" />
                                                </div>
                                            </div>
                                            <p className="text-neutral-500">Joined {new Date(product.created_at).getFullYear()}</p>
                                        </div>

                                        <p className="text-neutral-300 leading-relaxed text-lg max-w-2xl">
                                            Creator of {product.title}. Passionate about delivering high-quality content and building a community of like-minded individuals.
                                        </p>

                                        <div className="flex items-center gap-3">
                                            <Button size="icon" variant="ghost" className="h-10 w-10 rounded-full bg-white/5 text-neutral-400 hover:text-white hover:bg-white/10">
                                                <Twitter className="h-5 w-5" />
                                            </Button>
                                            <Button size="icon" variant="ghost" className="h-10 w-10 rounded-full bg-white/5 text-neutral-400 hover:text-white hover:bg-white/10">
                                                <Instagram className="h-5 w-5" />
                                            </Button>
                                            <Button size="icon" variant="ghost" className="h-10 w-10 rounded-full bg-white/5 text-neutral-400 hover:text-white hover:bg-white/10">
                                                <Youtube className="h-5 w-5" />
                                            </Button>
                                            <div className="w-px h-6 bg-white/10 mx-2" />
                                            <Button variant="outline" className="border-white/10 bg-white/5 hover:bg-white/10 text-neutral-300">
                                                <MessageCircle className="mr-2 h-4 w-4" />
                                                Contact
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* FAQ */}
                            {faqs.length > 0 && (
                                <div className="space-y-6 pt-8 border-t border-white/5">
                                    <h2 className="text-2xl font-bold">Frequently Asked Questions</h2>
                                    <div className="grid gap-3">
                                        {faqs.map((faq: any, i: number) => (
                                            <div key={i} className="group bg-[#111] rounded-xl border border-white/5 overflow-hidden">
                                                <div className="flex items-center justify-between font-medium p-4 cursor-pointer hover:bg-white/5 transition-colors">
                                                    <span className="text-lg group-hover:text-blue-400 transition-colors">{faq.question}</span>
                                                    <ChevronDown className="h-5 w-5 text-neutral-500" />
                                                </div>
                                                <div className="px-4 pb-4 pt-0">
                                                    <p className="text-neutral-400 leading-relaxed">
                                                        {faq.answer}
                                                    </p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Affiliate Program Section */}
                            {product.is_affiliate_enabled && (
                                <div className="space-y-6 pt-8 border-t border-white/5">
                                    <div className="bg-gradient-to-br from-blue-900/20 to-purple-900/20 border border-blue-500/20 rounded-2xl p-8">
                                        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                                            <div className="space-y-4">
                                                <div className="flex items-center gap-3">
                                                    <h2 className="text-2xl font-bold">Affiliate Program</h2>
                                                    <div className="px-3 py-1 rounded-full bg-green-500/20 text-green-400 text-xs font-bold border border-green-500/30">
                                                        {product.affiliate_percentage || 20}% Commission
                                                    </div>
                                                </div>
                                                <p className="text-neutral-300 max-w-xl">
                                                    Earn money by bringing customers to {product.title}. Every time a customer purchases using your link, you'll earn a commission.
                                                </p>
                                            </div>
                                            <Button variant="default" className="bg-white text-black hover:bg-neutral-200 font-bold px-8">
                                                Become an affiliate
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>

                    </div>

                    {/* RIGHT COLUMN: Sticky Pricing (Span 3) */}
                    <div className="lg:col-span-3 relative">
                        <div id="pricing-card" className="sticky top-24 space-y-6">
                            <Card className="bg-[#111] border-white/10 p-6 rounded-2xl shadow-xl">
                                <div className="space-y-4">
                                    {/* Price Display */}
                                    <div className="flex flex-col gap-1 pb-4 border-b border-white/5">
                                        <span className="text-neutral-400 text-sm font-medium">
                                            {isFree ? 'Akses Gratis' : (isRecurring ? 'Berlangganan' : 'Sekali Bayar')}
                                        </span>
                                        <div className="flex items-baseline gap-1">
                                            <span className="text-3xl font-black text-white">
                                                {isFree ? 'Rp 0' : `Rp ${Number(product.price).toLocaleString('id-ID')}`}
                                            </span>
                                            {isRecurring && <span className="text-neutral-500 text-sm font-medium">/bulan</span>}
                                        </div>
                                    </div>

                                    <CheckoutButton product={product} />

                                    <p className="text-xs text-center text-neutral-500">
                                        Secure payment via Midtrans/QRIS
                                    </p>
                                </div>
                            </Card>

                            {/* Features Checkmarks */}
                            <div className="space-y-3 px-2">
                                <div className="flex items-center gap-2 text-xs text-neutral-400">
                                    <div className="h-4 w-4 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-500">
                                        <Check className="h-2.5 w-2.5" />
                                    </div>
                                    <span>Instant Access</span>
                                </div>
                                <div className="flex items-center gap-2 text-xs text-neutral-400">
                                    <div className="h-4 w-4 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-500">
                                        <Check className="h-2.5 w-2.5" />
                                    </div>
                                    <span>Secure Payment</span>
                                </div>
                                <div className="flex items-center gap-2 text-xs text-neutral-400">
                                    <div className="h-4 w-4 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-500">
                                        <Check className="h-2.5 w-2.5" />
                                    </div>
                                    <span>Cancel Anytime</span>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </main>



            {/* Sticky Action Bar (Desktop + Mobile when scrolled) */}
            <StickyActionBar
                product={product}
                triggerId="pricing-card"
            />
        </div>
    )
}
