"use client"

import { useState } from "react"
import { sendOtp, verifyOtp } from "./actions"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { toast } from "sonner"
import { Loader2, ArrowLeft } from "lucide-react"
import {
    InputOTP,
    InputOTPGroup,
    InputOTPSlot,
} from "@/components/ui/input-otp"
import { useRouter } from "next/navigation"
import Link from "next/link"

export default function SignupPage() {
    const [step, setStep] = useState<'email' | 'otp'>('email')
    const [email, setEmail] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const router = useRouter()

    const handleSendOtp = async (formData: FormData) => {
        setIsLoading(true)
        const emailInput = formData.get('email') as string
        setEmail(emailInput)

        const result = await sendOtp(emailInput)
        setIsLoading(false)

        if (result.error) {
            toast.error(result.error)
        } else {
            setStep('otp')
            toast.success("Code sent to your email!")
        }
    }

    const handleVerifyOtp = async (token: string) => {
        if (token.length !== 6) return

        setIsLoading(true)
        const result = await verifyOtp(email, token)
        setIsLoading(false)

        if (result.error) {
            toast.error(result.error)
        } else if (result.success && result.redirectUrl) {
            toast.success("Welcome to CUANBOSS!")
            router.push(result.redirectUrl)
        }
    }

    return (
        <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center p-4 relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-20 [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]" />

            <Card className="w-full max-w-[400px] bg-[#121212] border-[#222] shadow-2xl relative z-10 rounded-2xl">
                <CardHeader className="space-y-4 pb-2">
                    <div className="flex justify-center mb-2">
                        <span className="text-orange-500 text-5xl font-bold">⚡</span>
                    </div>
                    <CardTitle className="text-2xl font-bold text-center text-white">
                        {step === 'email' ? "Create your account" : "Verify your email"}
                    </CardTitle>
                    <CardDescription className="text-center text-neutral-500">
                        {step === 'email'
                            ? "Start your digital business journey with CUANBOSS."
                            : `Enter the code we sent to ${email}`
                        }
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    {step === 'email' ? (
                        <>
                            <form action={handleSendOtp} className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="email" className="text-neutral-400 text-xs uppercase font-bold tracking-wider">Email</Label>
                                    <Input
                                        id="email"
                                        name="email"
                                        type="email"
                                        placeholder="name@example.com"
                                        required
                                        className="bg-[#1c1c1c] border-[#333] text-white placeholder:text-neutral-600 focus:border-blue-600 focus:ring-0 h-11 rounded-lg"
                                        autoFocus
                                    />
                                </div>

                                <Button
                                    type="submit"
                                    disabled={isLoading}
                                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold h-11 rounded-lg transition-all"
                                >
                                    {isLoading ? <Loader2 className="animate-spin" /> : "Continue"}
                                </Button>
                            </form>

                            <div className="relative">
                                <div className="absolute inset-0 flex items-center">
                                    <span className="w-full border-t border-[#222]" />
                                </div>
                                <div className="relative flex justify-center text-xs uppercase">
                                    <span className="bg-[#121212] px-2 text-neutral-500">Or</span>
                                </div>
                            </div>

                            <div className="flex gap-3">
                                <Button variant="outline" className="flex-1 bg-[#1c1c1c] border-[#333] hover:bg-[#222] hover:text-white h-11 rounded-lg" onClick={() => toast.info("Google Login Coming Soon!")}>
                                    <svg className="h-5 w-5" viewBox="0 0 24 24">
                                        <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                                        <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                                        <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                                        <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                                    </svg>
                                </Button>
                                <Button variant="outline" className="flex-1 bg-[#1c1c1c] border-[#333] hover:bg-[#222] hover:text-white h-11 rounded-lg" onClick={() => toast.info("Apple Login Coming Soon!")}>
                                    <svg className="h-5 w-5 fill-current text-white" viewBox="0 0 24 24">
                                        <path d="M16.365 1.43c0 1.14-.493 2.27-1.177 3.08-.744.9-1.99 1.57-2.987 1.57-.12 0-.23-.02-.3-.03-.01-.06-.04-.15-.04-.21.02-1.35.58-2.66 1.41-3.66C14.113 1.2 15.46.48 16.365 1.43zM18.52 8.56c.223.12.436.25.64.39.92.63 1.77 1.63 2.27 2.73.05.11.17.12.27.12.11 0 .26-.02.36-.05-1.03 2.93-2.6 5.65-4.6 7.85-.66.73-1.43 1.49-2.3 2.05-.57.36-1.19.59-1.8.59-.11 0-.26-.02-.36-.06-.6-.22-1.2-.45-1.83-.45-.6 0-1.25.21-1.84.42-.1.04-.25.06-.35.06-.61 0-1.24-.23-1.81-.59-.87-.56-1.64-1.32-2.3-2.05-2-2.2-3.57-4.92-4.6-7.85-.1-.03.05-.05.16-.05.1 0 .22-.01.27-.12.5-1.1 1.35-2.1 2.27-2.73.2-.14.42-.27.64-.39.9-.49 1.95-.75 3.02-.75.61 0 1.21.23 1.79.44.11.04.26.06.37.06.58 0 1.2-.23 1.77-.44 1.07 0 2.12.26 3.02.75z" />
                                    </svg>
                                </Button>
                                <Button variant="outline" className="flex-1 bg-[#5865F2] border-[#5865F2] hover:bg-[#4752C4] hover:text-white h-11 rounded-lg" onClick={() => toast.info("Discord Login Coming Soon!")}>
                                    <svg className="h-5 w-5 fill-current text-white" viewBox="0 0 24 24">
                                        <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.086 2.157 2.419 0 1.334-.956 2.42-2.157 2.42zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.086 2.157 2.419 0 1.334-.946 2.42-2.157 2.42z" />
                                    </svg>
                                </Button>
                            </div>

                            <div className="text-center text-sm text-neutral-500">
                                Already have an account?{" "}
                                <Link href="/login" className="text-blue-500 hover:text-blue-400 font-medium">
                                    Sign in
                                </Link>
                            </div>
                        </>
                    ) : (
                        <div className="space-y-6 flex flex-col items-center">
                            <InputOTP
                                maxLength={6}
                                value={""}
                                onChange={(value: string) => {
                                    if (value.length === 6) handleVerifyOtp(value)
                                }}
                            >
                                <InputOTPGroup>
                                    <InputOTPSlot index={0} />
                                    <InputOTPSlot index={1} />
                                    <InputOTPSlot index={2} />
                                    <InputOTPSlot index={3} />
                                    <InputOTPSlot index={4} />
                                    <InputOTPSlot index={5} />
                                </InputOTPGroup>
                            </InputOTP>

                            <div className="text-center text-sm text-neutral-500">
                                <button
                                    onClick={() => setStep('email')}
                                    className="text-blue-500 hover:text-blue-400 font-medium flex items-center gap-2 mx-auto"
                                >
                                    <ArrowLeft className="h-4 w-4" />
                                    Use a different email
                                </button>
                            </div>

                            {isLoading && <Loader2 className="animate-spin text-blue-500" />}
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    )
}
