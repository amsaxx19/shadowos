import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { createClient } from "@/lib/supabase/server"
import { Wallet, ArrowUpRight, ArrowDownLeft, TrendingUp, Package, LayoutDashboard } from "lucide-react"
import { WithdrawDialog } from "@/components/dashboard/withdraw-dialog"
import { getCreatorStats } from "./actions"

export default async function CreatorDashboard() {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()
    const stats = await getCreatorStats()

    if (!stats || !user) {
        return <div className="p-8 text-white">Please log in to view your dashboard.</div>
    }

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
                            <h1 className="text-3xl font-bold tracking-tight text-white">Dashboard</h1>
                            <p className="text-blue-100 mt-1">Selamat datang kembali, {user.user_metadata.full_name || 'Creator'}.</p>
                        </div>
                    </div>
                    <WithdrawDialog balance={stats.balance} />
                </div>

                <div className="grid gap-6 md:grid-cols-3">
                    <Card className="bg-white border-none shadow-xl">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium text-blue-900">
                                Saldo Saat Ini
                            </CardTitle>
                            <Wallet className="h-4 w-4 text-[#0055D4]" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-blue-950">IDR {stats.balance.toLocaleString()}</div>
                            <p className="text-xs text-blue-500 mt-1">
                                Siap untuk dicairkan
                            </p>
                        </CardContent>
                    </Card>
                    <Card className="bg-white border-none shadow-xl">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium text-blue-900">
                                Total Pendapatan Bersih
                            </CardTitle>
                            <TrendingUp className="h-4 w-4 text-green-600" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-blue-950">IDR {stats.totalEarnings.toLocaleString()}</div>
                            <p className="text-xs text-blue-500 mt-1">
                                Total pendapatan selama ini
                            </p>
                        </CardContent>
                    </Card>
                    <Card className="bg-white border-none shadow-xl">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium text-blue-900">
                                Produk Aktif
                            </CardTitle>
                            <Package className="h-4 w-4 text-purple-600" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-blue-950">{stats.activeProducts}</div>
                            <p className="text-xs text-blue-500 mt-1">
                                Produk yang ditugaskan ke Anda
                            </p>
                        </CardContent>
                    </Card>
                </div>

                <div className="grid gap-6 md:grid-cols-2">
                    <Card className="col-span-2 bg-white border-none shadow-xl">
                        <CardHeader>
                            <CardTitle className="text-blue-950">Transaksi Terakhir</CardTitle>
                            <CardDescription className="text-blue-500">
                                Riwayat pemasukan dan penarikan dana Anda.
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                {stats.transactions.length === 0 ? (
                                    <p className="text-sm text-blue-400 text-center py-8">Belum ada transaksi.</p>
                                ) : (
                                    stats.transactions.map((tx: any) => (
                                        <div key={tx.id} className="flex items-center justify-between p-4 rounded-lg bg-blue-50/50 border border-blue-100">
                                            <div className="flex items-center gap-4">
                                                <div className={`flex h-10 w-10 items-center justify-center rounded-full ${tx.type === 'sale_revenue' ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'
                                                    }`}>
                                                    {tx.type === 'sale_revenue' ? <ArrowDownLeft className="h-5 w-5" /> : <ArrowUpRight className="h-5 w-5" />}
                                                </div>
                                                <div>
                                                    <p className="text-sm font-medium text-blue-950">
                                                        {tx.type === 'sale_revenue' ? 'Pendapatan Penjualan' : 'Penarikan Dana'}
                                                    </p>
                                                    <p className="text-xs text-blue-500">
                                                        {new Date(tx.created_at).toLocaleDateString()}
                                                    </p>
                                                </div>
                                            </div>
                                            <div className={`text-sm font-bold ${tx.type === 'sale_revenue' ? 'text-green-600' : 'text-red-600'
                                                }`}>
                                                {tx.type === 'sale_revenue' ? '+' : '-'} IDR {Math.abs(tx.amount).toLocaleString()}
                                            </div>
                                        </div>
                                    ))
                                )}
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    )
}
