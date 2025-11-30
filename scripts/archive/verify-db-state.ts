import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!; // Using Anon, but might need Service for Wallets if RLS blocks

// We need Service Key to read Wallets usually, unless RLS allows read own.
// But here we want to verify *any* wallet update.
// Let's try to use Service Key if available, else Anon.
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || supabaseKey;

const supabase = createClient(supabaseUrl, serviceKey);

async function verifyState() {
    console.log("🔍 Verifying Database State...");

    // 1. Check Latest Order
    const { data: orders, error: orderError } = await supabase
        .from('orders')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(1);

    if (orderError) {
        console.error("❌ Failed to fetch orders:", orderError.message);
        return;
    }

    if (!orders || orders.length === 0) {
        console.log("⚠️ No orders found in DB. (Likely used Mock Mode)");
        return;
    }

    const latestOrder = orders[0];
    console.log(`✅ Latest Order: ${latestOrder.id} (${latestOrder.status})`);
    console.log(`   Amount: ${latestOrder.amount}`);
    console.log(`   Created: ${latestOrder.created_at}`);

    if (latestOrder.status !== 'paid') {
        console.log("⚠️ Order is not PAID. Revenue split might not have triggered.");
    }

    // 2. Check Wallets
    // We expect Creator Wallet to have balance
    // We expect Operator Wallet to have balance
    const { data: wallets, error: walletError } = await supabase
        .from('wallets')
        .select('*, user:users(email, role)')
        .gt('balance', 0);

    if (walletError) {
        console.error("❌ Failed to fetch wallets:", walletError.message);
        return;
    }

    console.log("\n💰 Wallet Balances:");
    wallets.forEach(w => {
        console.log(`   - User: ${w.user?.email} (${w.user?.role}) | Balance: ${w.balance}`);
    });

    // 3. Check Transactions
    const { data: txs, error: txError } = await supabase
        .from('transactions')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(5);

    if (txError) {
        console.error("❌ Failed to fetch transactions:", txError.message);
        return;
    }

    console.log("\n📜 Recent Transactions:");
    txs.forEach(tx => {
        console.log(`   - ${tx.description}: ${tx.amount} (${tx.type})`);
    });
}

verifyState();
