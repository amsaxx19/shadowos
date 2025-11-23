import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase/client'

export async function POST(request: Request) {
    const body = await request.json()
    const { productId } = body

    // 1. Fetch Product
    const { data: product, error: prodError } = await supabase
        .from('products')
        .select('*')
        .eq('id', productId)
        .single()

    if (prodError || !product) {
        return NextResponse.json({ error: 'Product not found' }, { status: 404 })
    }

    // 2. Calculate Splits
    const creatorShare = product.price * (product.split_percentage_creator / 100)
    const operatorShare = product.price * (product.split_percentage_operator / 100)

    // 3. Create Order
    const { data: order, error: orderError } = await supabase
        .from('orders')
        .insert({
            product_id: product.id,
            amount: product.price,
            status: 'paid'
        })
        .select()
        .single()

    if (orderError) return NextResponse.json({ error: orderError.message }, { status: 500 })

    // 4. Update Wallets

    // Update Creator Wallet
    const { data: creatorWallet } = await supabase.from('wallets').select('*').eq('user_id', product.creator_id).single()
    if (creatorWallet) {
        await supabase.from('wallets').update({ balance: Number(creatorWallet.balance) + creatorShare }).eq('id', creatorWallet.id)

        // Add Ledger Entry
        await supabase.from('ledger').insert({
            order_id: order.id,
            wallet_id: creatorWallet.id,
            amount: creatorShare,
            type: 'sale_revenue',
            description: 'Sale: ' + product.title
        })
    }

    // Update Operator Wallet
    const { data: operatorWallet } = await supabase.from('wallets').select('*').eq('user_id', product.operator_id).single()
    if (operatorWallet) {
        await supabase.from('wallets').update({ balance: Number(operatorWallet.balance) + operatorShare }).eq('id', operatorWallet.id)

        // Add Ledger Entry
        await supabase.from('ledger').insert({
            order_id: order.id,
            wallet_id: operatorWallet.id,
            amount: operatorShare,
            type: 'sale_revenue',
            description: 'Sale: ' + product.title
        })
    }

    return NextResponse.json({
        success: true,
        message: 'Order simulated successfully',
        splits: {
            creator: creatorShare,
            operator: operatorShare
        }
    })
}
