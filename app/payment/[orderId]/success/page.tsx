import { createClient } from "@/lib/supabase/server"
import { notFound, redirect } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle2, Download, ArrowRight } from "lucide-react"
import Link from "next/link"

export default async function SuccessPage({ params }: { params: Promise<{ orderId: string }> }) {
    const { orderId } = await params
    // Mock Data Fallback
    if (orderId.startsWith('mock-')) {
        return (
            <div className="min-h-screen bg-blue-50 flex items-center justify-center p-4">
                <Card className="w-full max-w-lg shadow-xl border-blue-100 bg-white text-gray-900">
                    <CardHeader className="text-center pb-2">
                        <div className="mx-auto bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mb-4">
                            <CheckCircle2 className="h-8 w-8 text-[#0055D4]" />
                        </div>
                        <CardTitle className="text-2xl text-gray-900">Payment Successful!</CardTitle>
                        <p className="text-gray-600">Thank you for your purchase (Simulation).</p>
                    </CardHeader>
                    <CardContent className="space-y-6 pt-6">
                        <div className="bg-gray-50 p-6 rounded-xl border border-blue-100 shadow-sm">
                            <h3 className="font-bold text-gray-900 mb-2 text-lg">Mock Product Title</h3>

                            <div className="space-y-4">
                                <div className="text-sm text-gray-600 bg-white p-3 rounded-lg border border-gray-100">
                                    <p className="font-medium text-gray-900 mb-1">Product Description & Access:</p>
                                    <p>This is a simulated product description. Your ebook link or course access would appear here.</p>
                                </div>

                                <Button className="w-full bg-[#0055D4] hover:bg-blue-700 gap-2 h-12 text-base font-semibold shadow-blue-200 shadow-lg transition-all hover:scale-[1.02]">
                                    <Download className="h-5 w-5" />
                                    Access Your Content
                                </Button>
                            </div>
                        </div>

                        <div className="text-center space-y-2">
                            <p className="text-sm text-gray-500">
                                A receipt has been sent to <span className="font-medium text-gray-900">mock@example.com</span>
                            </p>
                            <Link href="/" className="inline-flex items-center text-sm text-blue-600 hover:underline font-medium">
                                Return to Store <ArrowRight className="h-4 w-4 ml-1" />
                            </Link>
                        </div>
                    </CardContent>
                </Card>
            </div>
        )
    }

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
        <div className="min-h-screen bg-blue-50 flex items-center justify-center p-4">
            <Card className="w-full max-w-lg shadow-xl border-blue-100 bg-white text-gray-900">
                <CardHeader className="text-center pb-2">
                    <div className="mx-auto bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mb-4">
                        <CheckCircle2 className="h-8 w-8 text-[#0055D4]" />
                    </div>
                    <CardTitle className="text-2xl text-gray-900">Payment Successful!</CardTitle>
                    <p className="text-gray-600">Thank you for your purchase.</p>
                </CardHeader>
                <CardContent className="space-y-6 pt-6">
                    <div className="bg-gray-50 p-6 rounded-xl border border-blue-100 shadow-sm">
                        <h3 className="font-bold text-gray-900 mb-2 text-lg">{order.product.title}</h3>

                        <div className="space-y-4">
                            <div className="text-sm text-gray-600 bg-white p-3 rounded-lg border border-gray-100">
                                <p className="font-medium text-gray-900 mb-1">Product Description & Access:</p>
                                <p>{order.product.description}</p>
                            </div>

                            <Button className="w-full bg-[#0055D4] hover:bg-blue-700 gap-2 h-12 text-base font-semibold shadow-blue-200 shadow-lg transition-all hover:scale-[1.02]">
                                <Download className="h-5 w-5" />
                                Access Your Content
                            </Button>
                        </div>
                    </div>

                    <div className="text-center space-y-2">
                        <p className="text-sm text-gray-500">
                            A receipt has been sent to <span className="font-medium text-gray-900">{order.customer_email}</span>
                        </p>
                        <Link href="/" className="inline-flex items-center text-sm text-blue-600 hover:underline font-medium">
                            Return to Store <ArrowRight className="h-4 w-4 ml-1" />
                        </Link>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
