"use client"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { verifyLoginOtp, sendLoginOtp } from "../actions"
import { toast } from "sonner"
import { Loader2 } from "lucide-react"
import {
    InputOTP,
    InputOTPGroup,
    InputOTPSlot,
} from "@/components/ui/input-otp"
import Link from "next/link"
import React from "react"

export default function LoginVerifyPage() {
    return (
        <React.Suspense fallback={<div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center"><Loader2 className="animate-spin text-white" /></div>}>
            <LoginVerifyForm />
        </React.Suspense>
    )
}

function LoginVerifyForm() {
    const searchParams = useSearchParams()
    const router = useRouter()
    const email = searchParams.get('email') || ""

    const [isLoading, setIsLoading] = useState(false)
    const [otp, setOtp] = useState("")
    const [resendCooldown, setResendCooldown] = useState(0)

    useEffect(() => {
        if (!email) {
            router.push('/login')
        }
    }, [email, router])

    useEffect(() => {
        if (resendCooldown > 0) {
            const timer = setTimeout(() => setResendCooldown(resendCooldown - 1), 1000)
            return () => clearTimeout(timer)
        }
    }, [resendCooldown])

    const handleVerifyOtp = async (token: string) => {
        if (token.length !== 6) return

        setIsLoading(true)
        const result = await verifyLoginOtp(email, token)
        setIsLoading(false)

        if (result.error) {
            toast.error(result.error)
            setOtp("")
        } else if (result.success && result.redirectUrl) {
            toast.success("Welcome back!")

            // Set test session cookie for mock users to bypass middleware auth
            if (result.setTestSession) {
                document.cookie = "test_session=true; path=/; max-age=3600"
            }

            window.location.href = result.redirectUrl
        }
    }

    const handleResendOtp = async () => {
        if (resendCooldown > 0) return

        setIsLoading(true)
        const result = await sendLoginOtp(email)
        setIsLoading(false)

        if (result.error) {
            toast.error(result.error)
        } else {
            toast.success("Kode verifikasi baru telah dikirim!")
            setResendCooldown(60)
        }
    }

    return (
        <div className="min-h-screen bg-[#0a0a0a] flex flex-col items-center justify-center px-4">
            {/* Logo */}
            <div className="absolute top-8 left-1/2 -translate-x-1/2">
                <Link href="/" className="flex items-center gap-2">
                    <span className="text-orange-500 text-2xl">⚡</span>
                </Link>
            </div>

            {/* Main Content */}
            <div className="w-full max-w-sm text-center">
                <h1 className="text-white text-3xl font-bold mb-6">Verify your login</h1>
                <p className="text-neutral-400 text-sm leading-relaxed">
                    We sent a verification code to <span className="text-white font-medium">{email}</span>. Enter the 6-digit code below.
                </p>

                {/* OTP Input */}
                <div className="flex justify-center my-8">
                    <InputOTP
                        id="otp-input"
                        maxLength={6}
                        value={otp}
                        onChange={(value: string) => {
                            setOtp(value)
                            if (value.length === 6) handleVerifyOtp(value)
                        }}
                        disabled={isLoading}
                    >
                        <InputOTPGroup className="gap-2">
                            <InputOTPSlot
                                index={0}
                                className="h-14 w-12 bg-[#1a1a1a] border-2 border-[#333] rounded-lg text-xl font-bold text-white focus:border-blue-500 transition-all"
                            />
                            <InputOTPSlot
                                index={1}
                                className="h-14 w-12 bg-[#1a1a1a] border-2 border-[#333] rounded-lg text-xl font-bold text-white focus:border-blue-500 transition-all"
                            />
                            <InputOTPSlot
                                index={2}
                                className="h-14 w-12 bg-[#1a1a1a] border-2 border-[#333] rounded-lg text-xl font-bold text-white focus:border-blue-500 transition-all"
                            />
                            <InputOTPSlot
                                index={3}
                                className="h-14 w-12 bg-[#1a1a1a] border-2 border-[#333] rounded-lg text-xl font-bold text-white focus:border-blue-500 transition-all"
                            />
                            <InputOTPSlot
                                index={4}
                                className="h-14 w-12 bg-[#1a1a1a] border-2 border-[#333] rounded-lg text-xl font-bold text-white focus:border-blue-500 transition-all"
                            />
                            <InputOTPSlot
                                index={5}
                                className="h-14 w-12 bg-[#1a1a1a] border-2 border-[#333] rounded-lg text-xl font-bold text-white focus:border-blue-500 transition-all"
                            />
                        </InputOTPGroup>
                    </InputOTP>
                </div>

                {isLoading && (
                    <div className="flex justify-center mb-4">
                        <Loader2 className="animate-spin text-blue-500" />
                    </div>
                )}

                {/* Resend OTP */}
                <div className="space-y-3">
                    <button
                        onClick={handleResendOtp}
                        disabled={resendCooldown > 0 || isLoading}
                        className="text-blue-500 hover:text-blue-400 text-sm font-medium transition-colors disabled:text-neutral-600 disabled:cursor-not-allowed"
                    >
                        {resendCooldown > 0 ? `Kirim ulang dalam ${resendCooldown}s` : "Kirim ulang kode"}
                    </button>

                    {/* Use different email */}
                    <button
                        onClick={() => router.push('/login')}
                        className="block w-full text-neutral-500 hover:text-white text-sm font-medium transition-colors"
                    >
                        Use a different email
                    </button>
                </div>
            </div>
        </div>
    )
}
