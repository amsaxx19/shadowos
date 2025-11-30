import midtransClient from 'midtrans-client'

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
    const serverKey = process.env.MIDTRANS_SERVER_KEY
    const isProduction = process.env.MIDTRANS_IS_PRODUCTION === 'true'

    if (!serverKey) {
        console.error("MIDTRANS_SERVER_KEY is missing")
        throw new Error("Midtrans Server Key is missing")
    }

    const clientKey = process.env.MIDTRANS_CLIENT_KEY || ""

    const snap = new midtransClient.Snap({
        isProduction: isProduction,
        serverKey: serverKey,
        clientKey: clientKey
    })

    const parameter = {
        transaction_details: {
            order_id: params.orderId,
            gross_amount: params.amount,
        },
        customer_details: {
            first_name: params.customerDetails.firstName,
            email: params.customerDetails.email,
            phone: params.customerDetails.phone,
        },
        item_details: params.itemDetails,
        credit_card: {
            secure: true,
        },
    }

    try {
        const transaction = await snap.createTransaction(parameter)
        return transaction.token
    } catch (error) {
        console.error("Midtrans API Error:", error)
        throw error
    }
}
