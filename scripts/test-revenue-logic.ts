import { distributeRevenue } from "../lib/revenue-logic";

// Mock Data
const MOCK_ORDER_ID = "order_123";
const MOCK_CREATOR_ID = "creator_abc";
const MOCK_OPERATOR_ID = "operator_xyz";
const MOCK_CREATOR_WALLET_ID = "wallet_creator";
const MOCK_OPERATOR_WALLET_ID = "wallet_operator";
const PRODUCT_PRICE = 100000;

// Mock Supabase Client
const createMockSupabase = () => {
    const db = {
        orders: {
            id: MOCK_ORDER_ID,
            amount: PRODUCT_PRICE,
            product: {
                creator_id: MOCK_CREATOR_ID,
                price: PRODUCT_PRICE
            },
            product_id: "prod_123"
        },
        users: {
            id: MOCK_OPERATOR_ID,
            email: "operator_test@shadowos.com"
        },
        wallets: {
            [MOCK_CREATOR_ID]: { id: MOCK_CREATOR_WALLET_ID, balance: 0, user_id: MOCK_CREATOR_ID },
            [MOCK_OPERATOR_ID]: { id: MOCK_OPERATOR_WALLET_ID, balance: 0, user_id: MOCK_OPERATOR_ID }
        },
        updates: [] as any[],
        inserts: [] as any[]
    };

    return {
        from: (table: string) => {
            return {
                select: (columns: string) => {
                    return {
                        eq: (field: string, value: string) => {
                            return {
                                single: async () => {
                                    if (table === 'orders' && value === MOCK_ORDER_ID) return { data: db.orders, error: null };
                                    if (table === 'users' && field === 'email' && value === 'operator_test@shadowos.com') return { data: db.users, error: null };
                                    if (table === 'wallets' && field === 'user_id') {
                                        return { data: db.wallets[value as keyof typeof db.wallets], error: null };
                                    }
                                    return { data: null, error: "Not found" };
                                }
                            };
                        }
                    };
                },
                update: (data: any) => {
                    return {
                        eq: (field: string, value: string) => {
                            db.updates.push({ table, data, where: { field, value } });
                            return Promise.resolve({ error: null });
                        }
                    };
                },
                insert: (data: any) => {
                    db.inserts.push({ table, data });
                    return Promise.resolve({ error: null });
                }
            };
        },
        // Helper to inspect state
        _getUpdates: () => db.updates,
        _getInserts: () => db.inserts
    };
};

async function runTest() {
    console.log("🧪 Running Unit Test: Revenue Split Logic (70/30)...");

    const mockSupabase = createMockSupabase();

    // Execute Logic
    await distributeRevenue(MOCK_ORDER_ID, mockSupabase);

    // Verify Results
    const updates = mockSupabase._getUpdates();
    const inserts = mockSupabase._getInserts();

    console.log("\n📊 Verification Results:");

    // 1. Verify Creator Update
    const creatorUpdate = updates.find(u => u.table === 'wallets' && u.where.value === MOCK_CREATOR_WALLET_ID);
    if (creatorUpdate) {
        const expectedBalance = PRODUCT_PRICE * 0.70; // 70k
        if (creatorUpdate.data.balance === expectedBalance) {
            console.log(`   ✅ Creator Wallet Updated: +${creatorUpdate.data.balance} (Expected: ${expectedBalance})`);
        } else {
            console.error(`   ❌ Creator Wallet Mismatch: Got ${creatorUpdate.data.balance}, Expected ${expectedBalance}`);
        }
    } else {
        console.error("   ❌ Creator Wallet NOT Updated");
    }

    // 2. Verify Operator Update
    const operatorUpdate = updates.find(u => u.table === 'wallets' && u.where.value === MOCK_OPERATOR_WALLET_ID);
    if (operatorUpdate) {
        const expectedBalance = PRODUCT_PRICE * 0.30; // 30k
        if (operatorUpdate.data.balance === expectedBalance) {
            console.log(`   ✅ Operator Wallet Updated: +${operatorUpdate.data.balance} (Expected: ${expectedBalance})`);
        } else {
            console.error(`   ❌ Operator Wallet Mismatch: Got ${operatorUpdate.data.balance}, Expected ${expectedBalance}`);
        }
    } else {
        console.error("   ❌ Operator Wallet NOT Updated");
    }

    // 3. Verify Transactions
    const txCount = inserts.filter(i => i.table === 'transactions').length;
    if (txCount === 2) {
        console.log(`   ✅ Transactions Recorded: ${txCount} (Expected: 2)`);
    } else {
        console.error(`   ❌ Transaction Count Mismatch: Got ${txCount}, Expected 2`);
    }

    if (creatorUpdate?.data.balance === 70000 && operatorUpdate?.data.balance === 30000 && txCount === 2) {
        console.log("\n✨ TEST PASSED: Logic is 100% Correct.");
    } else {
        console.log("\n💥 TEST FAILED: Logic has errors.");
        process.exit(1);
    }
}

runTest();
