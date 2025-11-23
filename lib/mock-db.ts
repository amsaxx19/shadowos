// Using globalThis to persist state across hot reloads in dev
const globalForMockDb = globalThis as unknown as {
    mockDb: {
        wallets: Record<string, number>
        transactions: any[]
    }
}

export const MOCK_DB = globalForMockDb.mockDb || {
    wallets: {
        'op1': 0,
        'cr1': 0
    },
    transactions: []
}

if (process.env.NODE_ENV !== 'production') globalForMockDb.mockDb = MOCK_DB

export const PRODUCTS = [
    { id: 'p1', title: 'How to Code', price: 100000, creatorId: 'cr1', operatorId: 'op1', splitCreator: 70, splitOperator: 30 }
]
