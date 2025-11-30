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

    return renderProductPage(product, params)
}

function renderProductPage(product: any, params: any) {
    const creatorName = product.creator?.full_name || "Shadow Creator"
    const soldCount = 168
    const stockLeft = 9
    const originalPrice = product.price * 1.5

    const features = [
        "Akses Seumur Hidup",
        "Grup Diskusi Eksklusif",
        "Update Materi Berkala",
        "Sesi Tanya Jawab Live"
    ]

    const reviews = [
        { user: "Budi Santoso", rating: 5, text: "Materinya daging semua! Sangat recommended." },
        { user: "Siti Aminah", rating: 5, text: "Penjelasannya mudah dipahami untuk pemula." },
    ]

    return (
        <div className="min-h-screen bg-background font-sans pb-32">
            {/* Mobile Header */}
            <div className="sticky top-0 z-40 bg-background/80 backdrop-blur-md border-b border-border px-4 h-14 flex items-center justify-between max-w-md mx-auto">
                <Link href="/discover" className="p-2 -ml-2 hover:bg-accent rounded-full transition-colors">
                    <ArrowLeft className="h-5 w-5 text-foreground" />
                </Link>
                <div className="font-bold text-foreground truncate max-w-[200px]">{creatorName}</div>
                <button className="p-2 -mr-2 hover:bg-accent rounded-full transition-colors">
                    <Share2 className="h-5 w-5 text-foreground" />
                </button>
            </div>

            <main className="max-w-md mx-auto bg-card min-h-screen shadow-sm border-x border-border">
                {/* Product Image Area */}
                <div className="aspect-video w-full bg-gradient-to-br from-primary/80 to-purple-600 relative flex items-center justify-center overflow-hidden">
                    <div className="absolute inset-0 bg-black/10" />
                    <div className="text-white text-opacity-90 font-bold text-6xl select-none">
                        {product.title.charAt(0)}
                    </div>
                    {/* Stock Badge */}
                    <div className="absolute bottom-4 right-4">
                        <Badge variant="destructive" className="px-3 py-1 text-xs font-bold shadow-lg">
                            Tersisa {stockLeft}
                        </Badge>
                    </div>
                </div>

                <div className="p-5 space-y-8">
                    {/* Title & Price */}
                    <div className="space-y-2">
                        <div className="flex items-center gap-2 mb-2">
                            <Badge variant="secondary" className="bg-primary/10 text-primary hover:bg-primary/20">
                                Best Seller
                            </Badge>
                            <div className="flex items-center text-yellow-500 text-xs font-bold">
                                <Star className="h-3 w-3 fill-current mr-1" />
                                4.9 (1.2k Ulasan)
                            </div>
                        </div>
                        <h1 className="text-2xl font-bold text-foreground leading-tight">
                            {product.title}
                        </h1>
                        <div className="flex items-baseline gap-2">
                            <span className="text-2xl font-bold text-primary">
                                Rp {product.price.toLocaleString()}
                            </span>
                            <span className="text-sm text-muted-foreground line-through decoration-muted-foreground">
                                Rp {originalPrice.toLocaleString()}
                            </span>
                        </div>
                    </div>

                    {/* Creator */}
                    <div className="flex items-center gap-3 p-3 bg-accent/50 rounded-xl border border-border">
                        <Avatar className="h-10 w-10 border border-border shadow-sm">
                            <AvatarFallback className="bg-primary text-primary-foreground font-bold">
                                {creatorName.charAt(0)}
                            </AvatarFallback>
                        </Avatar>
                        <div>
                            <div className="text-xs text-muted-foreground">Kreator</div>
                            <div className="font-bold text-foreground flex items-center gap-1">
                                {creatorName}
                                <ShieldCheck className="h-3 w-3 text-blue-500" />
                            </div>
                        </div>
                    </div>

                    {/* Description */}
                    <div className="space-y-3">
                        <h3 className="font-bold text-foreground">Deskripsi</h3>
                        <div className="text-muted-foreground text-sm leading-relaxed whitespace-pre-wrap">
                            {product.description || "Tidak ada deskripsi."}
                        </div>
                    </div>

                    {/* Features */}
                    <div className="space-y-3">
                        <h3 className="font-bold text-foreground">Fitur Unggulan</h3>
                        <ul className="space-y-2">
                            {features.map((feature, i) => (
                                <li key={i} className="flex items-center gap-2 text-sm text-muted-foreground">
                                    <div className="h-5 w-5 rounded-full bg-green-500/10 flex items-center justify-center text-green-500 shrink-0">
                                        <ShieldCheck className="h-3 w-3" />
                                    </div>
                                    {feature}
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Reviews */}
                    <div className="space-y-3">
                        <h3 className="font-bold text-foreground">Ulasan Member</h3>
                        <div className="space-y-3">
                            {reviews.map((review, i) => (
                                <div key={i} className="p-3 bg-accent/30 rounded-lg border border-border">
                                    <div className="flex items-center justify-between mb-1">
                                        <span className="font-bold text-sm text-foreground">{review.user}</span>
                                        <div className="flex text-yellow-500">
                                            {[...Array(review.rating)].map((_, j) => (
                                                <Star key={j} className="h-3 w-3 fill-current" />
                                            ))}
                                        </div>
                                    </div>
                                    <p className="text-xs text-muted-foreground">{review.text}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </main>

            {/* Sticky Bottom Action Bar */}
            <div className="fixed bottom-0 left-0 right-0 bg-card border-t border-border p-4 z-50 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)]">
                <div className="max-w-md mx-auto flex flex-col gap-3">
                    <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">Harga Akses</span>
                        <span className="font-bold text-foreground text-lg">Rp {product.price.toLocaleString()}</span>
                    </div>
                    <div className="flex gap-3">
                        <CartDrawer product={{
                            id: product.id,
                            title: product.title,
                            price: product.price,
                            imagePlaceholder: product.title.charAt(0)
                        }} />

                        <Button className="flex-1 h-12 bg-primary hover:bg-primary/90 text-primary-foreground font-bold text-lg rounded-xl shadow-lg shadow-primary/20" asChild>
                            <Link href={`/checkout/${product.id}/payment`}>
                                Beli Akses Sekarang
                            </Link>
                        </Button>
                    </div>
                    <div className="text-center text-[10px] text-muted-foreground">
                        Pembayaran aman via QRIS/Transfer
                    </div>
                </div>
            </div>
        </div>
    )
}
