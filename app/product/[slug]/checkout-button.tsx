"use client"

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Loader2 } from 'lucide-react'
import { toast } from 'sonner'

declare global {
    interface Window {
        snap: any
    }
}

export default function CheckoutButton({ product }: { product: any }) {
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        // Load Midtrans Snap Script
        const script = document.createElement('script')
        script.src = process.env.NEXT_PUBLIC_MIDTRANS_SNAP_URL || 'https://app.sandbox.midtrans.com/snap/snap.js'
        script.setAttribute('data-client-key', process.env.NEXT_PUBLIC_MIDTRANS_CLIENT_KEY || '')
        document.body.appendChild(script)

        return () => {
            document.body.removeChild(script)
        }
    }, [])

    const handleBuy = async () => {
        setLoading(true)
        try {
            // 1. Create Transaction
            const res = await fetch('/api/payment/create-transaction', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    productId: product.id,
                    customerName: "Guest User", // In real app, ask for name/email or use logged in user
                    customerEmail: "guest@example.com", // Placeholder
                    customerWhatsapp: "08123456789" // Placeholder
                })
            })

            const data = await res.json()

            if (!res.ok) throw new Error(data.error || 'Transaction failed')

            // 2. Open Snap Popup
            if (window.snap) {
                window.snap.pay(data.token, {
                    onSuccess: function (result: any) {
                        toast.success("Payment Successful!")
                        window.location.href = `/hub/${product.id}`
                    },
                    onPending: function (result: any) {
                        toast.info("Waiting for payment...")
                    },
                    onError: function (result: any) {
                        toast.error("Payment failed!")
                    },
                    onClose: function () {
                        setLoading(false)
                    }
                })
            } else {
                toast.error("Payment gateway not loaded")
                setLoading(false)
            }

        } catch (error: any) {
            toast.error(error.message)
            setLoading(false)
        }
    }

    return (
        <Button
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold h-12 text-lg"
            onClick={handleBuy}
            disabled={loading}
        >
            {loading ? <Loader2 className="animate-spin mr-2" /> : null}
            Buy Now
        </Button>
    )
}
