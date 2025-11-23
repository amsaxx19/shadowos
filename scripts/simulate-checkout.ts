import { createClient } from '@supabase/supabase-js'
import dotenv from 'dotenv'

dotenv.config({ path: '.env.local' })

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
const supabase = createClient(supabaseUrl, supabaseKey)

async function simulateCheckout() {
    console.log("🚀 Starting Checkout Simulation...")

    // Step 1: Get a Product
    console.log("🔍 Finding a product...")
    const { data: products, error: productError } = await supabase
        .from('products')
        .select('id, title, price, creator_id')
        .limit(1)

    if (productError) {
        console.error("❌ Error fetching products:", productError.message)
        return
    }

    if (!products || products.length === 0) {
        console.error("❌ No products found in DB. Please create a product in the dashboard first.")
        return
    }

    const product = products[0]
    console.log(`✅ Product Found: ${product.title} (ID: ${product.id})`)

    // Step 2: Prepare Customer Data
    const customerData = {
        productId: product.id,
        customerName: "Budi Tester",
        customerEmail: "budi@test.com",
        customerWhatsapp: "08123456789",
        ref: product.creator_id // Simulating self-referral or just passing creator ID
    }
    console.log("✅ Customer Data Prepared:", customerData)

    // Step 3: Call API
    console.log("💸 Sending Payment Request to API...")
    try {
        const response = await fetch('http://localhost:3000/api/payment/create-transaction', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(customerData)
        })

        const result = await response.json()

        if (!response.ok) {
            console.error("❌ API Error:", result)
            return
        }

        console.log(`✅ Midtrans Token Received: ${result.token}`)
        console.log(`✅ Order ID returned: ${result.orderId}`)

        // Step 4: Verify Database
        console.log("🕵️ Verifying Order in Database...")
        const { data: order, error: orderError } = await supabase
            .from('orders')
            .select('*')
            .eq('id', result.orderId)
            .single()

        if (orderError || !order) {
            console.error("❌ Order verification failed:", orderError?.message)
            return
        }

        if (order.status === 'pending' && order.product_id === product.id && order.customer_email === customerData.customerEmail) {
            console.log(`✅ Order Verified in DB!`)
            console.log(`   - ID: ${order.id}`)
            console.log(`   - Status: ${order.status}`)
            console.log(`   - Amount: ${order.amount}`)
            console.log(`   - Customer: ${order.customer_email}`)
        } else {
            console.error("❌ Order data mismatch:", order)
        }

    } catch (error) {
        console.error("❌ Simulation Failed:", error)
    }
}

simulateCheckout()
