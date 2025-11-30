import { createAdminClient } from '@/lib/supabase/admin'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
    try {
        const body = await request.json()
        const { order_id, transaction_status, fraud_status, gross_amount } = body

        // Verify Signature (Optional for now, but good practice)
        // const signatureKey = body.signature_key
        // ... verification logic ...

        console.log(`🔔 Webhook Received: Order ${order_id}, Status ${transaction_status}`)

        if (transaction_status == 'capture' || transaction_status == 'settlement') {
            if (fraud_status == 'challenge') {
                // Handle challenge
                return NextResponse.json({ message: 'Transaction Challenged' })
            } else if (transaction_status == 'accept' || transaction_status == 'settlement' || transaction_status == 'capture') {

                // 1. Initialize Admin Client (Required for Wallet Updates)
                const supabase = createAdminClient()

                // 2. Update Order Status
                const { data: order, error: orderError } = await supabase
                    .from('orders')
                    .update({ status: 'paid' })
                    .eq('id', order_id)
                    .select()
                    .single()

                if (orderError || !order) {
                    console.error("Failed to update order:", orderError)
                    return NextResponse.json({ error: 'Order update failed' }, { status: 500 })
                }

                // 3. Distribute Revenue
                // Fetch Product to get Split Rules
                const { data: product, error: prodError } = await supabase
                    .from('products')
                    .select('creator_id, operator_id, split_percentage_creator, split_percentage_operator')
                    .eq('id', order.product_id)
                    .single()

                if (prodError || !product) {
                    console.error("Product not found for revenue split:", prodError)
                    return NextResponse.json({ error: 'Product not found' }, { status: 404 })
                }

                const amount = parseFloat(gross_amount)
                const creatorShare = amount * (product.split_percentage_creator / 100)
                const operatorShare = amount * (product.split_percentage_operator / 100)

                // Update Creator Wallet
                await updateWallet(supabase, product.creator_id, creatorShare)

                // Update Operator Wallet
                await updateWallet(supabase, product.operator_id, operatorShare)

                // Log Transaction (Optional: Create a 'transactions' entry for ledger)

                console.log(`💰 Revenue Distributed: Creator +${creatorShare}, Operator +${operatorShare}`)
                return NextResponse.json({ message: 'Payment Processed & Revenue Distributed' })
            }
        } else if (transaction_status == 'cancel' || transaction_status == 'deny' || transaction_status == 'expire') {
            // Handle failure
            const supabase = createAdminClient()
            await supabase.from('orders').update({ status: 'failed' }).eq('id', order_id)
            return NextResponse.json({ message: 'Order Cancelled/Failed' })
        } else if (transaction_status == 'pending') {
            return NextResponse.json({ message: 'Order Pending' })
        }

        return NextResponse.json({ message: 'Notification received' })

    } catch (error) {
        console.error("Webhook Error:", error)
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
    }
}

async function updateWallet(supabase: any, userId: string, amount: number) {
    // 1. Get current balance (or create wallet if not exists)
    const { data: wallet, error: fetchError } = await supabase
        .from('wallets')
        .select('balance')
        .eq('user_id', userId)
        .single()

    let currentBalance = 0
    if (wallet) {
        currentBalance = wallet.balance
    }

    const newBalance = currentBalance + amount

    // 2. Upsert Wallet
    const { error: updateError } = await supabase
        .from('wallets')
        .upsert({
            user_id: userId,
            balance: newBalance,
            updated_at: new Date().toISOString()
        }, { onConflict: 'user_id' })

    if (updateError) {
        console.error(`Failed to update wallet for ${userId}:`, updateError)
        throw updateError
    }
}
