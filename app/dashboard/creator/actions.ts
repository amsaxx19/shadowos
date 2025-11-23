'use server'

import { createClient } from "@/lib/supabase/server"
import { revalidatePath } from "next/cache"

export async function getCreatorStats() {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) return null

    // Get Wallet Balance
    const { data: wallet } = await supabase
        .from('wallets')
        .select('id, balance')
        .eq('user_id', user.id)
        .single()

    // Get Total Earnings (Sum of all 'sale_revenue' ledger entries)
    const { data: earnings } = await supabase
        .from('ledger')
        .select('amount')
        .eq('wallet_id', wallet?.id)
        .eq('type', 'sale_revenue')

    const totalEarnings = earnings?.reduce((sum, entry) => sum + Number(entry.amount), 0) || 0

    // Get Recent Transactions
    const { data: transactions } = await supabase
        .from('ledger')
        .select('*')
        .eq('wallet_id', wallet?.id)
        .order('created_at', { ascending: false })
        .limit(5)

    // Get Active Products Count
    const { count: activeProducts } = await supabase
        .from('products')
        .select('*', { count: 'exact', head: true })
        .eq('creator_id', user.id)

    return {
        walletId: wallet?.id,
        balance: wallet?.balance || 0,
        totalEarnings,
        transactions: transactions || [],
        activeProducts: activeProducts || 0
    }
}

export async function requestWithdrawal(amount: number) {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) throw new Error("Unauthorized")

    // Get Wallet
    const { data: wallet } = await supabase
        .from('wallets')
        .select('id, balance')
        .eq('user_id', user.id)
        .single()

    if (!wallet) throw new Error("Wallet not found")
    if (wallet.balance < amount) throw new Error("Insufficient funds")

    // Create Withdrawal Request
    const { error: withdrawalError } = await supabase
        .from('withdrawals')
        .insert({
            wallet_id: wallet.id,
            amount: amount,
            status: 'pending'
        })

    if (withdrawalError) throw new Error("Failed to create withdrawal request")

    // Create Ledger Entry (Debit)
    // In a real app, you might hold funds or debit immediately. We'll debit immediately.
    const { error: ledgerError } = await supabase
        .from('ledger')
        .insert({
            wallet_id: wallet.id,
            amount: -amount,
            type: 'withdrawal',
            description: 'Withdrawal Request'
        })

    if (ledgerError) throw new Error("Failed to record transaction")

    // Update Wallet Balance
    const { error: walletError } = await supabase
        .from('wallets')
        .update({ balance: Number(wallet.balance) - amount })
        .eq('id', wallet.id)

    if (walletError) throw new Error("Failed to update wallet")

    revalidatePath('/dashboard/creator')
    return { success: true }
}
