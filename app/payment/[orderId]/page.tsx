'use client'

import { processPayment } from '../../checkout/actions'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
import { CheckCircle2, XCircle } from "lucide-react"
import { useState, use } from "react"
import { useRouter } from "next/navigation"

export default function PaymentPage({ params }: { params: Promise<{ orderId: string }> }) {
    const { orderId } = use(params)
    const router = useRouter()
    const [status, setStatus] = useState<'pending' | 'success' | 'failed'>('pending')

    const handlePayment = async (result: 'success' | 'failed') => {
        setStatus(result)
        await processPayment(orderId, result)
        if (result === 'success') {
            setTimeout(() => {
                router.push('/dashboard/operator')
            }, 3000)
        }
    }

    if (status === 'success') {
        return (
            <div className="flex min-h-screen items-center justify-center bg-green-50 p-4">
                <Card className="w-full max-w-md text-center">
                    <CardHeader>
                        <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
                            <CheckCircle2 className="h-6 w-6 text-green-600" />
                        </div>
                        <CardTitle className="text-green-700">Payment Successful!</CardTitle>
                        <CardDescription>Your order has been confirmed.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <p className="text-sm text-muted-foreground">Redirecting you shortly...</p>
                    </CardContent>
                </Card>
            </div>
        )
    }

    if (status === 'failed') {
        return (
            <div className="flex min-h-screen items-center justify-center bg-red-50 p-4">
                <Card className="w-full max-w-md text-center">
                    <CardHeader>
                        <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-red-100">
                            <XCircle className="h-6 w-6 text-red-600" />
                        </div>
                        <CardTitle className="text-red-700">Payment Failed</CardTitle>
                        <CardDescription>Something went wrong.</CardDescription>
                    </CardHeader>
                    <CardFooter className="justify-center">
                        <Button variant="outline" onClick={() => setStatus('pending')}>Try Again</Button>
                    </CardFooter>
                </Card>
            </div>
        )
    }

    return (
        <div className="flex min-h-screen items-center justify-center bg-zinc-50 p-4">
            <Card className="w-full max-w-md">
                <CardHeader>
                    <CardTitle>Mock Payment Gateway</CardTitle>
                    <CardDescription>Simulate a payment provider (e.g., Midtrans)</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="rounded-md bg-blue-50 p-4 text-sm text-blue-700">
                        <strong>Order ID:</strong> {orderId}
                    </div>
                    <p className="text-sm text-muted-foreground">
                        Choose an outcome to simulate the webhook callback.
                    </p>
                </CardContent>
                <CardFooter className="flex gap-4">
                    <Button
                        variant="destructive"
                        className="w-full"
                        onClick={() => handlePayment('failed')}
                    >
                        Simulate Failure
                    </Button>
                    <Button
                        className="w-full bg-green-600 hover:bg-green-700"
                        onClick={() => handlePayment('success')}
                    >
                        Simulate Success
                    </Button>
                </CardFooter>
            </Card>
        </div>
    )
}
