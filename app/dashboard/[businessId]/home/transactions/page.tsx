import { createClient } from '@/lib/supabase/server'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Receipt, Calendar, User, Package, DollarSign } from "lucide-react"

export default async function TransactionsPage() {
    const supabase = await createClient()

    const { data: orders } = await supabase
        .from('orders')
        .select(`
            *,
            products (
                title,
                split_percentage_creator,
                split_percentage_operator
            )
        `)
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
                            <Receipt className="h-6 w-6" />
                        </div>
                        <div>
                            <h1 className="text-3xl font-bold tracking-tight text-white">Transactions</h1>
                            <p className="text-blue-100 mt-1">Detailed log of all sales and revenue splits.</p>
                        </div>
                    </div>
                </div>

                <Card className="bg-white border-none shadow-xl overflow-hidden">
                    <CardHeader className="border-b border-blue-50 bg-blue-50/30 p-6">
                        <CardTitle className="text-blue-950 font-bold">Sales Log</CardTitle>
                    </CardHeader>
                    <CardContent className="p-0">
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm text-left">
                                <thead className="text-xs text-blue-500 uppercase bg-blue-50/50">
                                    <tr>
                                        <th className="px-6 py-4 font-bold">Date</th>
                                        <th className="px-6 py-4 font-bold">Customer</th>
                                        <th className="px-6 py-4 font-bold">Product</th>
                                        <th className="px-6 py-4 font-bold text-right">Price</th>
                                        <th className="px-6 py-4 font-bold text-right">Split (Op/Cr)</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-blue-50">
                                    {orders?.map((order) => (
                                        <tr key={order.id} className="hover:bg-blue-50/30 transition-colors">
                                            <td className="px-6 py-4 font-medium text-blue-900">
                                                <div className="flex items-center gap-2">
                                                    <Calendar className="h-3 w-3 text-blue-400" />
                                                    {new Date(order.created_at).toLocaleDateString()}
                                                </div>
                                                <div className="text-xs text-blue-400 mt-1 pl-5">
                                                    {new Date(order.created_at).toLocaleTimeString()}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 text-blue-700">
                                                <div className="flex items-center gap-2">
                                                    <User className="h-3 w-3 text-blue-400" />
                                                    {order.customer_email || "Guest"}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 text-blue-900 font-medium">
                                                <div className="flex items-center gap-2">
                                                    <Package className="h-3 w-3 text-blue-400" />
                                                    {order.products?.title}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 text-right font-bold text-blue-950">
                                                Rp {order.amount.toLocaleString('id-ID')}
                                            </td>
                                            <td className="px-6 py-4 text-right">
                                                <div className="flex flex-col items-end gap-1">
                                                    <span className="text-xs font-bold text-green-600 bg-green-50 px-2 py-0.5 rounded-full">
                                                        Op: {order.products?.split_percentage_operator}%
                                                    </span>
                                                    <span className="text-xs font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full">
                                                        Cr: {order.products?.split_percentage_creator}%
                                                    </span>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                    {(!orders || orders.length === 0) && (
                                        <tr>
                                            <td colSpan={5} className="px-6 py-12 text-center text-blue-400">
                                                No transactions found.
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
