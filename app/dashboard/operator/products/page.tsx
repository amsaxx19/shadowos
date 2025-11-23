import { createClient } from '@/lib/supabase/server'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Plus, Package, MoreVertical, ExternalLink } from "lucide-react"
import Link from "next/link"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { CopyLinkButton } from "@/components/dashboard/copy-link-button"

export default async function ProductsPage() {
    const supabase = await createClient()
    const { data: products } = await supabase.from('products').select('*').order('created_at', { ascending: false })

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
                            <h1 className="text-3xl font-bold tracking-tight text-white">Produk</h1>
                            <p className="text-blue-100 mt-1">Kelola produk digital dan penugasan ke creator.</p>
                        </div>
                    </div>
                    <Link href="/dashboard/operator/products/new">
                        <Button className="bg-white text-[#0055D4] hover:bg-blue-50 font-bold shadow-lg border border-white/20">
                            <Plus className="mr-2 h-4 w-4" /> Tambah Produk Baru
                        </Button>
                    </Link>
                </div>

                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {products?.map((product) => (
                        <Card key={product.id} className="group relative overflow-hidden border-none bg-white shadow-xl transition-all hover:shadow-2xl hover:-translate-y-1">
                            <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-4 p-6">
                                <div className="flex items-center gap-3">
                                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50 text-[#0055D4] group-hover:bg-[#0055D4] group-hover:text-white transition-colors">
                                        <Package className="h-5 w-5" />
                                    </div>
                                    <div>
                                        <CardTitle className="text-base font-bold text-blue-950 line-clamp-1">
                                            {product.title}
                                        </CardTitle>
                                        <p className="text-xs font-medium text-blue-500">IDR {product.price.toLocaleString()}</p>
                                    </div>
                                </div>
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button variant="ghost" size="icon" className="h-8 w-8 text-blue-300 hover:text-blue-600 hover:bg-blue-50">
                                            <MoreVertical className="h-4 w-4" />
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end" className="w-40 bg-white border-blue-100 text-blue-900 shadow-lg">
                                        <DropdownMenuItem className="focus:bg-blue-50 focus:text-blue-900 cursor-pointer">Edit Produk</DropdownMenuItem>
                                        <DropdownMenuItem className="text-red-500 focus:text-red-600 focus:bg-red-50 cursor-pointer">Hapus</DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </CardHeader>
                            <CardContent className="p-6 pt-0">
                                <p className="text-sm text-blue-600/80 line-clamp-2 min-h-[40px] mb-4 font-medium">
                                    {product.description || "Tidak ada deskripsi."}
                                </p>
                                <div className="flex items-center justify-between border-t border-blue-50 pt-4">
                                    <div className="flex flex-col">
                                        <span className="text-[10px] uppercase tracking-wider text-blue-400 font-bold">Komisi Creator</span>
                                        <span className="text-xs font-bold text-blue-900">
                                            {product.split_percentage_creator}% / {product.split_percentage_operator}%
                                        </span>
                                    </div>
                                    <div className="flex gap-2">
                                        <CopyLinkButton url={`/checkout/${product.id}`} />
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    ))}

                    {/* Empty State */}
                    {(!products || products.length === 0) && (
                        <div className="col-span-full flex flex-col items-center justify-center rounded-xl border-2 border-dashed border-blue-300/30 bg-white/10 backdrop-blur-sm p-12 text-center text-white">
                            <Package className="h-12 w-12 text-blue-200 mb-4" />
                            <h3 className="text-xl font-bold">Belum ada produk</h3>
                            <p className="text-blue-100 mt-1 mb-6">Buat produk pertama Anda untuk mulai berjualan.</p>
                            <Link href="/dashboard/operator/products/new">
                                <Button className="bg-white text-[#0055D4] hover:bg-blue-50 font-bold">Buat Produk</Button>
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
