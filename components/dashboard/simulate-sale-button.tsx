"use client"

import { Button } from "@/components/ui/button"
import { useState, useEffect } from "react"
import { toast } from "sonner"
import { useRouter } from "next/navigation"
import { supabase } from "@/lib/supabase/client"

export function SimulateSaleButton() {
    const [isLoading, setIsLoading] = useState(false)
    const [product, setProduct] = useState<any | null>(null)
    const router = useRouter()

    useEffect(() => {
        // Fetch the latest product to use for simulation
        supabase.from('products').select('*').order('created_at', { ascending: false }).limit(1).single()
            .then(({ data, error }) => {
                if (error) console.error("Error fetching product:", error)
                if (data) setProduct(data)
            })
    }, [])

    const handleSimulateSale = async () => {
        if (!product) return

        setIsLoading(true)
        try {
            const { data: { user } } = await supabase.auth.getUser()
            const isOwner = user?.id === product.operator_id

            const res = await fetch('/api/simulate-order', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' }, // Added headers for consistency
                body: JSON.stringify({ productId: product.id }),
            })

            if (!res.ok) {
                const error = await res.json()
                throw new Error(error.error || 'Failed to simulate sale')
            }

            if (isOwner) {
                toast.success("Payment Successful!", {
                    description: "Rp 100.000 has been added to your wallet."
                })
            } else {
                toast.warning("Payment Successful!", {
                    description: "Note: This was a demo product. Revenue went to the Demo User, not you."
                })
            }

            // Trigger wallet update
            window.dispatchEvent(new Event('wallet-update'))
        } catch (error: any) {
            toast.error("Error", {
                description: error.message
            })
        } finally {
            setIsLoading(false)
        }
    }

    if (!product) return <Button disabled>Loading...</Button>

    return (
        <Button
            onClick={handleSimulateSale}
            disabled={isLoading}
            className="bg-emerald-600 hover:bg-emerald-700 text-white"
        >
            {isLoading ? "Processing..." : `Simulate Sale (${product.title.substring(0, 10)}...)`}
        </Button>
    )
}
