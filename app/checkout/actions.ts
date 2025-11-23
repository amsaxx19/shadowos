'use server'

import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'

export async function createOrder(formData: FormData) {
    const supabase = await createClient()

    const productId = formData.get('productId') as string
    const amount = Number(formData.get('amount'))
    const email = formData.get('email') as string

    // Create Pending Order
    const { data: order, error } = await supabase
        .from('orders')
        .insert({
            product_id: productId,
            amount: amount,
            customer_email: email,
            status: 'pending'
        })
        .select()
        .single()

    if (error) {
        console.error("Order creation failed:", error)
        throw new Error("Failed to create order")
    }

    redirect(`/payment/${order.id}`)
}

export async function processPayment(orderId: string, status: 'success' | 'failed') {
    const supabase = await createClient()

    if (status === 'failed') {
        await supabase.from('orders').update({ status: 'failed' }).eq('id', orderId)
        return { success: false }
    }

    // 1. Fetch Order & Product
    const { data: order } = await supabase.from('orders').select('*, products(*)').eq('id', orderId).single()
    if (!order || order.status === 'paid') return { success: true } // Already paid

    const product = order.products

    // 2. Calculate Splits
    const creatorShare = product.price * (product.split_percentage_creator / 100)
    const operatorShare = product.price * (product.split_percentage_operator / 100)

    // 3. Update Order Status
    await supabase.from('orders').update({ status: 'paid' }).eq('id', orderId)

    // 4. Update Wallets & Ledger (Creator)
    const { data: creatorWallet } = await supabase.from('wallets').select('*').eq('user_id', product.creator_id).single()
    if (creatorWallet) {
        await supabase.from('wallets').update({ balance: Number(creatorWallet.balance) + creatorShare }).eq('id', creatorWallet.id)
        await supabase.from('ledger').insert({
            order_id: order.id,
            wallet_id: creatorWallet.id,
            amount: creatorShare,
            type: 'sale_revenue',
            description: `Sale: ${product.title}`
        })
    }

    // 5. Update Wallets & Ledger (Operator)
    const { data: operatorWallet } = await supabase.from('wallets').select('*').eq('user_id', product.operator_id).single()
    if (operatorWallet) {
        await supabase.from('wallets').update({ balance: Number(operatorWallet.balance) + operatorShare }).eq('id', operatorWallet.id)
        await supabase.from('ledger').insert({
            order_id: order.id,
            wallet_id: operatorWallet.id,
            amount: operatorShare,
            type: 'sale_revenue',
            description: `Sale: ${product.title}`
        })
    }

    return { success: true }
}
