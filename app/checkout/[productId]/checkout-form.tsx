"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Loader2, Lock, ChevronRight } from "lucide-react"
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
        <form onSubmit={handleSubmit} className="space-y-6">
            {/* Buyer Info */}
            <div className="space-y-4">
                <h2 className="text-xs font-bold text-gray-500 uppercase tracking-wider">Buyer Info</h2>

                <div className="space-y-2">
                    <Label htmlFor="email" className="text-gray-700 font-medium">Email <span className="text-red-500">*</span></Label>
                    <Input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="Your Email"
                        required
                        className="bg-white border-gray-300 focus:border-blue-500 focus:ring-blue-500 h-11"
                    />
                </div>

                <div className="space-y-2">
                    <Label htmlFor="name" className="text-gray-700 font-medium">Name <span className="text-red-500">*</span></Label>
                    <Input
                        id="name"
                        name="name"
                        placeholder="Your Name"
                        required
                        className="bg-white border-gray-300 focus:border-blue-500 focus:ring-blue-500 h-11"
                    />
                </div>

                <div className="space-y-2">
                    <Label htmlFor="whatsapp" className="text-gray-700 font-medium">Phone Number <span className="text-red-500">*</span></Label>
                    <Input
                        id="whatsapp"
                        name="whatsapp"
                        type="tel"
                        placeholder="08xxxxxx"
                        required
                        className="bg-white border-gray-300 focus:border-blue-500 focus:ring-blue-500 h-11"
                    />
                </div>
            </div>

            {/* Payment Detail */}
            <div className="space-y-4 pt-2">
                <h2 className="text-xs font-bold text-gray-500 uppercase tracking-wider">Payment Detail</h2>
                <div className="bg-white p-4 rounded-xl border border-gray-100 space-y-3 shadow-sm">
                    <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Subtotal</span>
                        <span className="font-medium text-gray-900">IDR {price.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Discount</span>
                        <span className="font-medium text-green-600">- Rp 0</span>
                    </div>
                    <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Convenience fee</span>
                        <span className="font-medium text-gray-900">Rp 0</span>
                    </div>
                    <div className="border-t border-gray-100 pt-3 flex justify-between items-center">
                        <span className="font-bold text-gray-900">TOTAL</span>
                        <span className="font-bold text-lg text-[#0055D4]">IDR {price.toLocaleString()}</span>
                    </div>
                </div>
            </div>

            {/* Payment Method Selection */}
            <div className="space-y-2">
                <h2 className="text-xs font-bold text-gray-500 uppercase tracking-wider">Payment Method</h2>
                <div className="bg-white p-4 rounded-xl border border-gray-100 flex items-center justify-between shadow-sm cursor-pointer hover:bg-gray-50 transition-colors">
                    <div className="flex items-center gap-3">
                        <div className="h-8 w-10 bg-gray-100 rounded border border-gray-200 flex items-center justify-center">
                            <span className="text-xs font-bold text-gray-500">PAY</span>
                        </div>
                        <span className="font-medium text-gray-900">Select Payment Method</span>
                    </div>
                    <ChevronRight className="h-5 w-5 text-gray-400" />
                </div>
            </div>

            {/* Secure Payment Badge */}
            <div className="bg-green-50 p-4 rounded-xl border border-green-100 flex items-start gap-3">
                <Lock className="h-5 w-5 text-green-600 mt-0.5 shrink-0" />
                <div>
                    <h4 className="font-bold text-sm text-gray-900">Secure Payment</h4>
                    <p className="text-xs text-gray-600">All your payments are secured with RSA encryption</p>
                </div>
            </div>

            {/* Terms */}
            <div className="space-y-3">
                <div className="flex items-start gap-2">
                    <input type="checkbox" id="terms" className="mt-1 rounded border-gray-300 text-blue-600 focus:ring-blue-500" required />
                    <label htmlFor="terms" className="text-sm text-gray-600 leading-tight">
                        I agree to the <span className="text-green-600 font-medium">Terms of Use</span>
                    </label>
                </div>
                <div className="flex items-start gap-2">
                    <input type="checkbox" id="marketing" className="mt-1 rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                    <label htmlFor="marketing" className="text-sm text-gray-600 leading-tight">
                        I agree that my email and phone number may be used to receive newsletters or marketing messages.
                    </label>
                </div>
            </div>

            {/* Submit Button */}
            <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 z-50">
                <div className="max-w-md mx-auto">
                    <Button
                        type="submit"
                        className="w-full h-12 bg-[#0055D4] hover:bg-blue-700 text-white font-bold text-lg shadow-lg shadow-blue-200"
                        disabled={isLoading}
                    >
                        {isLoading ? (
                            <>
                                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                                Processing...
                            </>
                        ) : (
                            <>
                                Buy Now - IDR {price.toLocaleString()}
                            </>
                        )}
                    </Button>
                </div>
            </div>
            {/* Spacer for fixed footer */}
            <div className="h-20" />
        </form>
    )
}
