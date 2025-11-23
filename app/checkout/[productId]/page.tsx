import { createClient } from '@/lib/supabase/server'
import { notFound } from 'next/navigation'
import { CheckoutForm } from './checkout-form'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ShieldCheck } from "lucide-react"

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
        <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4 font-sans">
            {/* Header / Store Name */}
            <div className="mb-8 text-center">
                <h1 className="text-2xl font-bold text-gray-900 tracking-tight">ShadowOS Store</h1>
            </div>

            <div className="w-full max-w-md bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
                {/* Product Image */}
                <div className="h-48 bg-gradient-to-br from-blue-600 to-purple-700 relative flex items-center justify-center">
                    {/* Placeholder for Product Image */}
                    <div className="text-white text-opacity-50 font-bold text-4xl">
                        {product.title.charAt(0)}
                    </div>
                </div>

                <div className="p-8">
                    {/* Product Details */}
                    <div className="mb-8">
                        <h2 className="text-2xl font-bold text-gray-900 leading-tight mb-2">{product.title}</h2>
                        <p className="text-gray-500 text-sm leading-relaxed mb-4">
                            {product.description || "No description available."}
                        </p>
                        <div className="flex items-center justify-between">
                            <div className="text-3xl font-bold text-[#0055D4]">
                                IDR {product.price.toLocaleString()}
                            </div>
                        </div>
                    </div>

                    {/* Creator Info */}
                    <div className="flex items-center gap-3 mb-8 p-3 bg-gray-50 rounded-lg border border-gray-100">
                        <Avatar className="h-10 w-10 border border-gray-200">
                            <AvatarImage src={creatorAvatar} />
                            <AvatarFallback>{creatorName.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1 min-w-0">
                            <p className="text-xs text-gray-500 font-medium uppercase tracking-wider">Dijual oleh</p>
                            <p className="text-sm font-bold text-gray-900 truncate flex items-center gap-1">
                                {creatorName}
                                <ShieldCheck className="h-3 w-3 text-blue-500" />
                            </p>
                        </div>
                    </div>

                    {/* Checkout Form */}
                    <CheckoutForm productId={product.id} price={product.price} />
                </div>
            </div>

            {/* Footer Trust Signals */}
            <div className="mt-8 text-center space-y-2">
                <p className="text-xs text-gray-400 flex items-center justify-center gap-2">
                    <ShieldCheck className="h-3 w-3" />
                    Pembayaran Aman & Terenkripsi
                </p>
                <p className="text-xs text-gray-400">
                    Powered by ShadowOS
                </p>
            </div>
        </div>
    )
}

