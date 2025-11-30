import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

// Colors
const colors = {
    reset: "\x1b[0m",
    green: "\x1b[32m",
    red: "\x1b[31m",
    yellow: "\x1b[33m",
    blue: "\x1b[34m",
    bold: "\x1b[1m"
};

async function runSecurityAudit() {
    console.log(`${colors.bold}${colors.blue}🛡️  Starting Security Audit: Penetration Testing${colors.reset}\n`);

    // 1. Setup: Create 2 Creators
    console.log("1️⃣  Setting up Test Users (Creator A & Creator B)...");

    const timestamp = Date.now();
    const emailA = `creator_a_${timestamp}@test.com`;
    const emailB = `creator_b_${timestamp}@test.com`;
    const password = 'password123';

    const supabaseAdmin = createClient(supabaseUrl, anonKey); // Using Anon for SignUp

    // Create A
    const { data: authA, error: errA } = await supabaseAdmin.auth.signUp({
        email: emailA,
        password,
        options: { data: { role: 'creator', full_name: 'Creator A' } }
    });
    if (errA) {
        console.error("Failed to create Creator A:", errA.message);
        return;
    }
    const idA = authA.user?.id;
    if (!idA) {
        console.error("Creator A created but ID missing (Email confirm?)");
        return;
    }

    // Create B
    const { data: authB, error: errB } = await supabaseAdmin.auth.signUp({
        email: emailB,
        password,
        options: { data: { role: 'creator', full_name: 'Creator B' } }
    });
    if (errB) {
        console.error("Failed to create Creator B:", errB.message);
        return;
    }
    const idB = authB.user?.id;
    if (!idB) {
        console.error("Creator B created but ID missing");
        return;
    }

    console.log(`   ✅ Users Created: A (${idA}) & B (${idB})`);

    // 2. Login as Creator A
    console.log("\n2️⃣  Logging in as Creator A...");
    const { data: sessionA, error: loginError } = await supabaseAdmin.auth.signInWithPassword({
        email: emailA,
        password
    });
    if (loginError) {
        console.error("Failed to login as Creator A:", loginError.message);
        return;
    }

    // Create Client for Creator A
    const supabaseA = createClient(supabaseUrl, anonKey, {
        global: { headers: { Authorization: `Bearer ${sessionA.session.access_token}` } }
    });
    console.log("   ✅ Login Successful");

    // 3. Test Data Isolation (Peeping Tom)
    console.log("\n3️⃣  Test: Data Isolation (Can A see B's Wallet?)");

    // Try to fetch B's wallet
    // Note: We assume wallets exist. If not, RLS might still block or return empty.
    // Ideally we should create wallets first, but we can't easily do that without Service Key or Trigger.
    // Assuming Trigger created them.

    const { data: walletB, error: walletError } = await supabaseA
        .from('wallets')
        .select('*')
        .eq('user_id', idB); // Explicitly asking for B's wallet

    if (walletError) {
        console.log(`${colors.green}   ✅ PASS: Database returned error (RLS Blocked)${colors.reset}`);
    } else if (walletB && walletB.length === 0) {
        console.log(`${colors.green}   ✅ PASS: Database returned 0 rows (RLS Filtered)${colors.reset}`);
    } else {
        console.log(`${colors.red}   ❌ FAIL: Creator A could see Creator B's wallet!${colors.reset}`);
        console.log(walletB);
    }

    // 4. Test Unauthorized Modification
    console.log("\n4️⃣  Test: Unauthorized Product Modification");

    // Try to update a product (any product)
    // First, find a product. If none, create one using A? 
    // Creators might not be allowed to create products directly (Operators do).
    // Let's try to fetch ANY product and update it.
    const { data: products } = await supabaseA.from('products').select('id').limit(1);

    if (products && products.length > 0) {
        const productId = products[0].id;
        console.log(`   Attempting to update price of Product ${productId}...`);

        const { error: updateError } = await supabaseA
            .from('products')
            .update({ price: 1 })
            .eq('id', productId);

        if (updateError) {
            console.log(`${colors.green}   ✅ PASS: Update Failed (RLS Blocked)${colors.reset}`);
            console.log(`   Error: ${updateError.message}`);
        } else {
            // Check if it actually changed (sometimes RLS silently ignores update)
            const { data: checkProduct } = await supabaseA.from('products').select('price').eq('id', productId).single();
            if (checkProduct.price === 1) {
                console.log(`${colors.red}   ❌ FAIL: Creator A successfully changed the price!${colors.reset}`);
            } else {
                console.log(`${colors.green}   ✅ PASS: Update Silently Ignored (RLS Filtered)${colors.reset}`);
            }
        }
    } else {
        console.log("   ⚠️ No products found to test update.");
    }

    console.log("\n========================================");
    console.log("SECURITY AUDIT COMPLETE");
    console.log("========================================");
}

runSecurityAudit();
