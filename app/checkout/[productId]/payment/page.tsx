import { createClient } from '@/lib/supabase/server'
import { notFound } from 'next/navigation'
import { CheckoutForm } from '../checkout-form'
import { ArrowLeft } from "lucide-react"
import Link from 'next/link'
import { Card } from "@/components/ui/card"

export default async function PaymentPage({ params }: { params: Promise<{ productId: string }> }) {
    const { productId } = await params
    const supabase = await createClient()

    const { data: product } = await supabase
        .from('products')
        .select('*')
        .eq('id', productId)
        .single()

    if (!product) notFound()

    return (
        <div className="min-h-screen bg-gray-50 font-sans pb-24">
            {/* Header */}
            <header className="bg-white border-b border-gray-200 sticky top-0 z-50 px-4 h-14 flex items-center">
                <Link href={`/checkout/${productId}`} className="p-2 -ml-2 hover:bg-gray-100 rounded-full transition-colors">
                    <ArrowLeft className="h-5 w-5 text-gray-700" />
                </Link>
                <h1 className="ml-2 font-bold text-lg text-gray-900">Checkout</h1>
            </header>

            <main className="max-w-md mx-auto p-4 space-y-6">
                {/* Product Summary */}
                <Card className="p-4 border-none shadow-sm bg-white">
                    <h2 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3">Product</h2>
                    <div className="flex justify-between items-start gap-4">
                        <div className="h-12 w-12 bg-blue-100 rounded-md flex items-center justify-center text-blue-600 font-bold text-lg shrink-0">
                            {product.title.charAt(0)}
                        </div>
                        <div className="flex-1 min-w-0">
                            <h3 className="font-bold text-gray-900 text-sm line-clamp-2">{product.title}</h3>
                            <p className="text-xs text-gray-500 mt-1">1x</p>
                        </div>
                        <div className="font-bold text-gray-900 text-sm">
                            Rp {product.price.toLocaleString('id-ID')}
                        </div>
                    </div>
                </Card>

                {/* Checkout Form (Buyer Info & Payment) */}
                <CheckoutForm productId={product.id} price={product.price} />
            </main>
        </div>
    )
}
