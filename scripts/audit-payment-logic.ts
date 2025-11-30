import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

// Colors for console output
const colors = {
    reset: "\x1b[0m",
    green: "\x1b[32m",
    red: "\x1b[31m",
    yellow: "\x1b[33m",
    blue: "\x1b[34m",
    bold: "\x1b[1m"
};

async function auditPaymentLogic() {
    console.log(`${colors.bold}${colors.blue}🚀 Starting System Audit: End-to-End Logic Verification (User Mode)${colors.reset}\n`);

    const supabase = createClient(supabaseUrl, anonKey);

    // Checklist State
    const checklist = {
        orderCreated: false,
        webhookTriggered: false,
        walletCreatorUpdated: false,
        walletOperatorUpdated: false,
        statusUpdated: false
    };

    try {
        // 1. Setup Data & Auth
        console.log("1️⃣  Authenticating Test Users...");
        const timestamp = Date.now();

        // We need existing users or we need to sign up. 
        // Since we can't easily sign up without email verification in some setups,
        // we will try to login with known test accounts.
        // If they don't exist, this script might fail, but we'll try the ones we just used/created.

        const operatorEmail = "operator_signup_test@shadow.com"; // The one we just signed up
        const operatorPassword = "password123";

        // Login as Operator
        const { data: opAuth, error: opError } = await supabase.auth.signInWithPassword({
            email: operatorEmail,
            password: operatorPassword
        });

        if (opError) {
            console.log(`${colors.yellow}⚠️  Could not login as ${operatorEmail}. Trying to sign up...${colors.reset}`);
            const { data: opSignUp, error: opSignError } = await supabase.auth.signUp({
                email: operatorEmail,
                password: operatorPassword,
                options: { data: { full_name: 'Audit Operator', role: 'operator' } }
            });
            if (opSignError) throw new Error(`Failed to sign up operator: ${opSignError.message}`);
            console.log(`   ✅ Operator Signed Up: ${operatorEmail}`);
            // Need to handle email confirmation if enabled? Assuming disabled for dev or auto-confirm.
        } else {
            console.log(`   ✅ Operator Logged In: ${operatorEmail}`);
        }

        // Get Operator Details
        const operatorUser = (await supabase.auth.getUser()).data.user;
        if (!operatorUser) throw new Error("Failed to get Operator User session");
        const operatorId = operatorUser.id;

        // Get Operator Initial Wallet
        const { data: initOperatorWallet } = await supabase.from('wallets').select('balance').eq('user_id', operatorId).single();
        const startOperatorBalance = initOperatorWallet?.balance || 0;


        // Login as Creator (We need a creator account)
        const creatorEmail = "creator_audit_test@shadow.com";
        const creatorPassword = "password123";

        const { data: crAuth, error: crError } = await supabase.auth.signInWithPassword({
            email: creatorEmail,
            password: creatorPassword
        });

        if (crError) {
            console.log(`${colors.yellow}⚠️  Could not login as ${creatorEmail}. Trying to sign up...${colors.reset}`);
            const { data: crSignUp, error: crSignError } = await supabase.auth.signUp({
                email: creatorEmail,
                password: creatorPassword,
                options: { data: { full_name: 'Audit Creator', role: 'creator' } }
            });
            if (crSignError) throw new Error(`Failed to sign up creator: ${crSignError.message}`);
            console.log(`   ✅ Creator Signed Up: ${creatorEmail}`);
        } else {
            console.log(`   ✅ Creator Logged In: ${creatorEmail}`);
        }

        // Get Creator Details
        const creatorUser = (await supabase.auth.getUser()).data.user;
        if (!creatorUser) throw new Error("Failed to get Creator User session");
        const creatorId = creatorUser.id;

        // Get Creator Initial Wallet
        const { data: initCreatorWallet } = await supabase.from('wallets').select('balance').eq('user_id', creatorId).single();
        const startCreatorBalance = initCreatorWallet?.balance || 0;

        console.log(`   💰 Initial Balances -> Creator: ${startCreatorBalance}, Operator: ${startOperatorBalance}`);

        // 2. Create Product (As Operator - usually Operators add products or Creators do. Let's assume Operator adds it for Creator)
        // Re-login as Operator to create product
        await supabase.auth.signInWithPassword({ email: operatorEmail, password: operatorPassword });

        const productPrice = 100000;
        const { data: product, error: prodError } = await supabase.from('products').insert({
            title: `Audit Product ${timestamp}`,
            description: 'Audit Product',
            price: productPrice,
            creator_id: creatorId, // Assign to the creator
            operator_id: operatorId,
            split_percentage_creator: 70,
            split_percentage_operator: 30
        }).select().single();

        if (prodError) throw new Error(`Failed to create product: ${prodError.message}`);
        console.log(`   ✅ Product Created: ${product.title} (IDR ${productPrice}) [ID: ${product.id}]`);


        // 3. Step 1: Create Order (Pending)
        console.log("\n2️⃣  Step 1: Create Order (Pending)...");
        // Anyone can create an order (public). We don't need auth, or can use anon.
        // But RLS might require auth for 'orders' insert? Usually public can insert orders.
        const { data: order, error: orderError } = await supabase.from('orders').insert({
            product_id: product.id,
            amount: productPrice,
            customer_email: 'budi@tester.com',
            customer_name: 'Budi Tester',
            status: 'pending'
        }).select().single();

        if (orderError) throw new Error(`Failed to create order: ${orderError.message}`);

        if (order.status === 'pending') {
            checklist.orderCreated = true;
            console.log(`   ✅ Order Created: ${order.id} (Status: PENDING)`);
        }

        // 4. Step 2: Simulate Webhook (Trigger Logic)
        console.log("\n3️⃣  Step 2: Simulate Revenue Split Logic...");

        // Since we don't have the Service Key to run the exact backend logic script or hit the webhook endpoint securely (if it checks signature),
        // AND we can't import the server action here easily.
        // We will manually perform the DB updates that the webhook WOULD do, 
        // BUT we will check if the RLS allows us to do it? 
        // NO. RLS usually prevents users from updating other users' wallets.
        // ONLY Service Role can update wallets arbitrarily.

        // CRITICAL: We cannot verify the *actual* backend logic execution without Service Role or hitting the real API.
        // If we hit the real API (localhost:3000/api/payment/notification), we need a valid Midtrans signature.

        // ALTERNATIVE: We can use the `rpc` if we created a postgres function? No.

        // OK, since the user wants to "test all functions", and we are blocked on Backend Audit due to missing key,
        // We will SKIP the manual DB update simulation because it will likely fail RLS.
        // Instead, we will rely on the Frontend Verification to see if the *result* appears.
        // OR, we can try to hit the API route with a mock payload if verification is disabled/mocked.

        // Let's try to hit the API route!
        // We need to fetch `http://localhost:3000/api/payment/notification`

        console.log("   🔄 Sending Mock Webhook Request to Localhost...");

        const webhookPayload = {
            transaction_status: 'settlement',
            order_id: order.id,
            gross_amount: productPrice.toString(),
            signature_key: 'mock-signature' // The backend might verify this
        };

        // We need to run this fetch. 
        // Note: 'fetch' is available in Node 18+.
        const response = await fetch('http://localhost:3000/api/payment/notification', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(webhookPayload)
        });

        console.log(`   📡 Webhook Response: ${response.status} ${response.statusText}`);

        if (response.ok) {
            checklist.webhookTriggered = true;
            console.log("   ✅ Webhook Sent Successfully");
        } else {
            console.log("   ⚠️ Webhook Failed (Expected if signature check is active)");
        }

        // 5. Step 3: Verify Revenue Split Logic (Check Balances)
        console.log("\n4️⃣  Step 3: Verify Revenue Split Logic...");

        // Wait a bit for async processing
        await new Promise(r => setTimeout(r, 2000));

        // Re-login as Creator to check balance
        await supabase.auth.signInWithPassword({ email: creatorEmail, password: creatorPassword });
        const { data: finalCreatorWallet } = await supabase.from('wallets').select('balance').eq('user_id', creatorId).single();

        // Re-login as Operator to check balance
        await supabase.auth.signInWithPassword({ email: operatorEmail, password: operatorPassword });
        const { data: finalOperatorWallet } = await supabase.from('wallets').select('balance').eq('user_id', operatorId).single();

        const creatorDiff = (finalCreatorWallet?.balance || 0) - startCreatorBalance;
        const operatorDiff = (finalOperatorWallet?.balance || 0) - startOperatorBalance;

        console.log(`   💰 Creator Balance Change: +${creatorDiff}`);
        console.log(`   💰 Operator Balance Change: +${operatorDiff}`);

        if (creatorDiff === 70000) checklist.walletCreatorUpdated = true;
        if (operatorDiff === 30000) checklist.walletOperatorUpdated = true;

        // Verify Order Status
        const { data: finalOrder } = await supabase.from('orders').select('status').eq('id', order.id).single();
        if (finalOrder.status === 'paid') checklist.statusUpdated = true;

    } catch (error) {
        console.error(`\n${colors.red}❌ AUDIT FAILED:${colors.reset}`, error.message);
    } finally {
        console.log("\n========================================");
        console.log(`${colors.bold}FINAL AUDIT REPORT${colors.reset}`);
        console.log("========================================");
        console.log(`[${checklist.orderCreated ? 'x' : ' '}] Order Created`);
        console.log(`[${checklist.webhookTriggered ? 'x' : ' '}] Webhook Triggered`);
        console.log(`[${checklist.walletCreatorUpdated ? 'x' : ' '}] Wallet Updated (Creator: +70k)`);
        console.log(`[${checklist.walletOperatorUpdated ? 'x' : ' '}] Wallet Updated (Operator: +30k)`);
        console.log(`[${checklist.statusUpdated ? 'x' : ' '}] Status Updated to PAID`);
        console.log("========================================");
    }
}

auditPaymentLogic();
