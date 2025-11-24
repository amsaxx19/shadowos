import { createClient } from "@/lib/supabase/server"
import { notFound, redirect } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle2, Download, ArrowRight } from "lucide-react"
import Link from "next/link"

export default async function SuccessPage({ params }: { params: Promise<{ orderId: string }> }) {
    const { orderId } = await params
    const supabase = await createClient()

    const { data: order } = await supabase
        .from('orders')
        .select('*, product:products(*)')
        .eq('id', orderId)
        .single()

    if (!order) notFound()

    if (order.status !== 'paid') {
        // If not paid, redirect back to payment page
        redirect(`/payment/${orderId}`)
    }

    return (
        <div className="min-h-screen bg-green-50 flex items-center justify-center p-4">
            <Card className="w-full max-w-lg shadow-xl border-green-100">
                <CardHeader className="text-center pb-2">
                    <div className="mx-auto bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mb-4">
                        <CheckCircle2 className="h-8 w-8 text-green-600" />
                    </div>
                    <CardTitle className="text-2xl text-green-900">Payment Successful!</CardTitle>
                    <p className="text-green-700">Thank you for your purchase.</p>
                </CardHeader>
                <CardContent className="space-y-6 pt-6">
                    <div className="bg-white p-4 rounded-lg border border-green-100 shadow-sm">
                        <h3 className="font-bold text-gray-900 mb-1">{order.product.title}</h3>
                        <p className="text-sm text-gray-500 mb-4">{order.product.description}</p>

                        <Button className="w-full bg-[#0055D4] hover:bg-blue-700 gap-2">
                            <Download className="h-4 w-4" />
                            Download Content
                        </Button>
                    </div>

                    <div className="text-center space-y-2">
                        <p className="text-sm text-gray-500">
                            A receipt has been sent to <span className="font-medium text-gray-900">{order.customer_email}</span>
                        </p>
                        <Link href="/" className="inline-flex items-center text-sm text-blue-600 hover:underline">
                            Return to Store <ArrowRight className="h-3 w-3 ml-1" />
                        </Link>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
