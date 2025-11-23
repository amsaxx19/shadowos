"use client"

import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useState, useEffect } from "react"
import { toast } from "sonner"
import { requestWithdrawal } from "@/app/dashboard/creator/actions"
import { getBankDetails } from "@/app/dashboard/creator/settings/actions"
import Link from "next/link"
import { AlertCircle } from "lucide-react"

export function WithdrawDialog({ balance }: { balance: number }) {
    const [open, setOpen] = useState(false)
    const [loading, setLoading] = useState(false)
    const [bankDetails, setBankDetails] = useState<any>(null)

    useEffect(() => {
        if (open) {
            getBankDetails().then(setBankDetails)
        }
    }, [open])

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)

        const form = e.target as HTMLFormElement
        const amount = Number((form.elements.namedItem('amount') as HTMLInputElement).value)

        try {
            await requestWithdrawal(amount)
            toast.success("Withdrawal request submitted")
            setOpen(false)
        } catch (error: any) {
            toast.error(error.message)
        } finally {
            setLoading(false)
        }
    }

    const hasBankDetails = bankDetails?.bank_name && bankDetails?.account_number && bankDetails?.account_holder_name

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant="outline" className="bg-white/10 text-white border-white/20 hover:bg-white/20 hover:text-white">Tarik Dana</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Tarik Dana</DialogTitle>
                    <DialogDescription>
                        Masukkan nominal yang ingin ditarik. Minimal IDR 100,000.
                    </DialogDescription>
                </DialogHeader>

                {!hasBankDetails ? (
                    <div className="flex flex-col items-center justify-center p-4 space-y-4 text-center border rounded-lg bg-yellow-50 border-yellow-200">
                        <AlertCircle className="h-8 w-8 text-yellow-600" />
                        <div className="space-y-1">
                            <h4 className="font-semibold text-yellow-900">Data Bank Belum Lengkap</h4>
                            <p className="text-sm text-yellow-700">
                                Harap lengkapi data bank di menu Pengaturan sebelum melakukan penarikan.
                            </p>
                        </div>
                        <Link href="/dashboard/creator/settings" onClick={() => setOpen(false)}>
                            <Button variant="outline" className="border-yellow-300 text-yellow-800 hover:bg-yellow-100">
                                Buka Pengaturan
                            </Button>
                        </Link>
                    </div>
                ) : (
                    <form onSubmit={handleSubmit}>
                        <div className="grid gap-4 py-4">
                            <div className="p-3 rounded-md bg-blue-50 border border-blue-100 text-sm text-blue-900">
                                <p className="font-semibold mb-1">Rekening Tujuan:</p>
                                <p>{bankDetails.bank_name} - {bankDetails.account_number}</p>
                                <p className="text-blue-700">{bankDetails.account_holder_name}</p>
                            </div>

                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="amount" className="text-right">
                                    Nominal
                                </Label>
                                <Input
                                    id="amount"
                                    name="amount"
                                    type="number"
                                    className="col-span-3"
                                    placeholder="100000"
                                    min="100000"
                                    max={balance}
                                    required
                                />
                            </div>
                            <div className="text-xs text-right text-muted-foreground">
                                Tersedia: IDR {balance.toLocaleString()}
                            </div>
                        </div>
                        <DialogFooter>
                            <Button type="submit" disabled={loading || balance < 100000}>
                                {loading ? "Memproses..." : "Konfirmasi Penarikan"}
                            </Button>
                        </DialogFooter>
                    </form>
                )}
            </DialogContent>
        </Dialog>
    )
}
