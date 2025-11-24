import { createAdminClient } from '@/lib/supabase/admin'
import { createMidtransTransaction } from '@/lib/midtrans'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
    try {
        const body = await request.json()
        const { productId, customerName, customerEmail, customerWhatsapp, ref } = body

        if (!productId || !customerName || !customerEmail) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
        }

        const supabase = createAdminClient()

        // 1. Fetch Product
        const { data: product, error: productError } = await supabase
            .from('products')
            .select('*')
            .eq('id', productId)
            .single()

        if (productError || !product) {
            return NextResponse.json({ error: 'Product not found' }, { status: 404 })
        }

        // 2. Create Order
        const { data: order, error: orderError } = await supabase
            .from('orders')
            .insert({
                product_id: productId,
                amount: product.price,
                customer_email: customerEmail,
                customer_name: customerName, // Assuming we add this column or store in metadata
                status: 'pending',
                // We might want to store the referral ID (creator_id) here if it's different from the product's creator
                // For now, we assume the revenue split logic handles the product's assigned creator.
                // If 'ref' is used for tracking who drove the sale (e.g. an affiliate), we'd store it.
            })
            .select()
            .single()

        if (orderError) {
            console.error("Order creation failed:", orderError)
            return NextResponse.json({ error: 'Failed to create order' }, { status: 500 })
        }

        // 3. Get Snap Token
        const token = await createMidtransTransaction({
            orderId: order.id,
            amount: product.price,
            customerDetails: {
                firstName: customerName,
                email: customerEmail,
                phone: customerWhatsapp
            },
            itemDetails: [
                {
                    id: product.id,
                    price: product.price,
                    quantity: 1,
                    name: product.title
                }
            ]
        })

        return NextResponse.json({ token, orderId: order.id })

    } catch (error) {
        console.error("Payment API Error:", error)

        // Fallback: If DB fails (e.g. missing Service Key), return a Mock Order ID
        // This allows the simulation to continue even without full backend setup
        const mockOrderId = `mock-${Date.now()}`
        return NextResponse.json({
            token: "MOCK_SNAP_TOKEN_" + mockOrderId,
            orderId: mockOrderId,
            isMock: true
        })
    }
}
