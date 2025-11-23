import { createClient } from '@/lib/supabase/server'
import { notFound } from 'next/navigation'
import { CheckoutForm } from './checkout-form'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ShieldCheck, Star, CheckCircle2, Lock } from "lucide-react"
import { Badge } from "@/components/ui/badge"

export default async function CheckoutPage({ params }: { params: Promise<{ productId: string }> }) {
    const { productId } = await params
    const supabase = await createClient()

    // Fetch Product with Creator Details
    const { data: product } = await supabase
        .from('products')
        .select('*, creator:users!creator_id(user_metadata)')
        .eq('id', productId)
        .single()

    if (!product) {
        notFound()
    }

    const creatorName = product.creator?.user_metadata?.full_name || "Shadow Creator"
    const creatorAvatar = product.creator?.user_metadata?.avatar_url

    return (
        <div className="min-h-screen bg-gray-50 font-sans">
            {/* Navbar / Header */}
            <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
                <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
                    <div className="font-bold text-xl tracking-tight text-[#0055D4]">ShadowOS</div>
                    <div className="text-sm text-gray-500 flex items-center gap-2">
                        <Lock className="h-3 w-3" />
                        Secure Checkout
                    </div>
                </div>
            </header>

            <main className="max-w-6xl mx-auto px-4 py-8 md:py-12">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
                    {/* Left Column: Product Details */}
                    <div className="lg:col-span-2 space-y-8">
                        {/* Hero Section */}
                        <div className="space-y-4">
                            <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-100 border-none px-3 py-1 text-sm">
                                Digital Product
                            </Badge>
                            <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-gray-900 tracking-tight leading-tight">
                                {product.title}
                            </h1>
                            <div className="flex items-center gap-4 text-gray-600">
                                <div className="flex items-center gap-1 text-yellow-500">
                                    <Star className="h-5 w-5 fill-current" />
                                    <Star className="h-5 w-5 fill-current" />
                                    <Star className="h-5 w-5 fill-current" />
                                    <Star className="h-5 w-5 fill-current" />
                                    <Star className="h-5 w-5 fill-current" />
                                </div>
                                <span className="text-sm font-medium">(New Release)</span>
                            </div>
                        </div>

                        {/* Product Image / Preview */}
                        <div className="aspect-video w-full bg-gradient-to-br from-[#0055D4] to-purple-600 rounded-2xl shadow-lg flex items-center justify-center relative overflow-hidden group">
                            <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors" />
                            <div className="text-white text-opacity-90 font-bold text-6xl md:text-8xl select-none">
                                {product.title.charAt(0)}
                            </div>
                        </div>

                        {/* Creator Profile */}
                        <div className="flex items-center gap-4 p-6 bg-white rounded-xl border border-gray-100 shadow-sm">
                            <Avatar className="h-16 w-16 border-2 border-blue-100">
                                <AvatarImage src={creatorAvatar} />
                                <AvatarFallback className="bg-blue-50 text-blue-600 text-xl font-bold">
                                    {creatorName.charAt(0)}
                                </AvatarFallback>
                            </Avatar>
                            <div>
                                <p className="text-sm text-gray-500 font-medium uppercase tracking-wider mb-1">Creator</p>
                                <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                                    {creatorName}
                                    <ShieldCheck className="h-5 w-5 text-blue-500 fill-blue-50" />
                                </h3>
                                <p className="text-sm text-gray-600 mt-1">
                                    Verified Creator on ShadowOS
                                </p>
                            </div>
                        </div>

                        {/* Description */}
                        <div className="prose prose-blue max-w-none">
                            <h3 className="text-xl font-bold text-gray-900 mb-4">About this product</h3>
                            <div className="text-gray-600 leading-relaxed whitespace-pre-wrap">
                                {product.description || "No description provided by the creator."}
                            </div>
                        </div>

                        {/* Features / Benefits (Static for now, could be dynamic later) */}
                        <div className="grid sm:grid-cols-2 gap-4 pt-4">
                            {[
                                "Instant Digital Download",
                                "Secure Payment Processing",
                                "Lifetime Access",
                                "Support the Creator Directly"
                            ].map((feature, i) => (
                                <div key={i} className="flex items-center gap-3 p-4 bg-blue-50/50 rounded-lg border border-blue-100">
                                    <CheckCircle2 className="h-5 w-5 text-blue-600 flex-shrink-0" />
                                    <span className="text-sm font-medium text-blue-900">{feature}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Right Column: Checkout Form (Sticky) */}
                    <div className="lg:col-span-1">
                        <div className="sticky top-24 space-y-6">
                            <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
                                <div className="p-6 bg-gray-50 border-b border-gray-100">
                                    <p className="text-sm text-gray-500 mb-1">Total Price</p>
                                    <div className="text-3xl font-bold text-[#0055D4]">
                                        IDR {product.price.toLocaleString()}
                                    </div>
                                </div>
                                <div className="p-6">
                                    <CheckoutForm productId={product.id} price={product.price} />
                                </div>
                                <div className="p-4 bg-gray-50 text-center border-t border-gray-100">
                                    <p className="text-xs text-gray-500 flex items-center justify-center gap-1.5">
                                        <ShieldCheck className="h-3.5 w-3.5" />
                                        100% Secure Payment
                                    </p>
                                </div>
                            </div>

                            {/* Trust Badges */}
                            <div className="grid grid-cols-3 gap-2 text-center">
                                <div className="p-3 bg-white rounded-lg border border-gray-100 shadow-sm">
                                    <div className="text-xs font-bold text-gray-900">Instant</div>
                                    <div className="text-[10px] text-gray-500">Access</div>
                                </div>
                                <div className="p-3 bg-white rounded-lg border border-gray-100 shadow-sm">
                                    <div className="text-xs font-bold text-gray-900">Secure</div>
                                    <div className="text-[10px] text-gray-500">Payment</div>
                                </div>
                                <div className="p-3 bg-white rounded-lg border border-gray-100 shadow-sm">
                                    <div className="text-xs font-bold text-gray-900">Support</div>
                                    <div className="text-[10px] text-gray-500">Creator</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            {/* Footer */}
            <footer className="border-t border-gray-200 bg-white mt-12 py-8">
                <div className="max-w-6xl mx-auto px-4 text-center">
                    <p className="text-sm text-gray-500">
                        Powered by <span className="font-bold text-[#0055D4]">ShadowOS</span> &copy; {new Date().getFullYear()}
                    </p>
                </div>
            </footer>
        </div>
    )
}

