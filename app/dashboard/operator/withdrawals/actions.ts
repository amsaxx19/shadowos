'use server'

import { createClient } from "@/lib/supabase/server"
import { revalidatePath } from "next/cache"

export async function getPendingWithdrawals() {
    const supabase = await createClient()

    // Fetch pending withdrawals with user details
    // Note: We need to join with wallets -> users to get the user name/email
    // Supabase JS client doesn't support deep nested joins easily in one go without setup, 
    // so we'll do it in two steps or use a view. For now, let's try a direct join if relations are set,
    // or just fetch withdrawals and then fetch users.

    const { data: withdrawals, error } = await supabase
        .from('withdrawals')
        .select(`
            id,
            amount,
            status,
            created_at,
            wallet_id,
            wallets (
                user_id,
                users (
                    full_name,
                    email
                )
            )
        `)
        .eq('status', 'pending')
        .order('created_at', { ascending: false })

    if (error) {
        console.error("Error fetching withdrawals:", error)
        return []
    }

    return withdrawals.map((w: any) => ({
        id: w.id,
        amount: w.amount,
        status: w.status,
        created_at: w.created_at,
        user: w.wallets?.users
    }))
}

export async function processWithdrawal(withdrawalId: string, action: 'approve' | 'reject') {
    const supabase = await createClient()

    // Get the withdrawal to verify it exists and is pending
    const { data: withdrawal } = await supabase
        .from('withdrawals')
        .select('*')
        .eq('id', withdrawalId)
        .single()

    if (!withdrawal || withdrawal.status !== 'pending') {
        throw new Error("Invalid withdrawal request")
    }

    if (action === 'approve') {
        // 1. Update withdrawal status to approved
        const { error: updateError } = await supabase
            .from('withdrawals')
            .update({ status: 'approved' })
            .eq('id', withdrawalId)

        if (updateError) throw new Error("Failed to approve withdrawal")

        // 2. Create a ledger entry for the "Payout" (just a record, money was already deducted from wallet)
        // Actually, wait. When they requested, we deducted from wallet.
        // So if approved, we just mark as approved. The money is already gone from their "balance".
        // We might want to record the actual payout transaction ID here if we integrated a real bank.

    } else if (action === 'reject') {
        // 1. Update withdrawal status to rejected
        const { error: updateError } = await supabase
            .from('withdrawals')
            .update({ status: 'rejected' })
            .eq('id', withdrawalId)

        if (updateError) throw new Error("Failed to reject withdrawal")

        // 2. Refund the wallet
        const { data: wallet } = await supabase
            .from('wallets')
            .select('balance')
            .eq('id', withdrawal.wallet_id)
            .single()

        if (!wallet) throw new Error("Wallet not found")

        const { error: refundError } = await supabase
            .from('wallets')
            .update({ balance: Number(wallet.balance) + Number(withdrawal.amount) })
            .eq('id', withdrawal.wallet_id)

        if (refundError) throw new Error("Failed to refund wallet")

        // 3. Create a ledger entry for the refund
        await supabase.from('ledger').insert({
            wallet_id: withdrawal.wallet_id,
            amount: withdrawal.amount,
            type: 'withdrawal', // or 'refund' if we had that type
            description: 'Withdrawal Rejected - Refund'
        })
    }

    revalidatePath('/dashboard/operator/withdrawals')
    return { success: true }
}
