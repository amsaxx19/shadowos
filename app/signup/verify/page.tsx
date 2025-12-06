"use client"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { verifyOtp, sendOtp } from "../actions"
import { toast } from "sonner"
import { Loader2 } from "lucide-react"
import {
    InputOTP,
    InputOTPGroup,
    InputOTPSlot,
} from "@/components/ui/input-otp"
import Link from "next/link"
import React from "react"

export default function VerifyPage() {
    return (
        <React.Suspense fallback={<div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center"><Loader2 className="animate-spin text-white" /></div>}>
            <VerifyForm />
        </React.Suspense>
    )
}

function VerifyForm() {
    const searchParams = useSearchParams()
    const router = useRouter()
    const email = searchParams.get('email') || ""

    const [isLoading, setIsLoading] = useState(false)
    const [otp, setOtp] = useState("")

    useEffect(() => {
        if (!email) {
            router.push('/signup')
        }
    }, [email, router])

    const handleVerifyOtp = async (token: string) => {
        if (token.length !== 6) return

        setIsLoading(true)
        const result = await verifyOtp(email, token)
        setIsLoading(false)

        if (result.error) {
            toast.error(result.error)
            setOtp("")
        } else if (result.success && result.redirectUrl) {
            toast.success("Welcome to CUANBOSS!")
            router.push(result.redirectUrl)
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
                <h1 className="text-white text-3xl font-bold mb-6">Verify your email</h1>
                <p className="text-neutral-400 text-sm leading-relaxed">
                    We sent a verification code to <span className="text-white font-medium">{email}</span>. Enter the 6-digit code below.
                </p>

                {/* OTP Input */}
                <div className="flex justify-center my-8">
                    <InputOTP
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

                {/* Use different email */}
                <button
                    onClick={() => router.push('/signup')}
                    className="text-neutral-500 hover:text-white text-sm font-medium transition-colors"
                >
                    Use a different email
                </button>
            </div>
        </div>
    )
}
