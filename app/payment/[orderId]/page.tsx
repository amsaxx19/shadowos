import { createClient } from "@/lib/supabase/server"
import { notFound } from "next/navigation"
import { PaymentSimulator } from "./payment-simulator"

export default async function PaymentPage({ params }: { params: Promise<{ orderId: string }> }) {
    const { orderId } = await params
    const supabase = await createClient()

    const { data: order } = await supabase
        .from('orders')
        .select('*')
        .eq('id', orderId)
        .single()

    if (!order) {
        notFound()
    }

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
            <PaymentSimulator
                orderId={order.id}
                amount={order.amount}
                customerName={order.customer_name || "Guest"}
            />
        </div>
    )
}
