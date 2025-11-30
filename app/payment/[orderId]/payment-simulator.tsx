"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { processPayment } from "../actions"
import { Loader2, CheckCircle2, XCircle } from "lucide-react"
import { toast } from "sonner"

export function PaymentSimulator({ orderId, amount, customerName }: { orderId: string, amount: number, customerName: string }) {
    const [isLoading, setIsLoading] = useState(false)

    const handlePayment = async (status: 'success' | 'failed') => {
        setIsLoading(true)
        try {
            await processPayment(orderId, status)
        } catch (error) {
            toast.error("Something went wrong")
            setIsLoading(false)
        }
    }

    return (
        <Card className="w-full max-w-md mx-auto shadow-xl border-t-4 border-t-[#0055D4] bg-white text-gray-900 border-gray-200">
            <CardHeader className="text-center">
                <CardTitle className="text-xl text-gray-900">ShadowOS Payment Gateway</CardTitle>
                <CardDescription className="text-gray-500">Mock Payment Simulator (Midtrans)</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                <div className="bg-gray-50 p-4 rounded-lg space-y-2 text-sm">
                    <div className="flex justify-between">
                        <span className="text-gray-500">Order ID</span>
                        <span className="font-mono font-medium">{orderId.slice(0, 8)}...</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-gray-500">Customer</span>
                        <span className="font-medium">{customerName}</span>
                    </div>
                    <div className="flex justify-between pt-2 border-t border-gray-200">
                        <span className="font-bold text-gray-900">Total Amount</span>
                        <span className="font-bold text-blue-600">Rp {amount.toLocaleString('id-ID')}</span>
                    </div>
                </div>

                <div className="text-center text-sm text-gray-500">
                    Select a payment outcome to simulate:
                </div>
            </CardContent>
            <CardFooter className="flex gap-3">
                <Button
                    variant="outline"
                    className="flex-1 border-red-200 hover:bg-red-50 text-red-700"
                    onClick={() => handlePayment('failed')}
                    disabled={isLoading}
                >
                    {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <XCircle className="h-4 w-4 mr-2" />}
                    Simulate Failure
                </Button>
                <Button
                    className="flex-1 bg-green-600 hover:bg-green-700"
                    onClick={() => handlePayment('success')}
                    disabled={isLoading}
                >
                    {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <CheckCircle2 className="h-4 w-4 mr-2" />}
                    Simulate Success
                </Button>
            </CardFooter>
        </Card>
    )
}
