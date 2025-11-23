import { createClient } from '@/lib/supabase/server'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Package, ExternalLink } from "lucide-react"
import Link from "next/link"
import { CopyLinkButton } from "@/components/dashboard/copy-link-button"

export default async function CreatorProductsPage() {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
        return <div>Please log in.</div>
    }

    const { data: products } = await supabase
        .from('products')
        .select('*')
        .eq('creator_id', user.id)
        .order('created_at', { ascending: false })

    return (
        <div className="min-h-screen bg-[#0055D4] relative font-sans -m-8 p-8">
            {/* Grid Background */}
            <div
                className="absolute inset-0 z-0 pointer-events-none"
                style={{
                    backgroundImage: `
                        linear-gradient(to right, rgba(255, 255, 255, 0.08) 1px, transparent 1px),
                        linear-gradient(to bottom, rgba(255, 255, 255, 0.08) 1px, transparent 1px)
                    `,
                    backgroundSize: '40px 40px'
                }}
            />

            <div className="relative z-10 max-w-6xl mx-auto space-y-8 pt-8">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <div className="h-12 w-12 rounded-xl bg-[#004CC4] flex items-center justify-center text-white shadow-lg border border-white/10">
                            <Package className="h-6 w-6" />
                        </div>
                        <div>
                            <h1 className="text-3xl font-bold tracking-tight text-white">Produk Saya</h1>
                            <p className="text-blue-100 mt-1">Produk yang ditugaskan ke Anda oleh operator.</p>
                        </div>
                    </div>
                </div>

                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {products?.map((product) => (
                        <Card key={product.id} className="group relative overflow-hidden transition-all hover:shadow-xl bg-white border-none shadow-lg flex flex-col">
                            <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-4 p-6">
                                <div className="flex items-center gap-3">
                                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50 text-[#0055D4]">
                                        <Package className="h-5 w-5" />
                                    </div>
                                    <div>
                                        <CardTitle className="text-base font-bold line-clamp-1 text-blue-950">
                                            {product.title}
                                        </CardTitle>
                                        <p className="text-xs font-medium text-blue-500">IDR {product.price.toLocaleString()}</p>
                                    </div>
                                </div>
                            </CardHeader>
                            <CardContent className="p-6 pt-0 flex-1 flex flex-col">
                                <p className="text-sm text-blue-900/70 line-clamp-2 min-h-[40px] mb-4 flex-1">
                                    {product.description || "Tidak ada deskripsi."}
                                </p>
                                <div className="space-y-4 pt-4 border-t border-blue-100">
                                    <div className="flex items-center justify-between">
                                        <span className="text-[10px] uppercase tracking-wider text-blue-400 font-bold">Komisi Anda</span>
                                        <span className="text-xs font-bold text-green-600">
                                            {product.split_percentage_creator}%
                                        </span>
                                    </div>

                                    <CopyLinkButton
                                        url={`${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/checkout/${product.id}?ref=${user.id}`}
                                        className="w-full bg-[#0055D4] hover:bg-[#0044AA] text-white h-10 font-bold shadow-md hover:shadow-lg transition-all"
                                        label="SALIN LINK"
                                    />
                                </div>
                            </CardContent>
                        </Card>
                    ))}

                    {/* Empty State */}
                    {(!products || products.length === 0) && (
                        <div className="col-span-full flex flex-col items-center justify-center rounded-xl border-2 border-dashed border-white/20 bg-white/5 p-12 text-center text-blue-100 backdrop-blur-sm">
                            <Package className="h-12 w-12 mb-4 opacity-50" />
                            <h3 className="text-xl font-bold text-white">Belum ada produk aktif</h3>
                            <p className="mt-1 text-blue-200">Operator belum menambahkan produk untuk Anda. Silakan hubungi admin.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
