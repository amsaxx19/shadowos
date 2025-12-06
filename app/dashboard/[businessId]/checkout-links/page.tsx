import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Plus, Search, Settings, XCircle, MoreVertical, Link as LinkIcon, ArrowUpDown } from "lucide-react"
import Link from "next/link"
import { createClient } from "@/lib/supabase/server"

// Helper function to format time ago
function timeAgo(date: Date): string {
    const now = new Date()
    const diffMs = now.getTime() - date.getTime()
    const diffMins = Math.floor(diffMs / 60000)
    const diffHours = Math.floor(diffMs / 3600000)
    const diffDays = Math.floor(diffMs / 86400000)

    if (diffMins < 60) return `${diffMins}m ago`
    if (diffHours < 24) return `${diffHours}h ago`
    return `${diffDays}d ago`
}

export default async function CheckoutLinksPage({ params }: { params: Promise<{ businessId: string }> }) {
    const { businessId } = await params
    const supabase = await createClient()

    // Fetch products as checkout links
    const { data: products } = await supabase
        .from('products')
        .select('*')
        .order('created_at', { ascending: false })

    return (
        <div className="p-8 space-y-6 max-w-[1600px] mx-auto text-white">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <div className="h-8 w-8 rounded bg-[#222] flex items-center justify-center text-xs font-bold text-neutral-300 border border-[#333]">
                        EC
                    </div>
                    <h1 className="text-xl font-bold">Checkout Links</h1>
                    <Search className="h-4 w-4 text-neutral-500" />
                    <Link href={`/dashboard/${businessId}/products/create`}>
                        <Button size="icon" className="h-6 w-6 bg-blue-600 hover:bg-blue-700 rounded-md">
                            <Plus className="h-4 w-4 text-white" />
                        </Button>
                    </Link>
                </div>
                <div className="flex items-center gap-2">
                    <Link href={`/dashboard/${businessId}/products/create`}>
                        <Button className="bg-blue-600 hover:bg-blue-700 text-white font-medium">
                            <Plus className="mr-2 h-4 w-4" />
                            Create checkout link
                        </Button>
                    </Link>
                    <Button variant="outline" className="border-[#333] bg-[#161616] text-white hover:bg-[#222]">
                        <Settings className="mr-2 h-4 w-4" />
                        Edit
                    </Button>
                </div>
            </div>

            {/* Filters */}
            <div className="flex items-center justify-between border-b border-[#222] pb-4">
                <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2 px-3 py-1.5 rounded-md bg-[#161616] border border-[#333] text-sm text-neutral-400">
                        <XCircle className="h-4 w-4" />
                        <span>Visibility</span>
                        <span className="text-neutral-600">|</span>
                        <span className="text-blue-500">Visible, hidden</span>
                    </div>
                </div>
            </div>

            {/* Table */}
            <div className="rounded-md border border-[#222] bg-[#0e0e0e]">
                <Table>
                    <TableHeader>
                        <TableRow className="border-[#222] hover:bg-transparent">
                            <TableHead className="text-neutral-500">Product</TableHead>
                            <TableHead className="text-neutral-500">
                                <div className="flex items-center gap-1 cursor-pointer hover:text-neutral-300">
                                    Created at <ArrowUpDown className="h-3 w-3" />
                                </div>
                            </TableHead>
                            <TableHead className="text-neutral-500">
                                <div className="flex items-center gap-1 cursor-pointer hover:text-neutral-300">
                                    Price <ArrowUpDown className="h-3 w-3" />
                                </div>
                            </TableHead>
                            <TableHead className="text-neutral-500">
                                <div className="flex items-center gap-1 cursor-pointer hover:text-neutral-300">
                                    Total sales <ArrowUpDown className="h-3 w-3" />
                                </div>
                            </TableHead>
                            <TableHead className="text-neutral-500">
                                <div className="flex items-center gap-1 cursor-pointer hover:text-neutral-300">
                                    Visibility <ArrowUpDown className="h-3 w-3" />
                                </div>
                            </TableHead>
                            <TableHead className="w-[100px]"></TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {products?.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={6} className="h-24 text-center text-neutral-500">
                                    No checkout links found. Create a product to get started.
                                </TableCell>
                            </TableRow>
                        ) : (
                            products?.map((product) => (
                                <TableRow key={product.id} className="border-[#222] hover:bg-[#161616]">
                                    <TableCell className="font-medium text-white">
                                        <Link href={`/product/${product.id}`} className="hover:underline">
                                            {product.title}
                                        </Link>
                                    </TableCell>
                                    <TableCell className="text-white">
                                        {timeAgo(new Date(product.created_at))}
                                    </TableCell>
                                    <TableCell className="text-white">
                                        Rp {Number(product.price).toLocaleString('id-ID')}
                                    </TableCell>
                                    <TableCell className="text-white">Rp 0</TableCell>
                                    <TableCell>
                                        <span className="bg-green-500/20 text-green-500 text-xs font-medium px-2 py-0.5 rounded">
                                            Visible
                                        </span>
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex items-center justify-end gap-2">
                                            <Link href={`/product/${product.id}`} target="_blank">
                                                <Button variant="ghost" size="icon" className="h-8 w-8 text-neutral-400 hover:text-white hover:bg-[#222]">
                                                    <LinkIcon className="h-4 w-4" />
                                                </Button>
                                            </Link>
                                            <Button variant="ghost" size="icon" className="h-8 w-8 text-neutral-400 hover:text-white hover:bg-[#222]">
                                                <MoreVertical className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
                <div className="p-4 border-t border-[#222] text-xs text-neutral-500 flex justify-between items-center">
                    <span>Showing {products?.length || 0} products</span>
                    <div className="flex gap-2">
                        {/* Pagination arrows would go here */}
                    </div>
                </div>
            </div>
        </div>
    )
}
