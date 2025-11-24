'use server'

import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"

export async function processPayment(orderId: string, status: 'success' | 'failed') {
    const supabase = await createClient()

    // Update order status
    const { error } = await supabase
        .from('orders')
        .update({ status: status === 'success' ? 'paid' : 'failed' })
        .eq('id', orderId)

    if (error) {
        throw new Error('Failed to update order status')
    }

    if (status === 'success') {
        // In a real app, we would trigger webhooks here (e.g. to split revenue)
        // For now, we rely on the webhook handler or just manual verification
        redirect(`/payment/${orderId}/success`)
    } else {
        // Redirect back to checkout or show failure
        // For this mock, we just reload or show error
        return { error: "Payment failed" }
    }
}
