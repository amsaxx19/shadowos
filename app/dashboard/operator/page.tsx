"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, DollarSign, Package, ExternalLink, LayoutDashboard } from "lucide-react"
import { SimulateSaleButton } from "@/components/dashboard/simulate-sale-button"
import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabase/client"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function OperatorDashboard() {
    const [operatorId, setOperatorId] = useState<string | null>(null)
    const [latestProductId, setLatestProductId] = useState<string | null>(null)
    const [stats, setStats] = useState({ totalRevenue: 0, activeCreators: 0, activeProducts: 0 });

    useEffect(() => {
        const fetchData = async () => {
            // Fetch user
            const { data: { user } } = await supabase.auth.getUser();
            if (user) setOperatorId(user.id);

            // Fetch latest product ID
            const { data: productData } = await supabase.from('products').select('id').order('created_at', { ascending: false }).limit(1).single();
            if (productData) setLatestProductId(productData.id);

            // Fetch products and creators for stats
            const { data: products } = await supabase.from('products').select('*');
            const { data: creators } = await supabase.from('users').select('*').eq('role', 'creator');

            // Mock stats for now as we don't have a dedicated stats table or complex query yet
            setStats({
                totalRevenue: 0, // Placeholder
                activeCreators: creators?.length || 0,
                activeProducts: products?.length || 0
            });
        };

        fetchData();
    }, [])

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
                            <LayoutDashboard className="h-6 w-6" />
                        </div>
                        <div>
                            <h1 className="text-3xl font-bold tracking-tight text-white">Ringkasan Operator</h1>
                            <p className="text-blue-100 mt-1">Selamat datang kembali, Shadow Operator.</p>
                        </div>
                    </div>
                    <div className="flex gap-2">
                        {latestProductId && (
                            <Link href={`/checkout/${latestProductId}`} target="_blank">
                                <Button variant="secondary" className="bg-white/10 text-white hover:bg-white/20 border-white/10 backdrop-blur-sm">
                                    <ExternalLink className="mr-2 h-4 w-4" />
                                    Public Checkout
                                </Button>
                            </Link>
                        )}
                        <SimulateSaleButton />
                    </div>
                </div>

                <div className="grid gap-4 md:grid-cols-3">
                    <Card className="bg-white border-none shadow-xl">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4 p-6">
                            <CardTitle className="text-sm font-bold text-blue-900/70 uppercase tracking-wider">Total Pendapatan</CardTitle>
                            <div className="h-8 w-8 rounded-full bg-blue-50 flex items-center justify-center">
                                <DollarSign className="h-4 w-4 text-[#0055D4]" />
                            </div>
                        </CardHeader>
                        <CardContent className="p-6 pt-0">
                            <div className="text-blue-950">
                                <div className="text-2xl font-bold">IDR {stats.totalRevenue.toLocaleString()}</div>
                            </div>
                            <p className="text-xs text-blue-500 mt-1 font-medium">+20.1% dari bulan lalu</p>
                        </CardContent>
                    </Card>
                    <Card className="bg-white border-none shadow-xl">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4 p-6">
                            <CardTitle className="text-sm font-bold text-blue-900/70 uppercase tracking-wider">Creator Aktif</CardTitle>
                            <div className="h-8 w-8 rounded-full bg-blue-50 flex items-center justify-center">
                                <Users className="h-4 w-4 text-[#0055D4]" />
                            </div>
                        </CardHeader>
                        <CardContent className="p-6 pt-0">
                            <div className="text-2xl font-bold text-blue-950">{stats.activeCreators}</div>
                            <p className="text-xs text-blue-500 mt-1 font-medium">+180.1% dari bulan lalu</p>
                        </CardContent>
                    </Card>
                    <Card className="bg-white border-none shadow-xl">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4 p-6">
                            <CardTitle className="text-sm font-bold text-blue-900/70 uppercase tracking-wider">Produk Aktif</CardTitle>
                            <div className="h-8 w-8 rounded-full bg-blue-50 flex items-center justify-center">
                                <Package className="h-4 w-4 text-[#0055D4]" />
                            </div>
                        </CardHeader>
                        <CardContent className="p-6 pt-0">
                            <div className="text-2xl font-bold text-blue-950">{stats.activeProducts}</div>
                            <p className="text-xs text-blue-500 mt-1 font-medium">+201 sejak jam terakhir</p>
                        </CardContent>
                    </Card>
                </div>

                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                    <Card className="col-span-4 bg-white border-none shadow-xl">
                        <CardHeader className="p-6 pb-4">
                            <CardTitle className="text-blue-950">Ringkasan Penjualan</CardTitle>
                        </CardHeader>
                        <CardContent className="p-6 pt-0">
                            <div className="h-[200px] flex items-center justify-center text-blue-400">
                                Belum ada data penjualan.
                            </div>
                        </CardContent>
                    </Card>
                    <Card className="col-span-3 bg-white border-none shadow-xl">
                        <CardHeader className="p-6 pb-4">
                            <CardTitle className="text-blue-950">Top Creator</CardTitle>
                        </CardHeader>
                        <CardContent className="p-6 pt-0 space-y-4">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="h-9 w-9 rounded-full bg-blue-100 flex items-center justify-center text-[#0055D4] font-bold text-xs">
                                        AC
                                    </div>
                                    <div className="space-y-1">
                                        <p className="text-sm font-bold leading-none text-blue-950">Alice Creator</p>
                                        <p className="text-xs text-blue-500 font-medium">alice@example.com</p>
                                    </div>
                                </div>
                                <div className="font-bold text-blue-950">+IDR 1,999,000</div>
                            </div>
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="h-9 w-9 rounded-full bg-blue-100 flex items-center justify-center text-[#0055D4] font-bold text-xs">
                                        BA
                                    </div>
                                    <div className="space-y-1">
                                        <p className="text-sm font-bold leading-none text-blue-950">Bob Artist</p>
                                        <p className="text-xs text-blue-500 font-medium">bob@example.com</p>
                                    </div>
                                </div>
                                <div className="font-bold text-blue-950">+IDR 399,000</div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div >
        </div >
    )
}
