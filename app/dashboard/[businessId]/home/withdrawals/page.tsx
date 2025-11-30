import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CheckCircle2, XCircle, Clock, Wallet } from "lucide-react"
import { getPendingWithdrawals, processWithdrawal } from "./actions"
import { revalidatePath } from "next/cache"

export default async function WithdrawalsPage() {
    const withdrawals = await getPendingWithdrawals()

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
                            <Wallet className="h-6 w-6" />
                        </div>
                        <div>
                            <h1 className="text-3xl font-bold tracking-tight text-white">Permintaan Pencairan</h1>
                            <p className="text-blue-100 mt-1">Kelola permintaan pencairan dana dari creator.</p>
                        </div>
                    </div>
                </div>

                <div className="grid gap-4">
                    {withdrawals.length === 0 ? (
                        <Card className="border-dashed border-2 border-blue-300/30 bg-white/10 backdrop-blur-sm shadow-none">
                            <CardContent className="flex flex-col items-center justify-center py-16 text-center">
                                <div className="h-16 w-16 rounded-full bg-blue-500/20 flex items-center justify-center mb-4">
                                    <Clock className="h-8 w-8 text-white" />
                                </div>
                                <h3 className="text-xl font-bold text-white">Tidak ada permintaan baru</h3>
                                <p className="text-blue-100 mt-1">Semua beres! Tidak ada creator yang menunggu pencairan.</p>
                            </CardContent>
                        </Card>
                    ) : (
                        withdrawals.map((withdrawal: any) => (
                            <Card key={withdrawal.id} className="overflow-hidden bg-white border-none shadow-lg">
                                <CardContent className="p-6 flex flex-col md:flex-row md:items-center justify-between gap-6">
                                    <div className="space-y-2">
                                        <div className="flex items-center gap-3">
                                            <h3 className="font-bold text-2xl text-blue-950">
                                                Rp {Number(withdrawal.amount).toLocaleString('id-ID')}
                                            </h3>
                                            <span className="inline-flex items-center rounded-full bg-amber-100 px-3 py-1 text-xs font-bold text-amber-700 uppercase tracking-wide">
                                                Menunggu
                                            </span>
                                        </div>
                                        <div className="text-sm text-blue-600 font-medium">
                                            Diajukan oleh <span className="font-bold text-blue-950">{withdrawal.user?.full_name || "Tidak Diketahui"}</span> ({withdrawal.user?.email})
                                        </div>
                                        <div className="text-xs text-blue-400 font-medium flex items-center gap-1">
                                            <Clock className="h-3 w-3" />
                                            {new Date(withdrawal.created_at).toLocaleDateString()} pukul {new Date(withdrawal.created_at).toLocaleTimeString()}
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <form action={async () => {
                                            'use server'
                                            await processWithdrawal(withdrawal.id, 'reject')
                                        }}>
                                            <Button variant="outline" className="text-red-600 hover:text-red-700 hover:bg-red-50 border-red-100 font-semibold">
                                                <XCircle className="mr-2 h-4 w-4" />
                                                Tolak
                                            </Button>
                                        </form>

                                        <form action={async () => {
                                            'use server'
                                            await processWithdrawal(withdrawal.id, 'approve')
                                        }}>
                                            <Button className="bg-green-600 hover:bg-green-700 text-white font-semibold shadow-md shadow-green-200">
                                                <CheckCircle2 className="mr-2 h-4 w-4" />
                                                Setujui Pencairan
                                            </Button>
                                        </form>
                                    </div>
                                </CardContent>
                            </Card>
                        ))
                    )}
                </div>
            </div>
        </div>
    )
}
