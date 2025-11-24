"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Loader2, Lock } from "lucide-react"
import { toast } from "sonner"
import { useRouter, useSearchParams } from "next/navigation"

interface CheckoutFormProps {
    productId: string
    price: number
}

declare global {
    interface Window {
        snap: any
    }
}

export function CheckoutForm({ productId, price }: CheckoutFormProps) {
    const [isLoading, setIsLoading] = useState(false)
    const router = useRouter()
    const searchParams = useSearchParams()
    const ref = searchParams.get('ref')

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setIsLoading(true)

        const formData = new FormData(e.currentTarget)
        const data = {
            productId,
            customerName: formData.get('name'),
            customerEmail: formData.get('email'),
            customerWhatsapp: formData.get('whatsapp'),
            ref
        }

        try {
            const response = await fetch('/api/payment/create-transaction', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            })

            const result = await response.json()

            if (!response.ok) throw new Error(result.error || 'Payment failed')

            // In a real app with Midtrans Snap:
            // window.snap.pay(result.token, {
            //     onSuccess: function(result){ alert('success'); },
            //     onPending: function(result){ alert('pending'); },
            //     onError: function(result){ alert('error'); },
            //     onClose: function(){ alert('customer closed the popup without finishing the payment'); }
            // })

            // For Mock:
            toast.success("Order created! Redirecting to mock payment...")
            router.push(`/payment/${result.orderId}`) // Redirect to our mock payment page

        } catch (error: any) {
            toast.error(error.message)
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
                <Label htmlFor="name" className="text-gray-700 font-medium">Nama Lengkap</Label>
                <Input
                    id="name"
                    name="name"
                    placeholder="Contoh: Budi Santoso"
                    required
                    className="bg-white border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                />
            </div>

            <div className="space-y-2">
                <Label htmlFor="email" className="text-gray-700 font-medium">Alamat Email</Label>
                <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="budi@example.com"
                    required
                    className="bg-white border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                />
                <p className="text-[10px] text-gray-500">File produk akan dikirim ke email ini.</p>
            </div>

            <div className="space-y-2">
                <Label htmlFor="whatsapp" className="text-gray-700 font-medium">Nomor WhatsApp (Opsional)</Label>
                <Input
                    id="whatsapp"
                    name="whatsapp"
                    type="tel"
                    placeholder="081234567890"
                    className="bg-white border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                />
            </div>

            <Button
                type="submit"
                className="w-full h-12 bg-green-500 hover:bg-green-600 text-white font-bold text-lg shadow-lg shadow-green-200 mt-4"
                disabled={isLoading}
            >
                {isLoading ? (
                    <>
                        <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                        Memproses...
                    </>
                ) : (
                    <>
                        Bayar Sekarang
                        <Lock className="ml-2 h-4 w-4 opacity-70" />
                    </>
                )}
            </Button>
        </form>
    )
}
