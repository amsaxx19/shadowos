import { createAdminClient } from '@/lib/supabase/admin'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Check, Star, ChevronLeft, Globe, Twitter, Instagram, Youtube, MessageCircle, ChevronDown } from 'lucide-react'
import CheckoutButton from './checkout-button'
import Link from 'next/link'

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

    // Mock Data for Whop-style sections (since not in DB yet)
    const features = [
        "Daily Live Trading - #1 In The World",
        "Real Time Day Trade & Swing Alerts",
        "Weekly Classes & Giveaways",
        "Extensive Library Of Educational Videos",
        "Collaborative & Supportive Community"
    ]

    const reviews = [
        { user: "$AYACHE", rating: 5, text: "Amazing cash flow trades" },
        { user: "Stephen Borrell", rating: 5, text: "Great signals if you're looking for just that. In terms of education and analysis, I think FST is well worth joining." },
        { user: "Kyle L", rating: 5, text: "As a mentee, I see this as an investment in my future. There's a ton of value in both the platform and Team Felony." }
    ]

    const faqs = [
        "Is this server beginner friendly?",
        "Do I need a large account?",
        "Do you offer a course or mentorship?",
        "What makes First Step Trading different?"
    ]

    return (
        <div className="min-h-screen bg-[#0a0a0a] text-white font-sans selection:bg-blue-500/30">
            {/* Header */}
            <header className="sticky top-0 z-50 border-b border-white/5 bg-[#0a0a0a]/80 backdrop-blur-xl">
                <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
                    <Link href="/" className="flex items-center gap-2 text-sm font-medium text-neutral-400 hover:text-white transition-colors">
                        <ChevronLeft className="h-4 w-4" />
                        Back
                    </Link>
                    <div className="flex items-center gap-4">
                        <Button variant="ghost" className="text-neutral-400 hover:text-white hover:bg-white/5">
                            Sign in
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
                                        <span className="text-lg font-medium">No Preview Available</span>
                                    </div>
                                )}
                            </div>

                            <div className="space-y-4">
                                <h1 className="text-4xl md:text-5xl font-bold tracking-tight">{product.title}</h1>
                                <div className="flex items-center gap-2 text-yellow-500">
                                    <div className="flex">
                                        {[1, 2, 3, 4, 5].map((_, i) => (
                                            <Star key={i} className="h-5 w-5 fill-current" />
                                        ))}
                                    </div>
                                    <span className="text-neutral-400 text-sm ml-2">4.8 (568) • Trading</span>
                                </div>
                                <p className="text-lg text-neutral-300 leading-relaxed">
                                    {product.description || "Stay calm and let us navigate the market for you. Watch the most consistent, thorough and transparent trading in the world. Join the best trading community that cares about your success on and off the charts."}
                                </p>
                            </div>
                        </div>

                        {/* Features */}
                        <div className="space-y-6">
                            <h2 className="text-2xl font-bold">Features</h2>
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
                        <div className="space-y-6">
                            <div className="flex items-center justify-between">
                                <h2 className="text-2xl font-bold">Reviews</h2>
                                <div className="flex items-center gap-2 text-yellow-500">
                                    <Star className="h-5 w-5 fill-current" />
                                    <span className="font-bold text-white">4.77</span>
                                    <span className="text-neutral-500 text-sm">out of 5</span>
                                </div>
                            </div>
                            <div className="grid gap-4">
                                {reviews.map((review, i) => (
                                    <div key={i} className="p-6 rounded-2xl bg-neutral-900/50 border border-white/5 space-y-4">
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-3">
                                                <div className="h-10 w-10 rounded-full bg-neutral-800 flex items-center justify-center font-bold text-neutral-400">
                                                    {review.user[0]}
                                                </div>
                                                <span className="font-semibold">{review.user}</span>
                                            </div>
                                            <div className="flex text-yellow-500">
                                                {[...Array(review.rating)].map((_, j) => (
                                                    <Star key={j} className="h-4 w-4 fill-current" />
                                                ))}
                                            </div>
                                        </div>
                                        <p className="text-neutral-300 leading-relaxed">{review.text}</p>
                                    </div>
                                ))}
                            </div>
                            <Button variant="outline" className="w-full border-white/10 hover:bg-white/5 text-neutral-400">
                                See all reviews <ChevronDown className="ml-2 h-4 w-4" />
                            </Button>
                        </div>

                        {/* Creator Profile */}
                        <div className="space-y-6">
                            <h2 className="text-2xl font-bold">About the creator</h2>
                            <div className="p-8 rounded-3xl bg-neutral-900/50 border border-white/5 space-y-6">
                                <div className="flex items-center gap-4">
                                    <div className="h-16 w-16 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-2xl font-bold">
                                        {product.users?.full_name?.[0] || 'C'}
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-bold">{product.users?.full_name || 'Creator'}</h3>
                                        <p className="text-neutral-400">@creator • Joined May 2023</p>
                                    </div>
                                    <Button variant="outline" className="ml-auto border-white/10 hover:bg-white/5">
                                        View profile
                                    </Button>
                                </div>
                                <p className="text-neutral-300">
                                    Our motto is learn and earn. We are here to help you unlock your full potential and achieve consistent profitability. Your time is NOW!
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
                                        placeholder="Send creator a message..."
                                        className="w-full bg-black/30 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-blue-500 transition-colors"
                                    />
                                    <div className="absolute right-3 top-3 p-1 bg-white/10 rounded-full cursor-pointer hover:bg-white/20">
                                        <MessageCircle className="h-4 w-4" />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* FAQ */}
                        <div className="space-y-6">
                            <h2 className="text-2xl font-bold">FAQs</h2>
                            <div className="space-y-2">
                                {faqs.map((faq, i) => (
                                    <div key={i} className="p-4 rounded-xl bg-neutral-900/30 border border-white/5 flex items-center justify-between cursor-pointer hover:bg-neutral-900/50 transition-colors">
                                        <span className="font-medium">{faq}</span>
                                        <ChevronDown className="h-5 w-5 text-neutral-500" />
                                    </div>
                                ))}
                            </div>
                        </div>

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
                                            <span className="text-neutral-400">/ month</span>
                                        </div>
                                        <p className="text-xs text-neutral-500 mt-1">+ Rp 5.000 initial fee</p>
                                    </div>

                                    <CheckoutButton product={product} />

                                    <div className="flex items-center justify-center gap-2 text-xs text-neutral-500 font-medium">
                                        <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
                                        Join 693 members
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
                                    Become an affiliate
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
                            <span className="text-neutral-400 font-normal"> / month</span>
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
