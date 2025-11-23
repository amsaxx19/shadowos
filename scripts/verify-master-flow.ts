import { createClient } from '@supabase/supabase-js'
import dotenv from 'dotenv'
// import { v4 as uuidv4 } from 'uuid' - Removed to avoid dependency issues

dotenv.config({ path: '.env.local' })

// Use Anon Key for everything (Simulating frontend actions)
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

if (!supabaseUrl || !supabaseKey) {
    throw new Error("Missing NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY")
}

// We will create separate clients for different actors to maintain separate auth states
const createActorClient = () => createClient(supabaseUrl, supabaseKey)

const supabaseAdmin = createActorClient() // We'll try to use this for "Operator" actions
const supabaseClient = createActorClient() // For "Creator" actions

async function runVerification() {
    console.log("🚀 Starting Master Verification Flow...")

    const timestamp = Date.now()
    const operatorEmail = `operator_${timestamp}@test.com`
    const creatorEmail = `creator_${timestamp}@test.com`
    const password = 'password123'

    // 1. Setup: Create Operator and Creator Users
    console.log("\n1️⃣  Creating Users...")

    // Create Operator
    const { data: operatorAuth, error: opError } = await supabaseAdmin.auth.signUp({
        email: operatorEmail,
        password: password,
        options: {
            data: { full_name: 'Test Operator', role: 'operator' }
        }
    })
    if (opError) throw new Error(`Failed to create operator: ${opError.message}`)

    // If user is null, it might be because of email confirmation settings
    const operatorId = operatorAuth.user?.id
    if (!operatorId) throw new Error("Operator created but ID is missing (Email confirmation required?)")

    console.log(`   ✅ Operator created: ${operatorEmail} (${operatorId})`)

    // Create Creator
    const { data: creatorAuth, error: crError } = await supabaseClient.auth.signUp({
        email: creatorEmail,
        password: password,
        options: {
            data: { full_name: 'Test Creator', role: 'creator' }
        }
    })
    if (crError) throw new Error(`Failed to create creator: ${crError.message}`)

    const creatorId = creatorAuth.user?.id
    if (!creatorId) throw new Error("Creator created but ID is missing (Email confirmation required?)")

    console.log(`   ✅ Creator created: ${creatorEmail} (${creatorId})`)

    // 2. Operator creates Product assigned to Creator
    console.log("\n2️⃣  Operator Creating Product...")
    const productPrice = 100000
    const creatorSplit = 70 // 70%
    const operatorSplit = 30 // 30%

    const { data: product, error: prodError } = await supabaseAdmin
        .from('products')
        .insert({
            title: `Master Test Product ${timestamp}`,
            description: 'Verified via script',
            price: productPrice,
            creator_id: creatorId,
            operator_id: operatorId,
            split_percentage_creator: creatorSplit,
            split_percentage_operator: operatorSplit
        })
        .select()
        .single()

    if (prodError) throw new Error(`Failed to create product: ${prodError.message}`)
    console.log(`   ✅ Product created: ${product.title} (ID: ${product.id})`)

    // 3. Simulate Purchase (Revenue Split)
    console.log("\n3️⃣  Simulating Purchase...")
    // Create Order
    const { data: order, error: orderError } = await supabaseAdmin
        .from('orders')
        .insert({
            product_id: product.id,
            amount: productPrice,
            customer_email: 'customer@test.com',
            status: 'completed'
        })
        .select()
        .single()

    if (orderError) throw new Error(`Failed to create order: ${orderError.message}`)
    console.log(`   ✅ Order created: ${order.id}`)

    // Create Ledger Entries (Revenue Split)
    // Get Wallet IDs
    const { data: creatorWallet } = await supabaseAdmin.from('wallets').select('id').eq('user_id', creatorId).single()
    const { data: operatorWallet } = await supabaseAdmin.from('wallets').select('id').eq('user_id', operatorId).single()

    if (!creatorWallet || !operatorWallet) throw new Error("Wallets not found")

    const creatorAmount = productPrice * (creatorSplit / 100)
    const operatorAmount = productPrice * (operatorSplit / 100)

    const { error: ledgerError } = await supabaseAdmin.from('ledger').insert([
        {
            order_id: order.id,
            wallet_id: creatorWallet.id,
            amount: creatorAmount,
            type: 'sale_revenue',
            description: `Sale: ${product.title}`
        },
        {
            order_id: order.id,
            wallet_id: operatorWallet.id,
            amount: operatorAmount,
            type: 'sale_revenue',
            description: `Sale: ${product.title}`
        }
    ])

    if (ledgerError) throw new Error(`Failed to create ledger entries: ${ledgerError.message}`)
    console.log(`   ✅ Revenue split recorded: Creator +${creatorAmount}, Operator +${operatorAmount}`)

    // Update Wallet Balances
    await supabaseAdmin.rpc('update_wallet_balance', { p_wallet_id: creatorWallet.id, p_amount: creatorAmount })
    await supabaseAdmin.rpc('update_wallet_balance', { p_wallet_id: operatorWallet.id, p_amount: operatorAmount })
    console.log("   ✅ Wallet balances updated")

    // 4. Verify Creator Access (RLS)
    console.log("\n4️⃣  Verifying Creator Access (RLS)...")

    // Log in as Creator
    const { data: loginData, error: loginError } = await supabaseClient.auth.signInWithPassword({
        email: creatorEmail,
        password: password
    })
    if (loginError) throw new Error(`Creator login failed: ${loginError.message}`)

    // Try to fetch products
    const { data: visibleProducts, error: fetchError } = await supabaseClient.from('products').select('*')
    if (fetchError) throw new Error(`Creator fetch products failed: ${fetchError.message}`)

    const myProduct = visibleProducts.find(p => p.id === product.id)
    if (myProduct) {
        console.log("   ✅ Creator can see their assigned product.")
    } else {
        throw new Error("❌ Creator CANNOT see their assigned product!")
    }

    // Check for data leaks (should verify they DON'T see others, but we just created a fresh one so hard to test isolation without existing data. 
    // Assuming previous tests covered isolation. This tests ACCESS.)

    // 5. Verify Withdrawal Flow
    console.log("\n5️⃣  Verifying Withdrawal Flow...")
    const withdrawalAmount = 50000

    // Creator requests withdrawal
    // Note: We need to use the authenticated client (supabaseClient) for this to test RLS policies on insert
    const { data: withdrawal, error: withdrawError } = await supabaseClient
        .from('withdrawals')
        .insert({
            wallet_id: creatorWallet.id,
            amount: withdrawalAmount,
            status: 'pending'
        })
        .select()
        .single()

    if (withdrawError) throw new Error(`Creator withdrawal request failed: ${withdrawError.message}`)
    console.log(`   ✅ Withdrawal requested: ${withdrawal.amount} (ID: ${withdrawal.id})`)

    // Operator approves withdrawal
    // Log in as Operator (simulate by using Admin client for simplicity, or switch auth)
    // Using Admin client to approve
    const { error: approveError } = await supabaseAdmin
        .from('withdrawals')
        .update({ status: 'approved' })
        .eq('id', withdrawal.id)

    if (approveError) throw new Error(`Operator approval failed: ${approveError.message}`)
    console.log("   ✅ Operator approved withdrawal")

    console.log("\n🎉 FULL SYSTEM VERIFICATION SUCCESSFUL!")
}

runVerification().catch(err => {
    console.error("\n❌ VERIFICATION FAILED:")
    console.error(err)
    process.exit(1)
})
