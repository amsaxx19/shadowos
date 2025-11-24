'use server'

import { createAdminClient } from "@/lib/supabase/admin"
import { redirect } from "next/navigation"

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

async function distributeRevenue(orderId: string) {
    const supabase = createAdminClient()

    // 1. Fetch Order and Product details
    const { data: order, error: orderError } = await supabase
        .from('orders')
        .select('*, product:products(creator_id, price)')
        .eq('id', orderId)
        .single()

    if (orderError || !order) {
        console.error("Failed to fetch order for revenue distribution:", orderError)
        return
    }

    const amount = order.amount
    const creatorId = order.product.creator_id

    // 2. Calculate Shares (90% Creator, 10% Operator)
    const operatorShare = Math.floor(amount * 0.10)
    const creatorShare = amount - operatorShare

    // 3. Update Creator Wallet
    // Check if wallet exists, if not create it (should exist on signup ideally)
    const { data: creatorWallet } = await supabase
        .from('wallets')
        .select('id, balance')
        .eq('user_id', creatorId)
        .single()

    if (creatorWallet) {
        await supabase
            .from('wallets')
            .update({ balance: creatorWallet.balance + creatorShare })
            .eq('id', creatorWallet.id)

        // Record Transaction
        await supabase.from('transactions').insert({
            wallet_id: creatorWallet.id,
            amount: creatorShare,
            type: 'sale',
            status: 'completed',
            description: `Sale of ${order.product_id} (90%)`
        })
    }

    // 4. Update Operator Wallet
    // Find Operator User
    const { data: operatorUser } = await supabase
        .from('users')
        .select('id')
        .eq('email', 'operator_test@shadowos.com')
        .single()

    if (operatorUser) {
        const { data: operatorWallet } = await supabase
            .from('wallets')
            .select('id, balance')
            .eq('user_id', operatorUser.id)
            .single()

        if (operatorWallet) {
            await supabase
                .from('wallets')
                .update({ balance: operatorWallet.balance + operatorShare })
                .eq('id', operatorWallet.id)

            // Record Transaction
            await supabase.from('transactions').insert({
                wallet_id: operatorWallet.id,
                amount: operatorShare,
                type: 'commission',
                status: 'completed',
                description: `Commission from Order ${orderId} (10%)`
            })
        }
    }
}
