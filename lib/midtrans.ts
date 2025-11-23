export const createMidtransTransaction = async (params: {
    orderId: string
    amount: number
    customerDetails: {
        firstName: string
        email: string
        phone?: string
    }
    itemDetails?: {
        id: string
        price: number
        quantity: number
        name: string
    }[]
}) => {
    // In a real app, this would call the Midtrans API
    // For now, we'll return a mock Snap Token
    console.log("Creating Midtrans Transaction:", params)

    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Return a mock token (in a real app, this comes from Midtrans)
    // We can't actually open the Snap popup without a real token in production,
    // but for dev we can simulate the success flow or use a sandbox key if provided.
    // If no key is provided, we'll just return a dummy token.
    return "MOCK_SNAP_TOKEN_" + Math.random().toString(36).substring(7)
}
