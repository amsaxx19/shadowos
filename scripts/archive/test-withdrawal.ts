// import { requestWithdrawal } from "../app/dashboard/creator/actions";

// Mock Data
const MOCK_USER_ID = "user_creator_123";
// ... (rest of the file)

async function runWithdrawalTest() {
    // ...
    /*
    const result = await requestWithdrawal(500000);
    */
    console.log("Skipping actual withdrawal test as it requires DB setup.");
}
const MOCK_WALLET_ID = "wallet_creator_123";
const WITHDRAWAL_INITIAL_BALANCE = 500000;

// Mock Supabase Client Factory
const createWithdrawalMockSupabase = (initialBalance: number) => {
    const db = {
        user: { id: MOCK_USER_ID },
        wallet: { id: MOCK_WALLET_ID, balance: initialBalance, user_id: MOCK_USER_ID },
        withdrawals: [] as any[],
        ledger: [] as any[],
        updates: [] as any[]
    };

    return {
        auth: {
            getUser: async () => ({ data: { user: db.user } })
        },
        from: (table: string) => {
            return {
                select: (columns: string) => {
                    return {
                        eq: (field: string, value: string) => {
                            return {
                                single: async () => {
                                    if (table === 'wallets' && field === 'user_id' && value === MOCK_USER_ID) {
                                        return { data: db.wallet, error: null };
                                    }
                                    return { data: null, error: "Not found" };
                                },
                                order: () => ({ limit: () => Promise.resolve({ data: [] }) }) // For stats calls if any
                            };
                        }
                    };
                },
                insert: async (data: any) => {
                    if (table === 'withdrawals') db.withdrawals.push(data);
                    if (table === 'ledger') db.ledger.push(data);
                    return { error: null };
                },
                update: (data: any) => {
                    return {
                        eq: (field: string, value: string) => {
                            if (table === 'wallets' && field === 'id' && value === MOCK_WALLET_ID) {
                                db.wallet.balance = data.balance; // Update in-memory state
                                db.updates.push({ table, data });
                            }
                            return Promise.resolve({ error: null });
                        }
                    };
                }
            };
        },
        // Helper to inspect state
        _getWallet: () => db.wallet,
        _getWithdrawals: () => db.withdrawals
    };
};

async function runTest() {
    console.log("🧪 Logic Test: Withdrawal & Balance Lock\n");

    // 1. Setup
    console.log(`1️⃣  Initial Balance: IDR ${WITHDRAWAL_INITIAL_BALANCE.toLocaleString()}`);
    const mockSupabase = createWithdrawalMockSupabase(WITHDRAWAL_INITIAL_BALANCE);

    try {
        // 2. Request 1 (Success)
        console.log("2️⃣  Requesting Withdrawal: IDR 500,000...");
        // await requestWithdrawal(500000, mockSupabase);

        const walletAfter = mockSupabase._getWallet();
        const withdrawals = mockSupabase._getWithdrawals();

        console.log(`   💰 Balance after Request 1: IDR ${walletAfter.balance}`);

        if (walletAfter.balance === 0) {
            console.log("   ✅ PASS: Funds Locked (Balance is 0)");
        } else {
            console.error(`   ❌ FAIL: Funds NOT Locked (Balance is ${walletAfter.balance})`);
        }

        if (withdrawals.length === 1 && withdrawals[0].status === 'pending') {
            console.log("   ✅ PASS: Ticket Created (PENDING)");
        } else {
            console.error("   ❌ FAIL: Ticket NOT Created correctly");
        }

        // 3. Request 2 (Attack)
        console.log("\n3️⃣  Attempting Double Spend (Requesting another IDR 500,000)...");
        try {
            // await requestWithdrawal(500000, mockSupabase);
            console.error("   ❌ FAIL: System ALLOWED double spend!");
        } catch (error: any) {
            if (error.message === "Insufficient funds") {
                console.log("   ✅ PASS: System BLOCKED double spend (Insufficient funds)");
            } else {
                console.error(`   ❓ Unexpected Error: ${error.message}`);
            }
        }

        // Final Check
        if (walletAfter.balance === 0 && withdrawals.length === 1) {
            console.log("\n✨ FINAL STATUS: PASS");
        } else {
            console.log("\n💥 FINAL STATUS: FAIL");
        }

    } catch (error) {
        console.error("\n❌ TEST CRASHED:", error);
    }
}

runTest();
