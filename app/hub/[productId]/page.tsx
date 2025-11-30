import { createClient } from '@/lib/supabase/server'
import { notFound, redirect } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Lock } from 'lucide-react'
import Link from 'next/link'

export default async function HubPage({ params }: { params: Promise<{ productId: string }> }) {
    const supabase = await createClient()
    const { productId } = await params

    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
        return redirect(`/login?next=/hub/${productId}`)
    }

    // 1. Check for PAID order
    const { data: order, error: orderError } = await supabase
        .from('orders')
        .select('*')
        .eq('product_id', productId)
        .eq('customer_email', user.email) // Assuming we link via email
        .eq('status', 'paid') // OR 'settlement' depending on Midtrans mapping
        .single()

    // 2. Fetch Product Content
    const { data: product, error: productError } = await supabase
        .from('products')
        .select('*')
        .eq('id', productId)
        .single()

    if (productError || !product) {
        return notFound()
    }

    // If no paid order, show Access Denied
    if (!order) {
        return (
            <div className="min-h-screen bg-[#0a0a0a] text-white flex flex-col items-center justify-center p-4 text-center">
                <div className="bg-neutral-900 p-8 rounded-2xl border border-white/10 max-w-md w-full space-y-6">
                    <div className="h-16 w-16 bg-red-500/10 text-red-500 rounded-full flex items-center justify-center mx-auto">
                        <Lock className="h-8 w-8" />
                    </div>
                    <div>
                        <h1 className="text-2xl font-bold">Access Denied</h1>
                        <p className="text-neutral-400 mt-2">You need to purchase this product to access the content.</p>
                    </div>
                    <Button asChild className="w-full bg-blue-600 hover:bg-blue-700">
                        <Link href={`/product/${product.slug || product.id}`}>
                            Buy Now for Rp {product.price.toLocaleString('id-ID')}
                        </Link>
                    </Button>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-[#0a0a0a] text-white p-8">
            <div className="max-w-4xl mx-auto space-y-8">
                <div className="border-b border-white/10 pb-6">
                    <h1 className="text-3xl font-bold">{product.title}</h1>
                    <p className="text-neutral-400 mt-2">Thank you for your purchase!</p>
                </div>

                {/* Content Delivery Area */}
                <div className="grid gap-6">
                    {/* Video Player Placeholder */}
                    <div className="aspect-video bg-neutral-900 rounded-xl border border-white/10 flex items-center justify-center relative overflow-hidden">
                        {product.video_url ? (
                            <iframe
                                src={product.video_url}
                                className="w-full h-full"
                                allowFullScreen
                            />
                        ) : (
                            <div className="text-neutral-500">No Video Content</div>
                        )}
                    </div>

                    {/* Download Section */}
                    <div className="bg-neutral-900 p-6 rounded-xl border border-white/10 flex items-center justify-between">
                        <div>
                            <h3 className="font-semibold text-lg">Course Materials</h3>
                            <p className="text-sm text-neutral-400">Download the accompanying files.</p>
                        </div>
                        <Button disabled={!product.file_url}>
                            {product.file_url ? "Download Files" : "No Files"}
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}
