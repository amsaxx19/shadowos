'use client'

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { resetPassword } from "./actions"
import { toast } from "sonner"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"

export default function ForgotPasswordPage() {
    const [isLoading, setIsLoading] = useState(false)
    const [successMessage, setSuccessMessage] = useState<string | null>(null)

    async function handleSubmit(formData: FormData) {
        setIsLoading(true)
        setSuccessMessage(null)

        const res = await resetPassword(formData)

        if (res?.error) {
            toast.error(res.error)
        } else if (res?.success) {
            setSuccessMessage(res.success)
            toast.success(res.success)
        }

        setIsLoading(false)
    }

    return (
        <div className="flex min-h-screen items-center justify-center bg-black p-4">
            <Card className="w-full max-w-md bg-zinc-950 border-zinc-800 text-white">
                <CardHeader>
                    <CardTitle>Reset Password</CardTitle>
                    <CardDescription className="text-zinc-400">
                        Enter your email to receive a password reset link.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    {successMessage ? (
                        <div className="space-y-4">
                            <div className="p-4 bg-green-500/10 border border-green-500/20 rounded-lg text-green-500 text-sm">
                                {successMessage}
                            </div>
                            <Button asChild className="w-full" variant="outline">
                                <Link href="/login">Back to Login</Link>
                            </Button>
                        </div>
                    ) : (
                        <form action={handleSubmit} className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="email">Email</Label>
                                <Input
                                    id="email"
                                    name="email"
                                    type="email"
                                    required
                                    className="bg-zinc-900 border-zinc-800 text-white"
                                    placeholder="creator@example.com"
                                />
                            </div>
                            <Button type="submit" className="w-full" disabled={isLoading}>
                                {isLoading ? "Sending Link..." : "Send Reset Link"}
                            </Button>
                        </form>
                    )}
                    <div className="mt-4 text-center">
                        <Link href="/login" className="text-sm text-zinc-400 hover:text-white flex items-center justify-center gap-2">
                            <ArrowLeft className="h-4 w-4" />
                            Back to Login
                        </Link>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
