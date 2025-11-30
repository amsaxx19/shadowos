import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import { distributeRevenue } from '../lib/revenue-logic';

dotenv.config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

// Colors
const colors = {
    reset: "\x1b[0m",
    green: "\x1b[32m",
    red: "\x1b[31m",
    yellow: "\x1b[33m",
    blue: "\x1b[34m",
    bold: "\x1b[1m"
};

async function testRevenueSplit() {
    console.log(`${colors.bold}${colors.blue}🧪 Logic Test: Revenue Split Engine${colors.reset}\n`);

    if (!serviceKey) {
        console.log(`${colors.yellow}⚠️  SUPABASE_SERVICE_ROLE_KEY missing. Running in MOCK MODE.${colors.reset}`);
        await runMockTest();
        return;
    }

    const supabase = createClient(supabaseUrl, serviceKey);

    try {
        console.log("1️⃣  Setup: Resetting Wallets...");

        // 1. Setup Data
        const timestamp = Date.now();
        const creatorEmail = `split_test_${timestamp}@test.com`;
        const operatorEmail = `operator_test@shadowos.com`;

        // Ensure Users Exist
        // Creator
        let creatorId: string;
        const { data: crUser } = await supabase.from('users').select('id').eq('email', creatorEmail).single();
        if (crUser) creatorId = crUser.id;
        else {
            const { data: crAuth, error: crErr } = await supabase.auth.admin.createUser({
                email: creatorEmail,
                password: 'password123',
                email_confirm: true,
                user_metadata: { role: 'creator' }
            });
            if (crErr) throw crErr;
            creatorId = crAuth.user.id;
        }

        // Operator
        let operatorId: string;
        const { data: opUser } = await supabase.from('users').select('id').eq('email', operatorEmail).single();
        if (opUser) operatorId = opUser.id;
        else {
            // Should exist from previous scripts, but create if not
            const { data: opAuth, error: opErr } = await supabase.auth.admin.createUser({
                email: operatorEmail,
                password: 'password123',
                email_confirm: true,
                user_metadata: { role: 'operator' }
            });
            if (opErr) throw opErr;
            operatorId = opAuth.user.id;
        }

        // Reset Wallets
        await supabase.from('wallets').upsert({ user_id: creatorId, balance: 0 }, { onConflict: 'user_id' });
        await supabase.from('wallets').upsert({ user_id: operatorId, balance: 0 }, { onConflict: 'user_id' });
        console.log("   ✅ Wallets Reset to 0");

        // 2. Create Order
        console.log("\n2️⃣  Transaction: Creating Dummy Order (IDR 100,000)...");
        const productPrice = 100000;

        // Need a product first
        const { data: product } = await supabase.from('products').insert({
            title: `Split Test Product ${timestamp}`,
            price: productPrice,
            creator_id: creatorId,
            operator_id: operatorId,
            description: 'Test'
        }).select().single();

        const { data: order, error: orderError } = await supabase.from('orders').insert({
            product_id: product.id,
            amount: productPrice,
            customer_email: 'tester@split.com',
            status: 'paid' // Simulate already paid for logic test
        }).select().single();

        if (orderError) throw orderError;
        console.log(`   ✅ Order Created: ${order.id}`);

        // 3. Webhook Trigger
        console.log("\n3️⃣  Webhook Trigger: Executing Revenue Logic...");
        await distributeRevenue(order.id); // Uses the default admin client internally which reads env vars
        console.log("   ✅ Logic Executed");

        // 4. Verification
        console.log("\n4️⃣  Verification (The Math)...");

        const { data: finalCreator } = await supabase.from('wallets').select('balance').eq('user_id', creatorId).single();
        const { data: finalOperator } = await supabase.from('wallets').select('balance').eq('user_id', operatorId).single();

        console.log(`   💰 Creator Balance:  ${finalCreator?.balance} (Expected: 70000)`);
        console.log(`   💰 Operator Balance: ${finalOperator?.balance} (Expected: 30000)`);

        if (finalCreator?.balance === 70000 && finalOperator?.balance === 30000) {
            console.log(`\n${colors.green}${colors.bold}FINAL STATUS: PASS${colors.reset}`);
        } else {
            console.log(`\n${colors.red}${colors.bold}FINAL STATUS: FAIL${colors.reset}`);
            console.log("Discrepancy detected!");
        }

    } catch (error) {
        console.error(`\n${colors.red}❌ TEST FAILED:${colors.reset}`, error);
    }
}

// Mock Implementation for Fallback
async function runMockTest() {
    console.log("   Running Simulation with Mock DB...");
    const MOCK_ORDER_ID = "mock_order_100k";
    const MOCK_CREATOR_ID = "mock_creator";
    const MOCK_OPERATOR_ID = "mock_operator";

    // Mock Client
    const db = {
        wallets: {
            [MOCK_CREATOR_ID]: { balance: 0 },
            [MOCK_OPERATOR_ID]: { balance: 0 }
        }
    };

    const mockSupabase = {
        from: (table: string) => ({
            select: () => ({
                eq: (f: string, v: any) => ({
                    single: async () => {
                        if (table === 'orders') return { data: { id: MOCK_ORDER_ID, amount: 100000, product: { creator_id: MOCK_CREATOR_ID } } };
                        if (table === 'users') return { data: { id: MOCK_OPERATOR_ID } };
                        if (table === 'wallets') return { data: (db.wallets as any)[v] }; // Mock wallet fetch
                        return { data: null };
                    }
                })
            }),
            insert: async (data: any) => {
                // Mock Insert (e.g. transaction log)
                return { error: null };
            },
            update: async (data: any) => {
                // Mock Update (Wallet Balance)
                // We need to know WHICH wallet is being updated.
                // In a real mock, we'd track the 'eq' call.
                // For simplicity, we'll just log it or assume it works for this specific test structure.
                return { error: null };
            },
            rpc: async (func: string, args: any) => {
                if (func === 'increment_balance') {
                    // Simulate atomic increment
                    if (args.user_id === MOCK_CREATOR_ID) db.wallets.mock_creator.balance += args.amount;
                    if (args.user_id === MOCK_OPERATOR_ID) db.wallets.mock_operator.balance += args.amount;
                }
                return { error: null };
            }
        })
    };

    await distributeRevenue(MOCK_ORDER_ID, mockSupabase as any);

    console.log(`   💰 Creator Balance:  ${db.wallets[MOCK_CREATOR_ID].balance} (Expected: 70000)`);
    console.log(`   💰 Operator Balance: ${db.wallets[MOCK_OPERATOR_ID].balance} (Expected: 30000)`);

    if (db.wallets[MOCK_CREATOR_ID].balance === 70000 && db.wallets[MOCK_OPERATOR_ID].balance === 30000) {
        console.log(`\n${colors.green}${colors.bold}FINAL STATUS: PASS (MOCK)${colors.reset}`);
    } else {
        console.log(`\n${colors.red}${colors.bold}FINAL STATUS: FAIL (MOCK)${colors.reset}`);
    }
}

testRevenueSplit();
