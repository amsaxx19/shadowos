'use server'

import { createAdminClient } from "@/lib/supabase/admin"
import { redirect } from "next/navigation"

import { distributeRevenue } from "@/lib/revenue-logic"

export async function processPayment(orderId: string, status: 'success' | 'failed') {
    // Handle Mock Orders
    if (orderId.startsWith('mock-')) {
        if (status === 'success') {
            redirect(`/payment/${orderId}/success`)
        } else {
            return { error: "Payment failed (Simulation)" }
        }
    }

    const supabase = createAdminClient()

    // Update order status
    const { error } = await supabase
        .from('orders')
        .update({ status: status === 'success' ? 'paid' : 'failed' })
        .eq('id', orderId)

    if (error) {
        console.error("Payment processing error:", error)
        throw new Error('Failed to update order status')
    }

    if (status === 'success') {
        // Distribute Revenue
        await distributeRevenue(orderId)

        redirect(`/payment/${orderId}/success`)
    } else {
        // Redirect back to checkout or show failure
        // For this mock, we just reload or show error
        return { error: "Payment failed" }
    }
}
