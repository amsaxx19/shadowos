import { createClient } from '@/lib/supabase/server'
import { notFound } from 'next/navigation'
import { CheckoutForm } from './checkout-form'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ShieldCheck, Star, Share2, ArrowLeft, ShoppingCart } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from "@/components/ui/drawer"
import { CartDrawer } from './cart-drawer'
import Link from 'next/link'

export default async function CheckoutPage({ params }: { params: Promise<{ productId: string }> }) {
    const { productId } = await params
    const supabase = await createClient()

    // Fetch Product with Creator Details
    const { data: product } = await supabase
        .from('products')
        .select('*, creator:users!creator_id(full_name, email)')
        .eq('id', productId)
        .single()

    if (!product) {
        notFound()
    }

    const creatorName = product.creator?.full_name || "Shadow Creator"

    // Mock data for visual completeness
    const soldCount = 168
    const stockLeft = 9
    const originalPrice = product.price * 1.5 // Mock original price for discount effect

    return (
        <div className="min-h-screen bg-gray-50 font-sans pb-24">
            {/* Mobile Header */}
            <div className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-gray-100 px-4 h-14 flex items-center justify-between max-w-md mx-auto">
                <Link href="/" className="p-2 -ml-2 hover:bg-gray-100 rounded-full transition-colors">
                    <ArrowLeft className="h-5 w-5 text-gray-700" />
                </Link>
                <div className="font-bold text-gray-900 truncate max-w-[200px]">{creatorName}</div>
                <button className="p-2 -mr-2 hover:bg-gray-100 rounded-full transition-colors">
                    <Share2 className="h-5 w-5 text-gray-700" />
                </button>
            </div>

            <main className="max-w-md mx-auto bg-white min-h-screen shadow-sm">
                {/* Product Image Area */}
                <div className="aspect-square w-full bg-gradient-to-br from-blue-600 to-purple-600 relative flex items-center justify-center overflow-hidden">
                    <div className="absolute inset-0 bg-black/10" />
                    <div className="text-white text-opacity-90 font-bold text-9xl select-none">
                        {product.title.charAt(0)}
                    </div>
                    {/* Stock Badge */}
                    <div className="absolute bottom-4 right-4">
                        <Badge variant="destructive" className="px-3 py-1 text-xs font-bold shadow-lg">
                            {stockLeft} Left
                        </Badge>
                    </div>
                </div>

                <div className="p-5 space-y-6">
                    {/* Title & Price */}
                    <div className="space-y-2">
                        <h1 className="text-2xl font-bold text-gray-900 leading-tight">
                            {product.title}
                        </h1>
                        <div className="flex items-baseline gap-2">
                            <span className="text-2xl font-bold text-[#0055D4]">
                                IDR {product.price.toLocaleString()}
                            </span>
                            <span className="text-sm text-gray-400 line-through decoration-gray-400">
                                IDR {originalPrice.toLocaleString()}
                            </span>
                        </div>
                    </div>



                    {/* Creator */}
                    <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl border border-gray-100">
                        <Avatar className="h-10 w-10 border border-white shadow-sm">
                            <AvatarFallback className="bg-blue-600 text-white font-bold">
                                {creatorName.charAt(0)}
                            </AvatarFallback>
                        </Avatar>
                        <div>
                            <div className="text-xs text-gray-500">Creator</div>
                            <div className="font-bold text-gray-900 flex items-center gap-1">
                                {creatorName}
                                <ShieldCheck className="h-3 w-3 text-blue-500" />
                            </div>
                        </div>
                    </div>

                    {/* Description */}
                    <div className="space-y-3">
                        <h3 className="font-bold text-gray-900">Deskripsi</h3>
                        <div className="text-gray-600 text-sm leading-relaxed whitespace-pre-wrap">
                            {product.description || "Tidak ada deskripsi."}
                        </div>
                    </div>
                </div>
            </main>

            {/* Sticky Bottom Action Bar */}
            <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 z-50">
                <div className="max-w-md mx-auto flex gap-3">
                    <CartDrawer product={{
                        id: product.id,
                        title: product.title,
                        price: product.price,
                        imagePlaceholder: product.title.charAt(0)
                    }} />

                    <Button className="flex-1 h-12 bg-[#0055D4] hover:bg-blue-700 text-white font-bold text-lg rounded-xl shadow-lg shadow-blue-100" asChild>
                        <Link href={`/checkout/${product.id}/payment`}>
                            BELI SEKARANG
                        </Link>
                    </Button>
                </div>
            </div>
        </div>
    )
}
