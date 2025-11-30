import { createAdminClient } from '@/lib/supabase/admin'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Check } from 'lucide-react'
import CheckoutButton from './checkout-button'

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
    const supabase = createAdminClient()
    const { slug } = await params

    const { data: product, error } = await supabase
        .from('products')
        .select('*, users:creator_id(full_name, avatar_url)')
        .eq('id', slug) // Treat the URL param as ID since we don't have a slug column yet
        .single()

    if (error || !product) {
        return notFound()
    }

    return (
        <div className="min-h-screen bg-[#0a0a0a] text-white flex items-center justify-center p-4">
            <div className="max-w-4xl w-full grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Left: Image/Preview */}
                <div className="space-y-4">
                    <div className="aspect-square relative rounded-2xl overflow-hidden bg-neutral-900 border border-white/10">
                        {product.image_url ? (
                            <Image
                                src={product.image_url}
                                alt={product.title}
                                fill
                                className="object-cover"
                            />
                        ) : (
                            <div className="flex items-center justify-center h-full text-neutral-500">
                                No Image
                            </div>
                        )}
                    </div>
                </div>

                {/* Right: Details */}
                <div className="space-y-6">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">{product.title}</h1>
                        <p className="text-neutral-400 mt-2 text-lg">{product.description}</p>
                    </div>

                    <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-full bg-blue-600 flex items-center justify-center text-sm font-bold">
                            {product.users?.full_name?.[0] || 'C'}
                        </div>
                        <div>
                            <p className="text-sm text-neutral-400">Created by</p>
                            <p className="font-medium">{product.users?.full_name || 'Unknown Creator'}</p>
                        </div>
                    </div>

                    <Card className="bg-neutral-900 border-white/10">
                        <CardHeader>
                            <CardTitle className="text-2xl">
                                {new Intl.NumberFormat('id-ID', {
                                    style: 'currency',
                                    currency: 'IDR'
                                }).format(product.price)}
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-2">
                            <div className="flex items-center gap-2 text-sm text-neutral-300">
                                <Check className="h-4 w-4 text-green-500" />
                                <span>Instant Access</span>
                            </div>
                            <div className="flex items-center gap-2 text-sm text-neutral-300">
                                <Check className="h-4 w-4 text-green-500" />
                                <span>Secure Payment</span>
                            </div>
                        </CardContent>
                        <CardFooter>
                            <CheckoutButton product={product} />
                        </CardFooter>
                    </Card>
                </div>
            </div>
        </div>
    )
}
