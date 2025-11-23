'use client'

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { updatePassword, updateBankDetails, getBankDetails } from "./actions"
import { toast } from "sonner"
import { Lock, Settings, CreditCard } from "lucide-react"

export default function SettingsPage() {
    const [isLoading, setIsLoading] = useState(false)
    const [isBankLoading, setIsBankLoading] = useState(false)
    const [bankDetails, setBankDetails] = useState<any>(null)

    useEffect(() => {
        getBankDetails().then(setBankDetails)
    }, [])

    async function handleSubmit(formData: FormData) {
        setIsLoading(true)

        const res = await updatePassword(formData)

        if (res?.error) {
            toast.error(res.error)
        } else if (res?.success) {
            toast.success(res.success)
            const form = document.getElementById("password-form") as HTMLFormElement
            form?.reset()
        }

        setIsLoading(false)
    }

    async function handleBankSubmit(formData: FormData) {
        setIsBankLoading(true)

        const res = await updateBankDetails(formData)

        if (res?.error) {
            toast.error(res.error)
        } else if (res?.success) {
            toast.success(res.success)
            getBankDetails().then(setBankDetails)
        }

        setIsBankLoading(false)
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
                            <Settings className="h-6 w-6" />
                        </div>
                        <div>
                            <h1 className="text-3xl font-bold tracking-tight text-white">Pengaturan</h1>
                            <p className="text-blue-100 mt-1">Kelola keamanan akun dan data pembayaran Anda.</p>
                        </div>
                    </div>
                </div>

                <div className="grid gap-6 md:grid-cols-2">
                    {/* Bank Details Section */}
                    <Card className="bg-white border-none shadow-xl">
                        <CardHeader className="p-6 pb-4">
                            <CardTitle className="text-blue-950 flex items-center gap-2">
                                <CreditCard className="h-5 w-5 text-[#0055D4]" />
                                Informasi Rekening Bank
                            </CardTitle>
                            <CardDescription className="text-blue-500">
                                Data untuk transfer pencairan dana.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="p-6">
                            <form action={handleBankSubmit} className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="bankName" className="text-blue-950">Nama Bank</Label>
                                    <Input
                                        id="bankName"
                                        name="bankName"
                                        placeholder="Contoh: BCA, Mandiri"
                                        defaultValue={bankDetails?.bank_name || ''}
                                        required
                                        className="bg-blue-50/50 border-blue-200 text-blue-950 focus:border-[#0055D4] focus:ring-[#0055D4]"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="accountNumber" className="text-blue-950">Nomor Rekening</Label>
                                    <Input
                                        id="accountNumber"
                                        name="accountNumber"
                                        placeholder="Contoh: 1234567890"
                                        defaultValue={bankDetails?.account_number || ''}
                                        required
                                        className="bg-blue-50/50 border-blue-200 text-blue-950 focus:border-[#0055D4] focus:ring-[#0055D4]"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="accountHolderName" className="text-blue-950">Nama Pemilik Rekening</Label>
                                    <Input
                                        id="accountHolderName"
                                        name="accountHolderName"
                                        placeholder="Contoh: John Doe"
                                        defaultValue={bankDetails?.account_holder_name || ''}
                                        required
                                        className="bg-blue-50/50 border-blue-200 text-blue-950 focus:border-[#0055D4] focus:ring-[#0055D4]"
                                    />
                                </div>
                                <Button type="submit" disabled={isBankLoading} className="w-full bg-[#0055D4] hover:bg-[#0044AA] text-white">
                                    {isBankLoading ? "Menyimpan..." : "Simpan Data Bank"}
                                </Button>
                            </form>
                        </CardContent>
                    </Card>

                    {/* Password Section */}
                    <Card className="bg-white border-none shadow-xl">
                        <CardHeader className="p-6 pb-4">
                            <CardTitle className="text-blue-950 flex items-center gap-2">
                                <Lock className="h-5 w-5 text-[#0055D4]" />
                                Ganti Password
                            </CardTitle>
                            <CardDescription className="text-blue-500">
                                Perbarui password untuk menjaga keamanan akun.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="p-6">
                            <form id="password-form" action={handleSubmit} className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="password" className="text-blue-950">Password Baru</Label>
                                    <Input
                                        id="password"
                                        name="password"
                                        type="password"
                                        required
                                        className="bg-blue-50/50 border-blue-200 text-blue-950 focus:border-[#0055D4] focus:ring-[#0055D4]"
                                        placeholder="••••••••"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="confirmPassword" className="text-blue-950">Konfirmasi Password Baru</Label>
                                    <Input
                                        id="confirmPassword"
                                        name="confirmPassword"
                                        type="password"
                                        required
                                        className="bg-blue-50/50 border-blue-200 text-blue-950 focus:border-[#0055D4] focus:ring-[#0055D4]"
                                        placeholder="••••••••"
                                    />
                                </div>
                                <Button type="submit" disabled={isLoading} className="w-full bg-[#0055D4] hover:bg-[#0044AA] text-white">
                                    {isLoading ? "Memperbarui..." : "Perbarui Password"}
                                </Button>
                            </form>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    )
}
